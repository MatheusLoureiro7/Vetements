"""Páginas de código por e-mail da loja: confirmar o e-mail
(`/conta/confirmar`) e recuperar a senha (`/conta/recuperar`)."""

import reflex as rx

from vetements import routes
from vetements.loja.components.layout import container_loja, store_layout
from vetements.loja.state.codigos import CodigosState
from vetements.loja.state.conta import ContaState


def _campo(rotulo: str, nome: str, tipo: str = "text", auto_complete: str = "off", dica: str = "", **props) -> rx.Component:
    return rx.el.label(
        rx.el.span(rotulo, class_name="lj-auth__label"),
        rx.el.div(
            rx.el.input(type=tipo, name=nome, auto_complete=auto_complete, required=True, **props),
            class_name="lj-field",
        ),
        *([rx.el.span(dica, class_name="lj-auth__hint")] if dica else []),
        class_name="lj-auth__group",
    )


def _campo_codigo() -> rx.Component:
    return _campo(
        "Código",
        "codigo",
        auto_complete="one-time-code",
        input_mode="numeric",
        max_length=6,
        placeholder="000000",
    )


def _mensagens() -> rx.Component:
    return rx.fragment(
        rx.cond(
            CodigosState.erro != "",
            rx.el.p(CodigosState.erro, class_name="lj-form-message", role="alert", custom_attrs={"data-tone": "error"}),
        ),
        rx.cond(
            CodigosState.mensagem != "",
            rx.el.p(CodigosState.mensagem, class_name="lj-form-message", role="status", custom_attrs={"data-tone": "success"}),
        ),
    )


def _botao(texto: str, texto_enviando: str) -> rx.Component:
    return rx.el.button(
        rx.cond(CodigosState.enviando, texto_enviando, texto),
        type="submit",
        class_name="lj-pill-button lj-pill-button--wide",
        disabled=CodigosState.enviando,
    )


def _painel(titulo: str, subtitulo, *conteudo: rx.Component) -> rx.Component:
    return rx.el.section(
        rx.el.h2(titulo, class_name="lj-auth__title"),
        rx.el.p(subtitulo, class_name="lj-auth__sub"),
        *conteudo,
        class_name="lj-auth__panel lj-code",
        aria_label=titulo,
    )


# --- Confirmar e-mail ---------------------------------------------------------


def confirmar_page() -> rx.Component:
    return store_layout(
        container_loja(
            rx.el.h1("Minha conta", class_name="lj-cart__title"),
            _painel(
                "Confirme seu e-mail",
                rx.cond(
                    ContaState.email != "",
                    "Enviamos um código de 6 números para " + ContaState.email + ". Ele vale por 15 minutos.",
                    "Enviamos um código de 6 números para o seu e-mail. Ele vale por 15 minutos.",
                ),
                rx.form(
                    _campo_codigo(),
                    _mensagens(),
                    _botao("Confirmar e-mail", "Confirmando..."),
                    on_submit=CodigosState.confirmar,
                    class_name="lj-auth__form",
                ),
                rx.el.div(
                    rx.el.button(
                        "Reenviar código",
                        type="button",
                        class_name="lj-link-button",
                        disabled=CodigosState.enviando,
                        on_click=CodigosState.reenviar,
                    ),
                    rx.el.span("Não chegou? Confira também a caixa de spam.", class_name="lj-auth__hint"),
                    class_name="lj-code__actions",
                ),
            ),
        ),
    )


# --- Recuperar senha ----------------------------------------------------------


def _passo_email() -> rx.Component:
    return rx.form(
        _campo("E-mail", "email", "email", "email"),
        _mensagens(),
        _botao("Enviar código", "Enviando..."),
        on_submit=CodigosState.pedir_codigo,
        class_name="lj-auth__form",
    )


def _passo_codigo() -> rx.Component:
    return rx.fragment(
        rx.form(
            _campo_codigo(),
            _campo(
                "Nova senha",
                "nova_senha",
                "password",
                "new-password",
                dica="Ao menos 8 caracteres, com letras e números.",
            ),
            _mensagens(),
            _botao("Salvar nova senha", "Salvando..."),
            on_submit=CodigosState.redefinir,
            class_name="lj-auth__form",
        ),
        rx.el.div(
            rx.el.button(
                "Usar outro e-mail ou pedir novo código",
                type="button",
                class_name="lj-link-button",
                on_click=CodigosState.voltar_ao_email,
            ),
            rx.el.span("Não chegou? Confira também a caixa de spam.", class_name="lj-auth__hint"),
            class_name="lj-code__actions",
        ),
    )


def recuperar_page() -> rx.Component:
    return store_layout(
        container_loja(
            rx.el.h1("Minha conta", class_name="lj-cart__title"),
            _painel(
                "Recuperar senha",
                rx.cond(
                    CodigosState.passo == "codigo",
                    "Digite o código enviado para " + CodigosState.email_recuperacao + " e escolha uma nova senha.",
                    "Informe o e-mail da sua conta. Enviaremos um código para criar uma nova senha.",
                ),
                rx.cond(CodigosState.passo == "codigo", _passo_codigo(), _passo_email()),
                rx.link("Voltar para entrar", href=routes.LOJA_ENTRAR, class_name="lj-link-button lj-cart__meta"),
            ),
        ),
    )
