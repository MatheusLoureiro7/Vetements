"""Testes do cliente HTTP central (`vetements/xano_client.py`)."""

import httpx
import pytest

from vetements import xano_client as client


@pytest.fixture(autouse=True)
def sem_espera(monkeypatch):
    """Registra as esperas entre tentativas sem dormir de verdade."""
    esperas: list[float] = []
    monkeypatch.setattr(client.time, "sleep", esperas.append)
    return esperas


def _sequencia(monkeypatch, *resultados):
    """Faz `_client.request` devolver (ou levantar) cada item em ordem."""
    chamadas = []

    def fake_request(method, url, **kwargs):
        chamadas.append(method)
        resultado = resultados[len(chamadas) - 1]
        if isinstance(resultado, Exception):
            raise resultado
        return resultado

    monkeypatch.setattr(client._client, "request", fake_request)
    return chamadas


class _FakeResponse:
    def __init__(self, status_code: int, payload: dict | None = None):
        self.status_code = status_code
        self._payload = payload or {}
        self.content = b"{}" if payload is not None else b""

    def json(self):
        return self._payload


def test_resposta_de_erro_do_xano_vira_xano_api_error(monkeypatch):
    def fake_request(method, url, **kwargs):
        return _FakeResponse(403, {"code": "ERROR_CODE_ACCESS_DENIED", "message": "Invalid Credentials."})

    monkeypatch.setattr(client._client, "request", fake_request)

    with pytest.raises(client.XanoAPIError) as exc_info:
        client.login("nao-existe@teste.com", "senha")

    assert exc_info.value.status_code == 403
    assert exc_info.value.message == "Invalid Credentials."
    assert exc_info.value.is_network_error is False


def test_falha_de_rede_vira_xano_api_error_sem_status_code(monkeypatch):
    def fake_request(method, url, **kwargs):
        raise httpx.ConnectError("connection refused")

    monkeypatch.setattr(client._client, "request", fake_request)

    with pytest.raises(client.XanoAPIError) as exc_info:
        client.login("qualquer@teste.com", "senha")

    assert exc_info.value.status_code is None
    assert exc_info.value.is_network_error is True


def test_resposta_com_sucesso_retorna_json_decodificado(monkeypatch):
    def fake_request(method, url, **kwargs):
        return _FakeResponse(200, {"authToken": "abc", "user_id": 1})

    monkeypatch.setattr(client._client, "request", fake_request)

    resultado = client.login("admin@vetements.com", "senha")

    assert resultado == {"authToken": "abc", "user_id": 1}


# --- Novas tentativas ------------------------------------------------------


def test_get_repete_apos_falha_de_rede(monkeypatch, sem_espera):
    chamadas = _sequencia(
        monkeypatch, httpx.ReadTimeout("lento"), _FakeResponse(200, {"id": 1})
    )

    assert client.me("token") == {"id": 1}
    assert len(chamadas) == 2
    assert sem_espera == [0.5]


def test_get_repete_apos_503(monkeypatch, sem_espera):
    chamadas = _sequencia(monkeypatch, _FakeResponse(503), _FakeResponse(200, {"id": 1}))

    assert client.me("token") == {"id": 1}
    assert len(chamadas) == 2


def test_get_desiste_apos_tres_tentativas(monkeypatch, sem_espera):
    chamadas = _sequencia(monkeypatch, *[httpx.ConnectError("sem rede")] * 3)

    with pytest.raises(client.XanoAPIError) as exc_info:
        client.list_variants("token")

    assert exc_info.value.is_network_error is True
    assert len(chamadas) == 3
    assert sem_espera == [0.5, 1.0]


def test_get_com_erro_de_cliente_nao_repete(monkeypatch, sem_espera):
    chamadas = _sequencia(monkeypatch, _FakeResponse(403, {"message": "Acesso negado."}))

    with pytest.raises(client.XanoAPIError) as exc_info:
        client.me("token")

    assert exc_info.value.status_code == 403
    assert len(chamadas) == 1
    assert sem_espera == []


def test_post_repete_quando_nao_conseguiu_conectar(monkeypatch, sem_espera):
    chamadas = _sequencia(
        monkeypatch, httpx.ConnectError("sem rede"), _FakeResponse(200, {"id": 7})
    )

    assert client.create_customer("token", "Ana") == {"id": 7}
    assert chamadas == ["POST", "POST"]


def test_post_com_timeout_de_leitura_nao_repete(monkeypatch, sem_espera):
    chamadas = _sequencia(monkeypatch, httpx.ReadTimeout("lento"))

    with pytest.raises(client.XanoAPIError) as exc_info:
        client.create_sale("token", None, [{"variacao_id": 1, "quantidade": 1}])

    assert exc_info.value.is_network_error is True
    assert len(chamadas) == 1


