"""Formulário de newsletter da loja.

Só visual: valida o e-mail e confirma na tela. Não há backend de
newsletter, então nada é gravado (ver change
`frontend-restyle-storefront-home`).
"""

from __future__ import annotations

import re

import reflex as rx

PADRAO_EMAIL = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")

MENSAGEM_INVALIDO = "Insira um endereço de e-mail válido."
MENSAGEM_OK = "Obrigado por assinar"


def email_valido(email: str) -> bool:
    return bool(PADRAO_EMAIL.match(email.strip()))


class NewsletterState(rx.State):
    mensagem: str = ""
    # "success" ou "error" (vira o `data-tone` da mensagem).
    tom: str = ""

    @rx.event
    def assinar(self, form_data: dict):
        if not email_valido(str(form_data.get("email") or "")):
            self.mensagem, self.tom = MENSAGEM_INVALIDO, "error"
            return
        self.mensagem, self.tom = MENSAGEM_OK, "success"
        return rx.set_value("newsletter-email", "")
