"""Página do carrinho da loja (`/carrinho`): itens com quantidade
(1 a 10), remoção e subtotal. A finalização do pedido ainda não existe
(depende de conta de cliente e de um endpoint de pedido no Xano)."""

import reflex as rx

from vetements import routes
from vetements.loja.components.layout import container_loja, store_layout
from vetements.loja.components.produto import aviso
from vetements.loja.state.carrinho import MAX_QUANTIDADE, CarrinhoState


def _foto(item) -> rx.Component:
    return rx.link(
        rx.cond(
            item.foto != "",
            rx.el.img(src=item.foto, alt=item.nome, loading="lazy"),
        ),
        href=item.href,
        class_name="lj-cart__photo",
        aria_hidden="true",
        tab_index=-1,
    )


def _quantidade(item) -> rx.Component:
    return rx.el.div(
        rx.el.button(
            rx.icon("minus", size=14),
            type="button",
            aria_label="Diminuir quantidade de " + item.nome,
            disabled=item.quantidade <= 1,
            on_click=CarrinhoState.diminuir(item.variacao_id, item.quantidade),
        ),
        rx.el.output(item.quantidade, aria_live="polite", aria_label="Quantidade"),
        rx.el.button(
            rx.icon("plus", size=14),
            type="button",
            aria_label="Aumentar quantidade de " + item.nome,
            disabled=item.quantidade >= MAX_QUANTIDADE,
            on_click=CarrinhoState.aumentar(item.variacao_id, item.quantidade),
        ),
        class_name="lj-stepper",
    )


def _item(item) -> rx.Component:
    return rx.el.li(
        _foto(item),
        rx.el.div(
            rx.el.h2(rx.link(item.nome, href=item.href), class_name="lj-cart__name"),
            rx.el.p(
                "Tamanho " + item.tamanho + " · " + item.cor + " · " + item.preco_label,
                class_name="lj-cart__meta",
            ),
            rx.el.div(
                _quantidade(item),
                rx.el.button(
                    "Remover",
                    type="button",
                    class_name="lj-link-button lj-cart__meta",
                    on_click=CarrinhoState.remover_item(item.variacao_id),
                ),
                class_name="lj-cart__actions",
            ),
        ),
        rx.el.span(item.total_label, class_name="lj-cart__line-total"),
        class_name="lj-cart__item",
    )


def _resumo() -> rx.Component:
    return rx.el.aside(
        rx.el.div(
            rx.el.span("Subtotal"),
            rx.el.span(CarrinhoState.subtotal_label),
            class_name="lj-cart__row",
        ),
        rx.el.p(
            "A finalização do pedido ainda não está disponível na loja virtual. "
            "Em breve você poderá concluir a compra por aqui.",
            class_name="lj-cart__note",
        ),
        rx.link("Continuar comprando", href=routes.LOJA_HOME, class_name="lj-pill-button lj-pill-button--wide"),
        class_name="lj-cart__summary",
        aria_label="Resumo do carrinho",
    )


def carrinho_page() -> rx.Component:
    return store_layout(
        container_loja(
            rx.el.h1("Carrinho", class_name="lj-cart__title"),
            rx.cond(
                CarrinhoState.quantidade > 0,
                rx.el.div(
                    rx.el.ul(rx.foreach(CarrinhoState.itens, _item), class_name="lj-cart__list"),
                    _resumo(),
                    class_name="lj-cart",
                ),
                aviso(
                    "shopping-bag",
                    "Seu carrinho está vazio",
                    "Escolha uma peça na vitrine para começar.",
                    rx.link("Ver a vitrine", href=routes.LOJA_HOME, class_name="lj-pill-button"),
                ),
            ),
        ),
    )
