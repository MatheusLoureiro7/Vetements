"""Página de pagamento SIMULADO da loja (`/pagamento`): resumo do pedido e
Pix, cartão ou boleto fictícios. Nenhum valor é cobrado; o pedido é criado
já pago ao confirmar (ver `state/pagamento.py`)."""

import reflex as rx

from vetements import routes
from vetements.loja.components.layout import container_loja, store_layout
from vetements.loja.state.carrinho import CarrinhoState
from vetements.loja.state.pagamento import (
    BOLETO_LINHA,
    MAX_PARCELAS,
    PIX_COPIA_E_COLA,
    PagamentoState,
)

_FORMAS = [("pix", "Pix"), ("cartao", "Cartão"), ("boleto", "Boleto")]


def _aba(valor: str, rotulo: str) -> rx.Component:
    return rx.el.button(
        rotulo,
        type="button",
        role="tab",
        class_name="lj-tab",
        aria_selected=PagamentoState.forma == valor,
        on_click=PagamentoState.escolher_forma(valor),
    )


def _erro_campo(mensagem) -> rx.Component:
    return rx.cond(mensagem != "", rx.el.span(mensagem, class_name="lj-pay__error", role="alert"))


def _campo(rotulo: str, nome: str, erro, placeholder: str = "", modo: str = "text", max_len: int = 0) -> rx.Component:
    extras = {"max_length": max_len} if max_len else {}
    return rx.el.label(
        rx.el.span(rotulo, class_name="lj-auth__label"),
        rx.el.div(
            rx.el.input(
                type="text",
                name=nome,
                placeholder=placeholder,
                input_mode=modo,
                auto_complete="off",
                **extras,
            ),
            class_name="lj-field",
        ),
        _erro_campo(erro),
        class_name="lj-auth__group",
    )


def _codigo(rotulo: str, codigo: str) -> rx.Component:
    return rx.el.div(
        rx.el.span(rotulo, class_name="lj-auth__label"),
        rx.el.code(codigo, class_name="lj-pay__code"),
        class_name="lj-auth__group",
    )


def _pix() -> rx.Component:
    return rx.el.div(
        rx.el.div(
            rx.icon("qr-code", size=120, stroke_width=1, aria_hidden="true"),
            rx.el.span("QR code ilustrativo", class_name="lj-cart__meta"),
            class_name="lj-pay__qr",
        ),
        _codigo("Pix copia e cola (fictício)", PIX_COPIA_E_COLA),
        rx.el.p(
            "Na loja real você pagaria pelo app do banco. Aqui, basta confirmar.",
            class_name="lj-auth__hint",
        ),
        class_name="lj-pay__method",
    )


def _cartao() -> rx.Component:
    return rx.el.div(
        _campo("Número do cartão", "numero", PagamentoState.erro_numero, "0000 0000 0000 0000", "numeric", 23),
        _campo("Nome impresso no cartão", "nome", PagamentoState.erro_nome),
        rx.el.div(
            _campo("Validade", "validade", PagamentoState.erro_validade, "MM/AA", "numeric", 5),
            _campo("CVV", "cvv", PagamentoState.erro_cvv, "123", "numeric", 4),
            class_name="lj-pay__row",
        ),
        rx.el.label(
            rx.el.span("Parcelas", class_name="lj-auth__label"),
            rx.el.div(
                rx.el.select(
                    *[
                        rx.el.option(f"{n}x sem juros", value=str(n))
                        for n in range(1, MAX_PARCELAS + 1)
                    ],
                    name="parcelas",
                    default_value="1",
                ),
                class_name="lj-field lj-pay__select",
            ),
            _erro_campo(PagamentoState.erro_parcelas),
            class_name="lj-auth__group",
        ),
        rx.el.p(
            "Use qualquer cartão de teste. Um cartão com final 0000 simula pagamento recusado.",
            class_name="lj-auth__hint",
        ),
        class_name="lj-pay__method",
    )


def _boleto() -> rx.Component:
    return rx.el.div(
        _codigo("Linha digitável (fictícia)", BOLETO_LINHA),
        rx.el.p(
            "Na loja real o pedido aguardaria a compensação. Aqui, ele é aprovado na hora.",
            class_name="lj-auth__hint",
        ),
        class_name="lj-pay__method",
    )


def _formulario() -> rx.Component:
    return rx.el.section(
        rx.el.p(
            rx.icon("info", size=16, aria_hidden="true"),
            "Pagamento simulado — nenhum valor é cobrado.",
            class_name="lj-pay__banner",
            role="note",
        ),
        rx.el.div(*[_aba(v, r) for v, r in _FORMAS], class_name="lj-tabs lj-pay__tabs", role="tablist"),
        rx.form(
            rx.match(
                PagamentoState.forma,
                ("cartao", _cartao()),
                ("boleto", _boleto()),
                _pix(),
            ),
            rx.cond(
                PagamentoState.erro_geral != "",
                rx.el.p(
                    PagamentoState.erro_geral,
                    class_name="lj-form-message",
                    role="alert",
                    custom_attrs={"data-tone": "error"},
                ),
            ),
            rx.el.button(
                rx.cond(PagamentoState.enviando, "Processando...", "Confirmar pagamento"),
                type="submit",
                class_name="lj-pill-button lj-pill-button--wide",
                disabled=PagamentoState.enviando,
            ),
            on_submit=PagamentoState.confirmar_pagamento,
            reset_on_submit=False,
            class_name="lj-auth__form",
        ),
        class_name="lj-auth__panel lj-pay",
        aria_label="Forma de pagamento",
    )


def _linha_resumo(item) -> rx.Component:
    return rx.el.li(
        rx.el.span(item.quantidade.to_string() + "× " + item.nome + " (" + item.tamanho + " · " + item.cor + ")"),
        rx.el.span(item.total_label),
        class_name="lj-cart__row lj-pay__item",
    )


def _resumo() -> rx.Component:
    return rx.el.aside(
        rx.el.ul(rx.foreach(CarrinhoState.itens, _linha_resumo), class_name="lj-pay__items"),
        rx.el.div(
            rx.el.strong("Total"),
            rx.el.strong(CarrinhoState.subtotal_label),
            class_name="lj-cart__row",
        ),
        rx.el.p("O preço e o estoque são conferidos de novo ao confirmar.", class_name="lj-cart__note"),
        rx.link("Voltar ao carrinho", href=routes.LOJA_CARRINHO, class_name="lj-link-button lj-cart__meta"),
        class_name="lj-cart__summary",
        aria_label="Resumo do pedido",
    )


def pagamento_page() -> rx.Component:
    return store_layout(
        container_loja(
            rx.el.h1("Pagamento", class_name="lj-cart__title"),
            rx.el.div(_formulario(), _resumo(), class_name="lj-cart"),
        ),
    )
