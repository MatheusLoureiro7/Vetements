"""Testes das regras do pagamento simulado da loja.

Cobrem o requisito `specs/storefront` (Pagamento simulado na loja):
validação do cartão antes de enviar, corpo enviado ao backend só com o
final do cartão, e o texto do pagamento em "Minha conta".
"""

from datetime import date

import pytest

from vetements.loja.state.conta import pagamento_label, pedido_da_api
from vetements.loja.state.pagamento import dados_pagamento, validar_cartao

HOJE = date(2026, 11, 9)
VALIDO = dict(numero="4111 1111 1111 4242", nome="Cliente Teste", validade="12/30", cvv="123", parcelas="3")


def _erros(**troca):
    return validar_cartao(**{**VALIDO, **troca, "hoje": HOJE})


def test_cartao_valido_nao_tem_erros():
    assert _erros() == {}


@pytest.mark.parametrize("numero", ["", "1234", "4111-1111-abcd-4242", "1" * 20])
def test_numero_invalido(numero):
    assert "numero" in _erros(numero=numero)


def test_numero_aceita_espacos_e_tracos():
    assert _erros(numero="4111-1111-1111-4242") == {}


def test_nome_obrigatorio():
    assert "nome" in _erros(nome="   ")


@pytest.mark.parametrize("validade", ["", "1230", "13/30", "00/30", "1/30"])
def test_validade_em_formato_errado(validade):
    assert _erros(validade=validade)["validade"] == "Use o formato MM/AA."


def test_validade_vencida():
    assert _erros(validade="10/26")["validade"] == "Cartão vencido."


def test_validade_do_mes_atual_ainda_vale():
    assert "validade" not in _erros(validade="11/26")


@pytest.mark.parametrize("cvv", ["", "12", "12345", "abc"])
def test_cvv_invalido(cvv):
    assert "cvv" in _erros(cvv=cvv)


@pytest.mark.parametrize("parcelas", ["0", "7", "", "x"])
def test_parcelas_fora_de_1_a_6(parcelas):
    assert "parcelas" in _erros(parcelas=parcelas)


def test_cartao_envia_so_o_final_e_as_parcelas():
    assert dados_pagamento("cartao", "4111 1111 1111 4242", "3") == {
        "forma_pagamento": "cartao",
        "parcelas": 3,
        "cartao_final": "4242",
    }


@pytest.mark.parametrize("forma", ["pix", "boleto"])
def test_pix_e_boleto_nao_enviam_dados_de_cartao(forma):
    assert dados_pagamento(forma, "4111 1111 1111 4242", "3") == {"forma_pagamento": forma}


@pytest.mark.parametrize(
    "forma,parcelas,final,esperado",
    [
        ("pix", 0, "", "Pix"),
        ("boleto", 0, "", "Boleto"),
        ("cartao", 3, "4242", "Cartão 3x · final 4242"),
        (None, None, None, "Pagamento não informado"),
    ],
)
def test_pagamento_label(forma, parcelas, final, esperado):
    assert pagamento_label(forma, parcelas, final) == esperado


def test_pedido_antigo_sem_pagamento():
    pedido = pedido_da_api({"id": 3, "created_at": "2026-10-21T10:00:00Z", "total": 10, "itens": []})
    assert pedido.pagamento_label == "Pagamento não informado"
