"""Sessão do usuário e controle de acesso por papel.

`AuthState` é a base de que os demais States herdam para saber quem
está logado e o que o papel dele permite ver/editar. Autenticação é
mockada nesta fase — ver `state/mock_data.py`.
"""

import reflex as rx

from vetements.state import mock_data


class AuthState(rx.State):
    is_authenticated: bool = False
    user_id: int = 0
    nome: str = ""
    papel: str = ""  # "administrador" | "vendedor"

    login_email: str = ""
    login_senha: str = ""
    login_error: str = ""

    @rx.var
    def is_admin(self) -> bool:
        return self.papel == "administrador"

    @rx.var
    def papel_label(self) -> str:
        return "Administrador" if self.is_admin else "Vendedor"

    # Esta versão do Reflex não gera setters automáticos (`set_<var>`) por
    # padrão — cada campo editável precisa do próprio event handler.
    @rx.event
    def set_login_email(self, value: str):
        self.login_email = value

    @rx.event
    def set_login_senha(self, value: str):
        self.login_senha = value

    @rx.event
    def login(self):
        usuario = mock_data.authenticate(self.login_email.strip(), self.login_senha)
        if usuario is None:
            self.login_error = "E-mail ou senha inválidos"
            return None
        self.is_authenticated = True
        self.user_id = usuario.id
        self.nome = usuario.nome
        self.papel = usuario.papel
        self.login_error = ""
        self.login_senha = ""
        return rx.redirect("/")

    @rx.event
    def logout(self):
        self.reset()
        return rx.redirect("/login")

    @rx.event
    def require_auth(self):
        """Chamado no `on_load` de páginas protegidas."""
        if not self.is_authenticated:
            return rx.redirect("/login")
        return None
