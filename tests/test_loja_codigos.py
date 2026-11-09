"""Testes das partes puras dos códigos por e-mail da loja (spec
storefront: Página de confirmação de e-mail / Página de recuperação de
senha) e dos métodos do cliente do Xano usados por elas."""

from urllib.parse import parse_qs, urlparse

import pytest

from vetements import routes
from vetements import xano_client as client
from vetements.loja.state.codigos import codigo_valido, mensagem_de_erro
from vetements.loja.state.conta import href_confirmar


@pytest.mark.parametrize("texto", ["123456", " 654321 "])
def test_codigo_de_6_digitos_e_valido(texto):
    assert codigo_valido(texto)


@pytest.mark.parametrize("texto", ["", "12345", "1234567", "12a456", "12 456"])
def test_codigo_invalido(texto):
    assert not codigo_valido(texto)


def test_href_confirmar_preserva_destino():
    url = urlparse(href_confirmar(routes.LOJA_PAGAMENTO))
    assert url.path == routes.LOJA_CONFIRMAR
    assert parse_qs(url.query) == {"proximo": [routes.LOJA_PAGAMENTO]}


def test_href_confirmar_avisa_quando_codigo_nao_saiu():
    url = urlparse(href_confirmar("", enviado=False))
    assert parse_qs(url.query) == {"enviado": ["0"]}


def test_href_confirmar_sem_parametros():
    assert href_confirmar() == routes.LOJA_CONFIRMAR


def test_erro_de_negocio_mostra_mensagem_do_backend():
    erro = client.XanoAPIError("Código inválido ou vencido. Peça um novo código.", status_code=400)
    assert mensagem_de_erro(erro) == "Código inválido ou vencido. Peça um novo código."


def test_falha_de_rede_vira_mensagem_amigavel():
    assert mensagem_de_erro(client.XanoAPIError("timeout")) != "timeout"


class _Resposta:
    status_code = 200
    content = b"{}"

    def json(self):
        return {}


@pytest.fixture
def chamadas(monkeypatch):
    registro = []

    def fake_request(method, url, **kwargs):
        registro.append({"method": method, "url": url, **kwargs})
        return _Resposta()

    monkeypatch.setattr(client._client, "request", fake_request)
    return registro


def test_confirmar_email_envia_codigo_com_token(chamadas):
    client.confirm_email("tok", "123456")
    assert chamadas[0]["url"].endswith("/loja/conta/confirmar-email")
    assert chamadas[0]["headers"] == {"Authorization": "Bearer tok"}
    assert chamadas[0]["json"] == {"codigo": "123456"}


def test_esqueci_senha_e_redefinir_sao_publicos(chamadas):
    client.request_password_reset("ana@exemplo.com")
    client.reset_password("ana@exemplo.com", "123456", "novaSenha1")
    assert chamadas[0]["url"].endswith("/loja/conta/esqueci-senha")
    assert chamadas[1]["url"].endswith("/loja/conta/redefinir-senha")
    assert chamadas[1]["json"] == {"email": "ana@exemplo.com", "codigo": "123456", "nova_senha": "novaSenha1"}
    assert all("Authorization" not in c["headers"] for c in chamadas)
