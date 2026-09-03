"""Design tokens for the "Atelier" visual system.

Cor marfim fria + tinta quase-preta, um único accent bordô, tipografia
Fraunces (títulos) + IBM Plex Sans (dados/UI). Ver
`openspec/changes/add-frontend-mvp-shell/design.md` para o racional.
"""

import reflex as rx

# --- Cor -------------------------------------------------------------

BG = "#F7F5F0"
INK = "#1A1815"
INK_MUTED = "#6B665D"
LINE = "#DDD8CC"
BORDEAUX = "#6E1423"
BORDEAUX_SOFT = "#F1E4E1"
SURFACE = "#FFFFFF"

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
RADIUS = "2px"  # quase reto: sem cards arredondados genéricos

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
}


def heading_style(size: str = "6") -> dict:
    """Estilo de título editorial (Fraunces)."""
    return {
        "font_family": DISPLAY_FONT,
        "font_weight": "500",
        "color": INK,
        "letter_spacing": "-0.01em",
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
