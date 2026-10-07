"""Vetements — app Reflex: loja virtual (pública, na raiz) e gestão
(equipe, sob `/gestao`). Os caminhos ficam em `vetements/routes.py`."""

import reflex as rx

from vetements import routes
from vetements.loja.pages.home import home_page
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
    stylesheets=[GOOGLE_FONTS_STYLESHEET],
)

# --- Loja virtual (pública: sem on_load de autenticação) ---------------------
app.add_page(home_page, route=routes.LOJA_HOME, title="Vetements")

# --- Acesso da equipe ---------------------------------------------------------
app.add_page(login_page, route=routes.LOGIN)

# --- Gestão (cada on_load chama AuthState.require_auth) ----------------------
app.add_page(dashboard_page, route=routes.GESTAO_DASHBOARD, on_load=DashboardState.load)
app.add_page(products_page, route=routes.GESTAO_PRODUTOS, on_load=ProductsState.load)
app.add_page(inventory_page, route=routes.GESTAO_ESTOQUE, on_load=InventoryState.load)
app.add_page(sales_page, route=routes.GESTAO_VENDAS, on_load=SalesState.load)
app.add_page(customers_page, route=routes.GESTAO_CLIENTES, on_load=CustomersState.load)
