"""Tela de Produtos & Categorias."""

import reflex as rx

from vetements.components import ui
from vetements.components.shell import shell
from vetements.state.products import ProductsState
from vetements.styles import BORDEAUX, INK_MUTED, primary_button_style


def _product_success_banner() -> rx.Component:
    return rx.cond(
        ProductsState.product_success != "",
        ui.success_message(ProductsState.product_success),
    )


def _new_product_dialog() -> rx.Component:
    """Popup de cadastro de produto, controlado por `show_form`. Todo
    fechamento (Cancelar, X, Esc, clique fora) passa por
    `set_show_form`, que descarta o formulário."""
    return rx.dialog.root(
        rx.dialog.content(
            rx.hstack(
                rx.dialog.title("Novo produto", margin_bottom="0"),
                rx.spacer(),
                rx.dialog.close(
                    rx.icon_button(
                        rx.icon("x", size=16),
                        variant="ghost",
                        color_scheme="gray",
                        size="1",
                        type="button",
                    ),
                ),
                width="100%",
                align_items="center",
            ),
            rx.dialog.description(
                "Preencha os dados do modelo. As variações (tamanho e cor) "
                "são adicionadas depois, pelo botão Variações.",
                size="2",
                margin_bottom="1rem",
            ),
            rx.vstack(
                rx.cond(
                    ProductsState.form_error != "",
                    rx.text(ProductsState.form_error, style={"color": BORDEAUX}, size="2"),
                ),
                rx.flex(
                    ui.field(
                        "Nome",
                        rx.input(
                            value=ProductsState.form_nome,
                            on_change=ProductsState.set_form_nome,
                            width="100%",
                        ),
                        error=ProductsState.nome_error,
                    ),
                    ui.field(
                        "Categoria",
                        rx.select.root(
                            rx.select.trigger(placeholder="Selecione", width="100%"),
                            rx.select.content(
                                rx.foreach(
                                    ProductsState.categories,
                                    lambda categoria: rx.select.item(
                                        categoria.nome, value=categoria.id.to_string()
                                    ),
                                )
                            ),
                            value=ProductsState.form_categoria_id,
                            on_change=ProductsState.set_form_categoria_id,
                        ),
                        error=ProductsState.categoria_error,
                    ),
                    direction=rx.breakpoints(initial="column", sm="row"),
                    spacing="3",
                    width="100%",
                ),
                rx.flex(
                    ui.field(
                        "Preço base",
                        rx.input(
                            rx.input.slot("R$"),
                            value=ProductsState.form_preco,
                            on_change=ProductsState.set_form_preco,
                            placeholder="0,00",
                            input_mode="decimal",
                            width="100%",
                        ),
                        error=ProductsState.preco_error,
                    ),
                    ui.field(
                        "Descrição",
                        rx.text_area(
                            value=ProductsState.form_descricao,
                            on_change=ProductsState.set_form_descricao,
                            width="100%",
                        ),
                    ),
                    direction=rx.breakpoints(initial="column", sm="row"),
                    spacing="3",
                    width="100%",
                ),
                spacing="3",
                width="100%",
            ),
            rx.flex(
                rx.dialog.close(
                    rx.button("Cancelar", variant="soft", color_scheme="gray", type="button"),
                ),
                rx.button(
                    rx.cond(ProductsState.is_submitting_product, "Salvando...", "Salvar produto"),
                    on_click=ProductsState.create_product,
                    disabled=ProductsState.is_submitting_product,
                    loading=ProductsState.is_submitting_product,
                    style=primary_button_style(),
                ),
                spacing="3",
                justify="end",
                margin_top="1.5rem",
            ),
            max_width="560px",
        ),
        open=ProductsState.show_form,
        on_open_change=ProductsState.set_show_form,
    )


def _variant_form() -> rx.Component:
    return rx.cond(
        ProductsState.selected_product_id > 0,
        ui.card(
            rx.vstack(
                ui.card_title("Nova variação"),
                rx.cond(
                    ProductsState.variant_error != "",
                    rx.text(ProductsState.variant_error, style={"color": BORDEAUX}, size="2"),
                ),
                rx.hstack(
                    ui.field("Tamanho", rx.input(value=ProductsState.variant_tamanho, on_change=ProductsState.set_variant_tamanho)),
                    ui.field("Cor", rx.input(value=ProductsState.variant_cor, on_change=ProductsState.set_variant_cor)),
                    ui.field("SKU", rx.input(value=ProductsState.variant_sku, on_change=ProductsState.set_variant_sku)),
                    ui.field("Qtd. inicial", rx.input(value=ProductsState.variant_quantidade, on_change=ProductsState.set_variant_quantidade)),
                    rx.button(
                        rx.cond(ProductsState.is_submitting_variant, "Adicionando...", "Adicionar"),
                        on_click=ProductsState.add_variant,
                        disabled=ProductsState.is_submitting_variant,
                        loading=ProductsState.is_submitting_variant,
                        align_self="end",
                    ),
                    spacing="3",
                    align_items="end",
                ),
                rx.cond(
                    ProductsState.variant_success != "",
                    ui.success_message(ProductsState.variant_success),
                ),
                rx.foreach(
                    ProductsState.variants_of_selected,
                    lambda v: rx.text(
                        f"{v.tamanho} · {v.cor} · SKU {v.sku} · estoque {v.quantidade}",
                        size="2",
                        style={"color": INK_MUTED},
                    ),
                ),
                spacing="2",
                width="100%",
            ),
            margin_bottom="1.5rem",
        ),
    )


def _products_table() -> rx.Component:
    rows = rx.foreach(
        ProductsState.products,
        lambda produto: ui.data_row(
            ui.data_cell(produto.nome),
            ui.data_cell(produto.categoria_nome),
            ui.data_cell(produto.preco_label),
            ui.data_cell(produto.variantes_count),
            ui.data_cell(
                rx.cond(
                    ProductsState.is_admin,
                    rx.button(
                        "Variações",
                        on_click=ProductsState.select_product(produto.id),
                        size="1",
                        variant="soft",
                    ),
                )
            ),
        ),
    )
    return rx.cond(
        ProductsState.is_loading_page,
        ui.loading_state("Carregando produtos..."),
        rx.cond(
            ProductsState.products.length() > 0,
            ui.data_table(["Nome", "Categoria", "Preço", "Variações", ""], rows),
            ui.empty_state("Nenhum produto encontrado."),
        ),
    )


def products_page() -> rx.Component:
    return shell(
        ui.section_heading(
            "Produtos",
            action=rx.cond(
                ProductsState.is_admin,
                rx.button("+ Novo produto", on_click=ProductsState.open_form, size="2"),
            ),
        ),
        rx.cond(
            ProductsState.load_error != "",
            rx.text(ProductsState.load_error, style={"color": BORDEAUX}, size="2", margin_bottom="1rem"),
        ),
        rx.box(_product_success_banner(), margin_bottom="1rem"),
        rx.input(
            placeholder="Buscar por nome...",
            value=ProductsState.search,
            on_change=ProductsState.set_search,
            max_width="320px",
            margin_bottom="1.5rem",
        ),
        _new_product_dialog(),
        _variant_form(),
        _products_table(),
    )
