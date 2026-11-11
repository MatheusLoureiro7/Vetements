"""Tela de Usuários da equipe (somente administradores)."""

import reflex as rx

from vetements.components import ui
from vetements.components.shell import shell
from vetements.state.users import UsersState
from vetements.styles import BORDEAUX, INK_MUTED, primary_button_style


def _erro(mensagem) -> rx.Component:
    return rx.cond(mensagem != "", rx.text(mensagem, style={"color": BORDEAUX}, size="2"))


def _cabecalho(titulo, fechar) -> rx.Component:
    return rx.hstack(
        rx.dialog.title(titulo, margin_bottom="0"),
        rx.spacer(),
        rx.icon_button(
            rx.icon("x", size=16),
            variant="ghost",
            color_scheme="gray",
            size="1",
            type="button",
            on_click=fechar,
        ),
        width="100%",
        align_items="center",
    )


def _botoes(cancelar, salvar, salvando, texto: str) -> rx.Component:
    # Botões comuns (não `dialog.close`): com `disabled` ligado ao estado,
    # o `dialog.close` não fechava o popup.
    return rx.flex(
        rx.button("Cancelar", variant="soft", color_scheme="gray", type="button", disabled=salvando, on_click=cancelar),
        rx.button(
            rx.cond(salvando, "Salvando...", texto),
            on_click=salvar,
            disabled=salvando,
            loading=salvando,
            style=primary_button_style(),
        ),
        spacing="3",
        justify="end",
        margin_top="1.5rem",
    )


def _select_papel() -> rx.Component:
    return rx.select.root(
        rx.select.trigger(width="100%"),
        rx.select.content(
            rx.select.item("Vendedor", value="vendedor"),
            rx.select.item("Administrador", value="administrador"),
        ),
        value=UsersState.form_papel,
        on_change=UsersState.set_form_papel,
        disabled=UsersState.form_e_voce,
    )


def _form_dialog() -> rx.Component:
    return rx.dialog.root(
        rx.dialog.content(
            _cabecalho(UsersState.form_titulo, UsersState.set_show_form(False)),
            rx.vstack(
                _erro(UsersState.form_error),
                ui.field("Nome", rx.input(value=UsersState.form_nome, on_change=UsersState.set_form_nome, width="100%")),
                ui.field(
                    "E-mail (login)",
                    rx.input(value=UsersState.form_email, on_change=UsersState.set_form_email, type="email", width="100%"),
                ),
                ui.field("Papel", _select_papel()),
                rx.cond(
                    UsersState.form_e_voce,
                    rx.text("Você não pode mudar o seu próprio papel.", size="1", style={"color": INK_MUTED}),
                ),
                rx.cond(
                    UsersState.form_id == 0,
                    ui.field(
                        "Senha",
                        rx.input(
                            value=UsersState.form_senha,
                            on_change=UsersState.set_form_senha,
                            type="password",
                            width="100%",
                        ),
                    ),
                ),
                rx.cond(
                    UsersState.form_id == 0,
                    rx.text("Ao menos 8 caracteres, com letras e números.", size="1", style={"color": INK_MUTED}),
                ),
                spacing="3",
                width="100%",
                margin_top="1rem",
            ),
            _botoes(
                UsersState.set_show_form(False),
                UsersState.save_form,
                UsersState.is_saving_form,
                "Salvar",
            ),
            max_width="480px",
        ),
        open=UsersState.show_form,
        on_open_change=UsersState.set_show_form,
    )


def _senha_dialog() -> rx.Component:
    return rx.dialog.root(
        rx.dialog.content(
            _cabecalho("Nova senha", UsersState.set_show_senha(False)),
            rx.dialog.description(
                "Defina uma nova senha para " + UsersState.senha_nome + ". Passe a senha para a pessoa por um canal seguro.",
                size="2",
                margin_y="1rem",
            ),
            rx.vstack(
                _erro(UsersState.senha_error),
                ui.field(
                    "Nova senha",
                    rx.input(
                        value=UsersState.senha_valor,
                        on_change=UsersState.set_senha_valor,
                        type="password",
                        width="100%",
                    ),
                ),
                rx.text("Ao menos 8 caracteres, com letras e números.", size="1", style={"color": INK_MUTED}),
                spacing="3",
                width="100%",
            ),
            _botoes(
                UsersState.set_show_senha(False),
                UsersState.save_senha,
                UsersState.is_saving_senha,
                "Definir senha",
            ),
            max_width="440px",
        ),
        open=UsersState.show_senha,
        on_open_change=UsersState.set_show_senha,
    )


def _ativo_dialog() -> rx.Component:
    return rx.alert_dialog.root(
        rx.alert_dialog.content(
            rx.alert_dialog.title(rx.cond(UsersState.ativo_novo, "Reativar acesso", "Desativar acesso")),
            rx.alert_dialog.description(UsersState.ativo_texto, size="2"),
            rx.box(_erro(UsersState.ativo_error), margin_top="0.75rem"),
            _botoes(
                UsersState.set_show_ativo(False),
                UsersState.save_ativo,
                UsersState.is_saving_ativo,
                "Confirmar",
            ),
            max_width="440px",
        ),
        open=UsersState.show_ativo,
        on_open_change=UsersState.set_show_ativo,
    )


def _acao(texto: str, icone: str, evento) -> rx.Component:
    return rx.button(rx.icon(icone, size=14), texto, variant="soft", color_scheme="gray", size="1", on_click=evento)


def _linha(u) -> rx.Component:
    return ui.data_row(
        ui.data_cell(rx.cond(u.e_voce, u.nome + " (você)", u.nome)),
        ui.data_cell(u.email),
        ui.data_cell(u.papel_label),
        ui.data_cell(
            rx.text(u.status_label, size="2", style={"color": rx.cond(u.ativo, "inherit", BORDEAUX)}),
        ),
        ui.data_cell(u.ultimo_login_label),
        ui.data_cell(
            rx.hstack(
                _acao("Editar", "pencil", UsersState.open_edit(u.id)),
                _acao("Nova senha", "key-round", UsersState.open_senha(u.id)),
                rx.cond(
                    ~u.e_voce,
                    rx.cond(
                        u.ativo,
                        _acao("Desativar", "user-x", UsersState.open_ativo(u.id)),
                        _acao("Reativar", "user-check", UsersState.open_ativo(u.id)),
                    ),
                ),
                spacing="2",
                wrap="wrap",
            )
        ),
    )


def _tabela() -> rx.Component:
    return rx.cond(
        UsersState.is_loading_page,
        ui.loading_state("Carregando equipe..."),
        rx.cond(
            UsersState.users.length() > 0,
            ui.data_table(
                ["Nome", "E-mail", "Papel", "Status", "Último login", "Ações"],
                rx.foreach(UsersState.users, _linha),
            ),
            ui.empty_state("Nenhum usuário encontrado."),
        ),
    )


def users_page() -> rx.Component:
    return shell(
        ui.section_heading(
            "Usuários",
            action=rx.button("+ Novo usuário", on_click=UsersState.open_create, size="2"),
        ),
        rx.cond(
            UsersState.load_error != "",
            rx.text(UsersState.load_error, style={"color": BORDEAUX}, size="2", margin_bottom="1rem"),
        ),
        rx.cond(
            UsersState.success != "",
            rx.box(ui.success_message(UsersState.success), margin_bottom="1rem"),
        ),
        _form_dialog(),
        _senha_dialog(),
        _ativo_dialog(),
        _tabela(),
    )
