"""Estado da tela de Estoque."""

from dataclasses import dataclass

import reflex as rx

from vetements.state import mock_data
from vetements.state.auth import AuthState


@dataclass
class VariacaoView:
    id: int
    produto_nome: str
    tamanho: str
    cor: str
    sku: str
    quantidade: int
    is_low: bool


class InventoryState(AuthState):
    search: str = ""
    variants: list[VariacaoView] = []

    @rx.event
    def load(self):
        redirect = self.require_auth()
        if redirect is not None:
            return redirect
        self.refresh()
        return None

    def refresh(self):
        termo = self.search.strip().lower()
        views = []
        for variacao in mock_data.list_variants():
            produto = mock_data.get_product(variacao.produto_id)
            nome = produto.nome if produto else "—"
            if termo and termo not in nome.lower() and termo not in variacao.sku.lower():
                continue
            views.append(
                VariacaoView(
                    id=variacao.id,
                    produto_nome=nome,
                    tamanho=variacao.tamanho,
                    cor=variacao.cor,
                    sku=variacao.sku,
                    quantidade=variacao.quantidade,
                    is_low=mock_data.is_low_stock(variacao),
                )
            )
        self.variants = views

    @rx.event
    def set_search(self, value: str):
        self.search = value
        self.refresh()
