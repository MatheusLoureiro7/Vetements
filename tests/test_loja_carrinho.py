"""Regras do carrinho da loja (change `frontend-cria-carrinho-loja`):
somar a mesma variação, limitar a quantidade, remover e ler dados salvos
no navegador, inclusive inválidos."""

import json

from vetements.loja.state.carrinho import (
    MAX_QUANTIDADE,
    adicionar,
    alterar_quantidade,
    ler_itens,
    quantidade_total,
    remover,
    subtotal,
)

CAMISETA_P = {
    "variacao_id": 10,
    "produto_id": 1,
    "nome": "T-shirt",
    "tamanho": "P",
    "cor": "Preto",
    "preco": 219.0,
    "foto": "https://x/1.jpg",
    "href": "/produto/1",
}
CAMISETA_M = {**CAMISETA_P, "variacao_id": 11, "tamanho": "M"}


def test_adicionar_novo_item_com_quantidade_1():
    itens = adicionar([], CAMISETA_P)
    assert len(itens) == 1
    assert itens[0]["quantidade"] == 1


def test_adicionar_mesma_variacao_soma_quantidade():
    itens = adicionar(adicionar([], CAMISETA_P), CAMISETA_P)
    assert len(itens) == 1
    assert itens[0]["quantidade"] == 2


def test_variacoes_diferentes_viram_itens_diferentes():
    itens = adicionar(adicionar([], CAMISETA_P), CAMISETA_M)
    assert [i["variacao_id"] for i in itens] == [10, 11]


def test_quantidade_limitada_entre_1_e_o_maximo():
    itens = adicionar([], CAMISETA_P)
    assert alterar_quantidade(itens, 10, 99)[0]["quantidade"] == MAX_QUANTIDADE
    assert alterar_quantidade(itens, 10, 0)[0]["quantidade"] == 1
    for _ in range(MAX_QUANTIDADE + 3):
        itens = adicionar(itens, CAMISETA_P)
    assert itens[0]["quantidade"] == MAX_QUANTIDADE


def test_remover_item():
    itens = adicionar(adicionar([], CAMISETA_P), CAMISETA_M)
    assert [i["variacao_id"] for i in remover(itens, 10)] == [11]


def test_totais():
    itens = alterar_quantidade(adicionar(adicionar([], CAMISETA_P), CAMISETA_M), 10, 3)
    assert quantidade_total(itens) == 4
    assert subtotal(itens) == 219.0 * 4


def test_ler_itens_salvos():
    salvo = json.dumps(adicionar([], CAMISETA_P))
    assert ler_itens(salvo)[0]["nome"] == "T-shirt"


def test_dados_salvos_invalidos_viram_carrinho_vazio():
    assert ler_itens("") == []
    assert ler_itens("{quebrado") == []
    assert ler_itens('{"a": 1}') == []
    # Itens sem os campos essenciais são descartados; os bons ficam.
    bom = adicionar([], CAMISETA_P)[0]
    assert ler_itens(json.dumps([{"nome": "x"}, bom, "texto"])) == [bom]


# --- Escolha de variação na página de produto ---

from vetements.loja.state.dados import ProdutoLoja, VariacaoLoja  # noqa: E402
from vetements.loja.state.produto import item_do_carrinho, variacao_inicial  # noqa: E402


def _produto(*variacoes: VariacaoLoja) -> ProdutoLoja:
    return ProdutoLoja(
        id=1, nome="T-shirt", categoria_nome="Camisetas", preco_label="R$ 219,00", preco=219.0,
        href="/produto/1", capa="https://x/1.jpg", variacoes=list(variacoes),
    )


def test_unica_variacao_disponivel_ja_vem_escolhida():
    produto = _produto(VariacaoLoja(10, "P", "Preto", False), VariacaoLoja(11, "M", "Preto", True))
    assert variacao_inicial(produto) == 11


def test_varias_disponiveis_nenhuma_escolhida():
    produto = _produto(VariacaoLoja(10, "P", "Preto", True), VariacaoLoja(11, "M", "Preto", True))
    assert variacao_inicial(produto) == 0


def test_item_do_carrinho_guarda_preco_e_variacao():
    variacao = VariacaoLoja(11, "M", "Preto", True)
    item = item_do_carrinho(_produto(variacao), variacao)
    assert item["variacao_id"] == 11 and item["preco"] == 219.0 and item["tamanho"] == "M"
    assert ler_itens(json.dumps(adicionar([], item)))[0]["variacao_id"] == 11
