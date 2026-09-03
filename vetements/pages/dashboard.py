"""Tela inicial: números-resumo e vendas recentes."""

import reflex as rx

from vetements.components import ui
from vetements.components.shell import shell
from vetements.state.dashboard import DashboardState


def _stats_row() -> rx.Component:
    return rx.hstack(
        ui.stat(DashboardState.total_products, "produtos cadastrados", divider=False),
        ui.stat(DashboardState.low_stock_count, "variações com estoque baixo"),
        ui.stat(DashboardState.total_sold_month_label, "vendido no mês"),
        ui.stat(DashboardState.total_customers, "clientes cadastrados"),
        spacing="0",
        width="100%",
        padding_y="1.5rem",
    )


def _recent_sales() -> rx.Component:
    rows = rx.foreach(
        DashboardState.recent_sales,
        lambda venda: ui.data_row(
            ui.data_cell(venda.data_label),
            ui.data_cell(venda.cliente),
            ui.data_cell(venda.responsavel),
            ui.data_cell(venda.total_label),
        ),
    )
    return rx.box(
        ui.section_heading("Vendas recentes"),
        rx.cond(
            DashboardState.recent_sales.length() > 0,
            ui.data_table(["Data", "Cliente", "Responsável", "Total"], rows),
            ui.empty_state("Nenhuma venda registrada ainda."),
        ),
        width="100%",
    )


def dashboard_page() -> rx.Component:
    return shell(
        ui.section_heading("Visão geral"),
        _stats_row(),
        _recent_sales(),
    )
