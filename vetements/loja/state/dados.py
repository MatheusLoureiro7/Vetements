"""Dados de exibição da loja e conversão a partir da API pública do Xano.

Funções puras (sem estado do Reflex) para poderem ser testadas sem
servidor. Só os campos listados aqui chegam à tela: qualquer campo
inesperado da resposta (ex.: estoque numérico) é descartado.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

from vetements import routes, xano_client
from vetements.format_utils import format_currency


@dataclass
class CategoriaLoja:
    id: int
    nome: str


@dataclass
class VariacaoLoja:
    id: int
    tamanho: str
    cor: str
    disponivel: bool


@dataclass
class ProdutoLoja:
    id: int
    nome: str
    categoria_nome: str
    preco_label: str
    # Preço numérico (o carrinho soma a partir dele).
    preco: float = 0.0
    descricao: str = ""
    href: str = ""
    imagens: list[str] = field(default_factory=list)
    # Primeira foto (ou "" sem foto): o card da vitrine só mostra uma.
    capa: str = ""
    variacoes: list[VariacaoLoja] = field(default_factory=list)


def urls_das_imagens(imagens: Any) -> list[str]:
    """URLs públicas das fotos, na ordem cadastrada.

    Aceita o objeto de imagem do Xano (`url`, ou só `path` relativo à
    instância) ou uma URL em texto; `None` e itens sem endereço são
    ignorados.
    """
    if not isinstance(imagens, list):
        return []
    urls = []
    for imagem in imagens:
        if isinstance(imagem, str):
            url = imagem
        elif isinstance(imagem, dict):
            url = imagem.get("url") or ""
            if not url and imagem.get("path"):
                url = f"{xano_client.instance_url()}/{str(imagem['path']).lstrip('/')}"
        else:
            url = ""
        if url:
            urls.append(url)
    return urls


def categoria_da_api(dados: dict[str, Any]) -> CategoriaLoja:
    return CategoriaLoja(id=int(dados["id"]), nome=dados.get("nome") or "")


def variacao_da_api(dados: dict[str, Any]) -> VariacaoLoja:
    return VariacaoLoja(
        id=int(dados["id"]),
        tamanho=dados.get("tamanho") or "",
        cor=dados.get("cor") or "",
        disponivel=bool(dados.get("disponivel")),
    )


def produto_da_api(dados: dict[str, Any]) -> ProdutoLoja:
    imagens = urls_das_imagens(dados.get("imagens"))
    preco = float(dados.get("preco_base") or 0)
    return ProdutoLoja(
        id=int(dados["id"]),
        nome=dados.get("nome") or "",
        categoria_nome=dados.get("categoria_nome") or "",
        preco_label=format_currency(preco),
        preco=preco,
        descricao=(dados.get("descricao") or "").strip(),
        href=routes.produto_href(int(dados["id"])),
        imagens=imagens,
        capa=imagens[0] if imagens else "",
        variacoes=[variacao_da_api(v) for v in dados.get("variacoes") or []],
    )
