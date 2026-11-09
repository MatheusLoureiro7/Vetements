"""Testes das partes puras do status do pedido da loja (specs sales:
Status do pedido na tela de Vendas; storefront: Minha conta) e do método
do cliente do Xano que avança o status."""

from datetime import datetime

import pytest

from vetements import xano_client as client
from vetements.loja.state.conta import pedido_da_api, status_pedido_label
from vetements.state.sales import proximo_status, rotulo_acao, rotulo_status, status_efetivo

# 10/11/2026 12:00 no horário local, em milissegundos (formato do Xano).
_TS = int(datetime(2026, 11, 10, 12, 0).timestamp() * 1000)


@pytest.mark.parametrize(
    ("venda", "esperado"),
    [
        ({"origem": "balcao"}, ""),
        ({"origem": "balcao", "status_pedido": "pago"}, ""),
        ({"origem": "loja_virtual"}, "pago"),
        ({"origem": "loja_virtual", "status_pedido": ""}, "pago"),
        ({"origem": "loja_virtual", "status_pedido": "enviado"}, "enviado"),
        ({"origem": "loja_virtual", "status_pedido": "entregue"}, "entregue"),
    ],
)
def test_status_efetivo(venda, esperado):
    assert status_efetivo(venda) == esperado


@pytest.mark.parametrize(
    ("status", "rotulo", "proximo", "acao"),
    [
        ("pago", "Pago", "enviado", "Marcar como enviado"),
        ("enviado", "Enviado", "entregue", "Marcar como entregue"),
        ("entregue", "Entregue", "", ""),
        ("", "—", "", ""),
    ],
)
def test_rotulos_e_proximo_passo(status, rotulo, proximo, acao):
    assert rotulo_status(status) == rotulo
    assert proximo_status(status) == proximo
    assert rotulo_acao(proximo_status(status)) == acao


@pytest.mark.parametrize(
    ("status", "enviado_em", "entregue_em", "esperado"),
    [
        (None, None, None, "Pago"),
        ("", 0, 0, "Pago"),
        ("pago", 0, 0, "Pago"),
        ("enviado", _TS, 0, "Enviado em 10/11/2026"),
        ("entregue", _TS, _TS, "Entregue em 10/11/2026"),
        ("enviado", 0, 0, "Enviado"),
    ],
)
def test_status_em_minha_conta(status, enviado_em, entregue_em, esperado):
    assert status_pedido_label(status, enviado_em, entregue_em) == esperado


def test_pedido_da_api_traz_status():
    pedido = pedido_da_api({"id": 3, "total": 10, "status_pedido": "enviado", "enviado_em": _TS, "entregue_em": 0})
    assert pedido.status_label == "Enviado em 10/11/2026"


class _Resposta:
    status_code = 200
    content = b"{}"

    def json(self):
        return {}


def test_update_order_status_envia_passo_com_token(monkeypatch):
    chamadas = []

    def fake_request(method, url, **kwargs):
        chamadas.append({"method": method, "url": url, **kwargs})
        return _Resposta()

    monkeypatch.setattr(client._client, "request", fake_request)
    client.update_order_status("tok", 17, "enviado")
    assert chamadas[0]["method"] == "POST"
    assert chamadas[0]["url"].endswith("/vendas/17/status")
    assert chamadas[0]["headers"] == {"Authorization": "Bearer tok"}
    assert chamadas[0]["json"] == {"status": "enviado"}
