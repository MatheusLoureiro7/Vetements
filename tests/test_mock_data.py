"""Testes unitários das regras de domínio na camada de dados mockados.

Cobrem especialmente as regras que também são requisitos de spec:
`specs/inventory` (estoque nunca negativo) e `specs/sales` (bloqueio de
quantidade acima do estoque, total derivado dos itens).
"""

import pytest

from vetements.state import mock_data as m


def test_authenticate_credenciais_validas():
    usuario = m.authenticate("admin@vetements.com", "admin123")
    assert usuario is not None
    assert usuario.papel == "administrador"


def test_authenticate_credenciais_invalidas():
    assert m.authenticate("admin@vetements.com", "senha-errada") is None
    assert m.authenticate("nao-existe@vetements.com", "admin123") is None


def test_list_products_busca_por_nome():
    resultados = m.list_products("jeans")
    assert len(resultados) == 1
    assert "Jeans" in resultados[0].nome


def test_create_product_exige_categoria_valida():
    with pytest.raises(m.DomainError):
        m.create_product("Produto sem categoria", "desc", categoria_id=None, preco_base=10.0)
    with pytest.raises(m.DomainError):
        m.create_product("Produto categoria inexistente", "desc", categoria_id=999, preco_base=10.0)


def test_create_product_valido_aparece_na_listagem():
    antes = len(m.list_products())
    novo = m.create_product("Jaqueta Corta-Vento", "desc", categoria_id=1, preco_base=299.0)
    depois = m.list_products()
    assert len(depois) == antes + 1
    assert novo in depois


def test_create_variant_associada_ao_produto():
    variacao = m.create_variant(produto_id=1, tamanho="GG", cor="Cinza", sku="TESTE-GG-CZ", quantidade=10)
    assert variacao in m.list_variants(produto_id=1)


def test_estoque_nunca_fica_negativo():
    variacao = m.get_variant(2)  # quantidade inicial = 3 (baixo estoque)
    with pytest.raises(m.DomainError):
        m.decrement_stock(variacao.id, variacao.quantidade + 1)
    # a tentativa bloqueada não deve ter alterado a quantidade
    assert m.get_variant(2).quantidade == variacao.quantidade


def test_decrement_stock_ate_zero_nunca_abaixo():
    variacao = m.get_variant(2)
    m.decrement_stock(variacao.id, variacao.quantidade)
    assert m.get_variant(2).quantidade == 0
    with pytest.raises(m.DomainError):
        m.decrement_stock(variacao.id, 1)
    assert m.get_variant(2).quantidade == 0


def test_create_sale_bloqueia_lista_vazia():
    with pytest.raises(m.DomainError):
        m.create_sale(usuario_id=1, cliente_id=None, itens=[])


def test_create_sale_bloqueia_quantidade_acima_do_estoque():
    variacao = m.get_variant(2)  # quantidade = 3
    item = m.ItemVenda(variacao_id=variacao.id, quantidade=variacao.quantidade + 1, preco_unitario=99.90)
    with pytest.raises(m.DomainError):
        m.create_sale(usuario_id=1, cliente_id=None, itens=[item])
    # nenhuma baixa deve ter ocorrido
    assert m.get_variant(2).quantidade == variacao.quantidade


def test_create_sale_confirma_e_da_baixa_no_estoque():
    variacao = m.get_variant(1)
    estoque_antes = variacao.quantidade
    item = m.ItemVenda(variacao_id=variacao.id, quantidade=2, preco_unitario=79.90)
    venda = m.create_sale(usuario_id=2, cliente_id=1, itens=[item])
    assert m.get_variant(1).quantidade == estoque_antes - 2
    assert venda in m.list_sales()


def test_create_sale_total_derivado_dos_itens():
    itens = [
        m.ItemVenda(variacao_id=1, quantidade=2, preco_unitario=79.90),
        m.ItemVenda(variacao_id=3, quantidade=1, preco_unitario=79.90),
    ]
    venda = m.create_sale(usuario_id=1, cliente_id=None, itens=itens)
    esperado = 2 * 79.90 + 1 * 79.90
    assert venda.total == pytest.approx(esperado)


def test_create_customer_exige_telefone_ou_email():
    with pytest.raises(m.DomainError):
        m.create_customer("Cliente Sem Contato", telefone="", email="")


def test_create_customer_valido():
    cliente = m.create_customer("Novo Cliente", telefone="", email="novo@example.com")
    assert cliente in m.list_customers("Novo Cliente")
