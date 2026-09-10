"""Sessão do usuário e controle de acesso por papel.

`AuthState` é a base de que os demais States herdam para saber quem
está logado e o que o papel dele permite ver/editar. Autentica contra
o Xano real (`auth/login` + `auth/me`); o token é guardado em
`rx.Cookie` para que a sessão sobreviva tanto a um reload da página
quanto a um reinício do processo do Reflex.
"""

import reflex as rx

from vetements import xano_client


class AuthState(rx.State):
    # Token emitido pelo Xano. Guardado em cookie (não só em memória) para
    # sobreviver a um reinício do servidor — ver design.md, decisão 3.
    auth_token: str = rx.Cookie("", max_age=86400)

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

    @rx.var
    def iniciais(self) -> str:
        """Iniciais do nome, para o avatar da topbar (ex.: "Ana Ferreira" → "AF")."""
        partes = [p for p in self.nome.split() if p]
        letras = "".join(p[0] for p in partes[:2])
        return letras.upper() or "?"

    # Esta versão do Reflex não gera setters automáticos (`set_<var>`) por
    # padrão — cada campo editável precisa do próprio event handler.
    @rx.event
    def set_login_email(self, value: str):
        self.login_email = value

    @rx.event
    def set_login_senha(self, value: str):
        self.login_senha = value

    def _aplicar_sessao_do_token(self):
        """Busca os dados do usuário autenticado (auth/me) e popula a sessão.

        Levanta `xano_client.XanoAPIError` se o token não for mais válido.
        """
        usuario = xano_client.me(self.auth_token)
        self.is_authenticated = True
        self.user_id = usuario["id"]
        self.nome = usuario["name"]
        self.papel = usuario["role"]

    @rx.event
    def login(self):
        try:
            resposta = xano_client.login(self.login_email.strip(), self.login_senha)
        except xano_client.XanoAPIError as erro:
            if erro.is_network_error:
                self.login_error = "Não foi possível conectar ao servidor. Tente novamente."
            else:
                self.login_error = "E-mail ou senha inválidos"
            return None

        self.auth_token = resposta["authToken"]
        try:
            self._aplicar_sessao_do_token()
        except xano_client.XanoAPIError:
            self.auth_token = ""
            self.login_error = "Não foi possível conectar ao servidor. Tente novamente."
            return None

        self.login_error = ""
        self.login_senha = ""
        return rx.redirect("/")

    @rx.event
    def logout(self):
        self.reset()
        return rx.redirect("/login")

    @rx.event
    def require_auth(self):
        """Chamado no `on_load` de páginas protegidas.

        Se existe um token de sessão (cookie) mas a instância atual do
        State ainda não carregou os dados do usuário — caso de um reload
        ou de um reinício do processo do Reflex —, refaz essa carga via
        `auth/me` antes de decidir se redireciona para o login.
        """
        if self.auth_token and not self.is_authenticated:
            try:
                self._aplicar_sessao_do_token()
            except xano_client.XanoAPIError:
                self.auth_token = ""
        if not self.is_authenticated:
            return rx.redirect("/login")
        return None
