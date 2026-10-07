"""Layout comum às páginas da loja: cabeçalho com a marca e rodapé.

Diferente do `shell` da gestão (sidebar escura, densidade de dados), a
loja usa fundo claro e mais respiro, mas os mesmos tokens de cor e
tipografia de `vetements/styles.py`.
"""

import reflex as rx

from vetements import routes
from vetements.styles import BORDEAUX, CONTENT_MAX_WIDTH, INK, INK_MUTED, LINE, SURFACE, heading_style


def _brand() -> rx.Component:
    return rx.link(
        rx.text(
            "VETEMENTS",
            style={**heading_style(), "font_size": "1.5rem", "letter_spacing": "0.08em"},
        ),
        href=routes.LOJA_HOME,
        text_decoration="none",
        _hover={"text_decoration": "none"},
    )


def _staff_link() -> rx.Component:
    return rx.link(
        "Área da equipe",
        href=routes.LOGIN,
        size="2",
        style={"color": INK_MUTED},
        _hover={"color": BORDEAUX},
    )


def _header() -> rx.Component:
    return rx.box(
        rx.hstack(
            _brand(),
            rx.spacer(),
            _staff_link(),
            align_items="center",
            width="100%",
            max_width=CONTENT_MAX_WIDTH,
            margin_x="auto",
            padding_x="1.5rem",
            height="4.5rem",
        ),
        width="100%",
        border_bottom=f"1px solid {LINE}",
        style={"background_color": SURFACE},
    )


def _footer() -> rx.Component:
    return rx.box(
        rx.flex(
            rx.text("© Vetements", size="2", style={"color": INK_MUTED}),
            rx.spacer(),
            _staff_link(),
            direction=rx.breakpoints(initial="column", sm="row"),
            gap="0.5rem",
            width="100%",
            max_width=CONTENT_MAX_WIDTH,
            margin_x="auto",
            padding="2rem 1.5rem",
        ),
        width="100%",
        border_top=f"1px solid {LINE}",
        margin_top="auto",
    )


def store_layout(*children: rx.Component) -> rx.Component:
    """Envolve o conteúdo de uma página da loja com cabeçalho e rodapé."""
    return rx.flex(
        _header(),
        rx.box(
            *children,
            width="100%",
            max_width=CONTENT_MAX_WIDTH,
            margin_x="auto",
            padding_x="1.5rem",
            flex="1",
        ),
        _footer(),
        direction="column",
        min_height="100vh",
        width="100%",
        style={"background_color": SURFACE, "color": INK},
    )
