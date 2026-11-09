## Why

Os pedidos da loja nascem pagos (pagamento simulado), mas depois disso
não existe acompanhamento: a equipe não tem como registrar que o pedido
saiu nem que chegou, e o cliente não sabe em que pé está. O usuário
pediu (2026-11-09) o status do pedido depois do pagamento:
**pago → enviado → entregue**. Esta change prepara o backend; as telas
vêm na change `frontend-adiciona-status-pedido`.

## What Changes

- A venda ganha o status do pedido (`pago`, `enviado`, `entregue`) e as
  datas de envio e de entrega. Só vale para pedidos da loja virtual;
  vendas de balcão não têm status.
- Pedido novo da loja nasce com status `pago`. Pedidos antigos sem
  status são tratados como `pago`.
- Novo endpoint da gestão para avançar o status, um passo por vez e sem
  voltar (`pago` → `enviado` → `entregue`). Administrador e vendedor
  podem avançar. Cada avanço fica registrado no `event_log`.
- `GET loja/pedidos` passa a devolver o status e as datas de envio e
  entrega. `GET vendas` já devolve todos os campos da venda.

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
- `sales`: nova regra "Status do pedido da loja" (avanço pela equipe).
- `storefront`: "Meus pedidos" passa a incluir o status e as datas.

## Impact

- Xano: tabela `venda` (3 campos opcionais novos); endpoints
  `loja/pedidos` POST e GET; novo endpoint `vendas/{venda_id}/status`
  POST (grupo Vendas).
- Sem quebra: o frontend atual continua funcionando e só ignora os
  campos novos até a change de frontend ser aplicada.
- Fora do escopo: cancelamento/estorno (exigiria devolver estoque),
  e-mail de aviso ao cliente, código de rastreio, endereço e frete.
  Nenhum dado do catálogo (produtos, preços, fotos, categorias) é
  alterado.
