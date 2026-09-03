"""Tela de Produtos & Categorias."""

import reflex as rx

from vetements.components import ui
from vetements.components.shell import shell
from vetements.state.products import ProductsState
from vetements.styles import BORDEAUX, INK_MUTED


def _new_product_form() -> rx.Component:
    return rx.cond(
        ProductsState.show_form,
        rx.vstack(
            rx.cond(
                ProductsState.form_error != "",
                rx.text(ProductsState.form_error, style={"color": BORDEAUX}, size="2"),
            ),
            rx.hstack(
                ui.field(
                    "Nome",
                    rx.input(
                        value=ProductsState.form_nome,
                        on_change=ProductsState.set_form_nome,
                        width="100%",
                    ),
                ),
                ui.field(
                    "Categoria",
                    rx.select.root(
                        rx.select.trigger(placeholder="Selecione"),
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
                ),
                ui.field(
                    "Preço base",
                    rx.input(
                        value=ProductsState.form_preco,
                        on_change=ProductsState.set_form_preco,
                        placeholder="0,00",
                        width="100%",
                    ),
                ),
                spacing="3",
                width="100%",
                align_items="end",
            ),
            ui.field(
                "Descrição",
                rx.text_area(
                    value=ProductsState.form_descricao,
                    on_change=ProductsState.set_form_descricao,
                    width="100%",
                ),
            ),
            rx.button(
                "Salvar produto",
                on_click=ProductsState.create_product,
                style={"background_color": BORDEAUX, "color": "white"},
            ),
            spacing="3",
            width="100%",
            padding="1rem",
            margin_bottom="1.5rem",
            style={"border": f"1px solid {INK_MUTED}"},
        ),
    )


def _variant_form() -> rx.Component:
    return rx.cond(
        ProductsState.selected_product_id > 0,
        rx.vstack(
            rx.text("Nova variação", weight="medium", size="3"),
            rx.cond(
                ProductsState.variant_error != "",
                rx.text(ProductsState.variant_error, style={"color": BORDEAUX}, size="2"),
            ),
            rx.hstack(
                ui.field("Tamanho", rx.input(value=ProductsState.variant_tamanho, on_change=ProductsState.set_variant_tamanho)),
                ui.field("Cor", rx.input(value=ProductsState.variant_cor, on_change=ProductsState.set_variant_cor)),
                ui.field("SKU", rx.input(value=ProductsState.variant_sku, on_change=ProductsState.set_variant_sku)),
                ui.field("Qtd. inicial", rx.input(value=ProductsState.variant_quantidade, on_change=ProductsState.set_variant_quantidade)),
                rx.button("Adicionar", on_click=ProductsState.add_variant, align_self="end"),
                spacing="3",
                align_items="end",
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
            padding="1rem",
            margin_bottom="1.5rem",
            style={"border": f"1px solid {INK_MUTED}"},
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
        ProductsState.products.length() > 0,
        ui.data_table(["Nome", "Categoria", "Preço", "Variações", ""], rows),
        ui.empty_state("Nenhum produto encontrado."),
    )


def products_page() -> rx.Component:
    return shell(
        ui.section_heading(
            "Produtos",
            action=rx.cond(
                ProductsState.is_admin,
                rx.button("+ Novo produto", on_click=ProductsState.toggle_form, size="2"),
            ),
        ),
        rx.input(
            placeholder="Buscar por nome...",
            value=ProductsState.search,
            on_change=ProductsState.set_search,
            max_width="320px",
            margin_bottom="1.5rem",
        ),
        _new_product_form(),
        _variant_form(),
        _products_table(),
    )
