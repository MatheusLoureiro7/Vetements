"""Design tokens para o sistema visual "Vetements" (SaaS moderno).

Fundo cinza-claro frio + cartões brancos com sombra suave, accent de
marca bordô acompanhado de cores de apoio abafadas (sucesso/alerta/
informação), tipografia Fraunces reservada à marca/títulos grandes de
página + IBM Plex Sans para o restante. Ver
`openspec/changes/restyle-frontend-saas-visual/design.md` para o
racional (evolução de `add-frontend-mvp-shell`).
"""

import reflex as rx

# --- Cor -------------------------------------------------------------

BG = "#F6F7F9"
INK = "#1A1815"
INK_MUTED = "#6B665D"
LINE = "#E1E4E9"
BORDEAUX = "#6E1423"
BORDEAUX_SOFT = "#F1E4E1"
SURFACE = "#FFFFFF"

# Cores de apoio abafadas (mesmo tom dessaturado do bordô), usadas em
# ícones de stat, indicadores de status e séries de gráfico — nunca
# substituem o bordô como accent de ação primária.
SUCCESS = "#2F6D4F"
SUCCESS_SOFT = "#E4EEE8"
WARNING = "#B7791F"
WARNING_SOFT = "#F5EAD8"
INFO = "#3A5A8C"
INFO_SOFT = "#E4E9F1"

# --- Tipografia --------------------------------------------------------

DISPLAY_FONT = "Fraunces, 'Iowan Old Style', serif"
BODY_FONT = "'IBM Plex Sans', 'Helvetica Neue', sans-serif"

GOOGLE_FONTS_STYLESHEET = (
    "https://fonts.googleapis.com/css2?"
    "family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&"
    "family=IBM+Plex+Sans:wght@400;500;600&display=swap"
)

# --- Layout --------------------------------------------------------

SIDEBAR_WIDTH = "240px"
RADIUS = "10px"
RADIUS_SM = "6px"
SHADOW = "0 1px 2px rgba(26, 24, 21, 0.04), 0 4px 12px rgba(26, 24, 21, 0.06)"
SHADOW_FOCUS = "0 0 0 3px rgba(110, 20, 35, 0.12)"

# --- Estilo global aplicado ao <body> via rx.App(style=...) -----------

base_style: dict = {
    "font_family": BODY_FONT,
    "background_color": BG,
    "color": INK,
    "::selection": {
        "background_color": BORDEAUX_SOFT,
        "color": BORDEAUX,
    },
    "h1, h2, h3": {
        "font_family": DISPLAY_FONT,
        "font_weight": "500",
        "letter_spacing": "-0.01em",
    },
    # O Radix Themes desta versão resolve o texto de TextField/TextArea/
    # Select para uma cor quase branca mesmo com appearance="light" — força
    # explicitamente para a tinta do sistema "Atelier".
    ".rt-TextFieldInput, .rt-TextAreaInput, .rt-SelectTrigger": {
        "color": INK,
    },
    # Foco perceptível (sombra suave em vez do azul padrão do Radix) em
    # inputs/áreas de texto/select, alinhado ao accent bordô.
    ".rt-TextFieldRoot:focus-within, .rt-TextAreaRoot:focus-within, .rt-SelectTrigger:focus-visible": {
        "box_shadow": f"{SHADOW_FOCUS} !important",
    },
}


def heading_style(size: str = "6") -> dict:
    """Estilo de título de marca/página (Fraunces) — reservado à marca
    (`VETEMENTS`) e aos títulos grandes de topo de página."""
    return {
        "font_family": DISPLAY_FONT,
        "font_weight": "500",
        "color": INK,
        "letter_spacing": "-0.01em",
    }


def card_title_style() -> dict:
    """Estilo de título de cartão/painel (IBM Plex Sans) — usado em
    títulos internos de cartão (ex.: "Novo produto"), diferenciando-os
    dos títulos de página (`heading_style`)."""
    return {
        "font_family": BODY_FONT,
        "font_weight": "600",
        "font_size": "1rem",
        "color": INK,
    }


def stat_number_style() -> dict:
    return {
        "font_family": DISPLAY_FONT,
        "font_weight": "500",
        "font_size": "2rem",
        "color": INK,
        "font_variant_numeric": "tabular-nums",
    }


def stat_label_style() -> dict:
    return {
        "font_family": BODY_FONT,
        "font_size": "0.8rem",
        "color": INK_MUTED,
    }


def card_style(padding: str = "1.5rem") -> dict:
    """Cartão base: fundo branco, radius e sombra suave — substitui o
    padrão anterior de hairline solta na página."""
    return {
        "background_color": SURFACE,
        "border_radius": RADIUS,
        "box_shadow": SHADOW,
        "padding": padding,
    }


def primary_button_style() -> dict:
    """Botão de ação primária (accent bordô), com leve elevação no
    hover/focus em vez do preenchimento chapado anterior."""
    return {
        "background_color": BORDEAUX,
        "color": "white",
        "border_radius": RADIUS_SM,
        "box_shadow": SHADOW,
        "transition": "box-shadow 0.15s ease, transform 0.15s ease",
        "&:hover": {"box_shadow": SHADOW_FOCUS, "transform": "translateY(-1px)"},
        "&:focus-visible": {"box_shadow": SHADOW_FOCUS},
    }
