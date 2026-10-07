"""Cliente HTTP central para a API do Xano.

Cada `state/*.py` chama as funções deste módulo em vez de acessar
`mock_data` diretamente. Erros de rede e respostas de erro do Xano
(4xx/5xx) são convertidos em `XanoAPIError`, capturada pelos states
para popular uma var `error` exibida na tela correspondente.

A URL base da instância e o alias de cada grupo de API são
configuráveis por variável de ambiente; os valores padrão são os do
workspace `vetements` (id 166854) já provisionado.

Para tolerar oscilações de internet, todas as chamadas usam um único
`httpx.Client` (reaproveita conexões) e falhas transitórias são repetidas
automaticamente — GETs em qualquer erro de rede ou 429/502/503/504; demais
métodos só quando a conexão nem chegou a ser estabelecida, para nunca
duplicar uma escrita.
"""

from __future__ import annotations

import os
import time
from typing import Any

import httpx

_INSTANCE = os.environ.get(
    "XANO_INSTANCE_URL", "https://x8ki-letl-twmt.n7.xano.io"
).rstrip("/")

# Alias ("canonical") de cada grupo de API no workspace do Xano.
_GROUP_AUTH = os.environ.get("XANO_GROUP_AUTHENTICATION", "nM8-AXX2")
_GROUP_CATALOGO = os.environ.get("XANO_GROUP_CATALOGO", "0qUs2gU9")
_GROUP_CLIENTES = os.environ.get("XANO_GROUP_CLIENTES", "SRU11Lom")
_GROUP_VENDAS = os.environ.get("XANO_GROUP_VENDAS", "7qxaAH55")

_TIMEOUT = httpx.Timeout(15.0, connect=5.0)

_MAX_TENTATIVAS = 3
_ESPERA_INICIAL = 0.5  # segundos; dobra a cada nova tentativa
_STATUS_TRANSITORIOS = {429, 502, 503, 504}

# Cliente compartilhado: mantém as conexões abertas (keep-alive) entre
# requisições, evitando um handshake TLS novo a cada chamada.
_client = httpx.Client(timeout=_TIMEOUT)


class XanoAPIError(Exception):
    """Erro retornado pela API do Xano, ou falha de comunicação com ela."""

    def __init__(self, message: str, status_code: int | None = None):
        super().__init__(message)
        self.message = message
        self.status_code = status_code

    @property
    def is_network_error(self) -> bool:
        """True quando a falha foi de rede/timeout, não uma resposta do Xano."""
        return self.status_code is None


def _url(group_alias: str, path: str) -> str:
    return f"{_INSTANCE}/api:{group_alias}/{path.lstrip('/')}"


def _extract_error_message(response: httpx.Response) -> str:
    try:
        data = response.json()
    except ValueError:
        return f"Erro do servidor ({response.status_code})."
    if isinstance(data, dict) and data.get("message"):
        return str(data["message"])
    return f"Erro do servidor ({response.status_code})."


def _request(
    method: str,
    group_alias: str,
    path: str,
    *,
    token: str | None = None,
    json_body: dict[str, Any] | None = None,
    params: dict[str, Any] | None = None,
) -> Any:
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    idempotente = method.upper() == "GET"
    tentativa = 1
    while True:
        try:
            response = _client.request(
                method,
                _url(group_alias, path),
                headers=headers,
                json=json_body,
                params=params,
            )
        except httpx.RequestError as erro:
            # ConnectError/ConnectTimeout garantem que nada foi enviado, então
            # repetir é seguro até para escritas.
            pode_repetir = isinstance(erro, (httpx.ConnectError, httpx.ConnectTimeout)) or (
                idempotente and isinstance(erro, httpx.TransportError)
            )
            if pode_repetir and tentativa < _MAX_TENTATIVAS:
                time.sleep(_ESPERA_INICIAL * 2 ** (tentativa - 1))
                tentativa += 1
                continue
            raise XanoAPIError(f"Falha de comunicação com o servidor: {erro}") from erro

        if (
            idempotente
            and response.status_code in _STATUS_TRANSITORIOS
            and tentativa < _MAX_TENTATIVAS
        ):
            time.sleep(_ESPERA_INICIAL * 2 ** (tentativa - 1))
            tentativa += 1
            continue
        break

    if response.status_code >= 400:
        raise XanoAPIError(_extract_error_message(response), status_code=response.status_code)

    if not response.content:
        return None
    return response.json()