def test_post_com_503_nao_repete(monkeypatch, sem_espera):
    chamadas = _sequencia(monkeypatch, _FakeResponse(503))

    with pytest.raises(client.XanoAPIError) as exc_info:
        client.create_customer("token", "Ana")

    assert exc_info.value.status_code == 503
    assert len(chamadas) == 1


def test_cliente_compartilhado_usa_timeouts_separados():
    assert client._client.timeout.connect == 5.0
    assert client._client.timeout.read == 15.0


# --- API pública da loja -------------------------------------------------


def _captura(monkeypatch, resposta):
    """Faz `_client.request` devolver `resposta` e registra cada chamada."""
    chamadas = []

    def fake_request(method, url, **kwargs):
        chamadas.append({"method": method, "url": url, **kwargs})
        return resposta

    monkeypatch.setattr(client._client, "request", fake_request)
    return chamadas


def test_produtos_publicos_sem_filtro_nao_envia_parametros_nem_token(monkeypatch):
    chamadas = _captura(monkeypatch, _FakeResponse(200, []))

    client.list_public_products()

    assert chamadas[0]["method"] == "GET"
    assert chamadas[0]["url"].endswith(f"/api:{client._GROUP_LOJA}/loja/produtos")
    assert chamadas[0]["params"] is None
    assert "Authorization" not in chamadas[0]["headers"]


def test_produtos_publicos_repassa_categoria_e_busca(monkeypatch):
    chamadas = _captura(monkeypatch, _FakeResponse(200, []))

    client.list_public_products(categoria_id=3, q="  basica ")

    assert chamadas[0]["params"] == {"categoria_id": 3, "q": "basica"}


def test_produtos_publicos_busca_em_branco_nao_e_enviada(monkeypatch):
    chamadas = _captura(monkeypatch, _FakeResponse(200, []))

    client.list_public_products(q="   ")

    assert chamadas[0]["params"] is None


def test_categorias_publicas_sem_token(monkeypatch):
    chamadas = _captura(monkeypatch, _FakeResponse(200, [{"id": 1, "nome": "Camisetas"}]))

    assert client.list_public_categories() == [{"id": 1, "nome": "Camisetas"}]
    assert chamadas[0]["url"].endswith("/loja/categorias")
    assert "Authorization" not in chamadas[0]["headers"]


def test_detalhe_publico_inexistente_vira_erro_404(monkeypatch):
    chamadas = _captura(monkeypatch, _FakeResponse(404, {"message": "Produto não encontrado."}))

    with pytest.raises(client.XanoAPIError) as exc_info:
        client.get_public_product(99)

    assert chamadas[0]["url"].endswith("/loja/produtos/99")
    assert "Authorization" not in chamadas[0]["headers"]
    assert exc_info.value.status_code == 404


# --- Conta de cliente e pedidos da loja ----------------------------------


def test_cadastro_de_cliente_e_publico_e_omite_telefone_vazio(monkeypatch):
    chamadas = _captura(monkeypatch, _FakeResponse(200, {"authToken": "t", "cliente": {"id": 1}}))

    client.customer_signup("Ana", "ana@exemplo.com", "abcd1234", telefone="  ")

    assert chamadas[0]["method"] == "POST"
    assert chamadas[0]["url"].endswith(f"/api:{client._GROUP_LOJA}/loja/conta/cadastro")
    assert chamadas[0]["json"] == {"nome": "Ana", "email": "ana@exemplo.com", "senha": "abcd1234"}
    assert "Authorization" not in chamadas[0]["headers"]


def test_pedido_envia_token_de_cliente_e_itens(monkeypatch):
    chamadas = _captura(monkeypatch, _FakeResponse(200, {"id": 9, "total": 10, "itens": []}))

    client.create_order("tok", [{"variacao_id": 3, "quantidade": 2}])

    assert chamadas[0]["url"].endswith("/loja/pedidos")
    assert chamadas[0]["headers"] == {"Authorization": "Bearer tok"}
    assert chamadas[0]["json"] == {"itens": [{"variacao_id": 3, "quantidade": 2}]}


def test_pedido_com_falha_de_leitura_nao_e_repetido(monkeypatch, sem_espera):
    """Repetir um POST de pedido poderia criar o pedido duas vezes."""
    chamadas = _sequencia(monkeypatch, httpx.ReadTimeout("lento"))

    with pytest.raises(client.XanoAPIError):
        client.create_order("tok", [{"variacao_id": 3, "quantidade": 1}])

    assert len(chamadas) == 1
