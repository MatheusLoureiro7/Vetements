"""Códigos por e-mail da loja: confirmar o e-mail (`/conta/confirmar`) e
recuperar a senha (`/conta/recuperar`).

Os códigos chegam por e-mail (Brevo, enviado pelo backend) e nunca passam
pelo estado além do momento do envio: os formulários não são controlados e
o código é lido só ao enviar.
"""

from __future__ import annotations

import re

import reflex as rx

from vetements import routes, xano_client
from vetements.loja.state.conta import (
    MENSAGEM_FALHA,
    ContaState,
    destino_seguro,
    href_confirmar,
    href_entrar,
)

AVISO_NAO_ENVIADO = "Não foi possível enviar o código agora. Use \"Reenviar código\"."


def codigo_valido(texto: str) -> bool:
    """O código tem exatamente 6 dígitos (espaços nas pontas são ignorados)."""
    return re.fullmatch(r"\d{6}", (texto or "").strip()) is not None


def mensagem_de_erro(erro: xano_client.XanoAPIError) -> str:
    """Falha de rede ou do servidor vira uma mensagem amigável; erro de
    negócio (código inválido, aguardar etc.) mostra a mensagem do backend."""
    if erro.is_network_error or (erro.status_code or 0) >= 500:
        return MENSAGEM_FALHA
    return erro.message


class CodigosState(rx.State):
    erro: str = ""
    mensagem: str = ""
    enviando: bool = False
    # Recuperação de senha em dois passos: "email" e "codigo".
    passo: str = "email"
    email_recuperacao: str = ""

    def _limpar(self):
        self.erro = ""
        self.mensagem = ""
        self.enviando = False

    def _proximo(self) -> str:
        return destino_seguro(self.router.url.query_parameters.get("proximo", ""))

    # --- Confirmar e-mail -----------------------------------------------------

    @rx.event
    async def load_confirmar(self):
        self._limpar()
        conta = await self.get_state(ContaState)
        if not conta.token:
            return rx.redirect(href_entrar(href_confirmar(self._proximo())))
        if self.router.url.query_parameters.get("enviado") == "0":
            self.erro = AVISO_NAO_ENVIADO
        return None

    @rx.event
    async def confirmar(self, form_data: dict):
        if self.enviando:
            return
        codigo = str(form_data.get("codigo") or "").strip()
        if not codigo_valido(codigo):
            self.erro = "Digite os 6 números do código."
            self.mensagem = ""
            return
        conta = await self.get_state(ContaState)
        self.enviando = True
        self.erro = ""
        self.mensagem = ""
        yield
        try:
            xano_client.confirm_email(conta.token, codigo)
        except xano_client.XanoAPIError as erro:
            self.enviando = False
            if erro.status_code == 401:
                conta._sair()
                yield rx.redirect(href_entrar(href_confirmar(self._proximo())))
                return
            self.erro = mensagem_de_erro(erro)
            return
        conta.email_confirmado = True
        self.enviando = False
        yield rx.redirect(self._proximo())

    @rx.event
    async def reenviar(self):
        if self.enviando:
            return
        conta = await self.get_state(ContaState)
        self.enviando = True
        self.erro = ""
        self.mensagem = ""
        yield
        try:
            xano_client.resend_code(conta.token)
        except xano_client.XanoAPIError as erro:
            self.enviando = False
            if erro.status_code == 401:
                conta._sair()
                yield rx.redirect(href_entrar(href_confirmar(self._proximo())))
                return
            self.erro = mensagem_de_erro(erro)
            return
        self.enviando = False
        destino = conta.email or "seu e-mail"
        self.mensagem = f"Enviamos um novo código para {destino}."

    # --- Recuperar senha ------------------------------------------------------

    @rx.event
    def load_recuperar(self):
        # O on_load roda de novo quando a conexão com o servidor cai e volta
        # (ex.: aba parada enquanto o cliente abre o e-mail). Se o código já
        # foi pedido, continua no passo do código em vez de recomeçar; o botão
        # "Usar outro e-mail" volta ao início.
        self._limpar()
        if not (self.passo == "codigo" and self.email_recuperacao):
            self.passo = "email"
            self.email_recuperacao = ""

    @rx.event
    def pedir_codigo(self, form_data: dict):
        if self.enviando:
            return
        email = str(form_data.get("email") or "").strip().lower()
        if not email:
            self.erro = "Informe seu e-mail."
            return
        self.enviando = True
        self.erro = ""
        self.mensagem = ""
        yield
        try:
            resposta = xano_client.request_password_reset(email)
        except xano_client.XanoAPIError as erro:
            self.enviando = False
            self.erro = mensagem_de_erro(erro)
            return
        self.enviando = False
        self.email_recuperacao = email
        self.passo = "codigo"
        self.mensagem = resposta.get("mensagem") or "Se houver uma conta com este e-mail, enviamos um código."

    @rx.event
    def voltar_ao_email(self):
        self._limpar()
        self.passo = "email"
        self.email_recuperacao = ""

    @rx.event
    async def redefinir(self, form_data: dict):
        if self.enviando:
            return
        codigo = str(form_data.get("codigo") or "").strip()
        nova_senha = str(form_data.get("nova_senha") or "")
        if not codigo_valido(codigo):
            self.erro = "Digite os 6 números do código."
            self.mensagem = ""
            return
        if not nova_senha:
            self.erro = "Informe a nova senha."
            self.mensagem = ""
            return
        if not self.email_recuperacao:
            self.passo = "email"
            self.erro = "Informe seu e-mail de novo para continuar."
            self.mensagem = ""
            return
        self.enviando = True
        self.erro = ""
        self.mensagem = ""
        yield
        try:
            resposta = xano_client.reset_password(self.email_recuperacao, codigo, nova_senha)
        except xano_client.XanoAPIError as erro:
            self.enviando = False
            self.erro = mensagem_de_erro(erro)
            return
        conta = await self.get_state(ContaState)
        conta._entrar_com(resposta)
        self.enviando = False
        self.passo = "email"
        self.email_recuperacao = ""
        yield rx.redirect(routes.LOJA_CONTA)
