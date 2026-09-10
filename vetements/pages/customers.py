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
                    "Salvar cliente",
                    on_click=CustomersState.create_customer,
                    style=primary_button_style(),
                ),
                spacing="3",
                width="100%",
            ),
            margin_bottom="1.5rem",
        ),
    )


def _customers_table() -> rx.Component:
    rows = rx.foreach(
        CustomersState.customers,
        lambda c: ui.data_row(
            ui.data_cell(c.nome),
            ui.data_cell(c.telefone),
            ui.data_cell(c.email),
        ),
    )
    return rx.cond(
        CustomersState.customers.length() > 0,
        ui.data_table(["Nome", "Telefone", "E-mail"], rows),
        ui.empty_state("Nenhum cliente encontrado."),
    )


def customers_page() -> rx.Component:
    return shell(
        ui.section_heading(
            "Clientes",
            action=rx.button("+ Novo cliente", on_click=CustomersState.toggle_form, size="2"),
        ),
        rx.input(
            placeholder="Buscar por nome...",
            value=CustomersState.search,
            on_change=CustomersState.set_search,
            max_width="320px",
            margin_bottom="1.5rem",
        ),
        _new_customer_form(),
        _customers_table(),
    )
