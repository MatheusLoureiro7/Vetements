"""Estado da tela de Produtos & Categorias."""

from dataclasses import dataclass

import reflex as rx

from vetements import xano_client
from vetements.format_utils import format_currency
from vetements.state.auth import AuthState


@dataclass
class CategoriaView:
    id: int
    nome: str


@dataclass
class ProdutoView:
    id: int
    nome: str
    categoria_nome: str
    preco_label: str
    variantes_count: int


@dataclass
class VariacaoView:
    id: int
    tamanho: str
    cor: str
    sku: str
    quantidade: int


class ProductsState(AuthState):
    search: str = ""
    products: list[ProdutoView] = []
    categories: list[CategoriaView] = []

    show_form: bool = False
    form_nome: str = ""
    form_descricao: str = ""
    form_categoria_id: str = ""
    form_preco: str = ""
    form_error: str = ""

    load_error: str = ""

    selected_product_id: int = 0
    variants_of_selected: list[VariacaoView] = []
    variant_tamanho: str = ""
    variant_cor: str = ""
    variant_sku: str = ""
    variant_quantidade: str = ""
    variant_error: str = ""

    # Cache local dos produtos/variações crus (do Xano), para montar as
    # views sem repetir chamadas de rede a cada renderização.
    _produtos_raw: list[dict] = []
    _variacoes_raw: list[dict] = []

    @rx.event
    def load(self):
        redirect = self.require_auth()
        if redirect is not None:
            return redirect
        self.load_error = ""
        try:
            categorias = xano_client.list_categories(self.auth_token)
            self._variacoes_raw = xano_client.list_variants(self.auth_token)
        except xano_client.XanoAPIError:
            self.load_error = "Não foi possível carregar produtos e categorias."
            self.products = []
            self.categories = []
            return None
        self.categories = [CategoriaView(id=c["id"], nome=c["nome"]) for c in categorias]
        self.refresh_products()
        return None

    def refresh_products(self):
        try:
            self._produtos_raw = xano_client.list_products(self.auth_token, self.search)
        except xano_client.XanoAPIError:
            self.load_error = "Não foi possível carregar produtos e categorias."
            return
        self.products = [self._to_view(p) for p in self._produtos_raw]

    def _to_view(self, produto: dict) -> ProdutoView:
        variantes = [v for v in self._variacoes_raw if v.get("produto_id") == produto["id"]]
        return ProdutoView(
            id=produto["id"],
            nome=produto["nome"],
            categoria_nome=produto.get("categoria_nome") or "—",
            preco_label=format_currency(produto["preco_base"]),
            variantes_count=len(variantes),
        )

    @rx.event
    def set_search(self, value: str):
        self.search = value
        self.refresh_products()

    @rx.event
    def toggle_form(self):
        self.show_form = not self.show_form
        self.form_error = ""

    @rx.event
    def set_form_nome(self, value: str):
        self.form_nome = value

    @rx.event
    def set_form_descricao(self, value: str):
        self.form_descricao = value

    @rx.event
    def set_form_categoria_id(self, value: str):
        self.form_categoria_id = value

    @rx.event
    def set_form_preco(self, value: str):
        self.form_preco = value

    @rx.event
    def create_product(self):
        if not self.is_admin:
            return None
        if not self.form_categoria_id:
            self.form_error = "Selecione uma categoria válida."
            return None
        try:
            preco = float(self.form_preco.strip().replace(",", "."))
        except ValueError:
            self.form_error = "Informe um preço válido."
            return None
        try:
            xano_client.create_product(
                self.auth_token,
                self.form_nome,
                self.form_descricao,
                int(self.form_categoria_id),
                preco,
            )
        except xano_client.XanoAPIError as erro:
            self.form_error = erro.message
            return None
        self.form_nome = ""
        self.form_descricao = ""
        self.form_categoria_id = ""
        self.form_preco = ""
        self.form_error = ""
        self.show_form = False
        self.refresh_products()
        return None

    @rx.event
    def select_product(self, produto_id: int):
        self.selected_product_id = produto_id
        self.variants_of_selected = [
            VariacaoView(
                id=v["id"], tamanho=v["tamanho"], cor=v["cor"], sku=v["sku"], quantidade=v["estoque"]
            )
            for v in self._variacoes_raw
            if v.get("produto_id") == produto_id
        ]
        self.variant_error = ""

    @rx.event
    def set_variant_tamanho(self, value: str):
        self.variant_tamanho = value

    @rx.event
    def set_variant_cor(self, value: str):
        self.variant_cor = value

    @rx.event
    def set_variant_sku(self, value: str):
        self.variant_sku = value

    @rx.event
    def set_variant_quantidade(self, value: str):
        self.variant_quantidade = value

    @rx.event
    def add_variant(self):
        if not self.is_admin or not self.selected_product_id:
            return None
        try:
            quantidade = int(self.variant_quantidade or 0)
        except ValueError:
            self.variant_error = "Quantidade deve ser um número inteiro."
            return None
        try:
            xano_client.create_variant(
                self.auth_token,
                self.selected_product_id,
                self.variant_tamanho,
                self.variant_cor,
                self.variant_sku,
                quantidade,
            )
        except xano_client.XanoAPIError as erro:
            self.variant_error = erro.message
            return None
        self.variant_tamanho = ""
        self.variant_cor = ""
        self.variant_sku = ""
        self.variant_quantidade = ""
        self.variant_error = ""
        try:
            self._variacoes_raw = xano_client.list_variants(self.auth_token)
        except xano_client.XanoAPIError:
            pass
        self.select_product(self.selected_product_id)
        self.refresh_products()
        return None
