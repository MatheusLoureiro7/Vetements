"""Testes do cálculo do ajuste de estoque da tela de Estoque.

Cobrem o requisito `specs/inventory` (Validação do ajuste antes de
enviar / Ajuste de estoque na tela de Estoque): Entrada soma, Saída
subtrai, Contagem usa a diferença, e valores inválidos não geram envio.
"""

import pytest

from vetements.state.inventory import calcular_ajuste


def test_entrada_soma_a_quantidade():
    assert calcular_ajuste("entrada", "10", 5) == (10, "")


def test_saida_subtrai_a_quantidade():
    assert calcular_ajuste("saida", " 3 ", 5) == (-3, "")


def test_saida_pode_zerar_o_estoque():
    assert calcular_ajuste("saida", "5", 5) == (-5, "")


def test_saida_maior_que_o_estoque_e_recusada():
    ajuste, erro = calcular_ajuste("saida", "8", 5)
    assert ajuste == 0
    assert "há 5 unidade(s)" in erro


def test_contagem_calcula_a_diferenca():
    assert calcular_ajuste("contagem", "3", 5) == (-2, "")
    assert calcular_ajuste("contagem", "9", 5) == (4, "")


def test_contagem_zero_zera_o_estoque():
    assert calcular_ajuste("contagem", "0", 5) == (-5, "")


def test_contagem_igual_ao_atual_nao_tem_o_que_ajustar():
    ajuste, erro = calcular_ajuste("contagem", "5", 5)
    assert ajuste == 0
    assert "igual ao estoque atual" in erro


def test_contagem_negativa_e_recusada():
    assert calcular_ajuste("contagem", "-1", 5)[1] != ""


@pytest.mark.parametrize("tipo", ["entrada", "saida", "contagem"])
@pytest.mark.parametrize("texto", ["", "   ", "abc", "2,5", "1.5"])
def test_texto_que_nao_e_inteiro_e_recusado(tipo, texto):
    assert calcular_ajuste(tipo, texto, 5) == (0, "Informe um número inteiro.")


@pytest.mark.parametrize("tipo", ["entrada", "saida"])
@pytest.mark.parametrize("texto", ["0", "-2"])
def test_entrada_e_saida_exigem_quantidade_positiva(tipo, texto):
    assert calcular_ajuste(tipo, texto, 5) == (0, "Informe uma quantidade maior que zero.")
