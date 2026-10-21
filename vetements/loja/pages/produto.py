"""Página de detalhe de um produto da loja: galeria de fotos, nome,
categoria, preço, descrição e variações (tamanho/cor), com as
esgotadas marcadas. Quantidade em estoque e SKU nunca chegam aqui.
"""

import reflex as rx

from vetements import routes
from vetements.components.ui import skeleton_block
from vetements.loja.components.layout import container_loja, store_layout
from vetements.loja.components.produto import (
    PROPORCAO_FOTO,
    aviso,
    botao_primario,
    foto_produto,
)
from vetements.loja.state.produto import CARREGANDO, ENCONTRADO, ERRO, NAO_ENCONTRADO, ProdutoState
from vetements.styles import (
    BORDEAUX,
    INK_MUTED,
    LINE,
    RADIUS,
    RADIUS_SM,
    heading_style,
)


def _voltar() -> rx.Component:
    return rx.link(
        rx.hstack(rx.icon("arrow-left", size=16), rx.text("Voltar à vitrine", size="2"), spacing="2", align_items="center"),
        href=routes.LOJA_HOME,
        underline="none",
        style={"color": INK_MUTED},
        _hover={"color": BORDEAUX},
    )


def _miniatura(url: rx.Var) -> rx.Component:
    selecionada = ProdutoState.foto_atual == url
    return rx.el.button(
        rx.image(
            src=url,
            alt="",
            width="100%",
            style={"aspect_ratio": PROPORCAO_FOTO, "object_fit": "cover", "display": "block"},
            border_radius=RADIUS_SM,
        ),
        on_click=ProdutoState.escolher_foto(url),
        type="button",
        aria_label="Ver esta foto",
        aria_pressed=rx.cond(selecionada, "true", "false"),
        width="4.5rem",
        padding="0",
        cursor="pointer",
        border_radius=RADIUS_SM,
        style={
            "border": rx.cond(selecionada, f"2px solid {BORDEAUX}", "2px solid transparent"),
            "background": "none",
        },
    )


def _galeria() -> rx.Component:
    return rx.vstack(
        foto_produto(ProdutoState.foto_atual, ProdutoState.produto.nome),
        rx.cond(
            ProdutoState.produto.imagens.length() > 1,
            rx.hstack(rx.foreach(ProdutoState.produto.imagens, _miniatura), spacing="2", wrap="wrap"),
        ),
        spacing="3",
        width="100%",
    )


def _chip_variacao(variacao) -> rx.Component:
    """Botão de uma variação: as disponíveis podem ser escolhidas para o
    carrinho; as esgotadas ficam riscadas e desabilitadas."""
    escolhida = ProdutoState.variacao_escolhida == variacao.id
    return rx.el.button(
        variacao.tamanho + " · " + variacao.cor,
        rx.cond(~variacao.disponivel, rx.el.span("Esgotado", class_name="lj-variant__tag")),
        type="button",
        class_name="lj-variant",
        disabled=~variacao.disponivel,
        aria_pressed=rx.cond(escolhida, "true", "false"),
        aria_label=rx.cond(
            variacao.disponivel,
            variacao.tamanho + " · " + variacao.cor,
            variacao.tamanho + " · " + variacao.cor + " (esgotado)",
        ),
        on_click=ProdutoState.escolher_variacao(variacao.id),
    )


def _comprar() -> rx.Component:
    """Botão do carrinho e a confirmação depois de adicionar."""
    return rx.vstack(
        rx.el.button(
            rx.icon("shopping-bag", size=16, stroke_width=1.5, aria_hidden="true"),
            "Adicionar ao carrinho",
            type="button",
            class_name="lj-pill-button lj-pill-button--wide",
            disabled=ProdutoState.variacao_escolhida == 0,
            on_click=ProdutoState.adicionar_ao_carrinho,
        ),
        rx.cond(
            ProdutoState.adicionado,
            rx.el.p(
                "Adicionado ao carrinho. ",
                rx.link("Ver carrinho", href=routes.LOJA_CARRINHO, class_name="lj-link-button"),
                class_name="lj-form-message",
                role="status",
            ),
            rx.cond(
                ProdutoState.variacao_escolhida == 0,
                rx.el.p("Escolha um tamanho para adicionar ao carrinho.", class_name="lj-form-message"),
            ),
        ),
        spacing="2",
        align_items="start",
        width="100%",
    )


def _informacoes() -> rx.Component:
    return rx.vstack(
        rx.text(
            ProdutoState.produto.categoria_nome,
            size="2",
            style={"color": INK_MUTED, "letter_spacing": "0.08em", "text_transform": "uppercase"},
        ),
        rx.heading(
            ProdutoState.produto.nome,
            as_="h1",
            style={**heading_style(), "font_size": "clamp(1.75rem, 4vw, 2.5rem)", "line_height": "1.15"},
        ),
        rx.text(ProdutoState.produto.preco_label, size="5", style={"color": BORDEAUX}),
        rx.cond(
            ProdutoState.produto.descricao != "",
            rx.text(ProdutoState.produto.descricao, size="3", style={"color": INK_MUTED, "white_space": "pre-line"}),
        ),
        rx.cond(
            ProdutoState.produto.variacoes.length() > 0,
            rx.vstack(
                rx.text("Tamanhos e cores", size="2", weight="medium"),
                rx.flex(
                    rx.foreach(ProdutoState.produto.variacoes, _chip_variacao),
                    gap="2",
                    wrap="wrap",
                    role="group",
                    aria_label="Tamanho e cor",
                ),
                _comprar(),
                spacing="2",
                align_items="start",
                padding_top="1rem",
                border_top=f"1px solid {LINE}",
                width="100%",
            ),
        ),
        spacing="3",
        align_items="start",
        width="100%",
    )


def _detalhe() -> rx.Component:
    return rx.grid(
        _galeria(),
        _informacoes(),
        columns=rx.breakpoints(initial="1", md="2"),
        spacing="8",
        width="100%",
    )


def _carregando() -> rx.Component:
    return rx.grid(
        rx.box(skeleton_block(height="100%", radius=RADIUS), width="100%", style={"aspect_ratio": PROPORCAO_FOTO}),
        rx.vstack(
            skeleton_block(height="0.875rem", width="30%"),
            skeleton_block(height="2.25rem", width="80%"),
            skeleton_block(height="1.5rem", width="25%"),
            skeleton_block(height="4rem"),
            spacing="3",
            width="100%",
        ),
        columns=rx.breakpoints(initial="1", md="2"),
        spacing="8",
        width="100%",
        aria_busy="true",
    )


def produto_page() -> rx.Component:
    return store_layout(
        container_loja(
            rx.vstack(
                _voltar(),
                rx.match(
                    ProdutoState.situacao,
                    (ENCONTRADO, _detalhe()),
                    (CARREGANDO, _carregando()),
                    (
                        NAO_ENCONTRADO,
                        aviso(
                            "package-search",
                            "Produto não encontrado",
                            "Esta peça não existe ou não está mais disponível na loja.",
                            rx.link(botao_primario("Ver a vitrine"), href=routes.LOJA_HOME),
                        ),
                    ),
                    (
                        ERRO,
                        aviso(
                            "cloud-off",
                            "Não foi possível carregar este produto",
                            "Verifique sua conexão e tente novamente em instantes.",
                            botao_primario("Tentar novamente", on_click=ProdutoState.load),
                        ),
                    ),
                    _carregando(),
                ),
                spacing="6",
                width="100%",
            ),
        ),
    )
