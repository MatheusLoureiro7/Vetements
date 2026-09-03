"""Camada de dados mockados, no formato de `docs/domain-model.md`.

Este é o ÚNICO módulo que conhece os dados "crus" nesta fase (em
memória, perdidos ao reiniciar o servidor). Todo State de tela lê e
escreve exclusivamente através das funções públicas abaixo — nunca
acessando as listas `PRODUCTS`/`VARIANTS`/etc. diretamente de fora
deste módulo.

Quando o Xano tiver as tabelas de produto/estoque/venda/cliente, uma
change futura troca o corpo destas funções por chamadas HTTP,
preservando a assinatura e sem alterar States ou componentes.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timedelta

LOW_STOCK_THRESHOLD = 5


# --- Modelos (mesmo formato usado como Var nos States) -----------------
#
# Dataclasses simples: esta versão do Reflex serializa/tipa dataclasses
# nativamente como Var (ver reflex_base.utils.serializers), sem precisar
# de um `rx.Base`/pydantic dedicado.


@dataclass
class Usuario:
    id: int
    nome: str
    email: str
    senha: str  # apenas para o mock; no Xano real nunca é lido como texto puro
    papel: str  # "administrador" | "vendedor"


@dataclass
class Cliente:
    id: int
    nome: str
    telefone: str = ""
    email: str = ""


@dataclass
class Categoria:
    id: int
    nome: str


@dataclass
class VariacaoProduto:
    id: int
    produto_id: int
    tamanho: str
    cor: str
    sku: str
    quantidade: int


@dataclass
class Produto:
    id: int
    nome: str
    descricao: str
    categoria_id: int
    preco_base: float


@dataclass
class ItemVenda:
    variacao_id: int
    quantidade: int
    preco_unitario: float


@dataclass
class Venda:
    id: int
    data_hora: str  # ISO 8601, para serializar sem atrito
    usuario_id: int
    itens: list[ItemVenda] = field(default_factory=list)
    total: float = 0.0
    cliente_id: int | None = None


class DomainError(ValueError):
    """Violação de regra de domínio (ex.: estoque insuficiente)."""


# --- Dados-semente -------------------------------------------------------

_USER_SEED = [
    ("Ana Ferreira", "admin@vetements.com", "admin123", "administrador"),
    ("Bruno Lima", "vendedor@vetements.com", "vendedor123", "vendedor"),
]

_CATEGORY_SEED = ["Camisetas", "Calças", "Vestidos"]

# (nome, descrição, índice da categoria em _CATEGORY_SEED, preço base,
#  [(tamanho, cor, sku, quantidade), ...])
_PRODUCT_SEED = [
    (
        "Camiseta Básica Algodão",
        "Camiseta de algodão penteado, corte reto.",
        0,
        79.90,
        [
            ("P", "Branco", "CAM-BAS-P-BR", 12),
            ("M", "Branco", "CAM-BAS-M-BR", 3),
            ("G", "Preto", "CAM-BAS-G-PT", 8),
        ],
    ),
    (
        "Camiseta Estampada Retrô",
        "Estampa exclusiva, malha 100% algodão.",
        0,
        99.90,
        [
            ("P", "Preto", "CAM-EST-P-PT", 10),
            ("M", "Preto", "CAM-EST-M-PT", 2),
        ],
    ),
    (
        "Calça Jeans Reta",
        "Jeans rígido, lavagem média, corte reto.",
        1,
        189.90,
        [
            ("38", "Azul", "CAL-JNS-38-AZ", 6),
            ("40", "Azul", "CAL-JNS-40-AZ", 4),
            ("42", "Azul", "CAL-JNS-42-AZ", 7),
        ],
    ),
    (
        "Calça Alfaiataria",
        "Tecido oxford leve, cintura alta.",
        1,
        219.90,
        [
            ("38", "Preto", "CAL-ALF-38-PT", 5),
            ("40", "Preto", "CAL-ALF-40-PT", 9),
        ],
    ),
    (
        "Vestido Midi Linho",
        "Linho puro, caimento solto.",
        2,
        259.90,
        [
            ("P", "Areia", "VES-MID-P-AR", 3),
            ("M", "Areia", "VES-MID-M-AR", 6),
        ],
    ),
    (
        "Vestido Longo Festa",
        "Alfaiataria em cetim, fenda lateral.",
        2,
        349.90,
        [
            ("P", "Vinho", "VES-LON-P-VN", 2),
            ("M", "Vinho", "VES-LON-M-VN", 4),
            ("G", "Vinho", "VES-LON-G-VN", 1),
        ],
    ),
]

_CUSTOMER_SEED = [
    ("Marina Costa", "(11) 98888-1234", "marina@example.com"),
    ("João Pedro Alves", "(11) 97777-5678", ""),
    ("Studio Beatriz", "", "contato@studiobeatriz.com"),
]

USERS: list[Usuario] = []
CATEGORIES: list[Categoria] = []
PRODUCTS: list[Produto] = []
VARIANTS: list[VariacaoProduto] = []
CUSTOMERS: list[Cliente] = []
SALES: list[Venda] = []


def reset() -> None:
    """Repõe todos os dados-semente. Usado pelos testes para isolar casos."""
    USERS.clear()
    CATEGORIES.clear()
    PRODUCTS.clear()
    VARIANTS.clear()
    CUSTOMERS.clear()
    SALES.clear()

    for id_, (nome, email, senha, papel) in enumerate(_USER_SEED, start=1):
        USERS.append(Usuario(id=id_, nome=nome, email=email, senha=senha, papel=papel))

    for id_, nome in enumerate(_CATEGORY_SEED, start=1):
        CATEGORIES.append(Categoria(id=id_, nome=nome))

    variant_id = 1
    for produto_id, (nome, descricao, categoria_idx, preco_base, variacoes) in enumerate(
        _PRODUCT_SEED, start=1
    ):
        PRODUCTS.append(
            Produto(
                id=produto_id,
                nome=nome,
                descricao=descricao,
                categoria_id=categoria_idx + 1,
                preco_base=preco_base,
            )
        )
        for tamanho, cor, sku, quantidade in variacoes:
            VARIANTS.append(
                VariacaoProduto(
                    id=variant_id,
                    produto_id=produto_id,
                    tamanho=tamanho,
                    cor=cor,
                    sku=sku,
                    quantidade=quantidade,
                )
            )
            variant_id += 1

    for id_, (nome, telefone, email) in enumerate(_CUSTOMER_SEED, start=1):
        CUSTOMERS.append(Cliente(id=id_, nome=nome, telefone=telefone, email=email))

    # Vendas de exemplo (histórico simulado; não redebita o estoque acima,
    # que já reflete a quantidade atual).
    vendas_seed = [
        (2, timedelta(days=2), 2, 1, [ItemVenda(variacao_id=1, quantidade=1, preco_unitario=79.90),
                                       ItemVenda(variacao_id=6, quantidade=1, preco_unitario=189.90)]),
        (5, timedelta(days=5), 1, None, [ItemVenda(variacao_id=4, quantidade=1, preco_unitario=99.90)]),
    ]
    for id_, delta, usuario_id, cliente_id, itens in vendas_seed:
        SALES.append(
            Venda(
                id=id_,
                data_hora=(datetime.now() - delta).isoformat(timespec="seconds"),
                usuario_id=usuario_id,
                cliente_id=cliente_id,
                itens=itens,
                total=sum(i.quantidade * i.preco_unitario for i in itens),
            )
        )


reset()


# --- Autenticação -------------------------------------------------------


def authenticate(email: str, senha: str) -> Usuario | None:
    for usuario in USERS:
        if usuario.email == email and usuario.senha == senha:
            return usuario
    return None


def get_user(usuario_id: int) -> Usuario | None:
    return next((u for u in USERS if u.id == usuario_id), None)


# --- Categorias -----------------------------------------------------------


def list_categories() -> list[Categoria]:
    return list(CATEGORIES)


def get_category(categoria_id: int) -> Categoria | None:
    return next((c for c in CATEGORIES if c.id == categoria_id), None)


# --- Produtos e variações -------------------------------------------------


def list_products(search: str = "") -> list[Produto]:
    termo = search.strip().lower()
    if not termo:
        return list(PRODUCTS)
    return [p for p in PRODUCTS if termo in p.nome.lower()]


def get_product(produto_id: int) -> Produto | None:
    return next((p for p in PRODUCTS if p.id == produto_id), None)


def create_product(nome: str, descricao: str, categoria_id: int | None, preco_base: float) -> Produto:
    if not nome.strip():
        raise DomainError("Nome é obrigatório.")
    if categoria_id is None or get_category(categoria_id) is None:
        raise DomainError("Selecione uma categoria válida.")
    novo = Produto(
        id=max((p.id for p in PRODUCTS), default=0) + 1,
        nome=nome.strip(),
        descricao=descricao.strip(),
        categoria_id=categoria_id,
        preco_base=preco_base,
    )
    PRODUCTS.append(novo)
    return novo


def list_variants(produto_id: int | None = None) -> list[VariacaoProduto]:
    if produto_id is None:
        return list(VARIANTS)
    return [v for v in VARIANTS if v.produto_id == produto_id]


def get_variant(variacao_id: int) -> VariacaoProduto | None:
    return next((v for v in VARIANTS if v.id == variacao_id), None)


def create_variant(produto_id: int, tamanho: str, cor: str, sku: str, quantidade: int) -> VariacaoProduto:
    if get_product(produto_id) is None:
        raise DomainError("Produto não encontrado.")
    novo = VariacaoProduto(
        id=max((v.id for v in VARIANTS), default=0) + 1,
        produto_id=produto_id,
        tamanho=tamanho,
        cor=cor,
        sku=sku,
        quantidade=max(quantidade, 0),
    )
    VARIANTS.append(novo)
    return novo


def is_low_stock(variacao: VariacaoProduto) -> bool:
    return variacao.quantidade < LOW_STOCK_THRESHOLD


def count_low_stock() -> int:
    return sum(1 for v in VARIANTS if is_low_stock(v))


def decrement_stock(variacao_id: int, quantidade: int) -> None:
    variacao = get_variant(variacao_id)
    if variacao is None:
        raise DomainError(f"Variação {variacao_id} não encontrada.")
    if quantidade <= 0:
        raise DomainError("Quantidade deve ser maior que zero.")
    if quantidade > variacao.quantidade:
        raise DomainError(
            f"Quantidade solicitada ({quantidade}) excede o estoque disponível "
            f"({variacao.quantidade}) para o SKU {variacao.sku}."
        )
    variacao.quantidade -= quantidade
    if variacao.quantidade < 0:  # defesa extra; o guard acima já previne isso
        variacao.quantidade = 0


# --- Vendas -----------------------------------------------------------


def list_sales() -> list[Venda]:
    return sorted(SALES, key=lambda v: v.data_hora, reverse=True)


def create_sale(usuario_id: int, cliente_id: int | None, itens: list[ItemVenda]) -> Venda:
    if not itens:
        raise DomainError("A venda deve conter ao menos um item.")
    for item in itens:
        variacao = get_variant(item.variacao_id)
        if variacao is None:
            raise DomainError(f"Variação {item.variacao_id} não encontrada.")
        if item.quantidade > variacao.quantidade:
            raise DomainError(
                f"Quantidade indisponível para o SKU {variacao.sku}: "
                f"máximo {variacao.quantidade}."
            )
    total = sum(item.quantidade * item.preco_unitario for item in itens)
    nova = Venda(
        id=max((v.id for v in SALES), default=0) + 1,
        data_hora=datetime.now().isoformat(timespec="seconds"),
        usuario_id=usuario_id,
        cliente_id=cliente_id,
        itens=itens,
        total=total,
    )
    for item in itens:
        decrement_stock(item.variacao_id, item.quantidade)
    SALES.append(nova)
    return nova


def total_sold_this_month() -> float:
    now = datetime.now()
    total = 0.0
    for venda in SALES:
        dt = datetime.fromisoformat(venda.data_hora)
        if dt.year == now.year and dt.month == now.month:
            total += venda.total
    return total


# --- Clientes -----------------------------------------------------------


def list_customers(search: str = "") -> list[Cliente]:
    termo = search.strip().lower()
    if not termo:
        return list(CUSTOMERS)
    return [c for c in CUSTOMERS if termo in c.nome.lower()]


def get_customer(cliente_id: int | None) -> Cliente | None:
    if cliente_id is None:
        return None
    return next((c for c in CUSTOMERS if c.id == cliente_id), None)


def create_customer(nome: str, telefone: str = "", email: str = "") -> Cliente:
    if not nome.strip():
        raise DomainError("Nome é obrigatório.")
    if not telefone.strip() and not email.strip():
        raise DomainError("Informe telefone ou e-mail.")
    novo = Cliente(
        id=max((c.id for c in CUSTOMERS), default=0) + 1,
        nome=nome.strip(),
        telefone=telefone.strip(),
        email=email.strip(),
    )
    CUSTOMERS.append(novo)
    return novo
