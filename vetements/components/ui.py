"""Peças visuais compartilhadas do sistema "Atelier".

Sem cards com sombra: separação por hairline (1px), destaque por
borda lateral em vez de badge, tipografia como o elemento de
hierarquia principal.
"""

from typing import Any

import reflex as rx

from vetements.styles import BORDEAUX, INK, INK_MUTED, LINE, stat_label_style, stat_number_style


def data_table(headers: list[str], body: rx.Component, **props) -> rx.Component:
    """Tabela com hairline entre linhas, sem sombra, sem zebra."""
    return rx.table.root(
        rx.table.header(
            rx.table.row(
                *[
                    rx.table.column_header_cell(
                        header,
                        style={
                            "color": INK_MUTED,
                            "font_weight": "500",
                            "font_size": "0.85rem",
                            "padding_bottom": "0.6rem",
                            "border_bottom": f"1px solid {LINE}",
                        },
                    )
                    for header in headers
                ],
            ),
        ),
        rx.table.body(body),
        variant="ghost",
        style={"width": "100%", "border_collapse": "collapse"},
        **props,
    )


def data_row(*cells: rx.Component, is_low: Any = False, **props) -> rx.Component:
    """Linha de tabela com hairline inferior e tick lateral opcional
    (bordô) para sinalizar estoque baixo."""
    return rx.table.row(
        *cells,
        style={
            "border_bottom": f"1px solid {LINE}",
            "border_left": rx.cond(is_low, f"3px solid {BORDEAUX}", "3px solid transparent"),
        },
        **props,
    )


def data_cell(content, **props) -> rx.Component:
    # Radix's default table-cell foreground is near-white regardless of
    # theme appearance here — force it to our ink color explicitly.
    return rx.table.cell(content, padding_y="0.65rem", color=INK, **props)


def stat(number, label: str, divider: bool = True) -> rx.Component:
    """Bloco 'número grande + rótulo', separado por hairline vertical."""
    return rx.vstack(
        rx.text(number, style=stat_number_style()),
        rx.text(label, style=stat_label_style()),
        spacing="1",
        align_items="start",
        padding_left="1.5rem" if divider else "0",
        padding_right="1.5rem",
        border_left=f"1px solid {LINE}" if divider else "none",
    )


def section_heading(text: str, action: rx.Component | None = None) -> rx.Component:
    """Título de seção com hairline inferior, com ação opcional à direita."""
    return rx.hstack(
        rx.heading(text, size="6", style={"color": INK}),
        rx.spacer(),
        action if action is not None else rx.fragment(),
        width="100%",
        align_items="center",
        padding_bottom="0.75rem",
        border_bottom=f"1px solid {LINE}",
        margin_bottom="1.25rem",
    )


def empty_state(text: str) -> rx.Component:
    return rx.center(
        rx.text(text, style={"color": INK_MUTED}),
        padding_y="3rem",
        width="100%",
    )


def field(label: str, input_component: rx.Component) -> rx.Component:
    """Rótulo + campo, empilhados, para formulários."""
    return rx.vstack(
        rx.text(label, size="2", weight="medium", style={"color": INK_MUTED}),
        input_component,
        spacing="1",
        align_items="start",
        width="100%",
    )
