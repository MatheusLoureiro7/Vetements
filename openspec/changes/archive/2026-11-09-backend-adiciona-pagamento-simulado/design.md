## Context

`loja/pedidos` POST (auth `cliente`) valida itens e grava `venda` +
`item_venda` dentro de `db.transaction`, baixando estoque. `venda` é
compartilhada com o balcão (origem `balcao` | `loja_virtual`).
`loja/pedidos` GET lista com `output = ["id", "created_at", "total"]`.

## Goals / Non-Goals

**Goals:** registrar o pagamento simulado no próprio pedido, com a
decisão de aprovar/recusar no backend, sem trafegar dados de cartão.

**Non-Goals:** pedido "aguardando pagamento" (o fluxo escolhido cria o
pedido só depois do pagamento), cancelamento, estorno.

## Decisions

1. **Campos na `venda`, não tabela nova**: `forma_pagamento` (enum
   opcional `pix` | `cartao` | `boleto`), `parcelas` (int opcional),
   `cartao_final` (texto opcional, 4 dígitos) e `pago_em` (timestamp
   opcional). Um pedido tem exatamente um pagamento e ele nasce junto;
   tabela separada não traria ganho. Campos opcionais mantêm o balcão
   intacto.
   *Alternativa*: `status_pagamento`. Desnecessário: pedido da loja só
   existe se pago; a presença de `pago_em` já diz isso.

2. **Só os 4 últimos dígitos chegam ao backend.** A tela valida o
   cartão inteiro e envia apenas o final. Mesmo sendo simulação, evita
   o hábito (e o risco no log do Xano) de trafegar número de cartão.
   A regra de recusa (final `0000`) fica no backend, coerente com
   "regras de negócio no Xano".

3. **Validação de pagamento antes da transação**: preconditions de
   forma, parcelas (1–6, só cartão), final (`/^[0-9]{4}$/`) e recusa
   vêm antes de `db.transaction`, então pagamento inválido ou recusado
   nunca cria venda nem toca estoque. Para Pix/boleto, `parcelas` e
   `cartao_final` enviados são ignorados. Observado na verificação: o
   Xano grava campo opcional sem valor como padrão do tipo, então
   ficam `parcelas = 0` e `cartao_final = ""` (não nulo); a tela trata
   0/vazio como "não se aplica".
   Regex com a ordem correta do XanoScript:
   `"/^[0-9]{4}$/"|regex_matches:$input.cartao_final`.

4. **Resposta e listagem** ganham `forma_pagamento`, `parcelas`,
   `cartao_final`, `pago_em` (outputs explícitos), mantendo a regra de
   nunca expor SKU/estoque.

## Risks / Trade-offs

- [BREAKING para o frontend atual] → aplicar a change de frontend logo
  em seguida; entre os dois envios, finalizar pedido falha com erro de
  entrada (não grava nada).
- [Pedidos antigos sem dados de pagamento] → campos nulos; a tela
  mostra "Pagamento não informado" para eles.

## Migration Plan

Dry-run com a tabela `venda` e os dois endpoints; mostrar preview ao
usuário; aplicar após confirmação; pull de verificação. Rollback:
reverter os endpoints (campos opcionais podem ficar).
