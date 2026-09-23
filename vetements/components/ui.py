"""Peças visuais compartilhadas do sistema "Vetements".

Cartões brancos com sombra suave (em vez de hairline solta na
página); dentro do cartão, linhas de tabela continuam separadas por
hairline (1px), sem zebra.
"""

from typing import Any

import reflex as rx

from vetements.styles import (
    BORDEAUX,
    BORDEAUX_SOFT,
    INK,
    INK_MUTED,
    LINE,
    RADIUS_SM,
    SUCCESS,
    SUCCESS_SOFT,
    card_style,
    card_title_style,
    stat_label_style,
    stat_number_style,
)


def card(*children: rx.Component, padding: str = "1.5rem", **props) -> rx.Component:
    """Cartão base (fundo branco, radius, sombra) para envolver
    conteúdo — formulários, painéis — de forma consistente."""
    return rx.box(*children, style=card_style(padding=padding), **props)


def card_title(text: str) -> rx.Component:
    """Título interno de cartão/painel (IBM Plex Sans), distinto do
    título de página (`section_heading`, em Fraunces)."""
    return rx.text(text, style=card_title_style())


def data_table(headers: list[str], body: rx.Component, **props) -> rx.Component:
    """Tabela dentro de um cartão, com hairline entre linhas, sem
    zebra. Em telas estreitas, rola horizontalmente em vez de quebrar
    o layout da página."""
    table = rx.table.root(
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
    return card(rx.box(table, overflow_x="auto", width="100%"), padding="0.25rem 1.5rem 1rem")


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


def stat(number, label: str, icon: str = "trending-up", color: str = BORDEAUX, color_soft: str = BORDEAUX_SOFT) -> rx.Component:
    """Cartão 'ícone colorido + número grande + rótulo'."""
    return rx.hstack(
        rx.center(
            rx.icon(icon, size=20, color=color),
            width="2.75rem",
            height="2.75rem",
            border_radius=RADIUS_SM,
            style={"background_color": color_soft},
        ),
        rx.vstack(
            rx.text(number, style=stat_number_style()),
            rx.text(label, style=stat_label_style()),
            spacing="1",
            align_items="start",
        ),
        spacing="3",
        align_items="center",
        width="100%",
        style=card_style(padding="1.25rem"),
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


def empty_state(text: str, icon: str | None = None) -> rx.Component:
    return rx.center(
        rx.vstack(
            *([rx.icon(icon, size=28, color=INK_MUTED)] if icon else []),
            rx.text(text, style={"color": INK_MUTED}),
            spacing="2",
            align_items="center",
        ),
        padding_y="3rem",
        width="100%",
    )


def loading_state(text: str = "Carregando...") -> rx.Component:
    """Indicador de carregamento inicial de uma listagem — visualmente
    distinto de `empty_state`, para não confundir "ainda carregando"
    com "lista vazia"."""
    return rx.center(
        rx.hstack(
            rx.spinner(size="2", color=BORDEAUX),
            rx.text(text, style={"color": INK_MUTED}),
            spacing="2",
            align_items="center",
        ),
        padding_y="3rem",
        width="100%",
    )


def success_message(text) -> rx.Component:
    """Mensagem de confirmação de sucesso, no mesmo padrão visual em
    toda a app (mesmo tom usado antes só em Vendas)."""
    return rx.hstack(
        rx.icon("check", size=14, color=SUCCESS),
        rx.text(text, size="2", style={"color": SUCCESS}),
        spacing="2",
        align_items="center",
        padding="0.5rem 0.75rem",
        border_radius=RADIUS_SM,
        style={"background_color": SUCCESS_SOFT},
    )


def field(label: str, input_component: rx.Component, error: Any = None) -> rx.Component:
    """Rótulo + campo, empilhados, para formulários. Se `error` (texto
    ou Var) for informado e não vazio, exibe a mensagem abaixo do
    campo."""
    return rx.vstack(
        rx.text(label, size="2", weight="medium", style={"color": INK_MUTED}),
        input_component,
        *(
            [rx.cond(error != "", rx.text(error, size="1", style={"color": BORDEAUX}))]
            if error is not None
            else []
        ),
        spacing="1",
        align_items="start",
        width="100%",
    )
