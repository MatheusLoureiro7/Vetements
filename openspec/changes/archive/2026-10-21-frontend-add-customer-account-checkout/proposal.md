## Why

O backend de conta de cliente e pedidos já está no Xano (change
`backend-add-customer-account-orders`). Falta a loja usar esses
endpoints para o cliente criar conta, entrar, finalizar o pedido a partir
do carrinho e acompanhar os pedidos, e a gestão exibir corretamente os
pedidos que chegam sem funcionário.

## What Changes

- `/conta/entrar`: entrar e criar conta lado a lado; depois do login volta
  para onde o cliente estava (ex.: carrinho).
- `/conta`: dados do cliente, "Sair", confirmação do pedido recém-feito e
  "Meus pedidos" com itens e totais.
- Carrinho: botão "Finalizar pedido" (ou "Entrar para finalizar" sem
  login). Sucesso esvazia o carrinho e leva à confirmação; erro do backend
  (ex.: estoque insuficiente) aparece no carrinho, que continua intacto.
- Cabeçalho: o ícone de pessoa leva à conta do cliente; "Área da equipe"
  continua no rodapé.
- Gestão: pedidos da loja aparecem em Vendas como "Nome (loja virtual)"
  e no dashboard com responsável "Loja virtual" (antes viraria
  "Usuário #None").
- Token do cliente em cookie próprio, separado do token da equipe.

Fora do escopo: pagamento, frete, recuperação de senha, editar dados da
conta.

## Capabilities

### Modified Capabilities
- `storefront`: telas de conta e finalização do pedido.
- `sales`: identificação de pedidos da loja na gestão.

## Impact

- Código: `vetements/xano_client.py`, `vetements/loja/state/conta.py`
  (novo), `vetements/loja/state/carrinho.py`,
  `vetements/loja/pages/conta.py` (nova), `vetements/loja/pages/carrinho.py`,
  `vetements/loja/components/layout.py`, `vetements/routes.py`,
  `vetements/vetements.py`, `vetements/state/sales.py`,
  `vetements/state/dashboard.py`, `assets/loja/loja.css`.
- Testes: `tests/test_xano_client.py`, `tests/test_loja_conta.py`.
