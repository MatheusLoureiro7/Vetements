"""Conta do cliente na loja virtual e finalização do pedido.

O token de cliente (emitido por `loja/conta/login` ou `/cadastro`) fica
num cookie próprio, separado do token da equipe (`AuthState`): os dois
nunca se misturam, e o backend não aceita token de cliente na gestão.

Os formulários de entrar/criar conta usam campos não controlados (lidos no
envio), para não perder letras ao digitar rápido.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any
from urllib.parse import urlencode

import reflex as rx

from vetements import routes, xano_client
from vetements.format_utils import format_currency, format_datetime
from vetements.loja.state.carrinho import CarrinhoState, ler_itens

MENSAGEM_FALHA = "Não foi possível falar com a loja agora. Tente novamente em instantes."


@dataclass
class ItemPedido:
    nome: str
    detalhe: str
    quantidade: int
    total_label: str


@dataclass
class PedidoLoja:
    id: int
    data_label: str
    total_label: str
    itens: list[ItemPedido] = field(default_factory=list)


def item_pedido_da_api(dados: dict[str, Any]) -> ItemPedido:
    quantidade = int(dados.get("quantidade") or 0)
    preco = float(dados.get("preco_unitario") or 0)
    detalhe = " · ".join(p for p in (dados.get("tamanho") or "", dados.get("cor") or "") if p)
    return ItemPedido(
        nome=dados.get("nome") or "",
        detalhe=detalhe,
        quantidade=quantidade,
        total_label=format_currency(preco * quantidade),
    )


def pedido_da_api(dados: dict[str, Any]) -> PedidoLoja:
    return PedidoLoja(
        id=int(dados["id"]),
        data_label=format_datetime(dados["created_at"]) if dados.get("created_at") else "",
        total_label=format_currency(float(dados.get("total") or 0)),
        itens=[item_pedido_da_api(i) for i in dados.get("itens") or []],
    )


def itens_para_pedido(itens_do_carrinho: list[dict]) -> list[dict[str, int]]:
    """Só variação e quantidade vão ao backend; o preço é lido lá."""
    return [
        {"variacao_id": int(item["variacao_id"]), "quantidade": int(item.get("quantidade", 1))}
        for item in itens_do_carrinho
    ]


def href_entrar(proximo: str = "") -> str:
    """Página de entrar, voltando para `proximo` depois do login."""
    return f"{routes.LOJA_ENTRAR}?{urlencode({'proximo': proximo})}" if proximo else routes.LOJA_ENTRAR


def destino_seguro(proximo: str) -> str:
    """Só aceita caminhos internos da loja (evita redirecionar para fora)."""
    if proximo.startswith("/") and not proximo.startswith("//"):
        return proximo
    return routes.LOJA_CONTA


class ContaState(rx.State):
    # Token de cliente (nome próprio para não colidir com o cookie da equipe).
    token: str = rx.Cookie("", name="vetements_cliente", max_age=86400)
    nome: str = ""
    email: str = ""

    erro_entrar: str = ""
    erro_cadastro: str = ""
    enviando: bool = False

    pedidos: list[PedidoLoja] = []
    carregando_pedidos: bool = False
    erro_pedidos: str = ""
    # Número do pedido recém-criado (mostra a confirmação em /conta).
    pedido_confirmado: int = 0

    erro_pedido: str = ""
    enviando_pedido: bool = False

    @rx.var
    def logado(self) -> bool:
        return self.token != ""

    @rx.var
    def primeiro_nome(self) -> str:
        return self.nome.split()[0] if self.nome.split() else ""

    def _proximo(self) -> str:
        return destino_seguro(self.router.url.query_parameters.get("proximo", ""))

    def _entrar_com(self, resposta: dict[str, Any]):
        self.token = resposta["authToken"]
        cliente = resposta.get("cliente") or {}
        self.nome = cliente.get("nome") or ""
        self.email = cliente.get("email") or ""

    def _sair(self):
        self.token = ""
        self.nome = ""
        self.email = ""
        self.pedidos = []

    # --- Entrar / criar conta -------------------------------------------------

    @rx.event
    def load_entrar(self):
        self.erro_entrar = ""
        self.erro_cadastro = ""
        self.enviando = False
        if self.token:
            return rx.redirect(self._proximo())

    @rx.event
    def entrar(self, form_data: dict):
        email = str(form_data.get("email") or "").strip()
        senha = str(form_data.get("senha") or "")
        if not email or not senha:
            self.erro_entrar = "Informe e-mail e senha."
            return
        self.enviando = True
        self.erro_entrar = ""
        yield
        try:
            self._entrar_com(xano_client.customer_login(email, senha))
        except xano_client.XanoAPIError as erro:
            self.enviando = False
            self.erro_entrar = MENSAGEM_FALHA if erro.is_network_error or (erro.status_code or 0) >= 500 else erro.message
            return
        self.enviando = False
        yield rx.redirect(self._proximo())

    @rx.event
    def cadastrar(self, form_data: dict):
        nome = str(form_data.get("nome") or "").strip()
        email = str(form_data.get("email") or "").strip()
        senha = str(form_data.get("senha") or "")
        telefone = str(form_data.get("telefone") or "")
        if not nome or not email or not senha:
            self.erro_cadastro = "Preencha nome, e-mail e senha."
            return
        self.enviando = True
        self.erro_cadastro = ""
        yield
        try:
            self._entrar_com(xano_client.customer_signup(nome, email, senha, telefone))
        except xano_client.XanoAPIError as erro:
            self.enviando = False
            self.erro_cadastro = MENSAGEM_FALHA if erro.is_network_error or (erro.status_code or 0) >= 500 else erro.message
            return
        self.enviando = False
        yield rx.redirect(self._proximo())

    @rx.event
    def sair(self):
        self._sair()
        return rx.redirect(routes.LOJA_HOME)

    # --- Minha conta ----------------------------------------------------------

    @rx.event
    def load_conta(self):
        if not self.token:
            return rx.redirect(href_entrar(routes.LOJA_CONTA))
        pedido = self.router.url.query_parameters.get("pedido", "")
        self.pedido_confirmado = int(pedido) if pedido.isdigit() else 0
        self.carregando_pedidos = True
        self.erro_pedidos = ""
        yield
        try:
            cliente = xano_client.get_customer(self.token)
            self.nome = cliente.get("nome") or ""
            self.email = cliente.get("email") or ""
            self.pedidos = [pedido_da_api(p) for p in xano_client.list_orders(self.token) or []]
        except xano_client.XanoAPIError as erro:
            self.carregando_pedidos = False
            if erro.status_code == 401:
                # Sessão expirada: pede login de novo.
                self._sair()
                yield rx.redirect(href_entrar(routes.LOJA_CONTA))
                return
            self.erro_pedidos = "Não foi possível carregar seus pedidos agora."
            return
        self.carregando_pedidos = False

    # --- Finalizar pedido (página do carrinho) -------------------------------

    @rx.event
    def load_carrinho(self):
        self.erro_pedido = ""
        self.enviando_pedido = False

    @rx.event
    async def finalizar_pedido(self):
        if not self.token:
            yield rx.redirect(href_entrar(routes.LOJA_CARRINHO))
            return
        carrinho = await self.get_state(CarrinhoState)
        itens = ler_itens(carrinho.salvo)
        if not itens:
            return
        self.enviando_pedido = True
        self.erro_pedido = ""
        yield
        try:
            pedido = xano_client.create_order(self.token, itens_para_pedido(itens))
        except xano_client.XanoAPIError as erro:
            self.enviando_pedido = False
            if erro.status_code == 401:
                self._sair()
                yield rx.redirect(href_entrar(routes.LOJA_CARRINHO))
                return
            if erro.is_network_error:
                # O pedido pode ter sido criado mesmo sem resposta: não repetir
                # às cegas.
                self.erro_pedido = (
                    "A conexão caiu antes da confirmação. Confira em Minha conta se o pedido "
                    "foi registrado antes de tentar de novo."
                )
            else:
                self.erro_pedido = erro.message
            return
        carrinho = await self.get_state(CarrinhoState)
        carrinho.esvaziar()
        self.enviando_pedido = False
        yield rx.redirect(f"{routes.LOJA_CONTA}?{urlencode({'pedido': pedido['id']})}")
