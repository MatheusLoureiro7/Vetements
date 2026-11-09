## Why

A loja cria o pedido direto do carrinho, sem nenhuma etapa de
pagamento. O grupo decidiu (2026-11-09) ter um **pagamento simulado**
para fechar a compra de ponta a ponta na demonstração, sem cobrança
real nem integração com operadora. Esta change prepara o backend; a
tela vem na change `frontend-adiciona-pagamento-simulado`.

## What Changes

- **BREAKING** `POST loja/pedidos` passa a exigir a forma de pagamento
  (`pix`, `cartao` ou `boleto`). Para cartão, exige também as parcelas
  (1 a 6) e os **4 últimos dígitos** do cartão — o número completo,
  nome, validade e CVV nunca são enviados ao backend.
- Simulação de recusa: cartão com final `0000` é recusado
  ("Pagamento recusado pela operadora (simulação).") e **nenhum** pedido
  é criado nem estoque baixado.
- Pedido aceito já nasce **pago**: a venda guarda forma de pagamento,
  parcelas, final do cartão (quando houver) e a data/hora do pagamento.
- `GET loja/pedidos` passa a devolver esses dados de pagamento.
- Vendas de balcão (gestão) não mudam: os campos novos ficam vazios.

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
- `storefront`: "Pedido pela loja virtual" passa a exigir pagamento
  simulado aprovado; "Meus pedidos" passa a mostrar os dados do
  pagamento.

## Impact

- Xano: tabela `venda` (3 campos novos opcionais + data do pagamento);
  endpoints `loja/pedidos` POST e GET.
- O frontend atual (que chama `loja/pedidos` sem forma de pagamento)
  deixa de conseguir finalizar pedidos até a change de frontend ser
  aplicada — as duas serão aplicadas em sequência na mesma sessão.
- Fora do escopo: endereço de entrega e frete, integração real com
  operadora, estorno/cancelamento, status de entrega.
