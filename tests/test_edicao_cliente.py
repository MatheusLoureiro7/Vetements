"""Testes da edição de cliente na gestão (spec customers: Edição de
cliente na tela de Clientes) e do método do cliente do Xano."""

from vetements import xano_client as client
from vetements.state.customers import AVISO_EDITADO, AVISO_RECONFIRMAR, aviso_edicao


def test_aviso_simples():
    assert aviso_edicao({"reconfirmar_email": False}) == AVISO_EDITADO
    assert aviso_edicao({}) == AVISO_EDITADO


def test_aviso_quando_cliente_precisa_reconfirmar():
    assert aviso_edicao({"reconfirmar_email": True}) == AVISO_RECONFIRMAR
    assert "confirmar o novo e-mail" in AVISO_RECONFIRMAR


class _Resposta:
    status_code = 200
    content = b"{}"

    def json(self):
        return {}


def test_update_customer_manda_os_tres_campos(monkeypatch):
    chamadas = []

    def fake_request(method, url, **kwargs):
        chamadas.append({"method": method, "url": url, **kwargs})
        return _Resposta()

    monkeypatch.setattr(client._client, "request", fake_request)
    client.update_customer("tok", 5, " Ana ", "", " ana@ex.com ")
    assert chamadas[0]["method"] == "PATCH"
    assert chamadas[0]["url"].endswith("/clientes/5")
    assert chamadas[0]["headers"] == {"Authorization": "Bearer tok"}
    assert chamadas[0]["json"] == {"nome": "Ana", "telefone": "", "email": "ana@ex.com"}
