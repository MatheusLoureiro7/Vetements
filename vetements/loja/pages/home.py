"""Página inicial da loja, no layout da home de referência
(`ai-website-cloner`): banner principal, vitrine com abas por categoria e
carrossel de produtos, segundo banner, newsletter e blocos de imagem com
texto.

Quando não há nenhum produto publicado, a vitrine mostra só o aviso de
coleção em breve (sem abas nem listagem vazia).
"""

import reflex as rx

from vetements.loja.components.layout import ID_LOJA_FISICA, ID_LOOKBOOK, store_layout
from vetements.loja.components.produto import aviso, botao_primario, card_produto
from vetements.loja.state.catalogo import (
    CARREGANDO,
    COLECAO_EM_BREVE,
    ERRO,
    ID_VITRINE,
    LISTA,
    SEM_RESULTADO,
    TODAS,
    CatalogoState,
)
from vetements.loja.state.newsletter import NewsletterState

IMAGENS = "/loja"


def _banner(
    titulo: str,
    chamada: str,
    href: str,
    desktop: str,
    mobile: str,
    *,
    principal: bool = False,
    vidro: tuple[float, int] = (0.25, 10),
    class_name: str = "",
) -> rx.Component:
    """Banner de borda a borda com foto (uma para celular, outra a partir
    de 750px), título centralizado e botão de vidro fosco."""
    opacidade, desfoque = vidro
    return rx.el.section(
        rx.el.div(
            rx.el.picture(
                rx.el.source(media="(min-width: 750px)", src_set=desktop),
                rx.el.img(
                    src=mobile,
                    alt="",
                    loading="eager" if principal else "lazy",
                    custom_attrs={"fetchpriority": "high" if principal else "auto"},
                ),
                class_name="lj-banner__media",
            ),
            rx.el.div(
                rx.el.h2(titulo, class_name="lj-banner__heading"),
                rx.el.a(
                    rx.el.span(chamada),
                    href=href,
                    class_name="lj-glass-button",
                    style={"--lj-button-opacity": str(opacidade), "--lj-button-blur": f"{desfoque}px"},
                ),
                class_name="lj-banner__content",
            ),
            class_name="lj-banner lj-banner--hero" if principal else "lj-banner",
        ),
        class_name=f"lj-banner-section {class_name}".strip(),
    )


def _aba(rotulo, valor) -> rx.Component:
    return rx.el.button(
        rotulo,
        type="button",
        role="tab",
        class_name="lj-tab",
        aria_selected=rx.cond(CatalogoState.categoria == valor, "true", "false"),
        aria_controls="lj-vitrine-painel",
        on_click=CatalogoState.set_categoria(valor),
    )


def _abas() -> rx.Component:
    return rx.el.div(
        _aba("Tudo", TODAS),
        rx.foreach(CatalogoState.categorias, lambda c: _aba(c.nome, c.id.to_string())),
        class_name="lj-tabs",
        role="tablist",
        aria_label="Categorias",
    )


def _resumo_da_busca() -> rx.Component:
    """Termo buscado pelo cabeçalho, com atalho para limpar."""
    return rx.cond(
        CatalogoState.filtrado & (CatalogoState.busca != ""),
        rx.el.p(
            rx.el.span("Resultados para “", CatalogoState.busca, "”"),
            rx.el.button(
                "Limpar busca",
                type="button",
                class_name="lj-link-button",
                on_click=CatalogoState.limpar_filtros,
            ),
            class_name="lj-search-summary",
        ),
    )


def _carrossel() -> rx.Component:
    return rx.el.ul(
        rx.foreach(
            CatalogoState.produtos,
            lambda produto: rx.el.li(card_produto(produto), class_name="lj-carousel__slide"),
        ),
        class_name="lj-carousel",
        aria_label="Produtos",
        tab_index=0,
    )


def _carrossel_carregando(quantidade: int = 4) -> rx.Component:
    return rx.el.ul(
        *[
            rx.el.li(
                rx.el.div(class_name="lj-skeleton", style={"width": "100%", "aspect_ratio": "1 / 1"}),
                class_name="lj-carousel__slide",
            )
            for _ in range(quantidade)
        ],
        class_name="lj-carousel",
        aria_busy="true",
        aria_label="Carregando produtos",
    )


