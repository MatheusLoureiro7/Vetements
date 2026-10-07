"""Testes do filtro do histórico da tela de Vendas.

Cobrem o requisito `specs/sales` (Busca no histórico de vendas por
cliente): busca por parte do nome sem diferenciar maiúsculas, vendas
avulsas encontradas por "Balcão" e termo vazio mostrando tudo.
"""

import pytest

from vetements.state.sales import VendaResumo, filter_sales_by_customer


def _venda(id: int, cliente: str) -> VendaResumo:
    return VendaResumo(
        id=id, data_label="07/10/2026 10:00", cliente=cliente, total_label="R$ 10,00", itens_label="1 item(ns)"
    )


HISTORICO = [_venda(1, "Ana Souza"), _venda(2, "Mariana Lima"), _venda(3, "Balcão"), _venda(4, "Bruno")]


@pytest.mark.parametrize("termo", ["", "   "])
def test_termo_vazio_retorna_todo_o_historico(termo):
    assert filter_sales_by_customer(HISTORICO, termo) == HISTORICO


def test_filtra_por_parte_do_nome_sem_diferenciar_maiusculas():
    resultado = filter_sales_by_customer(HISTORICO, "ANA")
    assert [v.id for v in resultado] == [1, 2]


def test_balcao_encontra_vendas_avulsas():
    resultado = filter_sales_by_customer(HISTORICO, "balcão")
    assert [v.id for v in resultado] == [3]


def test_termo_sem_correspondencia_retorna_lista_vazia():
    assert filter_sales_by_customer(HISTORICO, "zé") == []
