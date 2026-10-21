"""Testes das funções puras do script de carga da loja (`scripts/seed_loja.py`)."""

import importlib.util
import sys
from pathlib import Path

import pytest

_CAMINHO = Path(__file__).resolve().parent.parent / "scripts" / "seed_loja.py"
_spec = importlib.util.spec_from_file_location("seed_loja", _CAMINHO)
seed = importlib.util.module_from_spec(_spec)
sys.modules["seed_loja"] = seed
_spec.loader.exec_module(seed)


@pytest.mark.parametrize(
    ("preco", "esperado"),
    [("R$ 219,00", 219.0), ("R$ 2.999,00", 2999.0), ("R$ 49,90", 49.9)],
)
def test_preco_para_numero(preco, esperado):
    assert seed.preco_para_numero(preco) == esperado


@pytest.mark.parametrize(
    ("titulo", "cor"),
    [
        ("T-SHIRT CLASS HAN OFF-WHITE", "Off-white"),
        ("T-SHIRT CLASS SIMPLICITY NAVY", "Marinho"),
        ("CLASS JACKET POWELL BLACK & BABY YELLOW", "Preto e amarelo-bebê"),
        ("CLASS CLASSIC SPORT HAT PRIMELINE GREEN & MOSTARD", "Verde e mostarda"),
        ('OVERCOAT CLASS X CASTELO RÁ-TIM-BUM "INTRO" GRAY', "Cinza"),
        ("CLASS PANTS KISHO JACQUARD BLACK & WHITE", "Preto e branco"),
        ("CLASS CLASSIC SHIRT CHILLIN PLAID", "Única"),
        ("CLASS CLASSIC DISTRESSED JEANS", "Única"),
    ],
)
def test_cor_do_titulo(titulo, cor):
    assert seed.cor_do_titulo(titulo) == cor


def test_variacoes_com_tamanhos_e_esgotado():
    produto = {
        "handle": "t-shirt-class-han-black-3-26",
        "titulo": "T-SHIRT CLASS HAN BLACK",
        "tamanhos": [{"tamanho": "P", "disponivel": True}, {"tamanho": "4G", "disponivel": False}],
    }
    variacoes = seed.variacoes_do_produto(produto)
    assert variacoes == [
        {"tamanho": "P", "cor": "Preto", "sku": "T-SHIRT-CLASS-HAN-BLACK-3-26-P", "estoque": 10},
        {"tamanho": "4G", "cor": "Preto", "sku": "T-SHIRT-CLASS-HAN-BLACK-3-26-4G", "estoque": 0},
    ]


def test_produto_sem_tamanhos_ganha_variacao_unica():
    produto = {"handle": "class-tocco-bag", "titulo": "CLASS TOCCO CORDURA BAG", "tamanhos": []}
    assert seed.variacoes_do_produto(produto) == [
        {"tamanho": "Único", "cor": "Única", "sku": "CLASS-TOCCO-BAG-UN", "estoque": 10}
    ]


def test_snapshot_tem_skus_unicos_e_categorias_conhecidas():
    catalogo = seed.carregar_catalogo()
    skus = [v["sku"] for p in catalogo for v in seed.variacoes_do_produto(p)]
    assert len(skus) == len(set(skus))
    assert all(p["aba"] in seed.CATEGORIAS for p in catalogo)
    assert len(catalogo) == 61
