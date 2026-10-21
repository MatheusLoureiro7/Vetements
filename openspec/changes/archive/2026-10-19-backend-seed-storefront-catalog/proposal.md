## Why

A vitrine (`frontend-add-storefront-catalog`) está pronta, mas o Xano tem
um único produto publicado, sem foto. Para demonstrar a loja e validar a
exibição de fotos, o catálogo precisa de dados realistas: os 61 produtos
do clone de referência (`ai-website-cloner`, catálogo da Class Official),
com fotos, preços, categorias e tamanhos.

## What Changes

- Novo script `scripts/seed_loja.py` que popula o Xano pela API do
  próprio app (grupo Catalogo, login de administrador): cria categorias,
  produtos e variações, envia as fotos e publica cada produto. Depende
  dos endpoints de foto e publicação da change
  `backend-add-product-photo-publish`.
- Snapshot dos dados do clone em `scripts/seed_data/class_catalog.json`
  (nome, preço, fotos, tamanhos e categoria de cada produto). As fotos
  continuam no repositório do clone e são lidas de lá ao rodar o script.
- O script é idempotente (não duplica categoria nem produto com o mesmo
  nome), tem modo `--dry-run` que só mostra o que faria, e lê as
  credenciais de administrador de `XANO_EMAIL`/`XANO_SENHA` (nunca
  grava nem imprime senha ou token).

Fora do escopo: alterar schema, endpoints ou regras do backend; mexer nos
produtos já cadastrados (a Camiseta Básica continua como está).

## Capabilities

### New Capabilities
<!-- nenhuma: carga de dados, sem mudança de comportamento -->

### Modified Capabilities
<!-- nenhuma -->

## Impact

- Dados do Xano (fonte `live`): +6 categorias (Camisetas é reaproveitada),
  +61 produtos publicados, ~250 variações e 122 arquivos de imagem.
- Código: só `scripts/` e testes das funções puras do script. A aplicação
  Reflex e os endpoints não mudam.
- As fotos e nomes são da marca Class Official, usados apenas como dados
  de demonstração do projeto acadêmico.
