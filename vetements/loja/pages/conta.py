"""Páginas da conta do cliente na loja: entrar / criar conta
(`/conta/entrar`) e minha conta com os pedidos (`/conta`)."""

import reflex as rx

from vetements import routes
from vetements.loja.components.layout import container_loja, store_layout
from vetements.loja.components.produto import aviso, botao_primario
from vetements.loja.state.conta import ContaState


def _campo(rotulo: str, nome: str, tipo: str = "text", auto_complete: str = "", obrigatorio: bool = True, dica: str = "") -> rx.Component:
    return rx.el.label(
        rx.el.span(rotulo, class_name="lj-auth__label"),
        rx.el.div(
            rx.el.input(
                type=tipo,
                name=nome,
                auto_complete=auto_complete or "off",
                required=obrigatorio,
            ),
            class_name="lj-field",
        ),
        *([rx.el.span(dica, class_name="lj-auth__hint")] if dica else []),
        class_name="lj-auth__group",
    )


def _erro(mensagem) -> rx.Component:
    return rx.cond(mensagem != "", rx.el.p(mensagem, class_name="lj-form-message", role="alert", custom_attrs={"data-tone": "error"}))


def _botao_envio(texto: str) -> rx.Component:
    return rx.el.button(
        rx.cond(ContaState.enviando, "Aguarde...", texto),
        type="submit",
        class_name="lj-pill-button lj-pill-button--wide",
        disabled=ContaState.enviando,
    )


def _entrar() -> rx.Component:
    return rx.el.section(
        rx.el.h2("Entrar", class_name="lj-auth__title"),
        rx.el.p("Já tem conta? Entre com seu e-mail e senha.", class_name="lj-auth__sub"),
        rx.form(
            _campo("E-mail", "email", "email", "email"),
            _campo("Senha", "senha", "password", "current-password"),
            _erro(ContaState.erro_entrar),
            _botao_envio("Entrar"),
            on_submit=ContaState.entrar,
            class_name="lj-auth__form",
        ),
        class_name="lj-auth__panel",
        aria_label="Entrar",
    )


def _cadastrar() -> rx.Component:
    return rx.el.section(
        rx.el.h2("Criar conta", class_name="lj-auth__title"),
        rx.el.p("Primeira compra? Crie sua conta para finalizar o pedido.", class_name="lj-auth__sub"),
        rx.form(
            _campo("Nome", "nome", "text", "name"),
            _campo("E-mail", "email", "email", "email"),
            _campo(
                "Senha",
                "senha",
                "password",
                "new-password",
                dica="Ao menos 8 caracteres, com letras e números.",
            ),
            _campo("Telefone (opcional)", "telefone", "tel", "tel", obrigatorio=False),
            _erro(ContaState.erro_cadastro),
            _botao_envio("Criar conta"),
            on_submit=ContaState.cadastrar,
            class_name="lj-auth__form",
        ),
        class_name="lj-auth__panel",
        aria_label="Criar conta",
    )


def entrar_page() -> rx.Component:
    return store_layout(
        container_loja(
            rx.el.h1("Minha conta", class_name="lj-cart__title"),
            rx.el.div(_entrar(), _cadastrar(), class_name="lj-auth"),
        ),
    )


# --- Minha conta --------------------------------------------------------------


def _item_pedido(item) -> rx.Component:
    return rx.el.li(
        rx.el.span(item.quantidade.to_string() + "× " + item.nome),
        rx.el.span(item.detalhe, class_name="lj-cart__meta"),
        rx.el.span(item.total_label, class_name="lj-order__item-total"),
        class_name="lj-order__item",
    )


def _pedido(pedido) -> rx.Component:
    return rx.el.article(
        rx.el.header(
            rx.el.h3("Pedido nº " + pedido.id.to_string(), class_name="lj-order__title"),
            rx.el.span(pedido.data_label, class_name="lj-cart__meta"),
            rx.el.strong(pedido.total_label, class_name="lj-order__total"),
            class_name="lj-order__header",
        ),
        rx.el.ul(rx.foreach(pedido.itens, _item_pedido), class_name="lj-order__items"),
        class_name="lj-order",
    )


def _confirmacao() -> rx.Component:
    return rx.cond(
        ContaState.pedido_confirmado > 0,
        rx.el.div(
            rx.icon("circle-check", size=22, stroke_width=1.5, aria_hidden="true"),
            rx.el.div(
                rx.el.p("Pedido nº " + ContaState.pedido_confirmado.to_string() + " registrado!", class_name="lj-notice__title"),
                rx.el.p(
                    "O estoque já foi reservado. Você acompanha seus pedidos aqui.",
                    class_name="lj-notice__text",
                ),
            ),
            class_name="lj-success",
            role="status",
        ),
    )


def _lista_de_pedidos() -> rx.Component:
    return rx.cond(
        ContaState.carregando_pedidos,
        rx.el.div(class_name="lj-skeleton", style={"height": "160px"}, aria_busy="true"),
        rx.cond(
            ContaState.erro_pedidos != "",
            aviso(
                "cloud-off",
                "Não foi possível carregar seus pedidos",
                "Verifique sua conexão e tente novamente em instantes.",
                botao_primario("Tentar novamente", type="button", on_click=ContaState.load_conta),
            ),
            rx.cond(
                ContaState.pedidos.length() > 0,
                rx.el.div(rx.foreach(ContaState.pedidos, _pedido), class_name="lj-orders"),
                aviso(
                    "shopping-bag",
                    "Você ainda não fez pedidos",
                    "Quando finalizar uma compra, ela aparece aqui.",
                    rx.link("Ver a vitrine", href=routes.LOJA_HOME, class_name="lj-pill-button"),
                ),
            ),
        ),
    )


def conta_page() -> rx.Component:
    return store_layout(
        container_loja(
            rx.el.div(
                rx.el.div(
                    rx.el.h1("Minha conta", class_name="lj-cart__title"),
                    rx.el.p(
                        rx.cond(ContaState.primeiro_nome != "", "Olá, " + ContaState.primeiro_nome + ". ", ""),
                        ContaState.email,
                        class_name="lj-auth__sub",
                    ),
                ),
                rx.el.button("Sair", type="button", class_name="lj-link-button", on_click=ContaState.sair),
                class_name="lj-account__header",
            ),
            _confirmacao(),
            rx.el.h2("Meus pedidos", class_name="lj-auth__title"),
            _lista_de_pedidos(),
        ),
    )
