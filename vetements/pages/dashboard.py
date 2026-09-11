"""Tela inicial: números-resumo, gráficos e vendas recentes."""

import reflex as rx

from vetements.components import ui
from vetements.components.shell import shell
from vetements.state.dashboard import DIAS_GRAFICO_VENDAS, DashboardState
from vetements.styles import (
    BORDEAUX,
    INFO,
    INFO_SOFT,
    SUCCESS,
    SUCCESS_SOFT,
    WARNING,
    WARNING_SOFT,
    card_title_style,
)


def _stats_row() -> rx.Component:
    return rx.grid(
        ui.stat(DashboardState.total_products, "produtos cadastrados", icon="shirt", color=INFO, color_soft=INFO_SOFT),
        ui.stat(
            DashboardState.low_stock_count,
            "variações com estoque baixo",
            icon="triangle-alert",
            color=WARNING,
            color_soft=WARNING_SOFT,
        ),
        ui.stat(
            DashboardState.total_sold_month_label,
            "vendido no mês",
            icon="banknote",
            color=SUCCESS,
            color_soft=SUCCESS_SOFT,
        ),
        ui.stat(DashboardState.total_customers, "clientes cadastrados", icon="users"),
        columns="4",
        spacing="4",
        width="100%",
        padding_y="1.5rem",
        style={"@media (max-width: 900px)": {"grid_template_columns": "repeat(2, 1fr)"}},
    )


def _sales_chart() -> rx.Component:
    chart = rx.recharts.line_chart(
        rx.recharts.cartesian_grid(stroke_dasharray="3 3"),
        rx.recharts.x_axis(data_key="dia"),
        rx.recharts.y_axis(),
        rx.recharts.graphing_tooltip(),
        rx.recharts.line(data_key="total", stroke=BORDEAUX, stroke_width=2, type_="monotone"),
        data=DashboardState.sales_by_day,
        width="100%",
        height=260,
    )
    return ui.card(
        rx.text(f"Vendas nos últimos {DIAS_GRAFICO_VENDAS} dias", style=card_title_style()),
        rx.box(chart, margin_top="1rem"),
        width="100%",
    )


def _category_chart() -> rx.Component:
    chart = rx.recharts.bar_chart(
        rx.recharts.cartesian_grid(stroke_dasharray="3 3"),
        rx.recharts.x_axis(data_key="categoria"),
        rx.recharts.y_axis(allow_decimals=False),
        rx.recharts.graphing_tooltip(),
        rx.recharts.bar(data_key="quantidade", fill=INFO, radius=[6, 6, 0, 0]),
        data=DashboardState.products_by_category,
        width="100%",
        height=260,
    )
    return ui.card(
        rx.text("Produtos por categoria", style=card_title_style()),
        rx.box(chart, margin_top="1rem"),
        width="100%",
    )


def _charts_row() -> rx.Component:
    return rx.grid(
        _sales_chart(),
        _category_chart(),
        columns="2",
        spacing="4",
        width="100%",
        margin_bottom="1.5rem",
        style={"@media (max-width: 900px)": {"grid_template_columns": "1fr"}},
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
        rx.cond(
            DashboardState.is_loading_page,
            ui.loading_state("Carregando dashboard..."),
            rx.cond(
                DashboardState.load_error != "",
                rx.text(DashboardState.load_error, style={"color": BORDEAUX}, size="2"),
                rx.fragment(
                    _stats_row(),
                    _charts_row(),
                    _recent_sales(),
                ),
            ),
        ),
    )
