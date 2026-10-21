"""Carrinho da loja virtual, guardado no navegador do visitante.

A lista de itens fica em JSON num `rx.LocalStorage` (sem login, sobrevive
a recarregar a página). As regras ficam em funções puras, testáveis sem
servidor; o estado só lê, aplica a regra e grava de volta.

Um item é identificado pela variação (`variacao_id`). O preço é guardado
no momento em que o item entra no carrinho; revalidar preço e estoque com
o Xano fica para a finalização do pedido (change futura).
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any

import reflex as rx

from vetements.format_utils import format_currency

# A API pública só diz se a variação tem estoque, não quanto.
MAX_QUANTIDADE = 10

CAMPOS_OBRIGATORIOS = ("variacao_id", "produto_id", "nome", "preco")


@dataclass
class ItemCarrinho:
    variacao_id: int
    nome: str
    tamanho: str
    cor: str
    foto: str
    href: str
    quantidade: int
    preco_label: str
    total_label: str


def _limitar(quantidade: int) -> int:
    return max(1, min(MAX_QUANTIDADE, int(quantidade)))


def _item_valido(item: Any) -> bool:
    if not isinstance(item, dict) or any(campo not in item for campo in CAMPOS_OBRIGATORIOS):
        return False
    try:
        int(item["variacao_id"])
        float(item["preco"])
        int(item.get("quantidade", 1))
    except (TypeError, ValueError):
        return False
    return True


def ler_itens(salvo: str) -> list[dict]:
    """Itens gravados no navegador; o que não der para ler é descartado."""
    try:
        dados = json.loads(salvo or "[]")
    except json.JSONDecodeError:
        return []
    if not isinstance(dados, list):
        return []
    return [item for item in dados if _item_valido(item)]


def adicionar(itens: list[dict], novo: dict) -> list[dict]:
    """Adiciona uma unidade da variação (soma se ela já estiver no carrinho)."""
    resultado = [dict(item) for item in itens]
    for item in resultado:
        if item["variacao_id"] == novo["variacao_id"]:
            item["quantidade"] = _limitar(item.get("quantidade", 1) + 1)
            return resultado
    return resultado + [{**novo, "quantidade": 1}]


def alterar_quantidade(itens: list[dict], variacao_id: int, quantidade: int) -> list[dict]:
    return [
        {**item, "quantidade": _limitar(quantidade)} if item["variacao_id"] == variacao_id else dict(item)
        for item in itens
    ]


def remover(itens: list[dict], variacao_id: int) -> list[dict]:
    return [dict(item) for item in itens if item["variacao_id"] != variacao_id]


def quantidade_total(itens: list[dict]) -> int:
    return sum(int(item.get("quantidade", 1)) for item in itens)


def subtotal(itens: list[dict]) -> float:
    return sum(float(item["preco"]) * int(item.get("quantidade", 1)) for item in itens)


def para_exibicao(item: dict) -> ItemCarrinho:
    quantidade = _limitar(item.get("quantidade", 1))
    preco = float(item["preco"])
    return ItemCarrinho(
        variacao_id=int(item["variacao_id"]),
        nome=str(item.get("nome") or ""),
        tamanho=str(item.get("tamanho") or ""),
        cor=str(item.get("cor") or ""),
        foto=str(item.get("foto") or ""),
        href=str(item.get("href") or ""),
        quantidade=quantidade,
        preco_label=format_currency(preco),
        total_label=format_currency(preco * quantidade),
    )


class CarrinhoState(rx.State):
    # Fonte única do carrinho: lista de itens em JSON, no navegador.
    salvo: str = rx.LocalStorage("[]", name="vetements_carrinho", sync=True)

    def _gravar(self, itens: list[dict]):
        self.salvo = json.dumps(itens, ensure_ascii=False)

    @rx.var
    def itens(self) -> list[ItemCarrinho]:
        return [para_exibicao(item) for item in ler_itens(self.salvo)]

    @rx.var
    def quantidade(self) -> int:
        return quantidade_total(ler_itens(self.salvo))

    @rx.var
    def subtotal_label(self) -> str:
        return format_currency(subtotal(ler_itens(self.salvo)))

    def adicionar_item(self, novo: dict):
        """Usado pela página de produto (via `get_state`)."""
        self._gravar(adicionar(ler_itens(self.salvo), novo))

    @rx.event
    def aumentar(self, variacao_id: int, quantidade_atual: int):
        self._gravar(alterar_quantidade(ler_itens(self.salvo), variacao_id, quantidade_atual + 1))

    @rx.event
    def diminuir(self, variacao_id: int, quantidade_atual: int):
        self._gravar(alterar_quantidade(ler_itens(self.salvo), variacao_id, quantidade_atual - 1))

    @rx.event
    def remover_item(self, variacao_id: int):
        self._gravar(remover(ler_itens(self.salvo), variacao_id))
