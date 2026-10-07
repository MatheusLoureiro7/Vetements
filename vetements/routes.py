"""Caminhos de rota do site — fonte única usada no registro das páginas,
na navegação e nos redirecionamentos.

A loja virtual (pública) ocupa a raiz; a gestão (equipe, exige login)
fica sob `/gestao`.
"""

# --- Loja virtual (pública) ---------------------------------------------------
LOJA_HOME = "/"

# --- Acesso da equipe ---------------------------------------------------------
LOGIN = "/login"

# --- Gestão (exige login) -----------------------------------------------------
GESTAO_DASHBOARD = "/gestao"
GESTAO_PRODUTOS = "/gestao/produtos"
GESTAO_ESTOQUE = "/gestao/estoque"
GESTAO_VENDAS = "/gestao/vendas"
GESTAO_CLIENTES = "/gestao/clientes"
