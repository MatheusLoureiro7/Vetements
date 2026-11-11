"""Testes da tela de usuários da equipe (spec auth: Tela de usuários da
equipe) e dos métodos do cliente do Xano usados por ela."""

from datetime import datetime

import pytest

from vetements import xano_client as client
from vetements.state.users import rotulo_papel, rotulo_status, rotulo_ultimo_login, usuario_da_api

_TS = int(datetime(2026, 11, 11, 9, 30).timestamp() * 1000)


def test_rotulos_de_papel():
    assert rotulo_papel("administrador") == "Administrador"
    assert rotulo_papel("vendedor") == "Vendedor"


@pytest.mark.parametrize(("ativo", "esperado"), [(True, "Ativo"), (None, "Ativo"), (False, "Desativado")])
def test_status_sem_valor_conta_como_ativo(ativo, esperado):
    assert rotulo_status(ativo) == esperado


def test_ultimo_login():
    assert rotulo_ultimo_login(_TS) == "11/11/2026 09:30"
    assert rotulo_ultimo_login(None) == "Nunca entrou"
    assert rotulo_ultimo_login(0) == "Nunca entrou"


def test_usuario_da_api_marca_voce():
    dados = {"id": 3, "name": "Ana", "email": "ana@x.com", "role": "administrador", "ativo": True, "ultimo_login_em": None}
    eu = usuario_da_api(dados, meu_id=3)
    outro = usuario_da_api(dados | {"id": 4, "ativo": False}, meu_id=3)
    assert eu.e_voce and eu.ativo and eu.papel_label == "Administrador" and eu.ultimo_login_label == "Nunca entrou"
    assert not outro.e_voce and not outro.ativo and outro.status_label == "Desativado"


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


def test_chamadas_de_usuarios(chamadas):
    client.create_user("tok", " Ana ", " ana@x.com ", "senha1234", "vendedor")
    client.update_user("tok", 5, "Ana", "ana@x.com", "administrador")
    client.set_user_password("tok", 5, "novaSenha1")
    client.set_user_active("tok", 5, False)
    assert chamadas[0]["url"].endswith("/auth/signup")
    assert chamadas[0]["json"] == {"name": "Ana", "email": "ana@x.com", "password": "senha1234", "role": "vendedor"}
    assert (chamadas[1]["method"], chamadas[1]["url"].rsplit("/", 2)[-2:]) == ("PATCH", ["usuarios", "5"])
    assert chamadas[2]["url"].endswith("/usuarios/5/senha") and chamadas[2]["json"] == {"senha": "novaSenha1"}
    assert chamadas[3]["url"].endswith("/usuarios/5/ativo") and chamadas[3]["json"] == {"ativo": False}
    assert all(c["headers"] == {"Authorization": "Bearer tok"} for c in chamadas)
