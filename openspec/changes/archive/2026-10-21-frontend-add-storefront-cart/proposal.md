## Why

A loja já mostra a vitrine e o detalhe de cada peça, mas o visitante não
consegue juntar o que quer comprar. O carrinho é o próximo passo listado
em `docs/project-overview.md` (Parte 2) e não depende de backend novo.

## What Changes

- Na página do produto, as variações (tamanho · cor) passam a ser
  selecionáveis (as esgotadas continuam marcadas e não podem ser
  escolhidas) e há o botão "Adicionar ao carrinho".
- Ícone de sacola no cabeçalho da loja, com a quantidade de itens, levando
  à nova página `/carrinho`.
- Página `/carrinho`: itens com foto, nome, tamanho/cor, preço, controle
  de quantidade (1 a 10) e remoção; subtotal; aviso de carrinho vazio com
  link para a vitrine.
- O carrinho fica salvo no navegador do visitante (LocalStorage), sem
  login, e sobrevive a recarregar a página.

Fora do escopo: finalizar o pedido (criar a venda no Xano), conta de
cliente, frete e pagamento — ficam para changes `backend-`/`frontend-`
próprias. A página do carrinho informa que a finalização ainda não está
disponível. Nenhuma mudança no backend.

## Capabilities

### Modified Capabilities
- `storefront`: escolha de variação no detalhe, carrinho de compras.

## Impact

- Código: `vetements/loja/state/carrinho.py` (novo), `vetements/loja/state/dados.py`
  (preço numérico), `vetements/loja/state/produto.py`,
  `vetements/loja/pages/produto.py`, `vetements/loja/pages/carrinho.py`
  (nova), `vetements/loja/components/layout.py` (ícone da sacola),
  `vetements/routes.py`, `vetements/vetements.py`, `assets/loja/loja.css`.
- Testes: regras do carrinho (somar, limitar quantidade, remover, ler
  dados salvos inválidos).
