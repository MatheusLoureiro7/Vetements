"""Testes da loja virtual: conversão da resposta da API pública para os
dados exibidos e lógica de carregamento da vitrine e do detalhe.

Cobrem o requisito `specs/storefront` (vitrine, filtros, detalhe do
produto e falha ao carregar o catálogo). As chamadas ao Xano são
substituídas por funções falsas.
"""

import pytest

from vetements import xano_client
from vetements.loja.state import catalogo, produto
from vetements.loja.state.dados import produto_da_api, urls_das_imagens

PRODUTO_API = {
    "id": 1,
    "nome": "Camiseta Basica Algodao",
    "descricao": "",
    "categoria_id": 1,
    "preco_base": 49.9,
    "categoria_nome": "Camisetas",
    "imagens": None,
    "variacoes": [
        {"id": 1, "tamanho": "M", "cor": "Branca", "disponivel": False},
        {"id": 2, "tamanho": "G", "cor": "Preta", "disponivel": True},
    ],
}


# --- Conversão -------------------------------------------------------------


def test_produto_sem_imagem_fica_sem_capa():
    produto = produto_da_api(PRODUTO_API)
    assert produto.imagens == []
    assert produto.capa == ""


def test_preco_formatado_em_reais_e_link_do_detalhe():
    produto = produto_da_api(PRODUTO_API)
    assert produto.preco_label == "R$ 49,90"
    assert produto.href == "/produto/1"
    assert produto.categoria_nome == "Camisetas"


def test_descricao_vazia_ou_ausente_vira_texto_vazio():
    assert produto_da_api(PRODUTO_API).descricao == ""
    sem_descricao = {k: v for k, v in PRODUTO_API.items() if k != "descricao"}
    assert produto_da_api(sem_descricao).descricao == ""


def test_imagem_com_url_e_com_so_path():
    urls = urls_das_imagens(
        [
            {"url": "https://cdn.exemplo/a.jpg", "path": "/vault/a.jpg"},
            {"path": "/vault/b.jpg"},
            {"name": "sem-endereco"},
        ]
    )
    assert urls == ["https://cdn.exemplo/a.jpg", f"{xano_client.instance_url()}/vault/b.jpg"]


def test_capa_e_a_primeira_imagem():
    produto = produto_da_api({**PRODUTO_API, "imagens": [{"url": "u1"}, {"url": "u2"}]})
    assert produto.capa == "u1"
    assert produto.imagens == ["u1", "u2"]


def test_variacao_esgotada_e_campos_internos_descartados():
    dados = {
        **PRODUTO_API,
        "variacoes": [{"id": 9, "tamanho": "P", "cor": "Azul", "disponivel": False, "estoque": 0, "sku": "X"}],
    }
    variacao = produto_da_api(dados).variacoes[0]
    assert variacao.disponivel is False
    assert not hasattr(variacao, "estoque")
    assert not hasattr(variacao, "sku")


# --- Vitrine -----------------------------------------------------------------

@pytest.fixture
def api_produtos(monkeypatch):
    """Substitui a listagem pública: registra os filtros e devolve `resposta`."""
    chamadas = []
    estado = {"resposta": [PRODUTO_API]}

    def fake(categoria_id=None, q=""):
        chamadas.append({"categoria_id": categoria_id, "q": q})
        if isinstance(estado["resposta"], Exception):
            raise estado["resposta"]
        return estado["resposta"]

    monkeypatch.setattr(xano_client, "list_public_products", fake)
    return chamadas, estado


def test_vitrine_sem_filtro_consulta_sem_parametros(api_produtos):
    chamadas, _ = api_produtos
    produtos, filtrado = catalogo.buscar_vitrine(catalogo.TODAS, "  ")
    assert chamadas == [{"categoria_id": None, "q": ""}]
    assert [p.id for p in produtos] == [1]
    assert filtrado is False


def test_vitrine_repassa_categoria_e_busca(api_produtos):
    chamadas, _ = api_produtos
    _, filtrado = catalogo.buscar_vitrine("1", " basica ")
    assert chamadas == [{"categoria_id": 1, "q": "basica"}]
    assert filtrado is True


