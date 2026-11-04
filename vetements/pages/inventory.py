"""Tela de Estoque."""

import reflex as rx

from vetements.components import ui
from vetements.components.shell import shell
from vetements.state.inventory import InventoryState
from vetements.styles import BORDEAUX, INK_MUTED, primary_button_style


def _ajustar_button(variacao_id) -> rx.Component:
    return rx.button(
        rx.icon("arrow-up-down", size=14),
        "Ajustar",
        variant="soft",
        color_scheme="gray",
        size="1",
        on_click=InventoryState.open_ajuste(variacao_id),
    )


def _inventory_table() -> rx.Component:
    # A coluna de ação só existe para administradores (o backend também
    # recusa ajustes de vendedores).
    rows_admin = rx.foreach(
        InventoryState.variants,
        lambda v: ui.data_row(
            ui.data_cell(v.produto_nome),
            ui.data_cell(v.tamanho),
            ui.data_cell(v.cor),
            ui.data_cell(v.sku),
            ui.data_cell(v.quantidade),
            ui.data_cell(_ajustar_button(v.id)),
            is_low=v.is_low,
        ),
    )
    rows = rx.foreach(
        InventoryState.variants,
        lambda v: ui.data_row(
            ui.data_cell(v.produto_nome),
            ui.data_cell(v.tamanho),
            ui.data_cell(v.cor),
            ui.data_cell(v.sku),
            ui.data_cell(v.quantidade),
            is_low=v.is_low,
        ),
    )
    headers = ["Produto", "Tamanho", "Cor", "SKU", "Estoque"]
    return rx.cond(
        InventoryState.is_loading_page,
        ui.loading_state("Carregando estoque..."),
        rx.cond(
            InventoryState.variants.length() > 0,
            rx.cond(
                InventoryState.is_admin,
                ui.data_table([*headers, "Ações"], rows_admin),
                ui.data_table(headers, rows),
            ),
            ui.empty_state("Nenhuma variação encontrada."),
        ),
    )


def _info(label: str, valor) -> rx.Component:
    return rx.vstack(
        rx.text(label, size="1", style={"color": INK_MUTED}),
        rx.text(valor, size="2", weight="medium"),
        spacing="0",
        align_items="start",
    )


def _ajuste_dialog() -> rx.Component:
    """Popup de ajuste de estoque, controlado por `show_ajuste`. Todo
    fechamento (Cancelar, X, Esc, clique fora) passa por
    `set_show_ajuste`, que descarta o que foi digitado."""
    return rx.dialog.root(
        rx.dialog.content(
            rx.hstack(
                rx.dialog.title("Ajustar estoque", margin_bottom="0"),
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
                "Entrada soma, Saída subtrai e Contagem substitui pelo total contado.",
                size="2",
                margin_bottom="1rem",
            ),
            rx.vstack(
                rx.hstack(
                    _info("Produto", InventoryState.ajuste_produto),
                    _info("SKU", InventoryState.ajuste_sku),
                    _info("Estoque atual", InventoryState.ajuste_estoque_atual),
                    spacing="5",
                    wrap="wrap",
                ),
                rx.cond(
                    InventoryState.ajuste_error != "",
                    rx.text(InventoryState.ajuste_error, style={"color": BORDEAUX}, size="2"),
                ),
                rx.segmented_control.root(
                    rx.segmented_control.item("Entrada", value="entrada"),
                    rx.segmented_control.item("Saída", value="saida"),
                    rx.segmented_control.item("Contagem", value="contagem"),
                    value=InventoryState.ajuste_tipo,
                    on_change=InventoryState.set_ajuste_tipo,
                    width="100%",
                ),
                ui.field(
                    rx.cond(InventoryState.ajuste_tipo == "contagem", "Total contado", "Quantidade"),
                    rx.input(
                        value=InventoryState.ajuste_quantidade,
                        on_change=InventoryState.set_ajuste_quantidade,
                        input_mode="numeric",
                        placeholder="0",
                        width="100%",
                    ),
                    error=InventoryState.ajuste_campo_error,
                ),
                ui.field(
                    "Motivo (opcional)",
                    rx.input(
                        value=InventoryState.ajuste_motivo,
                        on_change=InventoryState.set_ajuste_motivo,
                        placeholder="Ex.: reposição do fornecedor, avaria",
                        max_length=200,
                        width="100%",
                    ),
                ),
                rx.hstack(
                    rx.text("Estoque após o ajuste:", size="2", style={"color": INK_MUTED}),
                    rx.text(InventoryState.estoque_apos_ajuste, size="3", weight="bold"),
                    spacing="2",
                    align_items="baseline",
                ),
                spacing="3",
                width="100%",
            ),
            rx.flex(
                rx.dialog.close(
                    rx.button("Cancelar", variant="soft", color_scheme="gray", type="button"),
                ),
                rx.button(
                    rx.cond(InventoryState.is_submitting_ajuste, "Salvando...", "Salvar ajuste"),
                    on_click=InventoryState.salvar_ajuste,
                    disabled=InventoryState.is_submitting_ajuste,
                    loading=InventoryState.is_submitting_ajuste,
                    style=primary_button_style(),
                ),
                spacing="3",
                justify="end",
                margin_top="1.5rem",
            ),
            max_width="480px",
        ),
        open=InventoryState.show_ajuste,
        on_open_change=InventoryState.set_show_ajuste,
    )


def inventory_page() -> rx.Component:
    return shell(
        ui.section_heading("Estoque"),
        rx.cond(
            InventoryState.load_error != "",
            rx.text(InventoryState.load_error, style={"color": BORDEAUX}, size="2", margin_bottom="1rem"),
        ),
        rx.cond(
            InventoryState.load_error == "",
            rx.fragment(
                rx.cond(
                    InventoryState.ajuste_success != "",
                    rx.box(ui.success_message(InventoryState.ajuste_success), margin_bottom="1rem"),
                ),
                rx.input(
                    placeholder="Buscar por produto ou SKU...",
                    value=InventoryState.search,
                    on_change=InventoryState.set_search,
                    max_width="320px",
                    margin_bottom="1.5rem",
                ),
                _inventory_table(),
            ),
        ),
        _ajuste_dialog(),
    )
