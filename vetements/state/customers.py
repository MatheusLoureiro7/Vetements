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
    is_loading_page: bool = True

    show_form: bool = False
    form_nome: str = ""
    form_telefone: str = ""
    form_email: str = ""
    form_error: str = ""
    success: str = ""
    is_submitting: bool = False

    @rx.event
    def load(self):
        redirect = self.require_auth()
        if redirect is not None:
            return redirect
        self.refresh()
        self.is_loading_page = False
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
        self.success = ""

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
        if self.is_submitting:
            return None
        self.is_submitting = True
        self.success = ""
        try:
            xano_client.create_customer(
                self.auth_token, self.form_nome, self.form_telefone, self.form_email
            )
        except xano_client.XanoAPIError as erro:
            self.form_error = erro.message
            self.is_submitting = False
            return None
        self.form_nome = ""
        self.form_telefone = ""
        self.form_email = ""
        self.form_error = ""
        self.success = "Cliente cadastrado."
        self.show_form = False
        self.refresh()
        self.is_submitting = False
        return None