def test_catalogo_vazio_sem_filtro_e_colecao_em_breve(api_produtos):
    _, estado = api_produtos
    estado["resposta"] = []
    produtos, filtrado = catalogo.buscar_vitrine(catalogo.TODAS, "")
    situacao = catalogo.situacao_da_vitrine(False, "", bool(produtos), filtrado)
    assert situacao == catalogo.COLECAO_EM_BREVE


def test_filtro_sem_resultado_e_nenhuma_peca_encontrada(api_produtos):
    _, estado = api_produtos
    estado["resposta"] = []
    produtos, filtrado = catalogo.buscar_vitrine(catalogo.TODAS, "xyznada")
    situacao = catalogo.situacao_da_vitrine(False, "", bool(produtos), filtrado)
    assert situacao == catalogo.SEM_RESULTADO


def test_falha_da_api_e_propagada_para_virar_erro(api_produtos):
    _, estado = api_produtos
    estado["resposta"] = xano_client.XanoAPIError("Falha de comunicação")
    with pytest.raises(xano_client.XanoAPIError):
        catalogo.buscar_vitrine(catalogo.TODAS, "")
    assert catalogo.situacao_da_vitrine(False, catalogo.MENSAGEM_ERRO, False, False) == catalogo.ERRO


def test_carregando_tem_prioridade_e_lista_quando_ha_produtos():
    assert catalogo.situacao_da_vitrine(True, "", False, False) == catalogo.CARREGANDO
    assert catalogo.situacao_da_vitrine(False, "", True, True) == catalogo.LISTA


# --- Detalhe -------------------------------------------------------------------


@pytest.fixture
def api_detalhe(monkeypatch):
    """Substitui o detalhe público: registra os ids pedidos e devolve `resposta`."""
    chamadas = []
    estado = {"resposta": PRODUTO_API}

    def fake(produto_id):
        chamadas.append(produto_id)
        if isinstance(estado["resposta"], Exception):
            raise estado["resposta"]
        return estado["resposta"]

    monkeypatch.setattr(xano_client, "get_public_product", fake)
    return chamadas, estado


@pytest.mark.parametrize("id_da_rota", ["abc", "", "1.5", "-1"])
def test_id_invalido_e_nao_encontrado_sem_chamar_a_api(api_detalhe, id_da_rota):
    chamadas, _ = api_detalhe
    assert produto.carregar_produto(id_da_rota) == (None, produto.NAO_ENCONTRADO)
    assert chamadas == []


def test_produto_publicado_e_encontrado(api_detalhe):
    chamadas, _ = api_detalhe
    encontrado, situacao = produto.carregar_produto("1")
    assert chamadas == [1]
    assert situacao == produto.ENCONTRADO
    assert encontrado.nome == "Camiseta Basica Algodao"
    assert [v.disponivel for v in encontrado.variacoes] == [False, True]


def test_404_do_xano_e_nao_encontrado(api_detalhe):
    _, estado = api_detalhe
    estado["resposta"] = xano_client.XanoAPIError("Produto não encontrado.", status_code=404)
    assert produto.carregar_produto("2") == (None, produto.NAO_ENCONTRADO)


@pytest.mark.parametrize("status_code", [None, 500])
def test_falha_de_rede_ou_servidor_e_erro(api_detalhe, status_code):
    _, estado = api_detalhe
    estado["resposta"] = xano_client.XanoAPIError("Falha", status_code=status_code)
    assert produto.carregar_produto("1") == (None, produto.ERRO)


# --- Busca do cabeçalho e newsletter (frontend-restyle-storefront-home) ---

from vetements.loja.state.catalogo import href_da_busca  # noqa: E402
from vetements.loja.state.newsletter import email_valido  # noqa: E402


def test_href_da_busca_leva_a_home_filtrada():
    assert href_da_busca("  jaqueta preta ") == "/?q=jaqueta+preta"


def test_href_da_busca_vazia_volta_para_a_home():
    assert href_da_busca("   ") == "/"


def test_email_valido():
    assert email_valido("cliente@exemplo.com")
    assert not email_valido("cliente@")
    assert not email_valido("")
