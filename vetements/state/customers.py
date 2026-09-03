"""Estado da tela de Clientes."""

import reflex as rx

from vetements.state import mock_data
from vetements.state.auth import AuthState


class CustomersState(AuthState):
    search: str = ""
    customers: list[mock_data.Cliente] = []

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
        self.customers = mock_data.list_customers(self.search)

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
            mock_data.create_customer(self.form_nome, self.form_telefone, self.form_email)
        except mock_data.DomainError as erro:
            self.form_error = str(erro)
            return None
        self.form_nome = ""
        self.form_telefone = ""
        self.form_email = ""
        self.form_error = ""
        self.show_form = False
        self.refresh()
        return None
