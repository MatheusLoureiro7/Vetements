"""Testes das agregações de gráfico do dashboard.

Cobrem o requisito `specs/dashboard`: gráfico de vendas por dia sempre
com `DIAS_GRAFICO_VENDAS` pontos (mesmo sem vendas no período) e
gráfico de mix de produtos por categoria batendo com o total de
produtos. As funções recebem os dados já no formato retornado pela
API do Xano (dicts, `created_at` em milissegundos desde epoch).
"""

import threading
from datetime import date, datetime, timedelta

import pytest

from vetements import xano_client
from vetements.state.dashboard import (
    DIAS_GRAFICO_VENDAS,
    _buscar_dados,
    _month_trend,
    _products_by_category,
    _sales_by_day,
)


def _epoch_ms(dia: date, hora: int = 10) -> int:
    return int(datetime(dia.year, dia.month, dia.day, hora).timestamp() * 1000)


def test_sales_by_day_sempre_tem_um_ponto_por_dia():
    pontos = _sales_by_day(vendas=[])
    assert len(pontos) == DIAS_GRAFICO_VENDAS


def test_sales_by_day_sem_vendas_fica_zerado_sem_erro():
    pontos = _sales_by_day(vendas=[])
    assert len(pontos) == DIAS_GRAFICO_VENDAS
    assert all(ponto["total"] == 0 for ponto in pontos)


def test_sales_by_day_soma_vendas_do_mesmo_dia():
    hoje = date(2026, 1, 15)
    vendas = [
        {"id": 1, "created_at": _epoch_ms(hoje), "total": 100.0},
        {"id": 2, "created_at": _epoch_ms(hoje), "total": 50.0},
    ]
    pontos = _sales_by_day(vendas, hoje=hoje)
    assert pontos[-1]["dia"] == hoje.strftime("%d/%m")
    assert pontos[-1]["total"] == 150.0


def test_sales_by_day_ignora_vendas_fora_da_janela():
    hoje = date(2026, 1, 15)
    fora_da_janela = hoje - timedelta(days=DIAS_GRAFICO_VENDAS + 5)
    vendas = [{"id": 1, "created_at": _epoch_ms(fora_da_janela), "total": 999.0}]
    pontos = _sales_by_day(vendas, hoje=hoje)
    assert sum(p["total"] for p in pontos) == 0


def _amostra_produtos_e_categorias():
    categorias = [{"id": 1, "nome": "Camisetas"}, {"id": 2, "nome": "Calças"}]
    produtos = [
        {"id": 1, "categoria_id": 1},
        {"id": 2, "categoria_id": 1},
        {"id": 3, "categoria_id": 2},
    ]
    return produtos, categorias


def test_products_by_category_soma_bate_com_total_de_produtos():
    produtos, categorias = _amostra_produtos_e_categorias()
    pontos = _products_by_category(produtos, categorias)
    assert sum(p["quantidade"] for p in pontos) == len(produtos)


def test_products_by_category_uma_entrada_por_categoria():
    produtos, categorias = _amostra_produtos_e_categorias()
    pontos = _products_by_category(produtos, categorias)
    assert len(pontos) == len(categorias)
    assert {p["categoria"] for p in pontos} == {c["nome"] for c in categorias}


def test_month_trend_sem_vendas_no_mes_anterior_nao_tem_comparacao():
    hoje = date(2026, 3, 10)
    vendas = [{"id": 1, "created_at": _epoch_ms(hoje), "total": 100.0}]
    tem_comparacao, rotulo, alta = _month_trend(vendas, hoje=hoje)
    assert tem_comparacao is False
    assert rotulo == ""


def test_month_trend_alta_em_relacao_ao_mes_anterior():
    hoje = date(2026, 3, 10)
    mes_anterior = date(2026, 2, 10)
    vendas = [
        {"id": 1, "created_at": _epoch_ms(mes_anterior), "total": 100.0},
        {"id": 2, "created_at": _epoch_ms(hoje), "total": 150.0},
    ]
    tem_comparacao, rotulo, alta = _month_trend(vendas, hoje=hoje)
    assert tem_comparacao is True
    assert alta is True
    assert rotulo == "+50%"


def test_month_trend_queda_em_relacao_ao_mes_anterior():
    hoje = date(2026, 3, 10)
    mes_anterior = date(2026, 2, 10)
    vendas = [
        {"id": 1, "created_at": _epoch_ms(mes_anterior), "total": 200.0},
        {"id": 2, "created_at": _epoch_ms(hoje), "total": 150.0},
    ]
    tem_comparacao, rotulo, alta = _month_trend(vendas, hoje=hoje)
    assert tem_comparacao is True
    assert alta is False
    assert rotulo == "-25%"


def test_month_trend_virada_de_ano_compara_com_dezembro_anterior():
    hoje = date(2026, 1, 5)
    dezembro_anterior = date(2025, 12, 20)
    vendas = [
        {"id": 1, "created_at": _epoch_ms(dezembro_anterior), "total": 100.0},
        {"id": 2, "created_at": _epoch_ms(hoje), "total": 120.0},
    ]
    tem_comparacao, rotulo, alta = _month_trend(vendas, hoje=hoje)
    assert tem_comparacao is True
    assert alta is True
    assert rotulo == "+20%"


# --- Carregamento simultâneo -----------------------------------------------

_CONSULTAS = ("list_products", "list_variants", "list_customers", "list_categories", "list_sales")


def test_buscar_dados_dispara_as_cinco_consultas_ao_mesmo_tempo(monkeypatch):
    # Cada consulta só termina quando as 5 estiverem em andamento; se fossem
    # sequenciais, a barreira estouraria o timeout (BrokenBarrierError).
    barreira = threading.Barrier(len(_CONSULTAS), timeout=2)
    for nome in _CONSULTAS:
        def consulta(token, _nome=nome, **kwargs):
            barreira.wait()
            return [_nome]

        monkeypatch.setattr(xano_client, nome, consulta)

    assert _buscar_dados("token") == tuple([nome] for nome in _CONSULTAS)


def test_buscar_dados_repropaga_falha_de_qualquer_consulta(monkeypatch):
    for nome in _CONSULTAS:
        monkeypatch.setattr(xano_client, nome, lambda token, **kwargs: [])

    def falha(token, **kwargs):
        raise xano_client.XanoAPIError("Falha de comunicação com o servidor: x")

    monkeypatch.setattr(xano_client, "list_customers", falha)

    with pytest.raises(xano_client.XanoAPIError):
        _buscar_dados("token")
