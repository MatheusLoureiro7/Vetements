## Why

A home da loja (`/`) ficou visualmente diferente da home de referência
clonada em `ai-website-cloner` (layout da Class Official): hoje ela é um
título simples seguido de um grid com filtros em formulário. O grupo quer
que a loja siga o mesmo visual da referência, mantendo a marca Vetements
e os dados reais do catálogo do Xano.

## What Changes

- Novo layout da loja no estilo da referência: barra de anúncio rotativa,
  cabeçalho fixo translúcido com navegação à esquerda, marca VETEMENTS
  centralizada e busca em "pílula" + ícone de conta à direita; rodapé em
  cartão cinza com colunas de links e "Área da equipe".
- Home: banner principal em tela cheia (cantos arredondados, título
  centralizado e botão de vidro), seção de produtos com abas por categoria
  ("Tudo" + categorias do catálogo) e carrossel horizontal de cards,
  segundo banner, bloco de newsletter e dois blocos de imagem + texto.
- Card de produto no estilo da referência: foto quadrada em fundo cinza,
  segunda foto ao passar o mouse, nome em caixa alta, categoria e preço.
- A busca sai da vitrine e vai para o cabeçalho; em outra página da loja,
  buscar leva à home já filtrada (`/?q=termo`).
- Fonte Schibsted Grotesk na loja (gestão continua com IBM Plex Sans).
- Imagens dos banners copiadas da referência para `assets/loja/`.

Fora do escopo: carrinho, menu "mega", tema escuro, gaveta de menu mobile
e envio real da newsletter (o formulário só valida o e-mail e confirma na
tela; não há backend para isso). Nenhuma mudança no backend.

## Capabilities

### Modified Capabilities
- `storefront`: página inicial no layout da referência; filtros por abas
  de categoria e busca no cabeçalho.

## Impact

- Código: `vetements/loja/components/layout.py`,
  `vetements/loja/components/produto.py`, `vetements/loja/pages/home.py`,
  `vetements/loja/pages/produto.py` (só o contêiner da página),
  `vetements/loja/state/catalogo.py` (busca vinda do cabeçalho / `?q=`),
  novo `assets/loja/loja.css` e imagens em `assets/loja/`,
  `vetements/vetements.py` (folha de estilo da loja) e
  `vetements/styles.py` (fonte da loja).
- Gestão (`/gestao`): não afetada.