def _vitrine() -> rx.Component:
    return rx.el.section(
        rx.cond(CatalogoState.situacao != COLECAO_EM_BREVE, _abas()),
        _resumo_da_busca(),
        rx.el.div(
            rx.match(
                CatalogoState.situacao,
                (LISTA, _carrossel()),
                (CARREGANDO, _carrossel_carregando()),
                (
                    SEM_RESULTADO,
                    aviso(
                        "search-x",
                        "Nenhuma peça encontrada",
                        "Tente outro termo de busca ou outra categoria.",
                        botao_primario("Limpar filtros", type="button", on_click=CatalogoState.limpar_filtros),
                    ),
                ),
                (
                    ERRO,
                    aviso(
                        "cloud-off",
                        "Não foi possível carregar a vitrine",
                        "Verifique sua conexão e tente novamente em instantes.",
                        botao_primario("Tentar novamente", type="button", on_click=CatalogoState.load),
                    ),
                ),
                aviso(
                    "shirt",
                    "Coleção em breve",
                    "Estamos preparando a vitrine. Volte em breve para conhecer as peças.",
                ),
            ),
            id="lj-vitrine-painel",
            role="tabpanel",
        ),
        id=ID_VITRINE,
        class_name="lj-collection",
        aria_label="Produtos em destaque",
    )


def _newsletter() -> rx.Component:
    return rx.el.section(
        rx.el.h2("Assine nossos e-mails", class_name="lj-newsletter__heading"),
        rx.el.p(
            "Seja a primeira pessoa a saber sobre novas coleções e ofertas exclusivas.",
            class_name="lj-newsletter__sub",
        ),
        rx.form(
            rx.el.div(
                rx.el.input(
                    id="newsletter-email",
                    type="email",
                    name="email",
                    placeholder="E-mail",
                    aria_label="E-mail",
                    auto_complete="email",
                ),
                rx.el.button(rx.icon("arrow-right", stroke_width=1.5), type="submit", aria_label="Inscrever-se"),
                class_name="lj-field",
            ),
            rx.cond(
                NewsletterState.mensagem != "",
                rx.el.p(
                    NewsletterState.mensagem,
                    class_name="lj-form-message",
                    role="status",
                    custom_attrs={"data-tone": NewsletterState.tom},
                ),
            ),
            on_submit=NewsletterState.assinar,
            class_name="lj-newsletter__form",
            no_validate=True,
        ),
        class_name="lj-newsletter",
    )


def _imagem_com_texto(id_: str, titulo: str, subtitulo: str, href: str, desktop: str, mobile: str) -> rx.Component:
    return rx.el.div(
        rx.el.a(
            rx.el.span(
                rx.el.picture(
                    rx.el.source(media="(min-width: 750px)", src_set=desktop),
                    rx.el.img(src=mobile, alt=titulo, loading="lazy"),
                ),
                class_name="lj-itv__media",
            ),
            rx.el.span(
                rx.el.h2(titulo, class_name="lj-itv__title"),
                rx.el.p(subtitulo, class_name="lj-itv__subtitle"),
                class_name="lj-itv__content",
            ),
            href=href,
            class_name="lj-itv__link",
        ),
        id=id_,
        class_name="lj-itv__item",
    )


def _imagens_com_texto() -> rx.Component:
    return rx.el.section(
        rx.el.div(
            _imagem_com_texto(
                ID_LOOKBOOK,
                "COLEÇÃO PRIMAVERA ’26 | LOOKBOOK",
                "Veja as peças da coleção",
                f"#{ID_VITRINE}",
                f"{IMAGENS}/lookbook-desktop.jpg",
                f"{IMAGENS}/lookbook-mobile.jpg",
            ),
            _imagem_com_texto(
                ID_LOJA_FISICA,
                "VETEMENTS | LOJA FÍSICA",
                "Atendimento da nossa equipe, com as mesmas peças da loja virtual",
                f"#{ID_VITRINE}",
                f"{IMAGENS}/loja-fisica.jpg",
                f"{IMAGENS}/loja-fisica.jpg",
            ),
            class_name="lj-itv__wrapper",
        ),
        class_name="lj-itv",
    )


def home_page() -> rx.Component:
    return store_layout(
        _banner(
            "COLEÇÃO PRIMAVERA ’26 ©",
            "Compre agora",
            f"#{ID_VITRINE}",
            f"{IMAGENS}/hero-desktop.jpg",
            f"{IMAGENS}/hero-mobile.jpg",
            principal=True,
            vidro=(0.21, 40),
        ),
        _vitrine(),
        _banner(
            "PRIMAVERA ’26 | CAMISETAS",
            "Explore agora",
            f"#{ID_VITRINE}",
            f"{IMAGENS}/camisetas-desktop.jpg",
            f"{IMAGENS}/camisetas-mobile.jpg",
            vidro=(0.25, 16),
            class_name="lj-banner-section--bottom-pad",
        ),
        _newsletter(),
        _imagens_com_texto(),
    )
