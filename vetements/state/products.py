"""Estado da tela de Produtos & Categorias."""

import math
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


def validate_product_form(
    nome: str, categoria_id: str, preco: str
) -> tuple[dict[str, str], float | None]:
    """Valida o formulário de cadastro de produto.

    Devolve os erros por campo (chaves `nome`, `categoria`, `preco`;
    vazio se tudo válido) e o preço já convertido (`None` se o preço
    for inválido). O preço aceita vírgula ou ponto decimal e não pode
    ser negativo. A validação autoritativa continua no Xano.
    """
    erros: dict[str, str] = {}
    if not nome.strip():
        erros["nome"] = "Informe o nome do produto."
    if not categoria_id:
        erros["categoria"] = "Selecione uma categoria."
    valor: float | None
    try:
        valor = float(preco.strip().replace(",", "."))
    except ValueError:
        valor = None
    if valor is None or not math.isfinite(valor) or valor < 0:
        erros["preco"] = "Informe um preço válido."
        valor = None
    return erros, valor


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
    nome_error: str = ""
    categoria_error: str = ""
    preco_error: str = ""
    product_success: str = ""
    is_submitting_product: bool = False

    load_error: str = ""
    is_loading_page: bool = True

    selected_product_id: int = 0
    variants_of_selected: list[VariacaoView] = []
    variant_tamanho: str = ""
    variant_cor: str = ""
    variant_sku: str = ""
    variant_quantidade: str = ""
    variant_error: str = ""
    variant_success: str = ""
    is_submitting_variant: bool = False

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
            self.is_loading_page = False
            return None
        self.categories = [CategoriaView(id=c["id"], nome=c["nome"]) for c in categorias]
        self.refresh_products()
        self.is_loading_page = False
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

    def _reset_form(self):
        self.form_nome = ""
        self.form_descricao = ""
        self.form_categoria_id = ""
        self.form_preco = ""
        self.form_error = ""
        self.nome_error = ""
        self.categoria_error = ""
        self.preco_error = ""

    @rx.event
    def open_form(self):
        self._reset_form()
        self.product_success = ""
        self.show_form = True

    @rx.event
    def set_show_form(self, open: bool):
        # Chamado pelo diálogo (Cancelar, X, Esc, clique fora). Fechar
        # sem salvar descarta o que foi digitado.
        if not open:
            self._reset_form()
        self.show_form = open

    @rx.event
    def set_form_nome(self, value: str):
        self.form_nome = value
        self.nome_error = ""

    @rx.event
    def set_form_descricao(self, value: str):
        self.form_descricao = value

    @rx.event
    def set_form_categoria_id(self, value: str):
        self.form_categoria_id = value
        self.categoria_error = ""

    @rx.event
    def set_form_preco(self, value: str):
        self.form_preco = value
        self.preco_error = ""

    @rx.event
    def create_product(self):
        # Só há envio válido com o popup aberto: uma confirmação repetida
        # (clique duplo) chega depois que o primeiro envio já fechou o
        # popup e limpou o formulário, e não deve apagar a mensagem de
        # sucesso nem revalidar um formulário vazio.
        if self.is_submitting_product or not self.show_form:
            return None
        self.is_submitting_product = True
        self.product_success = ""
        if not self.is_admin:
            self.is_submitting_product = False
            return None
        erros, preco = validate_product_form(
            self.form_nome, self.form_categoria_id, self.form_preco
        )
        self.form_error = ""
        self.nome_error = erros.get("nome", "")
        self.categoria_error = erros.get("categoria", "")
        self.preco_error = erros.get("preco", "")
        if erros:
            self.is_submitting_product = False
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
            self.is_submitting_product = False
            return None
        self._reset_form()
        self.product_success = "Produto cadastrado."
        self.show_form = False
        self.refresh_products()
        self.is_submitting_product = False
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
        self.variant_success = ""

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
        if self.is_submitting_variant:
            return None
        self.is_submitting_variant = True
        self.variant_success = ""
        if not self.is_admin or not self.selected_product_id:
            self.is_submitting_variant = False
            return None
        try:
            quantidade = int(self.variant_quantidade or 0)
        except ValueError:
            self.variant_error = "Quantidade deve ser um número inteiro."
            self.is_submitting_variant = False
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
            self.is_submitting_variant = False
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
        # select_product limpa variant_success (reseta o formulário de
        # variação) — a mensagem de sucesso é definida depois dessa
        # chamada, não antes.
        self.select_product(self.selected_product_id)
        self.variant_success = "Variação adicionada."
        self.refresh_products()
        self.is_submitting_variant = False
        return None
