"""Testes das agregações de gráfico do dashboard.

Cobrem o requisito `specs/dashboard`: gráfico de vendas por dia sempre
com `DIAS_GRAFICO_VENDAS` pontos (mesmo sem vendas no período) e
gráfico de mix de produtos por categoria batendo com o total de
produtos. As funções recebem os dados já no formato retornado pela
API do Xano (dicts, `created_at` em milissegundos desde epoch).
"""

from datetime import date, datetime, timedelta

from vetements.state.dashboard import DIAS_GRAFICO_VENDAS, _products_by_category, _sales_by_day


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
