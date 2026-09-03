"""Tela de Estoque."""

import reflex as rx

from vetements.components import ui
from vetements.components.shell import shell
from vetements.state.inventory import InventoryState


def _inventory_table() -> rx.Component:
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
    return rx.cond(
        InventoryState.variants.length() > 0,
        ui.data_table(["Produto", "Tamanho", "Cor", "SKU", "Estoque"], rows),
        ui.empty_state("Nenhuma variação encontrada."),
    )


def inventory_page() -> rx.Component:
    return shell(
        ui.section_heading("Estoque"),
        rx.input(
            placeholder="Buscar por produto ou SKU...",
            value=InventoryState.search,
            on_change=InventoryState.set_search,
            max_width="320px",
            margin_bottom="1.5rem",
        ),
        _inventory_table(),
    )
