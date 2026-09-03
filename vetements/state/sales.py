"""Estado da tela de Vendas."""

from dataclasses import dataclass

import reflex as rx

from vetements.format_utils import format_currency, format_datetime
from vetements.state import mock_data
from vetements.state.auth import AuthState


@dataclass
class VariantOption:
    id: int
    label: str


@dataclass
class CartItem:
    variacao_id: int
    label: str
    quantidade: int
    preco_unitario: float
    subtotal_label: str


@dataclass
class VendaResumo:
    id: int
    data_label: str
    cliente: str
    total_label: str
    itens_label: str


class SalesState(AuthState):
    customers: list[mock_data.Cliente] = []
    variant_options: list[VariantOption] = []

    selected_variant_id: str = ""
    item_quantidade: str = ""
    item_error: str = ""

    selected_cliente_id: str = ""

    cart: list[CartItem] = []
    total_label: str = "R$ 0,00"

    sale_error: str = ""
    sale_success: str = ""

    history: list[VendaResumo] = []

    @rx.event
    def load(self):
        redirect = self.require_auth()
        if redirect is not None:
            return redirect
        self.refresh_options()
        self.refresh_history()
        return None

    def refresh_options(self):
        self.customers = mock_data.list_customers()
        options = []
        for variacao in mock_data.list_variants():
            produto = mock_data.get_product(variacao.produto_id)
            nome = produto.nome if produto else "—"
            options.append(
                VariantOption(
                    id=variacao.id,
                    label=f"{nome} — {variacao.tamanho}/{variacao.cor} (disp. {variacao.quantidade})",
                )
            )
        self.variant_options = options

    def refresh_history(self):
        self.history = [
            VendaResumo(
                id=venda.id,
                data_label=format_datetime(venda.data_hora),
                cliente=(mock_data.get_customer(venda.cliente_id).nome if venda.cliente_id else "Balcão"),
                total_label=format_currency(venda.total),
                itens_label=f"{sum(i.quantidade for i in venda.itens)} item(ns)",
            )
            for venda in mock_data.list_sales()
        ]

    def _qty_in_cart(self, variacao_id: int) -> int:
        return sum(item.quantidade for item in self.cart if item.variacao_id == variacao_id)

    @rx.event
    def set_selected_variant_id(self, value: str):
        self.selected_variant_id = value
        self.item_error = ""

    @rx.event
    def set_item_quantidade(self, value: str):
        self.item_quantidade = value

    @rx.event
    def set_selected_cliente_id(self, value: str):
        self.selected_cliente_id = value

    @rx.event
    def add_item(self):
        if not self.selected_variant_id:
            self.item_error = "Selecione uma variação."
            return None
        try:
            quantidade = int(self.item_quantidade)
            if quantidade <= 0:
                raise ValueError
        except ValueError:
            self.item_error = "Informe uma quantidade válida."
            return None

        variacao_id = int(self.selected_variant_id)
        variacao = mock_data.get_variant(variacao_id)
        if variacao is None:
            self.item_error = "Variação não encontrada."
            return None

        ja_no_carrinho = self._qty_in_cart(variacao_id)
        disponivel = variacao.quantidade - ja_no_carrinho
        if quantidade > disponivel:
            self.item_error = f"Quantidade indisponível: máximo {disponivel} para esta variação."
            return None

        produto = mock_data.get_product(variacao.produto_id)
        preco = produto.preco_base if produto else 0.0
        label = f"{(produto.nome if produto else '—')} — {variacao.tamanho}/{variacao.cor}"

        novo_carrinho = list(self.cart)
        for i, item in enumerate(novo_carrinho):
            if item.variacao_id == variacao_id:
                nova_qtd = item.quantidade + quantidade
                novo_carrinho[i] = CartItem(
                    variacao_id=variacao_id,
                    label=label,
                    quantidade=nova_qtd,
                    preco_unitario=preco,
                    subtotal_label=format_currency(nova_qtd * preco),
                )
                break
        else:
            novo_carrinho.append(
                CartItem(
                    variacao_id=variacao_id,
                    label=label,
                    quantidade=quantidade,
                    preco_unitario=preco,
                    subtotal_label=format_currency(quantidade * preco),
                )
            )
        self.cart = novo_carrinho
        self.item_quantidade = ""
        self.item_error = ""
        self._recalc_total()
        return None

    @rx.event
    def remove_item(self, variacao_id: int):
        self.cart = [item for item in self.cart if item.variacao_id != variacao_id]
        self._recalc_total()

    def _recalc_total(self):
        total = sum(item.quantidade * item.preco_unitario for item in self.cart)
        self.total_label = format_currency(total)

    @rx.event
    def confirm_sale(self):
        if not self.cart:
            self.sale_error = "Adicione ao menos um item para confirmar a venda."
            self.sale_success = ""
            return None
        itens = [
            mock_data.ItemVenda(
                variacao_id=item.variacao_id,
                quantidade=item.quantidade,
                preco_unitario=item.preco_unitario,
            )
            for item in self.cart
        ]
        cliente_id = int(self.selected_cliente_id) if self.selected_cliente_id else None
        try:
            mock_data.create_sale(usuario_id=self.user_id, cliente_id=cliente_id, itens=itens)
        except mock_data.DomainError as erro:
            self.sale_error = str(erro)
            self.sale_success = ""
            return None
        self.cart = []
        self.total_label = "R$ 0,00"
        self.selected_cliente_id = ""
        self.sale_error = ""
        self.sale_success = "Venda registrada."
        self.refresh_options()
        self.refresh_history()
        return None
