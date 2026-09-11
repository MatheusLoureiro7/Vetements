"""Estado da tela inicial: números-resumo, gráficos e vendas recentes."""

from dataclasses import dataclass
from datetime import date, datetime, timedelta

import reflex as rx

from vetements import xano_client
from vetements.format_utils import format_currency, format_datetime
from vetements.state.auth import AuthState

DIAS_GRAFICO_VENDAS = 14
LOW_STOCK_THRESHOLD = 5

# Quantas vendas recentes buscar para alimentar o resumo mensal e o
# gráfico dos últimos DIAS_GRAFICO_VENDAS dias — suficiente para o
# volume esperado de uma loja única; revisitar com paginação/filtro por
# data no backend se o histórico crescer muito.
HISTORICO_VENDAS_LIMIT = 200


@dataclass
class VendaResumo:
    id: int
    data_label: str
    responsavel: str
    cliente: str
    total_label: str


def _sales_by_day(vendas: list[dict], hoje: date | None = None) -> list[dict[str, str | float]]:
    """Total vendido por dia nos últimos `DIAS_GRAFICO_VENDAS` dias
    (incluindo hoje). Dias sem venda entram com total 0 — o gráfico
    nunca fica com "buracos"."""
    hoje = hoje or datetime.now().date()
    dias = [hoje - timedelta(days=i) for i in range(DIAS_GRAFICO_VENDAS - 1, -1, -1)]
    totais = dict.fromkeys(dias, 0.0)
    for venda in vendas:
        dia_venda = datetime.fromtimestamp(venda["created_at"] / 1000).date()
        if dia_venda in totais:
            totais[dia_venda] += venda["total"]
    return [{"dia": dia.strftime("%d/%m"), "total": round(totais[dia], 2)} for dia in dias]


def _products_by_category(produtos: list[dict], categorias: list[dict]) -> list[dict[str, str | int]]:
    """Quantidade de produtos cadastrados por categoria."""
    return [
        {
            "categoria": categoria["nome"],
            "quantidade": sum(1 for p in produtos if p["categoria_id"] == categoria["id"]),
        }
        for categoria in categorias
    ]


class DashboardState(AuthState):
    total_products: int = 0
    low_stock_count: int = 0
    total_sold_month_label: str = "R$ 0,00"
    total_customers: int = 0
    recent_sales: list[VendaResumo] = []
    sales_by_day: list[dict[str, str | float]] = []
    products_by_category: list[dict[str, str | int]] = []
    load_error: str = ""
    is_loading_page: bool = True

    @rx.event
    def load(self):
        redirect = self.require_auth()
        if redirect is not None:
            return redirect
        try:
            produtos = xano_client.list_products(self.auth_token)
            variacoes = xano_client.list_variants(self.auth_token)
            clientes = xano_client.list_customers(self.auth_token)
            categorias = xano_client.list_categories(self.auth_token)
            vendas = xano_client.list_sales(self.auth_token, limit=HISTORICO_VENDAS_LIMIT)
        except xano_client.XanoAPIError:
            self.load_error = "Não foi possível carregar as métricas do dashboard."
            self.is_loading_page = False
            return None

        self.load_error = ""
        self.total_products = len(produtos)
        self.low_stock_count = sum(1 for v in variacoes if v["estoque"] < LOW_STOCK_THRESHOLD)
        self.total_customers = len(clientes)

        agora = datetime.now()
        total_mes = sum(
            venda["total"]
            for venda in vendas
            if datetime.fromtimestamp(venda["created_at"] / 1000).year == agora.year
            and datetime.fromtimestamp(venda["created_at"] / 1000).month == agora.month
        )
        self.total_sold_month_label = format_currency(total_mes)

        clientes_por_id = {c["id"]: c["nome"] for c in clientes}
        self.recent_sales = [
            VendaResumo(
                id=venda["id"],
                data_label=format_datetime(venda["created_at"]),
                # Não há endpoint de consulta de outros usuários (fora do
                # escopo desta change — ver proposal.md); mostra o nome
                # quando é o próprio usuário logado, senão o id.
                responsavel=(
                    self.nome if venda["usuario_id"] == self.user_id else f"Usuário #{venda['usuario_id']}"
                ),
                cliente=clientes_por_id.get(venda.get("cliente_id"), "Balcão")
                if venda.get("cliente_id")
                else "Balcão",
                total_label=format_currency(venda["total"]),
            )
            for venda in vendas[:5]
        ]
        self.sales_by_day = _sales_by_day(vendas)
        self.products_by_category = _products_by_category(produtos, categorias)
        self.is_loading_page = False
        return None
