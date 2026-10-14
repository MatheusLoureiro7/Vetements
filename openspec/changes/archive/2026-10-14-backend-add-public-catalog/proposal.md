## Why

A loja virtual (parte 2) precisa mostrar produtos reais, mas todos os
endpoints de catálogo do Xano exigem o token da equipe (`auth = "user"`) e
o produto não tem foto nem forma de indicar se deve aparecer na vitrine.
Sem isso, a change de frontend da vitrine não tem de onde ler os dados.

## What Changes

- Tabela `produto` ganha dois campos:
  - `imagens`: lista de imagens do produto (fotos da vitrine).
  - `publicado`: indica se o produto aparece na loja; padrão **não**, para
    que nada cadastrado na gestão vá para a vitrine sem decisão da equipe.
- Novo grupo de API público `Loja` (sem login), somente leitura:
  - `GET loja/categorias`: categorias (id e nome).
  - `GET loja/produtos`: produtos publicados, com filtro opcional por
    categoria e por nome; cada um com categoria, preço, imagens e
    variações disponíveis (tamanho, cor, se há estoque).
  - `GET loja/produtos/{produto_id}`: detalhe de um produto publicado.
- A API pública **nunca** expõe dados internos: quantidade exata em
  estoque, SKU, dados de clientes, vendas ou usuários.
- Endpoints internos existentes (`Catalogo`, `Clientes`, `Vendas`) não
  mudam.

Fora do escopo: upload de fotos e marcação de "publicado" pela tela de
Produtos da gestão (próxima change `frontend-`; até lá, pelo painel do
Xano), carrinho, pedidos online, conta de cliente e pagamento.

## Capabilities

### New Capabilities
<!-- Nenhuma: os requisitos públicos entram na capability `storefront`, já existente. -->

### Modified Capabilities
- `storefront`: catálogo público da loja (listagem, detalhe, categorias,
  dados que nunca são expostos).
- `product-catalog`: produto passa a ter fotos e o indicador de publicação
  na loja.

## Impact

- Xano: `xano/table/produto.xs` (2 campos novos), novo grupo
  `xano/api/loja/` com 3 endpoints e a function `Loja/variacoes_publicas` (variações
  públicas).
  Registros existentes de `produto` recebem `publicado = false` e
  `imagens` vazio.
- Reflex: nenhuma mudança nesta change (o cliente HTTP ganha as funções
  públicas na change de frontend da vitrine).
