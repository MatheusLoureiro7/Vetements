"""Testes da validação do formulário de cadastro de produto.

Cobrem o requisito `specs/product-catalog` (Cadastro de produto): nome
e categoria obrigatórios, preço base numérico e não negativo, com o
erro indicado por campo e vários erros reportados na mesma tentativa.
"""

import pytest

from vetements.state.products import validate_product_form


def test_formulario_valido_nao_tem_erros_e_converte_o_preco():
    erros, preco = validate_product_form("Camiseta Básica", "3", "49.90")
    assert erros == {}
    assert preco == 49.90


@pytest.mark.parametrize("nome", ["", "   "])
def test_nome_vazio_ou_so_espacos_e_erro_de_nome(nome):
    erros, _ = validate_product_form(nome, "3", "49.90")
    assert set(erros) == {"nome"}


def test_categoria_vazia_e_erro_de_categoria():
    erros, _ = validate_product_form("Camiseta", "", "49.90")
    assert set(erros) == {"categoria"}


@pytest.mark.parametrize("preco", ["", "   ", "abc", "12,3,4", "nan", "inf", "-1", "-0,01"])
def test_preco_invalido_e_erro_de_preco(preco):
    erros, valor = validate_product_form("Camiseta", "3", preco)
    assert set(erros) == {"preco"}
    assert valor is None


@pytest.mark.parametrize("preco,esperado", [("49,90", 49.90), ("49.90", 49.90), (" 10 ", 10.0), ("0", 0.0)])
def test_preco_aceita_virgula_ou_ponto(preco, esperado):
    erros, valor = validate_product_form("Camiseta", "3", preco)
    assert erros == {}
    assert valor == esperado


def test_varios_campos_invalidos_geram_um_erro_por_campo():
    erros, valor = validate_product_form("", "", "abc")
    assert set(erros) == {"nome", "categoria", "preco"}
    assert valor is None
