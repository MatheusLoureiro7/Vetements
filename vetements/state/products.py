"""Estado da tela de Produtos & Categorias."""

from dataclasses import dataclass

import reflex as rx

from vetements.format_utils import format_currency
from vetements.state import mock_data
from vetements.state.auth import AuthState


@dataclass
class ProdutoView:
    id: int
    nome: str
    categoria_nome: str
    preco_label: str
    variantes_count: int


class ProductsState(AuthState):
    search: str = ""
    products: list[ProdutoView] = []
    categories: list[mock_data.Categoria] = []

    show_form: bool = False
    form_nome: str = ""
    form_descricao: str = ""
    form_categoria_id: str = ""
    form_preco: str = ""
    form_error: str = ""

    selected_product_id: int = 0
    variants_of_selected: list[mock_data.VariacaoProduto] = []
    variant_tamanho: str = ""
    variant_cor: str = ""
    variant_sku: str = ""
    variant_quantidade: str = ""
    variant_error: str = ""

    @rx.event
    def load(self):
        redirect = self.require_auth()
        if redirect is not None:
            return redirect
        self.categories = mock_data.list_categories()
        self.refresh_products()
        return None

    def refresh_products(self):
        self.products = [self._to_view(p) for p in mock_data.list_products(self.search)]

    def _to_view(self, produto: mock_data.Produto) -> ProdutoView:
        categoria = mock_data.get_category(produto.categoria_id)
        return ProdutoView(
            id=produto.id,
            nome=produto.nome,
            categoria_nome=categoria.nome if categoria else "—",
            preco_label=format_currency(produto.preco_base),
            variantes_count=len(mock_data.list_variants(produto.id)),
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
        try:
            preco = float(self.form_preco.strip().replace(",", "."))
        except ValueError:
            self.form_error = "Informe um preço válido."
            return None
        categoria_id = int(self.form_categoria_id) if self.form_categoria_id else None
        try:
            mock_data.create_product(self.form_nome, self.form_descricao, categoria_id, preco)
        except mock_data.DomainError as erro:
            self.form_error = str(erro)
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
        self.variants_of_selected = mock_data.list_variants(produto_id)
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
            mock_data.create_variant(
                self.selected_product_id,
                self.variant_tamanho,
                self.variant_cor,
                self.variant_sku,
                quantidade,
            )
        except mock_data.DomainError as erro:
            self.variant_error = str(erro)
            return None
        self.variant_tamanho = ""
        self.variant_cor = ""
        self.variant_sku = ""
        self.variant_quantidade = ""
        self.variant_error = ""
        self.variants_of_selected = mock_data.list_variants(self.selected_product_id)
        self.refresh_products()
        return None
