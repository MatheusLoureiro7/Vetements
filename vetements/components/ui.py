"""Peças visuais compartilhadas do sistema "Vetements".

Cartões brancos com sombra suave (em vez de hairline solta na
página); dentro do cartão, linhas de tabela continuam separadas por
hairline (1px), sem zebra.
"""

from typing import Any, Literal

import reflex as rx

from vetements.styles import (
    BORDEAUX,
    BORDEAUX_SOFT,
    INK,
    INK_MUTED,
    LINE,
    RADIUS_SM,
    ROW_HOVER,
    SKELETON_BASE,
    SKELETON_HIGHLIGHT,
    SUCCESS,
    SUCCESS_SOFT,
    TRANSITION_FAST,
    TREND_DOWN,
    card_style,
    card_title_style,
    stat_label_style,
    stat_number_style,
)

# Estilo visualmente oculto, mas ainda lido por leitor de tela — usado pelo
# texto de `loading_state` quando o esqueleto substitui o rótulo visível.
_SR_ONLY_STYLE = {
    "position": "absolute",
    "width": "1px",
    "height": "1px",
    "padding": "0",
    "margin": "-1px",
    "overflow": "hidden",
    "clip": "rect(0, 0, 0, 0)",
    "white_space": "nowrap",
    "border": "0",
}


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
                            "padding_bottom": "0.5rem",
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
    return card(rx.box(table, overflow_x="auto", width="100%"), padding="0.25rem 1.25rem 0.75rem")


def data_row(*cells: rx.Component, is_low: Any = False, **props) -> rx.Component:
    """Linha de tabela com hairline inferior, tick lateral opcional
    (bordô) para sinalizar estoque baixo, e destaque sutil em hover."""
    return rx.table.row(
        *cells,
        style={
            "border_bottom": f"1px solid {LINE}",
            "border_left": rx.cond(is_low, f"3px solid {BORDEAUX}", "3px solid transparent"),
            "transition": TRANSITION_FAST,
            "&:hover": {"background_color": ROW_HOVER},
        },
        **props,
    )


def data_cell(content, **props) -> rx.Component:
    # Radix's default table-cell foreground is near-white regardless of
    # theme appearance here — force it to our ink color explicitly.
    return rx.table.cell(content, padding_y="0.5rem", color=INK, **props)


def trend_indicator(label: Any, is_up: Any) -> rx.Component:
    """Seta + rótulo de variação vs. período anterior (ex.: "+12%"), já
    formatado pelo chamador — este componente só escolhe ícone/cor
    conforme `is_up`. `label` e `is_up` podem ser Vars reativas."""
    up = rx.hstack(
        rx.icon("trending-up", size=14, color=SUCCESS),
        rx.text(label, size="1", weight="medium", style={"color": SUCCESS}),
        rx.text("vs. mês anterior", size="1", style={"color": INK_MUTED}),
        spacing="1",
        align_items="center",
    )
    down = rx.hstack(
        rx.icon("trending-down", size=14, color=TREND_DOWN),
        rx.text(label, size="1", weight="medium", style={"color": TREND_DOWN}),
        rx.text("vs. mês anterior", size="1", style={"color": INK_MUTED}),
        spacing="1",
        align_items="center",
    )
    return rx.cond(is_up, up, down)


def stat(
    number,
    label: str,
    icon: str = "trending-up",
    color: str = BORDEAUX,
    color_soft: str = BORDEAUX_SOFT,
    extra: rx.Component | None = None,
) -> rx.Component:
    """Cartão 'ícone colorido + número grande + rótulo'. `extra` é um
    componente opcional exibido abaixo do rótulo (ex.: `trend_indicator`)."""
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
            *([extra] if extra is not None else []),
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


def skeleton_block(height: str, width: str = "100%", radius: str = RADIUS_SM) -> rx.Component:
    """Bloco com brilho animado, usado por `loading_state` para desenhar
    a forma aproximada do conteúdo que vai substituí-lo."""
    return rx.box(
        width=width,
        height=height,
        border_radius=radius,
        style={
            "background": f"linear-gradient(90deg, {SKELETON_BASE} 25%, {SKELETON_HIGHLIGHT} 50%, {SKELETON_BASE} 75%)",
            "background_size": "200% 100%",
            "animation": "vetements-shimmer 1.4s ease-in-out infinite",
        },
    )


def loading_state(text: str, kind: Literal["table", "dashboard"] = "table") -> rx.Component:
    """Indicador de carregamento inicial de uma listagem — um esqueleto
    na forma aproximada do conteúdo que vai chegar, em vez de um spinner
    genérico. `text` continua existindo como rótulo para leitor de tela
    (visualmente oculto); a forma do esqueleto já comunica "carregando"
    para quem enxerga a tela. Distinto de `empty_state`, para não
    confundir "ainda carregando" com "lista vazia"."""
    table_skeleton = card(
        rx.vstack(
            *[skeleton_block(height="2.5rem") for _ in range(4)],
            spacing="3",
            width="100%",
        ),
    )
    if kind == "dashboard":
        body = rx.vstack(
            rx.grid(
                *[skeleton_block(height="5.5rem") for _ in range(4)],
                columns="4",
                spacing="4",
                width="100%",
                style={"@media (max-width: 900px)": {"grid_template_columns": "repeat(2, 1fr)"}},
            ),
            table_skeleton,
            spacing="4",
            width="100%",
        )
    else:
        body = table_skeleton
    return rx.box(
        rx.text(text, style=_SR_ONLY_STYLE),
        body,
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
