"""Tela de Clientes."""

import reflex as rx

from vetements.components import ui
from vetements.components.shell import shell
from vetements.state.customers import CustomersState
from vetements.styles import BORDEAUX, primary_button_style


def _new_customer_form() -> rx.Component:
    return rx.cond(
        CustomersState.show_form,
        ui.card(
            rx.vstack(
                ui.card_title("Novo cliente"),
                rx.cond(
                    CustomersState.form_error != "",
                    rx.text(CustomersState.form_error, style={"color": BORDEAUX}, size="2"),
                ),
                rx.hstack(
                    ui.field("Nome", rx.input(value=CustomersState.form_nome, on_change=CustomersState.set_form_nome, width="100%")),
                    ui.field("Telefone", rx.input(value=CustomersState.form_telefone, on_change=CustomersState.set_form_telefone, width="100%")),
                    ui.field("E-mail", rx.input(value=CustomersState.form_email, on_change=CustomersState.set_form_email, width="100%")),
                    spacing="3",
                    width="100%",
                    align_items="end",
                ),
                rx.button(
                    rx.cond(CustomersState.is_submitting, "Salvando...", "Salvar cliente"),
                    on_click=CustomersState.create_customer,
                    disabled=CustomersState.is_submitting,
                    loading=CustomersState.is_submitting,
                    style=primary_button_style(),
                ),
                spacing="3",
                width="100%",
            ),
            margin_bottom="1.5rem",
        ),
    )


def _edit_dialog() -> rx.Component:
    """Popup de edição, controlado por `show_edit`. Todo fechamento passa
    por `set_show_edit`, que descarta o que foi digitado."""
    return rx.dialog.root(
        rx.dialog.content(
            rx.hstack(
                rx.dialog.title("Editar cliente", margin_bottom="0"),
                rx.spacer(),
                rx.dialog.close(
                    rx.icon_button(rx.icon("x", size=16), variant="ghost", color_scheme="gray", size="1", type="button"),
                ),
                width="100%",
                align_items="center",
            ),
            rx.dialog.description(
                "Nome e ao menos um contato (telefone ou e-mail). Se o cliente tiver conta na loja, o e-mail é o login dele.",
                size="2",
                margin_bottom="1rem",
            ),
            rx.vstack(
                rx.cond(
                    CustomersState.edit_error != "",
                    rx.text(CustomersState.edit_error, style={"color": BORDEAUX}, size="2"),
                ),
                ui.field("Nome", rx.input(value=CustomersState.edit_nome, on_change=CustomersState.set_edit_nome, width="100%")),
                ui.field("Telefone", rx.input(value=CustomersState.edit_telefone, on_change=CustomersState.set_edit_telefone, width="100%")),
                ui.field("E-mail", rx.input(value=CustomersState.edit_email, on_change=CustomersState.set_edit_email, type="email", width="100%")),
                spacing="3",
                width="100%",
            ),
            rx.flex(
                rx.button(
                    "Cancelar",
                    variant="soft",
                    color_scheme="gray",
                    type="button",
                    disabled=CustomersState.is_saving_edit,
                    on_click=CustomersState.set_show_edit(False),
                ),
                rx.button(
                    rx.cond(CustomersState.is_saving_edit, "Salvando...", "Salvar alterações"),
                    on_click=CustomersState.save_edit,
                    disabled=CustomersState.is_saving_edit,
                    loading=CustomersState.is_saving_edit,
                    style=primary_button_style(),
                ),
                spacing="3",
                justify="end",
                margin_top="1.5rem",
            ),
            max_width="480px",
        ),
        open=CustomersState.show_edit,
        on_open_change=CustomersState.set_show_edit,
    )


def _customers_table() -> rx.Component:
    rows = rx.foreach(
        CustomersState.customers,
        lambda c: ui.data_row(
            ui.data_cell(c.nome),
            ui.data_cell(c.telefone),
            ui.data_cell(c.email),
            ui.data_cell(
                rx.button(
                    rx.icon("pencil", size=14),
                    "Editar",
                    variant="soft",
                    color_scheme="gray",
                    size="1",
                    on_click=CustomersState.open_edit(c.id),
                )
            ),
        ),
    )
    return rx.cond(
        CustomersState.is_loading_page,
        ui.loading_state("Carregando clientes..."),
        rx.cond(
            CustomersState.customers.length() > 0,
            ui.data_table(["Nome", "Telefone", "E-mail", "Ações"], rows),
            ui.empty_state("Nenhum cliente encontrado."),
        ),
    )


def customers_page() -> rx.Component:
    return shell(
        ui.section_heading(
            "Clientes",
            action=rx.button("+ Novo cliente", on_click=CustomersState.toggle_form, size="2"),
        ),
        rx.cond(
            CustomersState.success != "",
            rx.box(ui.success_message(CustomersState.success), margin_bottom="1rem"),
        ),
        rx.input(
            placeholder="Buscar por nome...",
            value=CustomersState.search,
            on_change=CustomersState.set_search,
            max_width="320px",
            margin_bottom="1.5rem",
        ),
        _new_customer_form(),
        _edit_dialog(),
        _customers_table(),
    )
