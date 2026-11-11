"""Estado da tela de Usuários da equipe (somente administradores).

O backend (Xano) é quem garante as regras: só administrador gerencia,
ninguém desativa a si mesmo nem tira o próprio papel de administrador, e
sempre resta um administrador ativo. A tela só esconde o que o backend
recusaria, para não oferecer ações inúteis.
"""

from dataclasses import dataclass

import reflex as rx

from vetements import routes, xano_client
from vetements.format_utils import format_datetime
from vetements.state.auth import AuthState

PAPEIS = ("vendedor", "administrador")
MENSAGEM_FALHA = "Não foi possível conectar ao servidor. Nada foi alterado."


def rotulo_papel(papel: str) -> str:
    return "Administrador" if papel == "administrador" else "Vendedor"


def rotulo_status(ativo) -> str:
    """Registro sem valor conta como ativo (mesma regra do backend)."""
    return "Desativado" if ativo is False else "Ativo"


def rotulo_ultimo_login(valor) -> str:
    return format_datetime(valor) if valor else "Nunca entrou"


def mensagem_de_erro(erro: xano_client.XanoAPIError) -> str:
    return MENSAGEM_FALHA if erro.is_network_error else erro.message


@dataclass
class UsuarioView:
    id: int
    nome: str
    email: str
    papel: str
    papel_label: str
    ativo: bool
    status_label: str
    ultimo_login_label: str
    e_voce: bool


def usuario_da_api(dados: dict, meu_id: int) -> UsuarioView:
    ativo = dados.get("ativo") is not False
    return UsuarioView(
        id=int(dados["id"]),
        nome=dados.get("name") or "",
        email=dados.get("email") or "",
        papel=dados.get("role") or "vendedor",
        papel_label=rotulo_papel(dados.get("role") or ""),
        ativo=ativo,
        status_label=rotulo_status(dados.get("ativo")),
        ultimo_login_label=rotulo_ultimo_login(dados.get("ultimo_login_em")),
        e_voce=int(dados["id"]) == meu_id,
    )


