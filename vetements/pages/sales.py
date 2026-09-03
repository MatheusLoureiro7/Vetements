"""Tela de Vendas."""

import reflex as rx

from vetements.components import ui
from vetements.components.shell import shell
from vetements.state.sales import SalesState
from vetements.styles import BORDEAUX, INK_MUTED


def _new_sale_panel() -> rx.Component:
    return rx.vstack(
        ui.section_heading("Nova venda"),
        rx.cond(
            SalesState.item_error != "",
            rx.text(SalesState.item_error, style={"color": BORDEAUX}, size="2"),
        ),
        rx.hstack(
            ui.field(
                "Variação",
                rx.select.root(
                    rx.select.trigger(placeholder="Selecione um item"),
                    rx.select.content(
                        rx.foreach(
                            SalesState.variant_options,
                            lambda opt: rx.select.item(opt.label, value=opt.id.to_string()),
                        )
                    ),
                    value=SalesState.selected_variant_id,
                    on_change=SalesState.set_selected_variant_id,
                ),
            ),
            ui.field(
                "Quantidade",
                rx.input(
                    value=SalesState.item_quantidade,
                    on_change=SalesState.set_item_quantidade,
                    placeholder="1",
                ),
            ),
            rx.button("Adicionar item", on_click=SalesState.add_item, align_self="end"),
            spacing="3",
            align_items="end",
            width="100%",
        ),
        rx.cond(
            SalesState.cart.length() > 0,
            ui.data_table(
                ["Item", "Quantidade", "Subtotal", ""],
                rx.foreach(
                    SalesState.cart,
                    lambda item: ui.data_row(
                        ui.data_cell(item.label),
                        ui.data_cell(item.quantidade),
                        ui.data_cell(item.subtotal_label),
                        ui.data_cell(
                            rx.button(
                                "Remover",
                                on_click=SalesState.remove_item(item.variacao_id),
                                size="1",
                                variant="ghost",
                            )
                        ),
                    ),
                ),
            ),
            ui.empty_state("Nenhum item adicionado ainda."),
        ),
        rx.hstack(
            ui.field(
                "Cliente (opcional)",
                rx.select.root(
                    rx.select.trigger(placeholder="Venda avulsa (balcão)"),
                    rx.select.content(
                        rx.foreach(
                            SalesState.customers,
                            lambda c: rx.select.item(c.nome, value=c.id.to_string()),
                        )
                    ),
                    value=SalesState.selected_cliente_id,
                    on_change=SalesState.set_selected_cliente_id,
                ),
            ),
            rx.spacer(),
            rx.text(f"Total: {SalesState.total_label}", weight="medium", size="4"),
            width="100%",
            align_items="end",
            margin_top="1rem",
        ),
        rx.cond(
            SalesState.sale_error != "",
            rx.text(SalesState.sale_error, style={"color": BORDEAUX}, size="2"),
        ),
        rx.cond(
            SalesState.sale_success != "",
            rx.text(SalesState.sale_success, style={"color": "#2F6B3A"}, size="2"),
        ),
        rx.button(
            "Confirmar venda",
            on_click=SalesState.confirm_sale,
            style={"background_color": BORDEAUX, "color": "white"},
            margin_top="0.5rem",
        ),
        spacing="3",
        width="100%",
        padding="1.5rem",
        margin_bottom="2rem",
        style={"border": f"1px solid {INK_MUTED}"},
    )


def _history_table() -> rx.Component:
    rows = rx.foreach(
        SalesState.history,
        lambda venda: ui.data_row(
            ui.data_cell(venda.data_label),
            ui.data_cell(venda.cliente),
            ui.data_cell(venda.itens_label),
            ui.data_cell(venda.total_label),
        ),
    )
    return rx.box(
        ui.section_heading("Vendas registradas"),
        rx.cond(
            SalesState.history.length() > 0,
            ui.data_table(["Data", "Cliente", "Itens", "Total"], rows),
            ui.empty_state("Nenhuma venda registrada ainda."),
        ),
        width="100%",
    )


def sales_page() -> rx.Component:
    return shell(
        _new_sale_panel(),
        _history_table(),
    )
