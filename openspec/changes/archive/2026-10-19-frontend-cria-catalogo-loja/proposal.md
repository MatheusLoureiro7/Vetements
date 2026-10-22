## Why

A loja virtual (`/`) ainda mostra só a chamada principal e o aviso
"Coleção em breve", embora a API pública do catálogo já exista no Xano
(change `backend-cria-catalogo-publico`, grupo `loja`). Agora dá para o
visitante ver de fato as peças publicadas e abrir cada uma.

## What Changes

- A página inicial da loja passa a listar os produtos publicados (foto,
  nome, categoria e preço), consumindo `GET loja/produtos` e
  `GET loja/categorias` sem token.
- Filtro por categoria e busca por nome na vitrine, repassados à API
  (`categoria_id` e `q`).
- O aviso "Coleção em breve" deixa de ser fixo: aparece só quando não há
  nenhum produto publicado. Busca/filtro sem resultado mostra uma
  mensagem própria ("Nenhuma peça encontrada"), com opção de limpar.
- Nova página pública de detalhe `/produto/[produto_id]` com fotos,
  nome, categoria, preço, descrição e as variações (tamanho/cor), com as
  indisponíveis marcadas como esgotadas. Produto inexistente ou não
  publicado mostra um "Produto não encontrado" amigável com link de
  volta para a vitrine.
- Falha de comunicação com o Xano mostra uma mensagem de erro com opção
  de tentar de novo, sem quebrar a página.
- Produto sem foto exibe um marcador visual neutro no lugar da imagem.
- Funções da API pública no `xano_client` (sem token) e estado próprio da
  loja em `vetements/loja/state/`, sem herdar `AuthState`.

Fora do escopo: carrinho, checkout/pagamento, seleção de variação para
compra, paginação, cadastro de fotos pela gestão (as fotos continuam
sendo enviadas pelo painel do Xano) e qualquer mudança no backend.

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
- `storefront`: a página inicial deixa de ser provisória e passa a exibir
  o catálogo público com filtros; nova página de detalhe de produto.

## Impact

- Código: `vetements/xano_client.py` (funções públicas do grupo `loja`,
  alias configurável `XANO_GROUP_LOJA`, padrão `v-znCPQU`),
  `vetements/loja/state/` (novo estado da vitrine e do detalhe),
  `vetements/loja/pages/` (home reescrita, nova página de produto),
  `vetements/loja/components/` (card de produto e afins),
  `vetements/routes.py` (rota do detalhe) e `vetements/vetements.py`
  (registro da página e `on_load`).
- Testes: novos testes de `xano_client` (funções públicas, sem header
  `Authorization`) e da conversão da resposta da API para os dados de
  exibição.
- Backend: nenhuma alteração; depende só dos endpoints já publicados.
- Gestão (`/gestao`): não afetada.
