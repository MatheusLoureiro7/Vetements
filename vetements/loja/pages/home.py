"""Página inicial da loja (provisória).

Enquanto o catálogo público não existe no Xano, a vitrine mostra só a
chamada principal e o aviso de coleção em breve — sem listagens vazias.
"""

import reflex as rx

from vetements.loja.components.layout import store_layout
from vetements.styles import BORDEAUX, BORDEAUX_SOFT, INK_MUTED, LINE, RADIUS, heading_style


def _hero() -> rx.Component:
    return rx.vstack(
        rx.text(
            "Nova coleção",
            size="2",
            weight="medium",
            style={"color": BORDEAUX, "letter_spacing": "0.12em", "text_transform": "uppercase"},
        ),
        rx.heading(
            "Roupas pensadas para durar.",
            as_="h1",
            style={
                **heading_style(),
                "font_size": "clamp(2.25rem, 6vw, 4rem)",
                "line_height": "1.1",
                "max_width": "16ch",
            },
        ),
        rx.text(
            "Peças atemporais, feitas com cuidado, para vestir todos os dias.",
            size="4",
            style={"color": INK_MUTED, "max_width": "36rem"},
        ),
        spacing="4",
        align_items="start",
        padding_y=rx.breakpoints(initial="3.5rem", md="6rem"),
    )


def _coming_soon() -> rx.Component:
    return rx.center(
        rx.vstack(
            rx.icon("shirt", size=28, color=BORDEAUX),
            rx.text("Coleção em breve", weight="medium", size="4"),
            rx.text(
                "Estamos preparando a vitrine. Volte em breve para conhecer as peças.",
                size="2",
                style={"color": INK_MUTED},
                text_align="center",
            ),
            spacing="2",
            align_items="center",
        ),
        padding="3rem 1.5rem",
        margin_bottom="4rem",
        border=f"1px solid {LINE}",
        border_radius=RADIUS,
        style={"background_color": BORDEAUX_SOFT},
    )


def home_page() -> rx.Component:
    return store_layout(
        _hero(),
        _coming_soon(),
    )
