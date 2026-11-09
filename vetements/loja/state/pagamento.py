"""Pagamento SIMULADO da loja (`/pagamento`): nenhuma cobrança real.

O cliente escolhe Pix, cartão ou boleto e, ao confirmar, o pedido é
criado já pago. O formulário do cartão não é controlado: número, nome,
validade e CVV são lidos só no envio, validados aqui e descartados —
nunca ficam no estado nem vão ao backend, que recebe apenas a forma de
pagamento, as parcelas e os 4 últimos dígitos (final 0000 simula
recusa, decidida no backend).
"""

from __future__ import annotations

import re
from datetime import date
from typing import Any
from urllib.parse import urlencode

import reflex as rx

from vetements import routes, xano_client
from vetements.loja.state.carrinho import CarrinhoState, ler_itens
from vetements.loja.state.conta import ContaState, href_confirmar, href_entrar, itens_para_pedido

FORMAS = ("pix", "cartao", "boleto")
MAX_PARCELAS = 6

# Códigos só para exibição (não identificam pagamento nenhum).
PIX_COPIA_E_COLA = "00020126580014BR.GOV.BCB.PIX0136VETEMENTS-PAGAMENTO-SIMULADO5204000053039865802BR"
BOLETO_LINHA = "34191.79001 01043.510047 91020.150008 1 00000000000000"


def _digitos(numero: str) -> str:
    return re.sub(r"[\s.-]", "", numero or "")


def validar_cartao(
    numero: str, nome: str, validade: str, cvv: str, parcelas: str, hoje: date
) -> dict[str, str]:
    """Erros por campo do cartão simulado (vazio = tudo certo)."""
    erros: dict[str, str] = {}
    digitos = _digitos(numero)
    if not digitos.isdigit() or not 13 <= len(digitos) <= 19:
        erros["numero"] = "Número do cartão inválido."
    if not (nome or "").strip():
        erros["nome"] = "Informe o nome impresso no cartão."
    casamento = re.fullmatch(r"(\d{2})/(\d{2})", (validade or "").strip())
    if not casamento or not 1 <= int(casamento.group(1)) <= 12:
        erros["validade"] = "Use o formato MM/AA."
    elif (2000 + int(casamento.group(2)), int(casamento.group(1))) < (hoje.year, hoje.month):
        erros["validade"] = "Cartão vencido."
    if not re.fullmatch(r"\d{3,4}", (cvv or "").strip()):
        erros["cvv"] = "Código de segurança inválido."
    if not (parcelas or "").isdigit() or not 1 <= int(parcelas) <= MAX_PARCELAS:
        erros["parcelas"] = f"Escolha de 1 a {MAX_PARCELAS} parcelas."
    return erros


def dados_pagamento(forma: str, numero: str = "", parcelas: str = "1") -> dict[str, Any]:
    """Corpo de pagamento enviado ao backend: nunca o número completo."""
    if forma != "cartao":
        return {"forma_pagamento": forma}
    return {
        "forma_pagamento": "cartao",
        "parcelas": int(parcelas),
        "cartao_final": _digitos(numero)[-4:],
    }


class PagamentoState(rx.State):
    forma: str = "pix"
    erro_numero: str = ""
    erro_nome: str = ""
    erro_validade: str = ""
    erro_cvv: str = ""
    erro_parcelas: str = ""
    erro_geral: str = ""
    enviando: bool = False

    def _limpar_erros(self):
        self.erro_numero = ""
        self.erro_nome = ""
        self.erro_validade = ""
        self.erro_cvv = ""
        self.erro_parcelas = ""
        self.erro_geral = ""

    @rx.event
    async def load_pagamento(self):
        self._limpar_erros()
        self.enviando = False
        self.forma = "pix"
        conta = await self.get_state(ContaState)
        if not conta.token:
            return rx.redirect(href_entrar(routes.LOJA_PAGAMENTO))
        carrinho = await self.get_state(CarrinhoState)
        if not ler_itens(carrinho.salvo):
            return rx.redirect(routes.LOJA_CARRINHO)
        # Conta nova precisa confirmar o e-mail antes de pagar (o backend
        # também recusa o pedido; aqui é para não deixar o cliente preencher
        # o pagamento à toa).
        try:
            cliente = xano_client.get_customer(conta.token)
        except xano_client.XanoAPIError as erro:
            if erro.status_code == 401:
                conta._sair()
                return rx.redirect(href_entrar(routes.LOJA_PAGAMENTO))
            return None
        conta.email_confirmado = cliente.get("email_confirmado") is not False
        if not conta.email_confirmado:
            return rx.redirect(href_confirmar(routes.LOJA_PAGAMENTO))
        return None

    @rx.event
    def escolher_forma(self, forma: str):
        if forma in FORMAS and not self.enviando:
            self.forma = forma
            self._limpar_erros()

    @rx.event
    async def confirmar_pagamento(self, form_data: dict):
        if self.enviando:
            return
        conta = await self.get_state(ContaState)
        if not conta.token:
            yield rx.redirect(href_entrar(routes.LOJA_PAGAMENTO))
            return
        carrinho = await self.get_state(CarrinhoState)
        itens = ler_itens(carrinho.salvo)
        if not itens:
            yield rx.redirect(routes.LOJA_CARRINHO)
            return
        self._limpar_erros()
        numero = str(form_data.get("numero") or "")
        parcelas = str(form_data.get("parcelas") or "1")
        if self.forma == "cartao":
            erros = validar_cartao(
                numero,
                str(form_data.get("nome") or ""),
                str(form_data.get("validade") or ""),
                str(form_data.get("cvv") or ""),
                parcelas,
                date.today(),
            )
            self.erro_numero = erros.get("numero", "")
            self.erro_nome = erros.get("nome", "")
            self.erro_validade = erros.get("validade", "")
            self.erro_cvv = erros.get("cvv", "")
            self.erro_parcelas = erros.get("parcelas", "")
            if erros:
                return
        pagamento = dados_pagamento(self.forma, numero, parcelas)
        self.enviando = True
        yield
        try:
            pedido = xano_client.create_order(conta.token, itens_para_pedido(itens), **pagamento)
        except xano_client.XanoAPIError as erro:
            self.enviando = False
            if erro.status_code == 401:
                conta._sair()
                yield rx.redirect(href_entrar(routes.LOJA_PAGAMENTO))
                return
            if erro.is_network_error:
                # O pedido pode ter sido criado mesmo sem resposta: não repetir
                # às cegas.
                self.erro_geral = (
                    "A conexão caiu antes da confirmação. Confira em Minha conta se o pedido "
                    "foi registrado antes de tentar de novo."
                )
            else:
                self.erro_geral = erro.message
            return
        carrinho = await self.get_state(CarrinhoState)
        carrinho.esvaziar()
        self.enviando = False
        yield rx.redirect(f"{routes.LOJA_CONTA}?{urlencode({'pedido': pedido['id']})}")
