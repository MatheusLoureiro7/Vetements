"""Conta do cliente na loja virtual e "Minha conta" (pedidos).

O token de cliente (emitido por `loja/conta/login` ou `/cadastro`) fica
num cookie próprio, separado do token da equipe (`AuthState`): os dois
nunca se misturam, e o backend não aceita token de cliente na gestão.

Os formulários de entrar/criar conta usam campos não controlados (lidos no
envio), para não perder letras ao digitar rápido. A criação do pedido fica
na página de pagamento simulado (`state/pagamento.py`).
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any
from urllib.parse import urlencode

import reflex as rx

from vetements import routes, xano_client
from vetements.format_utils import format_currency, format_date, format_datetime

MENSAGEM_FALHA = "Não foi possível falar com a loja agora. Tente novamente em instantes."


@dataclass
class ItemPedido:
    nome: str
    detalhe: str
    quantidade: int
    total_label: str


@dataclass
class PedidoLoja:
    id: int
    data_label: str
    total_label: str
    pagamento_label: str = "Pagamento não informado"
    status_label: str = "Pago"
    itens: list[ItemPedido] = field(default_factory=list)


def item_pedido_da_api(dados: dict[str, Any]) -> ItemPedido:
    quantidade = int(dados.get("quantidade") or 0)
    preco = float(dados.get("preco_unitario") or 0)
    detalhe = " · ".join(p for p in (dados.get("tamanho") or "", dados.get("cor") or "") if p)
    return ItemPedido(
        nome=dados.get("nome") or "",
        detalhe=detalhe,
        quantidade=quantidade,
        total_label=format_currency(preco * quantidade),
    )


def pagamento_label(forma: str | None, parcelas: int | None, final: str | None) -> str:
    """Texto do pagamento de um pedido em "Minha conta"."""
    if forma == "pix":
        return "Pix"
    if forma == "boleto":
        return "Boleto"
    if forma == "cartao":
        partes = ["Cartão"]
        if parcelas:
            partes[0] += f" {parcelas}x"
        if final:
            partes.append(f"final {final}")
        return " · ".join(partes)
    return "Pagamento não informado"


def status_pedido_label(status: str | None, enviado_em: Any = None, entregue_em: Any = None) -> str:
    """Status do pedido em "Minha conta". Pedido sem status conta como
    pago; datas não preenchidas chegam do Xano como 0."""
    if status == "entregue":
        return f"Entregue em {format_date(entregue_em)}" if entregue_em else "Entregue"
    if status == "enviado":
        return f"Enviado em {format_date(enviado_em)}" if enviado_em else "Enviado"
    return "Pago"


def pedido_da_api(dados: dict[str, Any]) -> PedidoLoja:
    return PedidoLoja(
        id=int(dados["id"]),
        data_label=format_datetime(dados["created_at"]) if dados.get("created_at") else "",
        total_label=format_currency(float(dados.get("total") or 0)),
        pagamento_label=pagamento_label(
            dados.get("forma_pagamento"), dados.get("parcelas"), dados.get("cartao_final")
        ),
        status_label=status_pedido_label(
            dados.get("status_pedido"), dados.get("enviado_em"), dados.get("entregue_em")
        ),
        itens=[item_pedido_da_api(i) for i in dados.get("itens") or []],
    )


def itens_para_pedido(itens_do_carrinho: list[dict]) -> list[dict[str, int]]:
    """Só variação e quantidade vão ao backend; o preço é lido lá."""
    return [
        {"variacao_id": int(item["variacao_id"]), "quantidade": int(item.get("quantidade", 1))}
        for item in itens_do_carrinho
    ]


def href_entrar(proximo: str = "") -> str:
    """Página de entrar, voltando para `proximo` depois do login."""
    return f"{routes.LOJA_ENTRAR}?{urlencode({'proximo': proximo})}" if proximo else routes.LOJA_ENTRAR


def href_confirmar(proximo: str = "", enviado: bool = True) -> str:
    """Página de confirmar o e-mail, voltando para `proximo` depois.
    `enviado=False` avisa que o código não saiu e é preciso reenviar."""
    parametros = {"proximo": proximo} if proximo else {}
    if not enviado:
        parametros["enviado"] = "0"
    return f"{routes.LOJA_CONFIRMAR}?{urlencode(parametros)}" if parametros else routes.LOJA_CONFIRMAR


def destino_seguro(proximo: str) -> str:
    """Só aceita caminhos internos da loja (evita redirecionar para fora)."""
    if proximo.startswith("/") and not proximo.startswith("//"):
        return proximo
    return routes.LOJA_CONTA


class ContaState(rx.State):
    # Token de cliente (nome próprio para não colidir com o cookie da equipe).
    token: str = rx.Cookie("", name="vetements_cliente", max_age=86400)
    nome: str = ""
    email: str = ""
    # Contas antigas e login sem informação contam como confirmadas; o
    # backend é quem barra o pedido de conta não confirmada.
    email_confirmado: bool = True

    erro_entrar: str = ""
    erro_cadastro: str = ""
    enviando: bool = False

    pedidos: list[PedidoLoja] = []
    carregando_pedidos: bool = False
    erro_pedidos: str = ""
    # Número do pedido recém-criado (mostra a confirmação em /conta).
    pedido_confirmado: int = 0

    @rx.var
    def logado(self) -> bool:
        return self.token != ""

    @rx.var
    def primeiro_nome(self) -> str:
        return self.nome.split()[0] if self.nome.split() else ""

    def _proximo(self) -> str:
        return destino_seguro(self.router.url.query_parameters.get("proximo", ""))

    def _entrar_com(self, resposta: dict[str, Any]):
        self.token = resposta["authToken"]
        cliente = resposta.get("cliente") or {}
        self.nome = cliente.get("nome") or ""
        self.email = cliente.get("email") or ""
        self.email_confirmado = cliente.get("email_confirmado") is not False

    def _sair(self):
        self.token = ""
        self.nome = ""
        self.email = ""
        self.email_confirmado = True
        self.pedidos = []

    # --- Entrar / criar conta -------------------------------------------------

    @rx.event
    def load_entrar(self):
        self.erro_entrar = ""
        self.erro_cadastro = ""
        self.enviando = False
        if self.token:
            return rx.redirect(self._proximo())

    @rx.event
    def entrar(self, form_data: dict):
        email = str(form_data.get("email") or "").strip()
        senha = str(form_data.get("senha") or "")
        if not email or not senha:
            self.erro_entrar = "Informe e-mail e senha."
            return
        self.enviando = True
        self.erro_entrar = ""
        yield
        try:
            self._entrar_com(xano_client.customer_login(email, senha))
        except xano_client.XanoAPIError as erro:
            self.enviando = False
            self.erro_entrar = MENSAGEM_FALHA if erro.is_network_error or (erro.status_code or 0) >= 500 else erro.message
            return
        self.enviando = False
        yield rx.redirect(self._proximo())

    @rx.event
    def cadastrar(self, form_data: dict):
        nome = str(form_data.get("nome") or "").strip()
        email = str(form_data.get("email") or "").strip()
        senha = str(form_data.get("senha") or "")
        telefone = str(form_data.get("telefone") or "")
        if not nome or not email or not senha:
            self.erro_cadastro = "Preencha nome, e-mail e senha."
            return
        self.enviando = True
        self.erro_cadastro = ""
        yield
        try:
            resposta = xano_client.customer_signup(nome, email, senha, telefone)
        except xano_client.XanoAPIError as erro:
            self.enviando = False
            self.erro_cadastro = MENSAGEM_FALHA if erro.is_network_error or (erro.status_code or 0) >= 500 else erro.message
            return
        self._entrar_com(resposta)
        self.enviando = False
        # Conta nova confirma o e-mail antes de seguir para onde ia.
        yield rx.redirect(href_confirmar(self._proximo(), enviado=resposta.get("codigo_enviado") is not False))

    @rx.event
    def sair(self):
        self._sair()
        return rx.redirect(routes.LOJA_HOME)

    # --- Minha conta ----------------------------------------------------------

    @rx.event
    def load_conta(self):
        if not self.token:
            return rx.redirect(href_entrar(routes.LOJA_CONTA))
        pedido = self.router.url.query_parameters.get("pedido", "")
        self.pedido_confirmado = int(pedido) if pedido.isdigit() else 0
        self.carregando_pedidos = True
        self.erro_pedidos = ""
        yield
        try:
            cliente = xano_client.get_customer(self.token)
            self.nome = cliente.get("nome") or ""
            self.email = cliente.get("email") or ""
            self.email_confirmado = cliente.get("email_confirmado") is not False
            self.pedidos = [pedido_da_api(p) for p in xano_client.list_orders(self.token) or []]
        except xano_client.XanoAPIError as erro:
            self.carregando_pedidos = False
            if erro.status_code == 401:
                # Sessão expirada: pede login de novo.
                self._sair()
                yield rx.redirect(href_entrar(routes.LOJA_CONTA))
                return
            self.erro_pedidos = "Não foi possível carregar seus pedidos agora."
            return
        self.carregando_pedidos = False
