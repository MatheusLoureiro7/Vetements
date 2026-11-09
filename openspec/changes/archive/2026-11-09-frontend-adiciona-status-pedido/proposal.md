## Why

O backend passa a ter o status dos pedidos da loja (`pago` → `enviado`
→ `entregue`, change `backend-adiciona-status-pedido`), mas nenhuma
tela mostra nem muda esse status. A equipe precisa marcar o pedido como
enviado/entregue na gestão, e o cliente precisa ver em que pé está o
pedido em "Minha conta".

## What Changes

- Gestão > Vendas: nova coluna **Status**. Pedidos da loja mostram
  "Pago", "Enviado" ou "Entregue"; vendas de balcão mostram "—".
- Pedidos da loja ainda não entregues ganham o botão do próximo passo
  ("Marcar como enviado" / "Marcar como entregue"), com confirmação
  antes de gravar, indicação de carregamento, aviso de sucesso e erro
  visível. Administrador e vendedor veem o botão.
- Loja > Minha conta: cada pedido mostra o status com a data
  ("Pago", "Enviado em 10/11/2026", "Entregue em 12/11/2026").
- Cliente Python do Xano: função para avançar o status.

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
- `sales`: nova regra "Status do pedido na tela de Vendas".
- `storefront`: "Minha conta" passa a mostrar o status de cada pedido.

## Impact

- `vetements/xano_client.py`, `vetements/state/sales.py`,
  `vetements/pages/sales.py`, `vetements/loja/state/conta.py`,
  `vetements/loja/pages/conta.py`, CSS da loja e testes.
- Depende da change de backend aplicada antes.
- Fora do escopo: cancelamento, e-mail de aviso, rastreio, filtro por
  status. Nenhum dado do catálogo é alterado.
