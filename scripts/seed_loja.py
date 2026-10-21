"""Carga do catálogo de demonstração da loja virtual no Xano.

Lê `scripts/seed_data/class_catalog.json` (snapshot do clone de
referência em `ai-website-cloner`) e, pela API do próprio app (grupo
Catalogo, com login de administrador), cria categorias, produtos e
variações, envia as fotos e publica cada produto na loja.

Uso:
    # Prévia (não grava nada, não precisa de token):
    .venv/bin/python scripts/seed_loja.py --dry-run

    # Carga de verdade (credenciais de administrador só no seu ambiente):
    XANO_EMAIL=... XANO_SENHA=... .venv/bin/python scripts/seed_loja.py

Idempotente: categoria ou produto já existente com o mesmo nome é pulado
(e suas fotos não são reenviadas), então pode ser rodado de novo após uma
falha. A senha e o token de sessão nunca são impressos nem salvos. O
plano gratuito do Xano limita a taxa de requisições; o script espera e
repete quando recebe 429, então a carga completa leva alguns minutos.
"""

from __future__ import annotations

import argparse
import json
import mimetypes
import os
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import httpx

RAIZ = Path(__file__).resolve().parent
CATALOGO = RAIZ / "seed_data" / "class_catalog.json"
CLONE_PADRAO = RAIZ.parent.parent / "ai-website-cloner" / "public" / "sites" / "classofficial"

INSTANCIA = os.environ.get("XANO_INSTANCE_URL", "https://x8ki-letl-twmt.n7.xano.io").rstrip("/")
GRUPO_LOJA = os.environ.get("XANO_GROUP_LOJA", "v-znCPQU")
GRUPO_AUTH = os.environ.get("XANO_GROUP_AUTHENTICATION", "nM8-AXX2")
GRUPO_CATALOGO = os.environ.get("XANO_GROUP_CATALOGO", "0qUs2gU9")

ESTOQUE_DISPONIVEL = 10
TAMANHO_UNICO = "Único"
COR_UNICA = "Única"

# Aba do clone → nome da categoria no Vetements.
CATEGORIAS = {
    "Camiseta": "Camisetas",
    "Camisa": "Camisas",
    "Jaqueta": "Jaquetas",
    "Calça": "Calças",
    "Bermuda": "Bermudas",
    "Boné": "Bonés",
    "Bolsa": "Bolsas",
}

# Palavras de cor (em inglês, como nos nomes do clone) → português.
CORES = {
    "OFF-WHITE": "off-white",
    "BLACK": "preto",
    "WHITE": "branco",
    "NAVY": "marinho",
    "MOSTARD": "mostarda",
    "BROWN": "marrom",
    "GREEN": "verde",
    "GRAY": "cinza",
    "BLUE": "azul",
    "ROSE": "rosé",
    "ORANGE": "laranja",
    "GOLD": "dourado",
    "BABY YELLOW": "amarelo-bebê",
}


# --- Funções puras (testadas em tests/test_seed_loja.py) --------------------


def preco_para_numero(preco: str) -> float:
    """'R$ 2.999,00' → 2999.0"""
    return float(preco.replace("R$", "").strip().replace(".", "").replace(",", "."))


def cor_do_titulo(titulo: str) -> str:
    """Cor a partir das palavras finais do nome do produto.

    'T-SHIRT CLASS HAN OFF-WHITE' → 'Off-white';
    'CLASS JACKET POWELL BLACK & BABY YELLOW' → 'Preto e amarelo-bebê';
    sem cor reconhecida no final → 'Única'.
    """
    palavras = titulo.upper().replace('"', " ").split()
    cores: list[str] = []
    i = len(palavras)
    while i > 0:
        # Tenta primeiro cores de duas palavras (ex.: BABY YELLOW).
        dupla = " ".join(palavras[i - 2 : i]) if i >= 2 else ""
        if dupla in CORES:
            cores.insert(0, CORES[dupla])
            i -= 2
        elif palavras[i - 1] in CORES:
            cores.insert(0, CORES[palavras[i - 1]])
            i -= 1
        elif palavras[i - 1] == "&" and cores:
            i -= 1
        else:
            break
    if not cores:
        return COR_UNICA
    texto = " e ".join(cores)
    return texto[0].upper() + texto[1:]


