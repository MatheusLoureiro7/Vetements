"""Estado da tela de Clientes."""

from dataclasses import dataclass

import reflex as rx

from vetements import xano_client
from vetements.state.auth import AuthState


@dataclass
class ClienteView:
    id: int
    nome: str
    telefone: str
    email: str


class CustomersState(AuthState):
    search: str = ""
    customers: list[ClienteView] = []
    load_error: str = ""

    show_form: bool = False
    form_nome: str = ""
    form_telefone: str = ""
    form_email: str = ""
    form_error: str = ""

    @rx.event
    def load(self):
        redirect = self.require_auth()
        if redirect is not None:
            return redirect
        self.refresh()
        return None

    def refresh(self):
        try:
            clientes = xano_client.list_customers(self.auth_token, self.search)
        except xano_client.XanoAPIError:
            self.load_error = "Não foi possível carregar os clientes."
            return
        self.load_error = ""
        self.customers = [
            ClienteView(
                id=c["id"], nome=c["nome"], telefone=c.get("telefone") or "", email=c.get("email") or ""
            )
            for c in clientes
        ]

    @rx.event
    def set_search(self, value: str):
        self.search = value
        self.refresh()

    @rx.event
    def toggle_form(self):
        self.show_form = not self.show_form
        self.form_error = ""

    @rx.event
    def set_form_nome(self, value: str):
        self.form_nome = value

    @rx.event
    def set_form_telefone(self, value: str):
        self.form_telefone = value

    @rx.event
    def set_form_email(self, value: str):
        self.form_email = value

    @rx.event
    def create_customer(self):
        try:
            xano_client.create_customer(
                self.auth_token, self.form_nome, self.form_telefone, self.form_email
            )
        except xano_client.XanoAPIError as erro:
            self.form_error = erro.message
            return None
        self.form_nome = ""
        self.form_telefone = ""
        self.form_email = ""
        self.form_error = ""
        self.show_form = False
        self.refresh()
        return None
