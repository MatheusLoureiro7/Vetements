"""Tela de login."""

import reflex as rx

from vetements.components import ui
from vetements.state.auth import AuthState
from vetements.styles import BG, BORDEAUX, INK_MUTED, SURFACE, heading_style


def _brand_panel() -> rx.Component:
    return rx.center(
        rx.vstack(
            rx.heading(
                "VETEMENTS",
                style={**heading_style(), "color": BORDEAUX, "font_size": "3rem"},
            ),
            rx.text("Gestão da loja", style={"color": INK_MUTED}, size="4"),
            spacing="2",
            align_items="start",
        ),
        width="100%",
        height="100vh",
        style={"background_color": BG},
        padding_x="3rem",
    )


def _form_panel() -> rx.Component:
    return rx.center(
        rx.vstack(
            rx.heading("Entrar", style=heading_style(), size="6"),
            rx.cond(
                AuthState.login_error != "",
                rx.text(AuthState.login_error, style={"color": BORDEAUX}, size="2"),
            ),
            ui.field(
                "E-mail",
                rx.input(
                    value=AuthState.login_email,
                    on_change=AuthState.set_login_email,
                    placeholder="voce@vetements.com",
                    width="100%",
                ),
            ),
            ui.field(
                "Senha",
                rx.input(
                    value=AuthState.login_senha,
                    on_change=AuthState.set_login_senha,
                    type="password",
                    width="100%",
                ),
            ),
            rx.button(
                "Entrar",
                on_click=AuthState.login,
                width="100%",
                style={"background_color": BORDEAUX, "color": "white"},
            ),
            rx.text(
                "Dados mockados nesta fase — nenhuma informação real é enviada.",
                size="1",
                style={"color": INK_MUTED},
            ),
            spacing="4",
            width="320px",
        ),
        width="100%",
        height="100vh",
        style={"background_color": SURFACE},
    )


def login_page() -> rx.Component:
    return rx.grid(
        _brand_panel(),
        _form_panel(),
        columns="2",
        width="100%",
        style={"@media (max-width: 768px)": {"grid_template_columns": "1fr"}},
    )
