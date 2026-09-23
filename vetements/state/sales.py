"""Estado da tela de Vendas."""

from dataclasses import dataclass

import reflex as rx

from vetements import xano_client
from vetements.format_utils import format_currency, format_datetime
from vetements.state.auth import AuthState


@dataclass
class ClienteOption:
    id: int
    nome: str


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
    customers: list[ClienteOption] = []
    variant_options: list[VariantOption] = []

    selected_variant_id: str = ""
    item_quantidade: str = ""
    item_error: str = ""

    selected_cliente_id: str = ""

    cart: list[CartItem] = []
    total_label: str = "R$ 0,00"

    sale_error: str = ""
    sale_success: str = ""
    is_submitting: bool = False

    history: list[VendaResumo] = []
    load_error: str = ""
    is_loading_page: bool = True

    # Cache local das variações cruas do Xano (id -> dict), para validar
    # quantidade disponível sem uma chamada de rede a cada item adicionado.
    _variacoes_raw: dict = {}
    _produtos_raw: dict = {}

    @rx.event
    def load(self):
        redirect = self.require_auth()
        if redirect is not None:
            return redirect
        self.refresh_options()
        self.refresh_history()
        self.is_loading_page = False
        return None

    def refresh_options(self):
        try:
            clientes = xano_client.list_customers(self.auth_token)
            variacoes = xano_client.list_variants(self.auth_token)
        except xano_client.XanoAPIError:
            self.load_error = "Não foi possível carregar clientes e produtos para a venda."
            return
        self.load_error = ""
        self.customers = [ClienteOption(id=c["id"], nome=c["nome"]) for c in clientes]
        self._variacoes_raw = {v["id"]: v for v in variacoes}
        self.variant_options = [
            VariantOption(
                id=v["id"],
                label=f"{v.get('produto_nome', '—')} — {v['tamanho']}/{v['cor']} (disp. {v['estoque']})",
            )
            for v in variacoes
        ]

    def refresh_history(self):
        try:
            vendas = xano_client.list_sales(self.auth_token)
        except xano_client.XanoAPIError:
            self.load_error = "Não foi possível carregar o histórico de vendas."
            return
        self.load_error = ""
        clientes_por_id = {c.id: c.nome for c in self.customers}
        self.history = [
            VendaResumo(
                id=venda["id"],
                data_label=format_datetime(venda["created_at"]),
                cliente=clientes_por_id.get(venda.get("cliente_id"), "Balcão")
                if venda.get("cliente_id")
                else "Balcão",
                total_label=format_currency(venda["total"]),
                itens_label=f"{sum(i['quantidade'] for i in venda.get('itens', []))} item(ns)",
            )
            for venda in vendas
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
        variacao = self._variacoes_raw.get(variacao_id)
        if variacao is None:
            self.item_error = "Variação não encontrada."
            return None

        ja_no_carrinho = self._qty_in_cart(variacao_id)
        disponivel = variacao["estoque"] - ja_no_carrinho
        if quantidade > disponivel:
            self.item_error = f"Quantidade indisponível: máximo {disponivel} para esta variação."
            return None

        preco = variacao.get("preco_base") or 0.0
        label = f"{variacao.get('produto_nome', '—')} — {variacao['tamanho']}/{variacao['cor']}"

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
        if self.is_submitting:
            return None
        if not self.cart:
            self.sale_error = "Adicione ao menos um item para confirmar a venda."
            self.sale_success = ""
            return None
        self.is_submitting = True
        itens = [
            {"variacao_id": item.variacao_id, "quantidade": item.quantidade} for item in self.cart
        ]
        cliente_id = int(self.selected_cliente_id) if self.selected_cliente_id else None
        try:
            xano_client.create_sale(self.auth_token, cliente_id, itens)
        except xano_client.XanoAPIError as erro:
            # Mantém o carrinho preenchido em qualquer falha (rede ou
            # rejeição do backend), para o usuário corrigir ou tentar de
            # novo (specs sales: Erro ao confirmar venda por falha de
            # comunicação / Backend rejeita venda por estoque insuficiente).
            if erro.is_network_error:
                self.sale_error = "Não foi possível conectar ao servidor. A venda não foi registrada."
            else:
                self.sale_error = erro.message
            self.sale_success = ""
            self.is_submitting = False
            return None
        self.cart = []
        self.total_label = "R$ 0,00"
        self.selected_cliente_id = ""
        self.sale_error = ""
        self.sale_success = "Venda registrada."
        self.refresh_options()
        self.refresh_history()
        self.is_submitting = False
        return None
