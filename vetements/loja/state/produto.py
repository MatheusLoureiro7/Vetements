"""Estado da página de detalhe de um produto da loja (`/produto/[produto_id]`).

O id vem do parâmetro dinâmico da rota (`self.produto_id`, criado pelo
Reflex a partir de `routes.LOJA_PRODUTO`). Id não numérico e resposta 404
do Xano viram "não encontrado"; qualquer outra falha vira erro, com a
opção de tentar novamente.
"""

from __future__ import annotations

import reflex as rx

from vetements import xano_client
from vetements.loja.state.carrinho import CarrinhoState
from vetements.loja.state.dados import ProdutoLoja, VariacaoLoja, produto_da_api

CARREGANDO = "carregando"
ENCONTRADO = "encontrado"
NAO_ENCONTRADO = "nao_encontrado"
ERRO = "erro"


def _produto_vazio() -> ProdutoLoja:
    return ProdutoLoja(id=0, nome="", categoria_nome="", preco_label="")


def carregar_produto(id_da_rota: str) -> tuple[ProdutoLoja | None, str]:
    """Busca o produto publicado pelo id da rota.

    Devolve `(produto, ENCONTRADO)`, `(None, NAO_ENCONTRADO)` ou
    `(None, ERRO)`. Id não numérico não chega a chamar a API.
    """
    texto = (id_da_rota or "").strip()
    if not texto.isdigit():
        return None, NAO_ENCONTRADO
    try:
        dados = xano_client.get_public_product(int(texto))
    except xano_client.XanoAPIError as erro:
        return None, NAO_ENCONTRADO if erro.status_code == 404 else ERRO
    return produto_da_api(dados), ENCONTRADO


def variacao_inicial(produto: ProdutoLoja) -> int:
    """Com uma única variação disponível, ela já vem escolhida (0 = nenhuma)."""
    disponiveis = [v for v in produto.variacoes if v.disponivel]
    return disponiveis[0].id if len(disponiveis) == 1 else 0


def item_do_carrinho(produto: ProdutoLoja, variacao: VariacaoLoja) -> dict:
    """Dados de uma variação no formato guardado pelo carrinho."""
    return {
        "variacao_id": variacao.id,
        "produto_id": produto.id,
        "nome": produto.nome,
        "tamanho": variacao.tamanho,
        "cor": variacao.cor,
        "preco": produto.preco,
        "foto": produto.capa,
        "href": produto.href,
    }


class ProdutoState(rx.State):
    produto: ProdutoLoja = _produto_vazio()
    situacao: str = CARREGANDO
    # URL da foto em destaque na galeria ("" quando o produto não tem foto).
    foto_atual: str = ""
    # Variação escolhida para o carrinho (0 = nenhuma).
    variacao_escolhida: int = 0
    # Se a última ação foi adicionar ao carrinho (mostra a confirmação).
    adicionado: bool = False

    @rx.event
    def load(self):
        self.situacao = CARREGANDO
        self.produto = _produto_vazio()
        self.foto_atual = ""
        self.variacao_escolhida = 0
        self.adicionado = False
        yield
        produto, situacao = carregar_produto(self.produto_id)
        if produto is not None:
            self.produto = produto
            self.foto_atual = produto.capa
            self.variacao_escolhida = variacao_inicial(produto)
        self.situacao = situacao

    def _variacao(self, variacao_id: int) -> VariacaoLoja | None:
        return next((v for v in self.produto.variacoes if v.id == variacao_id), None)

    @rx.event
    def escolher_variacao(self, variacao_id: int):
        variacao = self._variacao(variacao_id)
        if variacao is not None and variacao.disponivel:
            self.variacao_escolhida = variacao_id
            self.adicionado = False

    @rx.event
    async def adicionar_ao_carrinho(self):
        variacao = self._variacao(self.variacao_escolhida)
        if variacao is None or not variacao.disponivel:
            return
        carrinho = await self.get_state(CarrinhoState)
        carrinho.adicionar_item(item_do_carrinho(self.produto, variacao))
        self.adicionado = True

    @rx.event
    def escolher_foto(self, url: str):
        self.foto_atual = url