class UsersState(AuthState):
    users: list[UsuarioView] = []
    load_error: str = ""
    is_loading_page: bool = True
    success: str = ""

    # Popup de criar/editar. form_id = 0 com o popup aberto = criar.
    show_form: bool = False
    form_id: int = 0
    form_nome: str = ""
    form_email: str = ""
    form_papel: str = "vendedor"
    form_senha: str = ""
    form_error: str = ""
    form_e_voce: bool = False
    is_saving_form: bool = False

    # Popup de nova senha (senha_id = 0: fechado).
    senha_id: int = 0
    senha_nome: str = ""
    senha_valor: str = ""
    senha_error: str = ""
    is_saving_senha: bool = False

    # Confirmação de desativar/reativar (ativo_id = 0: fechado).
    ativo_id: int = 0
    ativo_nome: str = ""
    ativo_novo: bool = False
    ativo_error: str = ""
    is_saving_ativo: bool = False

    @rx.event
    def load(self):
        redirect = self.require_auth()
        if redirect is not None:
            return redirect
        if not self.is_admin:
            return rx.redirect(routes.GESTAO_DASHBOARD)
        self.success = ""
        self.refresh()
        self.is_loading_page = False
        return None

    def refresh(self):
        try:
            usuarios = xano_client.list_users(self.auth_token)
        except xano_client.XanoAPIError as erro:
            self.load_error = (
                "Não foi possível carregar a equipe." if erro.is_network_error else erro.message
            )
            return
        self.load_error = ""
        self.users = [usuario_da_api(u, self.user_id) for u in usuarios]

    def _buscar(self, user_id: int) -> UsuarioView | None:
        return next((u for u in self.users if u.id == user_id), None)

    # --- Criar / editar -----------------------------------------------------

    @rx.var
    def form_titulo(self) -> str:
        return "Editar usuário" if self.form_id else "Novo usuário"

    def _fechar_form(self):
        self.show_form = False
        self.form_id = 0
        self.form_nome = ""
        self.form_email = ""
        self.form_papel = "vendedor"
        self.form_senha = ""
        self.form_error = ""
        self.form_e_voce = False

    @rx.event
    def open_create(self):
        self._fechar_form()
        self.success = ""
        self.show_form = True

    @rx.event
    def open_edit(self, user_id: int):
        usuario = self._buscar(user_id)
        if usuario is None:
            return
        self._fechar_form()
        self.form_id = usuario.id
        self.form_nome = usuario.nome
        self.form_email = usuario.email
        self.form_papel = usuario.papel
        self.form_e_voce = usuario.e_voce
        self.success = ""
        self.show_form = True

    @rx.event
    def set_show_form(self, open: bool):
        if not open and not self.is_saving_form:
            self._fechar_form()

    @rx.event
    def set_form_nome(self, value: str):
        self.form_nome = value

    @rx.event
    def set_form_email(self, value: str):
        self.form_email = value

    @rx.event
    def set_form_papel(self, value: str):
        if value in PAPEIS:
            self.form_papel = value

    @rx.event
    def set_form_senha(self, value: str):
        self.form_senha = value

    @rx.event
    def save_form(self):
        if self.is_saving_form or not self.show_form:
            return
        self.is_saving_form = True
        self.form_error = ""
        yield
        try:
            if self.form_id:
                xano_client.update_user(
                    self.auth_token, self.form_id, self.form_nome, self.form_email, self.form_papel
                )
                aviso = "Usuário atualizado."
            else:
                xano_client.create_user(
                    self.auth_token, self.form_nome, self.form_email, self.form_senha, self.form_papel
                )
                aviso = "Usuário criado."
        except xano_client.XanoAPIError as erro:
            self.form_error = mensagem_de_erro(erro)
            self.is_saving_form = False
            return
        self.is_saving_form = False
        self._fechar_form()
        self.success = aviso
        self.refresh()

    # --- Nova senha ---------------------------------------------------------

    @rx.var
    def show_senha(self) -> bool:
        return self.senha_id > 0

    def _fechar_senha(self):
        self.senha_id = 0
        self.senha_nome = ""
        self.senha_valor = ""
        self.senha_error = ""

    @rx.event
    def open_senha(self, user_id: int):
        usuario = self._buscar(user_id)
        if usuario is None:
            return
        self._fechar_senha()
        self.senha_id = usuario.id
        self.senha_nome = usuario.nome
        self.success = ""

    @rx.event
    def set_show_senha(self, open: bool):
        if not open and not self.is_saving_senha:
            self._fechar_senha()

    @rx.event
    def set_senha_valor(self, value: str):
        self.senha_valor = value

    @rx.event
    def save_senha(self):
        if self.is_saving_senha or not self.senha_id:
            return
        self.is_saving_senha = True
        self.senha_error = ""
        yield
        try:
            xano_client.set_user_password(self.auth_token, self.senha_id, self.senha_valor)
        except xano_client.XanoAPIError as erro:
            self.senha_error = mensagem_de_erro(erro)
            self.is_saving_senha = False
            return
        nome = self.senha_nome
        self.is_saving_senha = False
        self._fechar_senha()
        self.success = f"Nova senha definida para {nome}."

    # --- Desativar / reativar -----------------------------------------------

    @rx.var
    def show_ativo(self) -> bool:
        return self.ativo_id > 0

    @rx.var
    def ativo_texto(self) -> str:
        if self.ativo_novo:
            return f"Reativar o acesso de {self.ativo_nome}? A pessoa volta a entrar com a senha dela."
        return (
            f"Desativar o acesso de {self.ativo_nome}? A pessoa não consegue mais entrar e as "
            "sessões abertas param de funcionar. O histórico de vendas é mantido."
        )

    def _fechar_ativo(self):
        self.ativo_id = 0
        self.ativo_nome = ""
        self.ativo_error = ""

    @rx.event
    def open_ativo(self, user_id: int):
        usuario = self._buscar(user_id)
        if usuario is None:
            return
        self._fechar_ativo()
        self.ativo_id = usuario.id
        self.ativo_nome = usuario.nome
        self.ativo_novo = not usuario.ativo
        self.success = ""

    @rx.event
    def set_show_ativo(self, open: bool):
        if not open and not self.is_saving_ativo:
            self._fechar_ativo()

    @rx.event
    def save_ativo(self):
        if self.is_saving_ativo or not self.ativo_id:
            return
        self.is_saving_ativo = True
        self.ativo_error = ""
        yield
        try:
            xano_client.set_user_active(self.auth_token, self.ativo_id, self.ativo_novo)
        except xano_client.XanoAPIError as erro:
            self.ativo_error = mensagem_de_erro(erro)
            self.is_saving_ativo = False
            return
        nome, novo = self.ativo_nome, self.ativo_novo
        self.is_saving_ativo = False
        self._fechar_ativo()
        self.success = f"Acesso de {nome} {'reativado' if novo else 'desativado'}."
        self.refresh()
