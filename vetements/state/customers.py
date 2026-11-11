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


AVISO_EDITADO = "Cliente atualizado."
AVISO_RECONFIRMAR = "Cliente atualizado. Ele precisará confirmar o novo e-mail na loja antes do próximo pedido."


def aviso_edicao(resposta: dict) -> str:
    """Aviso de sucesso da edição: avisa quando o cliente terá de
    confirmar o novo e-mail na loja."""
    return AVISO_RECONFIRMAR if resposta.get("reconfirmar_email") else AVISO_EDITADO


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

    # Popup de edição (edit_id = 0: fechado).
    edit_id: int = 0
    edit_nome: str = ""
    edit_telefone: str = ""
    edit_email: str = ""
    edit_error: str = ""
    is_saving_edit: bool = False

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

    # --- Edição -------------------------------------------------------------

    @rx.var
    def show_edit(self) -> bool:
        return self.edit_id > 0

    def _fechar_edicao(self):
        self.edit_id = 0
        self.edit_nome = ""
        self.edit_telefone = ""
        self.edit_email = ""
        self.edit_error = ""

    @rx.event
    def open_edit(self, cliente_id: int):
        if self.is_saving_edit:
            return
        cliente = next((c for c in self.customers if c.id == cliente_id), None)
        if cliente is None:
            return
        self.edit_id = cliente.id
        self.edit_nome = cliente.nome
        self.edit_telefone = cliente.telefone
        self.edit_email = cliente.email
        self.edit_error = ""
        self.success = ""

    @rx.event
    def set_show_edit(self, open: bool):
        # Cancelar, X, Esc ou clique fora descartam o que foi digitado;
        # durante o envio o popup fica aberto.
        if not open and not self.is_saving_edit:
            self._fechar_edicao()

    @rx.event
    def set_edit_nome(self, value: str):
        self.edit_nome = value

    @rx.event
    def set_edit_telefone(self, value: str):
        self.edit_telefone = value

    @rx.event
    def set_edit_email(self, value: str):
        self.edit_email = value

    @rx.event
    def save_edit(self):
        if self.is_saving_edit or not self.edit_id:
            return
        self.is_saving_edit = True
        self.edit_error = ""
        yield
        try:
            resposta = xano_client.update_customer(
                self.auth_token, self.edit_id, self.edit_nome, self.edit_telefone, self.edit_email
            )
        except xano_client.XanoAPIError as erro:
            if erro.is_network_error:
                self.edit_error = "Não foi possível conectar ao servidor. Os dados não foram salvos."
            else:
                self.edit_error = erro.message
            self.is_saving_edit = False
            return
        self.is_saving_edit = False
        self._fechar_edicao()
        self.success = aviso_edicao(resposta or {})
        self.refresh()
