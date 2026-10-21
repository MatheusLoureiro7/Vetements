"""Layout comum às páginas da loja, no visual da home de referência
(`ai-website-cloner`): barra de anúncio, cabeçalho fixo translúcido com a
marca no centro e a busca à direita, e rodapé em cartão cinza.

Os estilos ficam em `assets/loja/loja.css` (classes `lj-*`), carregado
pelo app; a gestão não usa essas classes.
"""

import reflex as rx

from vetements import routes
from vetements.loja.state.carrinho import CarrinhoState
from vetements.loja.state.catalogo import ID_BUSCA_DESKTOP, ID_BUSCA_MOBILE, ID_VITRINE, CatalogoState

ANUNCIOS = (
    "Nova coleção disponível na loja",
    "Peças pensadas para durar, feitas com cuidado",
)

# Âncoras das seções da home (o banner e o menu levam até elas).
ID_LOOKBOOK = "lookbook"
ID_LOJA_FISICA = "loja-fisica"

NAVEGACAO = (
    ("Loja", f"{routes.LOJA_HOME}#{ID_VITRINE}"),
    ("Lookbook", f"{routes.LOJA_HOME}#{ID_LOOKBOOK}"),
    ("Nossa loja", f"{routes.LOJA_HOME}#{ID_LOJA_FISICA}"),
)


def _anuncio() -> rx.Component:
    return rx.el.div(
        rx.el.div(
            rx.el.div(
                *[rx.el.p(texto, class_name="lj-announcement__message") for texto in ANUNCIOS],
                class_name="lj-announcement__track",
            ),
            class_name="lj-announcement__inner",
        ),
        class_name="lj-announcement",
        role="region",
        aria_label="Anúncio",
    )


def logo() -> rx.Component:
    return rx.link("VETEMENTS", href=routes.LOJA_HOME, class_name="lj-logo", aria_label="Vetements, página inicial")


def _campo_busca(id_: str, class_name: str, placeholder: str) -> rx.Component:
    """Formulário de busca do cabeçalho. O campo não é controlado pelo
    estado (evita perder letras ao digitar rápido): o termo é lido no
    envio, e filtra a vitrine da home."""
    return rx.form(
        rx.el.input(
            id=id_,
            type="search",
            name="q",
            default_value=CatalogoState.busca,
            placeholder=placeholder,
            aria_label="Buscar peças pelo nome",
            auto_complete="off",
        ),
        rx.el.button(rx.icon("search", stroke_width=1.5), type="submit", aria_label="Buscar"),
        class_name=class_name,
        role="search",
        on_submit=CatalogoState.buscar_pelo_cabecalho,
    )


def _icone_carrinho() -> rx.Component:
    return rx.link(
        rx.icon("shopping-bag", stroke_width=1.5),
        rx.cond(
            CarrinhoState.quantidade > 0,
            rx.el.span(CarrinhoState.quantidade, class_name="lj-cart-count", aria_hidden="true"),
        ),
        href=routes.LOJA_CARRINHO,
        class_name="lj-icon-button",
        aria_label="Carrinho, " + CarrinhoState.quantidade.to_string() + " itens",
    )


def _cabecalho() -> rx.Component:
    return rx.el.div(
        rx.el.div(
            rx.el.header(
                rx.el.div(
                    rx.el.button(
                        rx.icon("search", stroke_width=1.5),
                        type="button",
                        class_name="lj-icon-button lj-mobile-only",
                        aria_label="Buscar",
                        aria_expanded=rx.cond(CatalogoState.busca_mobile_aberta, "true", "false"),
                        on_click=CatalogoState.alternar_busca_mobile,
                    ),
                    rx.el.nav(
                        rx.el.ul(
                            *[rx.el.li(rx.el.a(rotulo, href=href, class_name="lj-nav__item")) for rotulo, href in NAVEGACAO],
                            class_name="lj-nav",
                        ),
                        aria_label="Principal",
                    ),
                    class_name="lj-header__left",
                ),
                rx.el.div(logo(), class_name="lj-header__heading"),
                rx.el.div(
                    _campo_busca(ID_BUSCA_DESKTOP, "lj-search-pill", "Buscar"),
                    _icone_carrinho(),
                    rx.link(
                        rx.icon("user-round", stroke_width=1.5),
                        href=routes.LOJA_CONTA,
                        class_name="lj-icon-button",
                        aria_label="Minha conta",
                        title="Minha conta",
                    ),
                    class_name="lj-header__icons",
                ),
                class_name="lj-header",
            ),
            rx.cond(
                CatalogoState.busca_mobile_aberta,
                rx.el.div(_campo_busca(ID_BUSCA_MOBILE, "", "Buscar peças"), class_name="lj-search-mobile"),
            ),
            class_name="lj-header-wrapper",
        ),
        class_name="lj-header-section",
    )


def _menu_rodape(titulo: str, *links: rx.Component) -> rx.Component:
    return rx.el.div(
        rx.el.h2(titulo, class_name="lj-footer__heading"),
        rx.el.ul(*[rx.el.li(link) for link in links], class_name="lj-footer__links"),
        class_name="lj-footer__menu",
    )


def _rodape() -> rx.Component:
    return rx.el.footer(
        rx.el.div(
            rx.el.div(
                rx.el.div(
                    logo(),
                    rx.el.p(
                        "Roupas atemporais, feitas com cuidado, para vestir todos os dias.",
                        class_name="lj-footer__tagline",
                    ),
                    rx.el.small("© 2026, VETEMENTS", class_name="lj-footer__copyright"),
                    class_name="lj-footer__left",
                ),
                rx.el.div(
                    _menu_rodape(
                        "Loja",
                        *[rx.el.a(rotulo, href=href) for rotulo, href in NAVEGACAO],
                    ),
                    _menu_rodape(
                        "Vetements",
                        rx.link("Minha conta", href=routes.LOJA_CONTA),
                        rx.link("Área da equipe", href=routes.LOGIN),
                    ),
                    class_name="lj-footer__menus",
                ),
                class_name="lj-footer__top",
            ),
            rx.el.p("Vetements · ERP de moda e loja virtual", class_name="lj-footer__bottom"),
            class_name="lj-footer__inner",
        ),
        class_name="lj-footer",
    )


def store_layout(*children: rx.Component) -> rx.Component:
    """Envolve o conteúdo de uma página da loja com anúncio, cabeçalho e
    rodapé. O conteúdo ocupa a largura toda (os banners da home vão de
    borda a borda); páginas internas usam `container_loja`."""
    return rx.el.div(
        _anuncio(),
        _cabecalho(),
        rx.el.main(*children, class_name="lj-main", id="conteudo"),
        _rodape(),
        class_name="lj-body",
    )


def container_loja(*children: rx.Component, **props) -> rx.Component:
    """Área centralizada com largura máxima, para páginas internas."""
    return rx.el.div(*children, class_name="lj-container", **props)
