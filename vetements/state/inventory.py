"""Estado da tela de Estoque."""

from dataclasses import dataclass

import reflex as rx

from vetements import xano_client
from vetements.state.auth import AuthState

LOW_STOCK_THRESHOLD = 5

TIPOS_AJUSTE = ("entrada", "saida", "contagem")


def calcular_ajuste(tipo: str, valor_texto: str, estoque_atual: int) -> tuple[int, str]:
    """Converte o que foi digitado no popup no ajuste a enviar ao backend.

    Retorna `(ajuste, erro)`: Entrada soma a quantidade, Saída subtrai e
    Contagem devolve a diferença entre o total contado e o estoque atual.
    Quando há erro, `ajuste` é 0 e `erro` traz a mensagem para o campo.
    """
    texto = valor_texto.strip()
    try:
        valor = int(texto)
    except ValueError:
        return 0, "Informe um número inteiro."
    if tipo == "contagem":
        if valor < 0:
            return 0, "O total contado não pode ser negativo."
        if valor == estoque_atual:
            return 0, "O total contado é igual ao estoque atual; não há o que ajustar."
        return valor - estoque_atual, ""
    if valor <= 0:
        return 0, "Informe uma quantidade maior que zero."
    if tipo == "saida":
        if valor > estoque_atual:
            return 0, f"Saída maior que o estoque: há {estoque_atual} unidade(s)."
        return -valor, ""
    return valor, ""


@dataclass
class VariacaoView:
    id: int
    produto_nome: str
    tamanho: str
    cor: str
    sku: str
    quantidade: int
    is_low: bool


class InventoryState(AuthState):
    search: str = ""
    variants: list[VariacaoView] = []
    load_error: str = ""
    is_loading_page: bool = True

    # Popup de ajuste de estoque (somente administrador).
    show_ajuste: bool = False
    ajuste_variacao_id: int = 0
    ajuste_produto: str = ""
    ajuste_sku: str = ""
    ajuste_estoque_atual: int = 0
    ajuste_tipo: str = "entrada"
    ajuste_quantidade: str = ""
    ajuste_motivo: str = ""
    ajuste_campo_error: str = ""
    ajuste_error: str = ""
    ajuste_success: str = ""
    is_submitting_ajuste: bool = False

    @rx.event
    def load(self):
        redirect = self.require_auth()
        if redirect is not None:
            return redirect
        self.load_error = ""
        try:
            variacoes = xano_client.list_variants(self.auth_token)
        except xano_client.XanoAPIError:
            self.load_error = "Não foi possível carregar o estoque."
            self.variants = []
            self.is_loading_page = False
            return None
        self._raw = variacoes
        self.refresh()
        self.is_loading_page = False
        return None

    _raw: list[dict] = []

    def refresh(self):
        termo = self.search.strip().lower()
        views = []
        for variacao in self._raw:
            nome = variacao.get("produto_nome") or "—"
            sku = variacao.get("sku", "")
            if termo and termo not in nome.lower() and termo not in sku.lower():
                continue
            quantidade = variacao.get("estoque", 0)
            views.append(
                VariacaoView(
                    id=variacao["id"],
                    produto_nome=nome,
                    tamanho=variacao.get("tamanho", ""),
                    cor=variacao.get("cor", ""),
                    sku=sku,
                    quantidade=quantidade,
                    is_low=quantidade < LOW_STOCK_THRESHOLD,
                )
            )
        self.variants = views

    @rx.event
    def set_search(self, value: str):
        self.search = value
        self.refresh()

    # --- Ajuste de estoque ----------------------------------------------------

    @rx.var
    def estoque_apos_ajuste(self) -> str:
        """Prévia do estoque após o ajuste, ou "—" enquanto o valor
        digitado não for válido."""
        ajuste, erro = calcular_ajuste(
            self.ajuste_tipo, self.ajuste_quantidade, self.ajuste_estoque_atual
        )
        return "—" if erro else str(self.ajuste_estoque_atual + ajuste)

    def _limpa_ajuste(self):
        self.ajuste_variacao_id = 0
        self.ajuste_produto = ""
        self.ajuste_sku = ""
        self.ajuste_estoque_atual = 0
        self.ajuste_tipo = "entrada"
        self.ajuste_quantidade = ""
        self.ajuste_motivo = ""
        self.ajuste_campo_error = ""
        self.ajuste_error = ""

    @rx.event
    def open_ajuste(self, variacao_id: int):
        if not self.is_admin:
            return
        variacao = next((v for v in self._raw if v.get("id") == variacao_id), None)
        if variacao is None:
            return
        self._limpa_ajuste()
        self.ajuste_variacao_id = variacao_id
        self.ajuste_produto = variacao.get("produto_nome") or "—"
        self.ajuste_sku = variacao.get("sku", "")
        self.ajuste_estoque_atual = variacao.get("estoque", 0)
        self.ajuste_success = ""
        self.show_ajuste = True

    @rx.event
    def set_show_ajuste(self, open: bool):
        # Fechar sem salvar (Cancelar, X, Esc, clique fora) descarta o popup.
        if not open:
            self._limpa_ajuste()
        self.show_ajuste = open

    @rx.event
    def set_ajuste_tipo(self, value: str | list[str]):
        if isinstance(value, list):
            value = value[0] if value else "entrada"
        if value in TIPOS_AJUSTE:
            self.ajuste_tipo = value
        self.ajuste_campo_error = ""

    @rx.event
    def set_ajuste_quantidade(self, value: str):
        self.ajuste_quantidade = value
        self.ajuste_campo_error = ""

    @rx.event
    def set_ajuste_motivo(self, value: str):
        self.ajuste_motivo = value

    @rx.event
    def salvar_ajuste(self):
        # Clique duplo: o segundo envio chega com o popup já fechado.
        if self.is_submitting_ajuste or not self.show_ajuste or not self.is_admin:
            return
        ajuste, erro = calcular_ajuste(
            self.ajuste_tipo, self.ajuste_quantidade, self.ajuste_estoque_atual
        )
        self.ajuste_error = ""
        self.ajuste_campo_error = erro
        if erro:
            return
        self.is_submitting_ajuste = True
        yield
        try:
            atualizada = xano_client.adjust_stock(
                self.auth_token, self.ajuste_variacao_id, ajuste, self.ajuste_motivo
            )
        except xano_client.XanoAPIError as falha:
            self.ajuste_error = falha.message
            self.is_submitting_ajuste = False
            return
        novo_estoque = atualizada.get("estoque", self.ajuste_estoque_atual + ajuste)
        self._raw = [
            {**v, "estoque": novo_estoque} if v.get("id") == self.ajuste_variacao_id else v
            for v in self._raw
        ]
        self.refresh()
        self.ajuste_success = (
            f"Ajuste registrado: {self.ajuste_sku} agora tem {novo_estoque} unidade(s)."
        )
        self._limpa_ajuste()
        self.show_ajuste = False
        self.is_submitting_ajuste = False
