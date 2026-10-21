"""Estado da vitrine (página inicial da loja).

Os filtros são aplicados pela API pública (`categoria_id` e `q`), não em
memória: a regra de "só publicados" e a busca sem diferenciar maiúsculas
ficam num único lugar, o backend. A busca fica no cabeçalho da loja e
dispara ao enviar (Enter ou botão), não a cada tecla; fora da home, ela
leva à home já filtrada (`/?q=termo`).
"""

from __future__ import annotations

from urllib.parse import urlencode

import reflex as rx

from vetements import routes, xano_client
from vetements.loja.state.dados import CategoriaLoja, ProdutoLoja, categoria_da_api, produto_da_api

# Valor do item "Todas" no seletor de categoria (o select não aceita "").
TODAS = "todas"

# O que a vitrine mostra abaixo da barra de filtros.
CARREGANDO = "carregando"
ERRO = "erro"
COLECAO_EM_BREVE = "colecao_em_breve"
SEM_RESULTADO = "sem_resultado"
LISTA = "lista"

MENSAGEM_ERRO = "Não foi possível carregar a vitrine agora."

# Âncora da seção de produtos na home (usada pelo banner e pela busca).
ID_VITRINE = "vitrine"

# Campos de busca do cabeçalho (desktop e celular).
ID_BUSCA_DESKTOP = "busca-desktop"
ID_BUSCA_MOBILE = "busca-mobile"


def href_da_busca(termo: str) -> str:
    """Home filtrada pelo termo (ou a home sem filtro, para termo vazio)."""
    termo = termo.strip()
    return f"{routes.LOJA_HOME}?{urlencode({'q': termo})}" if termo else routes.LOJA_HOME


def buscar_vitrine(categoria: str, busca: str) -> tuple[list[ProdutoLoja], bool]:
    """Consulta os produtos publicados com os filtros informados.

    Devolve os produtos e se a consulta usou algum filtro (necessário para
    diferenciar "catálogo vazio" de "filtro sem resultado"). Propaga
    `XanoAPIError`.
    """
    categoria_id = int(categoria) if categoria.isdigit() else None
    termo = busca.strip()
    dados = xano_client.list_public_products(categoria_id=categoria_id, q=termo)
    produtos = [produto_da_api(p) for p in dados or []]
    return produtos, categoria_id is not None or bool(termo)


def buscar_categorias() -> list[CategoriaLoja]:
    return [categoria_da_api(c) for c in xano_client.list_public_categories() or []]


def situacao_da_vitrine(carregando: bool, erro: str, tem_produtos: bool, filtrado: bool) -> str:
    if carregando:
        return CARREGANDO
    if erro:
        return ERRO
    if tem_produtos:
        return LISTA
    return SEM_RESULTADO if filtrado else COLECAO_EM_BREVE


class CatalogoState(rx.State):
    produtos: list[ProdutoLoja] = []
    categorias: list[CategoriaLoja] = []
    categoria: str = TODAS
    busca: str = ""
    # Se a última consulta usou algum filtro.
    filtrado: bool = False
    carregando: bool = True
    erro: str = ""
    # Campo de busca aberto no celular (no desktop ele fica sempre visível).
    busca_mobile_aberta: bool = False

    @rx.var
    def situacao(self) -> str:
        return situacao_da_vitrine(self.carregando, self.erro, bool(self.produtos), self.filtrado)

    def _consultar(self):
        try:
            self.produtos, self.filtrado = buscar_vitrine(self.categoria, self.busca)
            self.erro = ""
        except xano_client.XanoAPIError:
            self.produtos = []
            self.erro = MENSAGEM_ERRO
        self.carregando = False

    @rx.event
    def load(self):
        """Carrega categorias e produtos, sem filtro de categoria e com a
        busca vinda da URL (`?q=`), se houver."""
        self.categoria = TODAS
        self.busca = self.router.url.query_parameters.get("q", "").strip()
        self.busca_mobile_aberta = bool(self.busca)
        self.carregando = True
        self.erro = ""
        # O campo de busca do desktop já estava na tela antes do estado.
        yield rx.set_value(ID_BUSCA_DESKTOP, self.busca)
        try:
            self.categorias = buscar_categorias()
        except xano_client.XanoAPIError:
            self.categorias = []
            self.produtos = []
            self.erro = MENSAGEM_ERRO
            self.carregando = False
            return
        self._consultar()
        if self.busca:
            # Chegou de uma busca feita em outra página: mostra o resultado.
            yield rx.scroll_to(ID_VITRINE)

    @rx.event
    def set_categoria(self, valor: str):
        self.categoria = valor
        self.carregando = True
        yield
        self._consultar()

    @rx.event
    def buscar(self, _form_data: dict | None = None):
        self.carregando = True
        yield
        self._consultar()

    @rx.event
    def alternar_busca_mobile(self):
        self.busca_mobile_aberta = not self.busca_mobile_aberta

    @rx.event
    def buscar_pelo_cabecalho(self, form_data: dict):
        """Busca do cabeçalho: na home filtra a vitrine e rola até ela; nas
        outras páginas da loja leva à home já filtrada."""
        self.busca = str(form_data.get("q") or "").strip()
        if self.router.url.path.rstrip("/") != routes.LOJA_HOME.rstrip("/"):
            return rx.redirect(href_da_busca(self.busca))
        self.carregando = True
        return [CatalogoState.buscar, rx.scroll_to(ID_VITRINE)]

    @rx.event
    def limpar_filtros(self):
        self.categoria = TODAS
        self.busca = ""
        self.carregando = True
        yield [rx.set_value(ID_BUSCA_DESKTOP, ""), rx.set_value(ID_BUSCA_MOBILE, "")]
        self._consultar()
