"""Layout das páginas autenticadas: sidebar escura fixa + conteúdo.

A sidebar carrega a marca, o menu e, ancorado embaixo, o usuário com o
botão "Sair". Abaixo do breakpoint mobile (768px), ela deixa de ocupar
espaço fixo no layout e passa a ser um painel sobreposto, escondido por
padrão e revelado pelo botão de menu da topbar (`ShellState`) — a topbar
só existe nessa faixa. Ver design.md, decisão "Sidebar responsiva com um
Var de UI local" (`add-frontend-mvp-shell`) e `restyle-sidebar-navigation`.
"""

import reflex as rx

from vetements.state.auth import AuthState
from vetements.styles import (
    BG,
    BORDEAUX,
    BORDEAUX_SOFT,
    CONTENT_MAX_WIDTH,
    DISPLAY_FONT,
    LINE,
    RADIUS_SM,
    SIDEBAR_ACCENT,
    SIDEBAR_ACTIVE_BG,
    SIDEBAR_BG,
    SIDEBAR_HOVER,
    SIDEBAR_LINE,
    SIDEBAR_MUTED,
    SIDEBAR_TEXT,
    SIDEBAR_TEXT_STRONG,
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


def _brand(text_color: str) -> rx.Component:
    """Monograma "V" + nome da marca. `text_color` permite usar o mesmo
    bloco sobre a sidebar escura (branco) e sobre a topbar clara (bordô)."""
    return rx.hstack(
        rx.center(
            rx.text(
                "V",
                style={
                    "font_family": DISPLAY_FONT,
                    "color": SIDEBAR_TEXT_STRONG,
                    "font_size": "1.1rem",
                    "font_weight": "600",
                    "line_height": "1",
                },
            ),
            width="2rem",
            height="2rem",
            flex_shrink="0",
            style={
                "background_color": BORDEAUX,
                "border_radius": "8px",
                "border": f"1px solid {SIDEBAR_LINE}",
            },
        ),
        rx.text(
            "VETEMENTS",
            style={
                "font_family": DISPLAY_FONT,
                "color": text_color,
                "font_size": "1.05rem",
                "font_weight": "500",
                "letter_spacing": "0.06em",
            },
        ),
        spacing="3",
        align_items="center",
    )


def _divider() -> rx.Component:
    return rx.box(height="1px", width="100%", style={"background_color": SIDEBAR_LINE})


def _nav_link_item(label: str, href: str, icon_tag: str, active: bool) -> rx.Component:
    # Estilos estáticos por estado; o ativo/inativo é escolhido em
    # `_nav_link`, no nível do componente. O hover vai na prop `_hover`
    # porque o `rx.link` já traz um `_hover` padrão (cor de destaque) que
    # sobrescreve um `&:hover` colocado dentro de `style`.
    style = {
        "transition": "background-color 0.15s ease",
        "background_color": SIDEBAR_ACTIVE_BG if active else "transparent",
        # Barra lateral por box-shadow inset (e não border-left) para o
        # item não mudar de largura nem deslocar o ícone ao ativar.
        "box_shadow": f"inset 3px 0 0 {SIDEBAR_ACCENT}" if active else "none",
    }
    return rx.link(
        rx.hstack(
            rx.icon(icon_tag, size=18, color=SIDEBAR_ACCENT if active else SIDEBAR_TEXT),
            rx.text(
                label,
                size="3",
                style={
                    "color": SIDEBAR_TEXT_STRONG if active else SIDEBAR_TEXT,
                    "font_weight": "600" if active else "400",
                },
            ),
            spacing="3",
            align_items="center",
        ),
        href=href,
        on_click=ShellState.close_sidebar,
        text_decoration="none",
        display="flex",
        align_items="center",
        height="2.5rem",
        padding="0 0.75rem",
        width="100%",
        border_radius=RADIUS_SM,
        _hover={"background_color": SIDEBAR_ACTIVE_BG if active else SIDEBAR_HOVER},
        style=style,
    )


def _nav_link(label: str, href: str, icon_tag: str) -> rx.Component:
    # `raw_path` é o caminho da URL no navegador; `path` é o padrão de rota
    # casado, que na página índice não é "/" (o Dashboard nunca ficava ativo).
    return rx.cond(
        AuthState.router.page.raw_path == href,
        _nav_link_item(label, href, icon_tag, active=True),
        _nav_link_item(label, href, icon_tag, active=False),
    )


def _user_avatar() -> rx.Component:
    return rx.center(
        rx.text(AuthState.iniciais, size="2", weight="bold", style={"color": BORDEAUX}),
        width="2.25rem",
        height="2.25rem",
        flex_shrink="0",
        border_radius="9999px",
        style={"background_color": BORDEAUX_SOFT},
    )


def _sidebar_footer() -> rx.Component:
    """Usuário logado + "Sair", ancorado no fim da sidebar."""
    return rx.vstack(
        _divider(),
        rx.hstack(
            _user_avatar(),
            rx.vstack(
                rx.text(
                    AuthState.nome,
                    size="2",
                    weight="medium",
                    style={
                        "color": SIDEBAR_TEXT_STRONG,
                        "overflow": "hidden",
                        "text_overflow": "ellipsis",
                        "white_space": "nowrap",
                        "max_width": "100%",
                    },
                ),
                rx.text(AuthState.papel_label, size="1", style={"color": SIDEBAR_MUTED}),
                spacing="0",
                align_items="start",
                min_width="0",
            ),
            spacing="3",
            align_items="center",
            width="100%",
            padding="0.25rem 0.75rem 0",
        ),
        rx.button(
            rx.icon("log-out", size=16),
            "Sair",
            on_click=AuthState.logout,
            variant="ghost",
            color_scheme="gray",
            size="2",
            width="100%",
            style={
                "color": SIDEBAR_TEXT,
                "justify_content": "flex-start",
                "padding": "0 0.75rem",
                "height": "2.25rem",
                # A variante ghost do Radix tem margem negativa (para
                # "vazar" o hover além do texto) que desalinharia o botão
                # dos itens do menu.
                "margin": "0",
                "box_sizing": "border-box",
                "&:hover": {"background_color": SIDEBAR_HOVER, "color": SIDEBAR_TEXT_STRONG},
            },
        ),
        spacing="3",
        align_items="start",
        width="100%",
        margin_top="auto",
    )


def sidebar() -> rx.Component:
    return rx.vstack(
        rx.box(_brand(SIDEBAR_TEXT_STRONG), padding="0.25rem 0.75rem"),
        rx.box(_divider(), margin_y="1.25rem", width="100%"),
        rx.text(
            "MENU",
            size="1",
            weight="medium",
            style={
                "color": SIDEBAR_MUTED,
                "letter_spacing": "0.1em",
                "padding": "0 0.75rem",
                "margin_bottom": "0.5rem",
            },
        ),
        rx.vstack(
            *[_nav_link(label, href, icon) for label, href, icon in NAV_ITEMS],
            spacing="1",
            width="100%",
        ),
        _sidebar_footer(),
        width=SIDEBAR_WIDTH,
        min_width=SIDEBAR_WIDTH,
        height="100vh",
        padding="1.25rem 1rem",
        spacing="0",
        align_items="start",
        style={
            "background_color": SIDEBAR_BG,
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


def _menu_button() -> rx.Component:
    """Botão de menu (hambúrguer), dentro da topbar mobile."""
    return rx.icon_button(
        rx.icon("menu", size=18),
        on_click=ShellState.toggle_sidebar,
        variant="ghost",
        color_scheme="gray",
    )


def topbar() -> rx.Component:
    """Barra superior só para telas estreitas (< 768px): botão de menu +
    marca. Em telas largas some, pois usuário e "Sair" vivem no rodapé da
    sidebar."""
    return rx.hstack(
        _menu_button(),
        _brand(BORDEAUX),
        spacing="3",
        align_items="center",
        width="100%",
        padding="0.75rem 1rem",
        style={
            "background_color": SURFACE,
            "border_bottom": f"1px solid {LINE}",
            "display": "none",
            f"@media (max-width: {MOBILE_BREAKPOINT})": {"display": "flex"},
        },
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
    """Envolve o conteúdo de uma página autenticada. O conteúdo tem
    largura máxima (`CONTENT_MAX_WIDTH`) e fica centralizado ao lado da
    sidebar; em janelas menores ocupa o espaço disponível."""
    return rx.hstack(
        _sidebar_backdrop(),
        sidebar(),
        rx.vstack(
            topbar(),
            rx.box(
                *children,
                padding="2rem",
                width="100%",
                max_width=CONTENT_MAX_WIDTH,
                margin_x="auto",
                style={"animation": "vetements-fade-in 0.25s ease both"},
            ),
            width="100%",
            min_width="0",
            spacing="0",
            align_items="stretch",
        ),
        spacing="0",
        align_items="stretch",
        width="100%",
        min_height="100vh",
        style={"background_color": BG},
    )
