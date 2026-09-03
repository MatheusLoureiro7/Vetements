"""Vetements — app Reflex (frontend do ERP de moda)."""

import reflex as rx

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

app.add_page(login_page, route="/login")
app.add_page(dashboard_page, route="/", on_load=DashboardState.load)
app.add_page(products_page, route="/produtos", on_load=ProductsState.load)
app.add_page(inventory_page, route="/estoque", on_load=InventoryState.load)
app.add_page(sales_page, route="/vendas", on_load=SalesState.load)
app.add_page(customers_page, route="/clientes", on_load=CustomersState.load)
