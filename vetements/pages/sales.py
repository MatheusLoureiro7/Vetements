"""Tela de Vendas."""

import reflex as rx

from vetements.components import ui
from vetements.components.shell import shell
from vetements.state.sales import SalesState
from vetements.styles import BORDEAUX, primary_button_style


def _item_picker() -> rx.Component:
    return rx.flex(
        ui.field(
            "Variação",
            rx.select.root(
                rx.select.trigger(placeholder="Selecione um item", width="100%"),
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
        rx.box(
            ui.field(
                "Quantidade",
                rx.input(
                    value=SalesState.item_quantidade,
                    on_change=SalesState.set_item_quantidade,
                    placeholder="1",
                    input_mode="numeric",
                    width="100%",
                ),
            ),
            width=rx.breakpoints(initial="100%", sm="110px"),
            flex_shrink="0",
        ),
        rx.button("Adicionar", on_click=SalesState.add_item, variant="soft", type="button"),
        direction=rx.breakpoints(initial="column", sm="row"),
        spacing="3",
        align=rx.breakpoints(initial="stretch", sm="end"),
        width="100%",
    )


def _cart() -> rx.Component:
    return rx.cond(
        SalesState.cart.length() > 0,
        ui.data_table(
            ["Item", "Qtd.", "Subtotal", ""],
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
                            color_scheme="gray",
                            type="button",
                        )
                    ),
                ),
            ),
            width="100%",
        ),
        ui.empty_state("Nenhum item adicionado ainda.", icon="shopping-bag"),
    )


def _new_sale_dialog() -> rx.Component:
    """Popup de nova venda, controlado por `show_form`. Todo fechamento
    (Cancelar, X, Esc, clique fora) passa por `set_show_form`, que
    descarta o carrinho."""
    return rx.dialog.root(
        rx.dialog.content(
            rx.hstack(
                rx.dialog.title("Nova venda", margin_bottom="0"),
                rx.spacer(),
                rx.dialog.close(
                    rx.icon_button(
                        rx.icon("x", size=16),
                        variant="ghost",
                        color_scheme="gray",
                        size="1",
                        type="button",
                    ),
                ),
                width="100%",
                align_items="center",
            ),
            rx.dialog.description(
                "Adicione os itens vendidos e, se quiser, associe um cliente.",
                size="2",
                margin_bottom="1rem",
            ),
            rx.vstack(
                rx.cond(
                    SalesState.item_error != "",
                    rx.text(SalesState.item_error, style={"color": BORDEAUX}, size="2"),
                ),
                _item_picker(),
                _cart(),
                rx.flex(
                    ui.field(
                        "Cliente (opcional)",
                        rx.select.root(
                            rx.select.trigger(placeholder="Venda avulsa (balcão)", width="100%"),
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
                    rx.text(
                        f"Total: {SalesState.total_label}",
                        weight="medium",
                        size="4",
                        white_space="nowrap",
                    ),
                    direction=rx.breakpoints(initial="column", sm="row"),
                    spacing="4",
                    align=rx.breakpoints(initial="start", sm="end"),
                    justify="between",
                    width="100%",
                ),
                rx.cond(
                    SalesState.sale_error != "",
                    rx.text(SalesState.sale_error, style={"color": BORDEAUX}, size="2"),
                ),
                spacing="4",
                width="100%",
            ),
            rx.flex(
                rx.dialog.close(
                    rx.button(
                        "Cancelar",
                        variant="soft",
                        color_scheme="gray",
                        type="button",
                        disabled=SalesState.is_submitting,
                    ),
                ),
                rx.button(
                    rx.cond(SalesState.is_submitting, "Confirmando...", "Confirmar venda"),
                    on_click=SalesState.confirm_sale,
                    disabled=SalesState.is_submitting,
                    loading=SalesState.is_submitting,
                    style=primary_button_style(),
                ),
                spacing="3",
                justify="end",
                margin_top="1.5rem",
            ),
            max_width="640px",
        ),
        open=SalesState.show_form,
        on_open_change=SalesState.set_show_form,
    )


def _history_table() -> rx.Component:
    rows = rx.foreach(
        SalesState.filtered_history,
        lambda venda: ui.data_row(
            ui.data_cell(venda.data_label),
            ui.data_cell(venda.cliente),
            ui.data_cell(venda.itens_label),
            ui.data_cell(venda.total_label),
        ),
    )
    return rx.cond(
        SalesState.is_loading_page,
        ui.loading_state("Carregando vendas..."),
        rx.cond(
            SalesState.filtered_history.length() > 0,
            ui.data_table(["Data", "Cliente", "Itens", "Total"], rows),
            rx.cond(
                SalesState.history.length() > 0,
                ui.empty_state("Nenhuma venda encontrada."),
                ui.empty_state("Nenhuma venda registrada ainda."),
            ),
        ),
    )


def sales_page() -> rx.Component:
    return shell(
        ui.section_heading(
            "Vendas",
            action=rx.button("+ Nova venda", on_click=SalesState.open_form, size="2"),
        ),
        rx.cond(
            SalesState.load_error != "",
            rx.text(SalesState.load_error, style={"color": BORDEAUX}, size="2", margin_bottom="1rem"),
        ),
        rx.cond(
            SalesState.sale_success != "",
            rx.box(ui.success_message(SalesState.sale_success), margin_bottom="1rem"),
        ),
        rx.input(
            placeholder="Buscar por cliente...",
            value=SalesState.search,
            on_change=SalesState.set_search,
            max_width="320px",
            margin_bottom="1.5rem",
        ),
        _new_sale_dialog(),
        _history_table(),
    )