def sku(handle: str, tamanho: str) -> str:
    sufixo = "UN" if tamanho == TAMANHO_UNICO else tamanho
    return f"{handle}-{sufixo}".upper()


def variacoes_do_produto(produto: dict[str, Any]) -> list[dict[str, Any]]:
    """Uma variação por tamanho (cor do nome); sem tamanhos → 'Único'."""
    cor = cor_do_titulo(produto["titulo"])
    tamanhos = produto["tamanhos"] or [{"tamanho": TAMANHO_UNICO, "disponivel": True}]
    return [
        {
            "tamanho": t["tamanho"],
            "cor": cor,
            "sku": sku(produto["handle"], t["tamanho"]),
            "estoque": ESTOQUE_DISPONIVEL if t["disponivel"] else 0,
        }
        for t in tamanhos
    ]


def categoria_do_produto(produto: dict[str, Any]) -> str:
    return CATEGORIAS[produto["aba"]]


# --- API do app (grupo Catalogo, com login de administrador) ---------------------


@dataclass
class Api:
    token: str
    client: httpx.Client

    def chamar(self, metodo: str, grupo: str, caminho: str, **kwargs) -> Any:
        url = f"{INSTANCIA}/api:{grupo}/{caminho.lstrip('/')}"
        headers = {"Authorization": f"Bearer {self.token}"} if self.token else {}
        for tentativa in range(8):
            resposta = self.client.request(metodo, url, headers=headers, **kwargs)
            # Plano gratuito do Xano limita a taxa de requisições: espera e repete.
            if resposta.status_code == 429 and tentativa < 7:
                time.sleep(5 * (tentativa + 1))
                continue
            break
        if resposta.status_code >= 400:
            raise RuntimeError(f"{metodo} {caminho}: HTTP {resposta.status_code} {resposta.text[:300]}")
        return resposta.json() if resposta.content else None

    @classmethod
    def entrar(cls, client: httpx.Client, email: str, senha: str) -> "Api":
        anonima = cls(token="", client=client)
        resposta = anonima.chamar("POST", GRUPO_AUTH, "auth/login", json={"email": email, "password": senha})
        return cls(token=resposta["authToken"], client=client)

    def categorias(self) -> dict[str, int]:
        return {c["nome"]: int(c["id"]) for c in self.chamar("GET", GRUPO_CATALOGO, "categorias")}

    def criar_categoria(self, nome: str) -> int:
        return int(self.chamar("POST", GRUPO_CATALOGO, "categorias", json={"nome": nome})["id"])

    def nomes_de_produtos(self) -> set[str]:
        return {p["nome"] for p in self.chamar("GET", GRUPO_CATALOGO, "produtos")}

    def criar_produto(self, dados: dict[str, Any]) -> int:
        return int(self.chamar("POST", GRUPO_CATALOGO, "produtos", json=dados)["id"])

    def criar_variacao(self, produto_id: int, variacao: dict[str, Any]) -> None:
        self.chamar("POST", GRUPO_CATALOGO, f"produtos/{produto_id}/variacoes", json=variacao)

    def enviar_foto(self, produto_id: int, arquivo: Path) -> None:
        mime = mimetypes.guess_type(arquivo.name)[0] or "image/jpeg"
        with arquivo.open("rb") as conteudo:
            self.chamar(
                "POST",
                GRUPO_CATALOGO,
                f"produtos/{produto_id}/imagens",
                files={"imagem": (arquivo.name, conteudo, mime)},
            )

    def publicar(self, produto_id: int) -> None:
        self.chamar("POST", GRUPO_CATALOGO, f"produtos/{produto_id}/publicacao", json={"publicado": True})


# --- Carga ----------------------------------------------------------------------------


def carregar_catalogo() -> list[dict[str, Any]]:
    return json.loads(CATALOGO.read_text(encoding="utf-8"))


def conferir_fotos(catalogo: list[dict[str, Any]], clone_dir: Path) -> list[str]:
    return [f["arquivo"] for p in catalogo for f in p["fotos"] if not (clone_dir / f["arquivo"]).is_file()]


