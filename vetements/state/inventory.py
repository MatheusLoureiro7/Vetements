"""Estado da tela de Estoque."""

from dataclasses import dataclass

import reflex as rx

from vetements import xano_client
from vetements.state.auth import AuthState

LOW_STOCK_THRESHOLD = 5


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
    load_error: str = ""

    @rx.event
    def load(self):
        redirect = self.require_auth()
        if redirect is not None:
            return redirect
        self.load_error = ""
        try:
            variacoes = xano_client.list_variants(self.auth_token)
        except xano_client.XanoAPIError:
            self.load_error = "Não foi possível carregar o estoque."
            self.variants = []
            return None
        self._raw = variacoes
        self.refresh()
        return None

    _raw: list[dict] = []

    def refresh(self):
        termo = self.search.strip().lower()
        views = []
        for variacao in self._raw:
            nome = variacao.get("produto_nome") or "—"
            sku = variacao.get("sku", "")
            if termo and termo not in nome.lower() and termo not in sku.lower():
                continue
            quantidade = variacao.get("estoque", 0)
            views.append(
                VariacaoView(
                    id=variacao["id"],
                    produto_nome=nome,
                    tamanho=variacao.get("tamanho", ""),
                    cor=variacao.get("cor", ""),
                    sku=sku,
                    quantidade=quantidade,
                    is_low=quantidade < LOW_STOCK_THRESHOLD,
                )
            )
        self.variants = views

    @rx.event
    def set_search(self, value: str):
        self.search = value
        self.refresh()
