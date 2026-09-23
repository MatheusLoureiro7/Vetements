"""Tela de login."""

import reflex as rx

from vetements.components import ui
from vetements.state.auth import AuthState
from vetements.styles import (
    BG,
    BORDEAUX,
    BRAND_GRADIENT,
    DISPLAY_FONT,
    SIDEBAR_ACCENT,
    SIDEBAR_TEXT,
    SIDEBAR_TEXT_STRONG,
    heading_style,
    primary_button_style,
)


def _brand_panel() -> rx.Component:
    # Monograma "V" gigante e translúcido, só decorativo (aria-hidden),
    # atrás do bloco de texto — dá presença visual ao painel sem depender
    # de imagem externa.
    watermark = rx.text(
        "V",
        aria_hidden="true",
        style={
            "font_family": DISPLAY_FONT,
            "color": "rgba(255, 255, 255, 0.06)",
            "font_size": "min(48vw, 34rem)",
            "font_weight": "600",
            "line_height": "1",
            "position": "absolute",
            "right": "-8%",
            "bottom": "-12%",
            "user_select": "none",
            "pointer_events": "none",
        },
    )
    return rx.box(
        watermark,
        rx.center(
            rx.vstack(
                rx.text(
                    "VETEMENTS",
                    style={
                        **heading_style(),
                        "color": SIDEBAR_TEXT_STRONG,
                        "font_size": "3rem",
                    },
                ),
                rx.box(width="2.5rem", height="2px", style={"background_color": SIDEBAR_ACCENT}),
                rx.text("Gestão da loja", style={"color": SIDEBAR_TEXT}, size="4"),
                spacing="3",
                align_items="start",
            ),
            width="100%",
            height="100%",
            padding_x="3rem",
        ),
        width="100%",
        height="100vh",
        position="relative",
        overflow="hidden",
        style={"background": BRAND_GRADIENT},
    )


def _form_panel() -> rx.Component:
    return rx.center(
        ui.card(
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
                    rx.cond(AuthState.is_submitting, "Entrando...", "Entrar"),
                    on_click=AuthState.login,
                    disabled=AuthState.is_submitting,
                    loading=AuthState.is_submitting,
                    width="100%",
                    style=primary_button_style(),
                ),
                spacing="4",
                width="100%",
            ),
            width="320px",
        ),
        width="100%",
        height="100vh",
        style={"background_color": BG},
    )


def login_page() -> rx.Component:
    return rx.grid(
        _brand_panel(),
        _form_panel(),
        columns="2",
        width="100%",
        style={"@media (max-width: 768px)": {"grid_template_columns": "1fr"}},
    )