def previa(catalogo: list[dict[str, Any]]) -> None:
    """Resumo do que seria criado, comparando com o catálogo público atual."""
    publico = httpx.get(f"{INSTANCIA}/api:{GRUPO_LOJA}/loja/categorias", timeout=15).json()
    existentes = {c["nome"] for c in publico}
    produtos_publicos = httpx.get(f"{INSTANCIA}/api:{GRUPO_LOJA}/loja/produtos", timeout=15).json()
    nomes_publicos = {p["nome"] for p in produtos_publicos}

    novas = sorted({categoria_do_produto(p) for p in catalogo} - existentes)
    novos = [p for p in catalogo if p["titulo"] not in nomes_publicos]
    variacoes = sum(len(variacoes_do_produto(p)) for p in novos)
    print(f"Categorias novas ({len(novas)}): {', '.join(novas) or '—'}")
    print(f"Produtos novos: {len(novos)} (publicados) · variações: {variacoes} · fotos a enviar: {sum(len(p['fotos']) for p in novos)}")
    print("Exemplos:")
    for p in novos[:: max(1, len(novos) // 6)][:6]:
        vs = variacoes_do_produto(p)
        tamanhos = ", ".join(f"{v['tamanho']}{'' if v['estoque'] else ' (esgotado)'}" for v in vs)
        print(f"  - [{categoria_do_produto(p)}] {p['titulo']} · R$ {preco_para_numero(p['preco']):.2f} · cor {vs[0]['cor']} · {tamanhos}")


def executar(catalogo: list[dict[str, Any]], clone_dir: Path, email: str, senha: str) -> None:
    with httpx.Client(timeout=httpx.Timeout(60.0, connect=10.0)) as client:
        api = Api.entrar(client, email, senha)

        categorias = api.categorias()
        for nome in sorted({categoria_do_produto(p) for p in catalogo}):
            if nome not in categorias:
                categorias[nome] = api.criar_categoria(nome)
                print(f"Categoria criada: {nome}", flush=True)

        nomes_existentes = api.nomes_de_produtos()
        incompletos: list[str] = []
        criados = 0
        for indice, p in enumerate(catalogo, start=1):
            if p["titulo"] in nomes_existentes:
                print(f"[{indice}/{len(catalogo)}] já existe, pulando: {p['titulo']}", flush=True)
                continue
            produto_id = api.criar_produto(
                {
                    "nome": p["titulo"],
                    "descricao": p["fotos"][0]["alt"] if p["fotos"] else "",
                    "categoria_id": categorias[categoria_do_produto(p)],
                    "preco_base": preco_para_numero(p["preco"]),
                }
            )
            try:
                for v in variacoes_do_produto(p):
                    api.criar_variacao(produto_id, v)
                for f in p["fotos"]:
                    api.enviar_foto(produto_id, clone_dir / f["arquivo"])
                # Publica por último: produto incompleto não aparece na loja.
                api.publicar(produto_id)
            except RuntimeError as erro:
                incompletos.append(f"{p['titulo']} (id {produto_id}): {erro}")
                print(f"[{indice}/{len(catalogo)}] INCOMPLETO: {p['titulo']}", flush=True)
                continue
            criados += 1
            print(f"[{indice}/{len(catalogo)}] criado e publicado: {p['titulo']}", flush=True)

        print(f"\nConcluído: {criados} produtos criados e publicados.")
        if incompletos:
            print("Produtos criados mas não publicados (conferir pelo painel ou apagar e rodar de novo):")
            for linha in incompletos:
                print(f"  - {linha}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--dry-run", action="store_true", help="só mostra o que seria criado")
    parser.add_argument("--clone-dir", type=Path, default=CLONE_PADRAO, help="pasta public/sites/classofficial do clone")
    parser.add_argument("--limite", type=int, default=0, help="cria só os N primeiros produtos (teste)")
    args = parser.parse_args()

    catalogo = carregar_catalogo()
    if args.limite:
        catalogo = catalogo[: args.limite]
    faltando = conferir_fotos(catalogo, args.clone_dir)
    if faltando:
        print(f"{len(faltando)} fotos não encontradas em {args.clone_dir} (ex.: {faltando[0]}).", file=sys.stderr)
        return 1

    if args.dry_run:
        previa(catalogo)
        return 0

    email = os.environ.get("XANO_EMAIL", "").strip()
    senha = os.environ.get("XANO_SENHA", "")
    if not email or not senha:
        print("Defina XANO_EMAIL e XANO_SENHA (conta de administrador).", file=sys.stderr)
        return 1
    executar(catalogo, args.clone_dir, email, senha)
    return 0


if __name__ == "__main__":
    sys.exit(main())