# --- Autenticação --------------------------------------------------------


def login(email: str, senha: str) -> dict[str, Any]:
    """Retorna `{"authToken": str, "user_id": int}`."""
    return _request(
        "POST", _GROUP_AUTH, "auth/login", json_body={"email": email, "password": senha}
    )


def me(token: str) -> dict[str, Any]:
    """Retorna `{"id","created_at","name","email","role"}` do usuário do token."""
    return _request("GET", _GROUP_AUTH, "auth/me", token=token)


# --- Categorias / Produtos / Variações ------------------------------------


def list_categories(token: str) -> list[dict[str, Any]]:
    return _request("GET", _GROUP_CATALOGO, "categorias", token=token)


def create_category(token: str, nome: str) -> dict[str, Any]:
    return _request("POST", _GROUP_CATALOGO, "categorias", token=token, json_body={"nome": nome})


def list_products(token: str, q: str = "") -> list[dict[str, Any]]:
    return _request(
        "GET", _GROUP_CATALOGO, "produtos", token=token, params={"q": q} if q else None
    )


def create_product(
    token: str, nome: str, descricao: str, categoria_id: int, preco_base: float
) -> dict[str, Any]:
    return _request(
        "POST",
        _GROUP_CATALOGO,
        "produtos",
        token=token,
        json_body={
            "nome": nome,
            "descricao": descricao,
            "categoria_id": categoria_id,
            "preco_base": preco_base,
        },
    )


def list_variants(token: str) -> list[dict[str, Any]]:
    return _request("GET", _GROUP_CATALOGO, "variacoes", token=token)


def create_variant(
    token: str, produto_id: int, tamanho: str, cor: str, sku: str, estoque: int
) -> dict[str, Any]:
    return _request(
        "POST",
        _GROUP_CATALOGO,
        f"produtos/{produto_id}/variacoes",
        token=token,
        json_body={"tamanho": tamanho, "cor": cor, "sku": sku, "estoque": estoque},
    )


# --- Clientes --------------------------------------------------------------


def list_customers(token: str, q: str = "") -> list[dict[str, Any]]:
    return _request(
        "GET", _GROUP_CLIENTES, "clientes", token=token, params={"q": q} if q else None
    )


def create_customer(token: str, nome: str, telefone: str = "", email: str = "") -> dict[str, Any]:
    body: dict[str, Any] = {"nome": nome}
    if telefone:
        body["telefone"] = telefone
    if email:
        body["email"] = email
    return _request("POST", _GROUP_CLIENTES, "clientes", token=token, json_body=body)


# --- Vendas ------------------------------------------------------------


def list_sales(token: str, limit: int = 50) -> list[dict[str, Any]]:
    """Retorna a lista de vendas (cada uma com sua lista de `itens`).

    O endpoint pagina a resposta (`{"items": [...], "itemsReceived": ..., ...}`)
    — aqui já desembrulhado para a lista simples que os states esperam.
    """
    resultado = _request("GET", _GROUP_VENDAS, "vendas", token=token, params={"limit": limit})
    return resultado.get("items", []) if isinstance(resultado, dict) else resultado


def create_sale(
    token: str, cliente_id: int | None, itens: list[dict[str, Any]]
) -> dict[str, Any]:
    body: dict[str, Any] = {"itens": itens}
    if cliente_id is not None:
        body["cliente_id"] = cliente_id
    return _request("POST", _GROUP_VENDAS, "venda", token=token, json_body=body)
