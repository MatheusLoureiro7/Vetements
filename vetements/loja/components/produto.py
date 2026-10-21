"""Peças visuais da loja reaproveitadas pela vitrine e pelo detalhe:
foto do produto (com marcador quando não há foto), card de produto e
avisos de estado (vazio, erro, não encontrado). Classes `lj-*` em
`assets/loja/loja.css`.
"""

from __future__ import annotations

import reflex as rx

from vetements.styles import RADIUS

# Fundo neutro do marcador de "sem foto" (o mesmo cinza dos cards).
CINZA_FOTO = "#F3F3F3"

# Proporção fixa das fotos (retrato), para o grid não "pular" ao carregar.
PROPORCAO_FOTO = "3 / 4"


def foto_produto(url: rx.Var, alt: rx.Var, **props) -> rx.Component:
    """Foto em proporção 3:4; sem `url`, mostra um marcador neutro em vez
    de uma imagem quebrada."""
    return rx.cond(
        url != "",
        rx.image(
            src=url,
            alt=alt,
            width="100%",
            loading="lazy",
            style={"aspect_ratio": PROPORCAO_FOTO, "object_fit": "cover", "display": "block"},
            border_radius=RADIUS,
            **props,
        ),
        rx.center(
            rx.icon("shirt", size=36, stroke_width=1.2, color="rgba(18, 18, 18, 0.35)", aria_hidden="true"),
            width="100%",
            border_radius=RADIUS,
            role="img",
            aria_label="Produto sem foto",
            style={"aspect_ratio": PROPORCAO_FOTO, "background_color": CINZA_FOTO},
            **props,
        ),
    )


def _foto_card(url: rx.Var, alt: rx.Var, carregamento: str = "lazy") -> rx.Component:
    return rx.el.img(src=url, alt=alt, loading=carregamento, decoding="async")


def card_produto(produto) -> rx.Component:
    """Card da vitrine no estilo da referência: foto quadrada em fundo
    cinza (a segunda foto aparece ao passar o mouse), categoria, nome e
    preço. O link do nome cobre o card inteiro e leva ao detalhe."""
    return rx.el.div(
        rx.el.div(
            rx.el.div(
                rx.cond(
                    produto.capa != "",
                    rx.fragment(
                        _foto_card(produto.capa, produto.nome),
                        rx.cond(produto.imagens.length() > 1, _foto_card(produto.imagens[1], "")),
                    ),
                    rx.el.div(
                        rx.icon("shirt", size=40, stroke_width=1.2, aria_hidden="true"),
                        class_name="lj-card__placeholder",
                        role="img",
                        aria_label="Produto sem foto",
                    ),
                ),
                class_name="lj-card__media",
            ),
            class_name="lj-card__inner",
        ),
        rx.el.div(
            rx.el.span(produto.categoria_nome, class_name="lj-card__category"),
            rx.el.h3(rx.link(produto.nome, href=produto.href), class_name="lj-card__title"),
            rx.el.span(
                rx.el.span("Preço", class_name="lj-visually-hidden"),
                produto.preco_label,
                class_name="lj-card__price",
            ),
            class_name="lj-card__info",
        ),
        class_name="lj-card",
    )


def aviso(icone: str, titulo: str, texto: str, *acoes: rx.Component) -> rx.Component:
    """Bloco de aviso centralizado (coleção em breve, sem resultado, erro,
    produto não encontrado), com ações opcionais abaixo do texto."""
    return rx.el.div(
        rx.icon(icone, size=28, stroke_width=1.5, aria_hidden="true"),
        rx.el.p(titulo, class_name="lj-notice__title"),
        rx.el.p(texto, class_name="lj-notice__text"),
        *acoes,
        class_name="lj-notice",
    )


def botao_primario(texto: str, **props) -> rx.Component:
    return rx.el.button(texto, class_name="lj-pill-button", **props)
