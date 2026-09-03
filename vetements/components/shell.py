"""Layout das páginas autenticadas: sidebar fixa + topbar."""

import reflex as rx

from vetements.state.auth import AuthState
from vetements.styles import BG, BORDEAUX, DISPLAY_FONT, INK, INK_MUTED, LINE, SIDEBAR_WIDTH

NAV_ITEMS = [
    ("Dashboard", "/", "layout-dashboard"),
    ("Produtos", "/produtos", "shirt"),
    ("Estoque", "/estoque", "package"),
    ("Vendas", "/vendas", "receipt"),
    ("Clientes", "/clientes", "users"),
]


def _nav_link(label: str, href: str, icon_tag: str) -> rx.Component:
    return rx.link(
        rx.hstack(
            rx.icon(icon_tag, size=16, color=INK_MUTED),
            rx.text(label, size="3", style={"color": INK}),
            spacing="2",
            align_items="center",
        ),
        href=href,
        text_decoration="none",
        padding="0.5rem 0.75rem",
        width="100%",
    )


def sidebar() -> rx.Component:
    return rx.vstack(
        rx.heading(
            "VETEMENTS",
            size="4",
            style={
                "font_family": DISPLAY_FONT,
                "color": BORDEAUX,
                "letter_spacing": "0.02em",
            },
        ),
        rx.vstack(
            *[_nav_link(label, href, icon) for label, href, icon in NAV_ITEMS],
            spacing="1",
            width="100%",
            margin_top="2rem",
        ),
        width=SIDEBAR_WIDTH,
        min_width=SIDEBAR_WIDTH,
        height="100vh",
        padding="1.5rem",
        align_items="start",
        style={"border_right": f"1px solid {LINE}", "background_color": "#FBFAF7"},
        position="sticky",
        top="0",
    )


def topbar() -> rx.Component:
    return rx.hstack(
        rx.spacer(),
        rx.text(AuthState.nome, size="2", weight="medium"),
        rx.text("·", style={"color": INK_MUTED}),
        rx.text(AuthState.papel_label, size="2", style={"color": INK_MUTED}),
        rx.button(
            "Sair",
            on_click=AuthState.logout,
            variant="ghost",
            size="1",
            color_scheme="gray",
        ),
        spacing="3",
        align_items="center",
        width="100%",
        padding="1rem 2rem",
        style={"border_bottom": f"1px solid {LINE}"},
    )


def shell(*children: rx.Component) -> rx.Component:
    """Envolve o conteúdo de uma página autenticada."""
    return rx.hstack(
        sidebar(),
        rx.vstack(
            topbar(),
            rx.box(*children, padding="2rem", width="100%"),
            width="100%",
            spacing="0",
            align_items="stretch",
        ),
        spacing="0",
        align_items="stretch",
        width="100%",
        min_height="100vh",
        style={"background_color": BG},
    )
