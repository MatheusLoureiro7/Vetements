"""Testes do cliente HTTP central (`vetements/xano_client.py`)."""

import httpx
import pytest

from vetements import xano_client as client


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

    monkeypatch.setattr(httpx, "request", fake_request)

    with pytest.raises(client.XanoAPIError) as exc_info:
        client.login("nao-existe@teste.com", "senha")

    assert exc_info.value.status_code == 403
    assert exc_info.value.message == "Invalid Credentials."
    assert exc_info.value.is_network_error is False


def test_falha_de_rede_vira_xano_api_error_sem_status_code(monkeypatch):
    def fake_request(method, url, **kwargs):
        raise httpx.ConnectError("connection refused")

    monkeypatch.setattr(httpx, "request", fake_request)

    with pytest.raises(client.XanoAPIError) as exc_info:
        client.login("qualquer@teste.com", "senha")

    assert exc_info.value.status_code is None
    assert exc_info.value.is_network_error is True


def test_resposta_com_sucesso_retorna_json_decodificado(monkeypatch):
    def fake_request(method, url, **kwargs):
        return _FakeResponse(200, {"authToken": "abc", "user_id": 1})

    monkeypatch.setattr(httpx, "request", fake_request)

    resultado = client.login("admin@vetements.com", "senha")

    assert resultado == {"authToken": "abc", "user_id": 1}
