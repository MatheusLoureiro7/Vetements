## 1. Dados

- [x] 1.1 Gerar `scripts/seed_data/class_catalog.json` a partir do `catalog.ts` do clone (handle, título, preço, fotos com alt, tamanhos, categoria pela aba). Verificar: 61 produtos, 122 fotos existentes no `--clone-dir`.

## 2. Script

- [x] 2.1 Criar `scripts/seed_loja.py` com funções puras (preço "R$ 2.999,00" → 2999.0, cor pelo nome, variações com estoque, SKU) e testes em `tests/test_seed_loja.py`. Verificar com `pytest`.
- [x] 2.2 Implementar a carga pela API do app (login de administrador; criar categorias/produtos/variações, enviar fotos, publicar; pular existentes; `--dry-run`). Revisado: a 1ª versão usava a Metadata API, mas o upload de arquivo deu 403 no plano gratuito; trocado pelos endpoints de `backend-adiciona-foto-publicacao-produto`. Feito: `--dry-run` mostrou 6 categorias novas, 61 produtos, 272 variações e 122 fotos.

## 3. Carga e verificação

- [x] 3.1 Usuário roda o script de verdade (credenciais só no ambiente dele), primeiro com `--limite 1`. Verificar: `GET loja/produtos` retorna 62 produtos publicados (61 + Camiseta Básica) e `GET loja/categorias` as 7 categorias. Feito: 60 criados e publicados + 1 do teste; API pública com 62 produtos e 7 categorias.
- [x] 3.2 Na vitrine (`/`), conferir fotos nos cards, filtro por categoria (ex.: Bonés) e detalhe com galeria e tamanhos esgotados. Feito: fotos nos cards, filtro Bolsas, detalhe com galeria e 4G esgotado. As imagens saem com a marca d'água do plano gratuito do Xano (aceito).
