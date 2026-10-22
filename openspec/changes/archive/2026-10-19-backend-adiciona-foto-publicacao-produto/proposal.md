## Why

O backend não tem como anexar fotos a um produto nem publicá-lo na loja
virtual: hoje isso só é possível pelo painel do Xano, e a Metadata API
não aceita upload de arquivos no plano gratuito. Isso bloqueia a carga
do catálogo de demonstração (`backend-popula-catalogo-loja`) e será
necessário quando a gestão passar a cuidar das fotos e da publicação.

## What Changes

- Novo endpoint `POST catalogo/produtos/{produto_id}/imagens` (somente
  administrador): recebe um arquivo de imagem, guarda no storage público
  do Xano e o adiciona ao fim da lista `imagens` do produto.
- Novo endpoint `POST catalogo/produtos/{produto_id}/publicacao`
  (somente administrador): define `publicado` como verdadeiro ou falso.
- Ambos respondem "não encontrado" para produto inexistente e "acesso
  negado" para quem não é administrador.

Fora do escopo: telas da gestão para enviar fotos/publicar (change de
frontend futura), remover ou reordenar fotos.

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
- `product-catalog`: administradores podem enviar fotos de um produto e
  publicá-lo ou retirá-lo da loja pela API.

## Impact

- Xano: 2 endpoints novos no grupo Catalogo (`xano/api/catalogo/`). Sem
  mudança de schema; os endpoints existentes não mudam.
- Storage do Xano: as fotos enviadas ocupam a cota de arquivos do
  workspace.
