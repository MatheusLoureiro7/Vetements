"""Layout das páginas autenticadas: sidebar fixa + topbar.

Abaixo do breakpoint mobile (768px), a sidebar deixa de ocupar espaço
fixo no layout e passa a ser um painel sobreposto, escondido por
padrão e revelado pelo botão de menu na topbar (`ShellState`) — ver
design.md, decisão "Sidebar responsiva com um Var de UI local".
"""

import reflex as rx

from vetements.state.auth import AuthState
from vetements.styles import (
    BG,
    BORDEAUX,
    BORDEAUX_SOFT,
    DISPLAY_FONT,
    INK,
    INK_MUTED,
    LINE,
    RADIUS_SM,
    SIDEBAR_WIDTH,
    SURFACE,
)

MOBILE_BREAKPOINT = "768px"

NAV_ITEMS = [
    ("Dashboard", "/", "layout-dashboard"),
    ("Produtos", "/produtos", "shirt"),
    ("Estoque", "/estoque", "package"),
    ("Vendas", "/vendas", "receipt"),
    ("Clientes", "/clientes", "users"),
]


class ShellState(rx.State):
    """Estado de UI local da casca autenticada — não persiste sessão."""

    sidebar_open: bool = False

    @rx.event
    def toggle_sidebar(self):
        self.sidebar_open = not self.sidebar_open

    @rx.event
    def close_sidebar(self):
        self.sidebar_open = False


def _nav_link(label: str, href: str, icon_tag: str) -> rx.Component:
    is_active = AuthState.router.page.path == href
    return rx.link(
        rx.hstack(
            rx.icon(
                icon_tag,
                size=16,
                color=rx.cond(is_active, BORDEAUX, INK_MUTED),
            ),
            rx.text(
                label,
                size="3",
                style={"color": rx.cond(is_active, BORDEAUX, INK), "font_weight": rx.cond(is_active, "600", "400")},
            ),
            spacing="2",
            align_items="center",
        ),
        href=href,
        on_click=ShellState.close_sidebar,
        text_decoration="none",
        padding="0.5rem 0.75rem",
        width="100%",
        border_radius=RADIUS_SM,
        style={"background_color": rx.cond(is_active, BORDEAUX_SOFT, "transparent")},
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
        style={
            "border_right": f"1px solid {LINE}",
            "background_color": SURFACE,
            # Abaixo do breakpoint mobile, a sidebar sai do fluxo normal
            # (deixa de reservar espaço) e vira um painel sobreposto que
            # desliza para dentro/fora conforme ShellState.sidebar_open.
            f"@media (max-width: {MOBILE_BREAKPOINT})": {
                "position": "fixed",
                "left": "0",
                "top": "0",
                "z_index": "50",
                "box_shadow": "0 0 24px rgba(26, 24, 21, 0.18)",
                "transform": rx.cond(ShellState.sidebar_open, "translateX(0)", "translateX(-100%)"),
                "transition": "transform 0.2s ease",
            },
        },
        position="sticky",
        top="0",
    )


def _user_avatar() -> rx.Component:
    return rx.center(
        rx.text(AuthState.iniciais, size="2", weight="bold", style={"color": BORDEAUX}),
        width="2rem",
        height="2rem",
        border_radius="9999px",
        style={"background_color": BORDEAUX_SOFT},
    )


def _menu_button() -> rx.Component:
    """Botão de menu (hambúrguer) — só aparece abaixo do breakpoint
    mobile, via media query; some por padrão em telas largas."""
    return rx.icon_button(
        rx.icon("menu", size=18),
        on_click=ShellState.toggle_sidebar,
        variant="ghost",
        color_scheme="gray",
        style={
            "display": "none",
            f"@media (max-width: {MOBILE_BREAKPOINT})": {"display": "inline-flex"},
        },
    )


def topbar() -> rx.Component:
    return rx.hstack(
        _menu_button(),
        rx.spacer(),
        _user_avatar(),
        rx.vstack(
            rx.text(AuthState.nome, size="2", weight="medium"),
            rx.text(AuthState.papel_label, size="1", style={"color": INK_MUTED}),
            spacing="0",
            align_items="start",
        ),
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
        style={"background_color": SURFACE, "border_bottom": f"1px solid {LINE}"},
    )


def _sidebar_backdrop() -> rx.Component:
    """Fundo escurecido atrás da sidebar aberta em telas pequenas —
    clicar nele fecha a sidebar. Some sozinho quando ela está fechada."""
    return rx.cond(
        ShellState.sidebar_open,
        rx.box(
            on_click=ShellState.close_sidebar,
            position="fixed",
            top="0",
            left="0",
            width="100vw",
            height="100vh",
            z_index="40",
            style={"background_color": "rgba(26, 24, 21, 0.35)"},
        ),
    )


def shell(*children: rx.Component) -> rx.Component:
    """Envolve o conteúdo de uma página autenticada."""
    return rx.hstack(
        _sidebar_backdrop(),
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
