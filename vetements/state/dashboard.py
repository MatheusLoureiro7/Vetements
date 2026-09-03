"""Estado da tela inicial: números-resumo e vendas recentes."""

from dataclasses import dataclass

import reflex as rx

from vetements.format_utils import format_currency, format_datetime
from vetements.state import mock_data
from vetements.state.auth import AuthState


@dataclass
class VendaResumo:
    id: int
    data_label: str
    responsavel: str
    cliente: str
    total_label: str


class DashboardState(AuthState):
    total_products: int = 0
    low_stock_count: int = 0
    total_sold_month_label: str = "R$ 0,00"
    total_customers: int = 0
    recent_sales: list[VendaResumo] = []

    @rx.event
    def load(self):
        redirect = self.require_auth()
        if redirect is not None:
            return redirect
        self.total_products = len(mock_data.list_products())
        self.low_stock_count = mock_data.count_low_stock()
        self.total_sold_month_label = format_currency(mock_data.total_sold_this_month())
        self.total_customers = len(mock_data.list_customers())
        self.recent_sales = [
            VendaResumo(
                id=venda.id,
                data_label=format_datetime(venda.data_hora),
                responsavel=(mock_data.get_user(venda.usuario_id) or mock_data.Usuario(0, "—", "", "", "")).nome,
                cliente=(mock_data.get_customer(venda.cliente_id).nome if venda.cliente_id else "Balcão"),
                total_label=format_currency(venda.total),
            )
            for venda in mock_data.list_sales()[:5]
        ]
        return None
