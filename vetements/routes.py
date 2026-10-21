"""Caminhos de rota do site — fonte única usada no registro das páginas,
na navegação e nos redirecionamentos.

A loja virtual (pública) ocupa a raiz; a gestão (equipe, exige login)
fica sob `/gestao`.
"""

# --- Loja virtual (pública) ---------------------------------------------------
LOJA_HOME = "/"
LOJA_PRODUTO = "/produto/[produto_id]"
LOJA_CARRINHO = "/carrinho"


def produto_href(produto_id: int) -> str:
    """Caminho da página de detalhe de um produto da loja."""
    return LOJA_PRODUTO.replace("[produto_id]", str(produto_id))


# --- Acesso da equipe ---------------------------------------------------------
LOGIN = "/login"

# --- Gestão (exige login) -----------------------------------------------------
GESTAO_DASHBOARD = "/gestao"
GESTAO_PRODUTOS = "/gestao/produtos"
GESTAO_ESTOQUE = "/gestao/estoque"
GESTAO_VENDAS = "/gestao/vendas"
GESTAO_CLIENTES = "/gestao/clientes"
