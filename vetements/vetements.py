"""Vetements — app Reflex: loja virtual (pública, na raiz) e gestão
(equipe, sob `/gestao`). Os caminhos ficam em `vetements/routes.py`."""

import reflex as rx

from vetements import routes
from vetements.loja.pages.carrinho import carrinho_page
from vetements.loja.pages.conta import conta_page, entrar_page
from vetements.loja.pages.home import home_page
from vetements.loja.pages.produto import produto_page
from vetements.loja.state.catalogo import CatalogoState
from vetements.loja.state.conta import ContaState
from vetements.loja.state.produto import ProdutoState
from vetements.pages.customers import customers_page
from vetements.pages.dashboard import dashboard_page
from vetements.pages.inventory import inventory_page
from vetements.pages.login import login_page
from vetements.pages.products import products_page
from vetements.pages.sales import sales_page
from vetements.state.customers import CustomersState
from vetements.state.dashboard import DashboardState
from vetements.state.inventory import InventoryState
from vetements.state.products import ProductsState
from vetements.state.sales import SalesState
from vetements.styles import GOOGLE_FONTS_STYLESHEET, base_style

app = rx.App(
    style=base_style,
    # Folha da loja virtual (classes `lj-*`; a gestão não as usa).
    stylesheets=[GOOGLE_FONTS_STYLESHEET, "/loja/loja.css"],
)

# --- Loja virtual (pública: on_load só carrega o catálogo, sem autenticação) --
app.add_page(home_page, route=routes.LOJA_HOME, title="Vetements", on_load=CatalogoState.load)
app.add_page(produto_page, route=routes.LOJA_PRODUTO, title="Produto · Vetements", on_load=ProdutoState.load)
app.add_page(carrinho_page, route=routes.LOJA_CARRINHO, title="Carrinho · Vetements", on_load=ContaState.load_carrinho)
app.add_page(entrar_page, route=routes.LOJA_ENTRAR, title="Entrar · Vetements", on_load=ContaState.load_entrar)
app.add_page(conta_page, route=routes.LOJA_CONTA, title="Minha conta · Vetements", on_load=ContaState.load_conta)

# --- Acesso da equipe ---------------------------------------------------------
app.add_page(login_page, route=routes.LOGIN)

# --- Gestão (cada on_load chama AuthState.require_auth) ----------------------
app.add_page(dashboard_page, route=routes.GESTAO_DASHBOARD, on_load=DashboardState.load)
app.add_page(products_page, route=routes.GESTAO_PRODUTOS, on_load=ProductsState.load)
app.add_page(inventory_page, route=routes.GESTAO_ESTOQUE, on_load=InventoryState.load)
app.add_page(sales_page, route=routes.GESTAO_VENDAS, on_load=SalesState.load)
app.add_page(customers_page, route=routes.GESTAO_CLIENTES, on_load=CustomersState.load)
