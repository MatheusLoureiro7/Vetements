## Why

`docs/project-overview.md` e `docs/domain-model.md` pararam no pagamento
simulado. Faltam o que foi entregue depois e as decisões recentes:
ajuste de estoque, códigos por e-mail (Brevo), status do pedido,
histórico de eventos e a decisão de manter o catálogo da loja como está.
O AGENTS.md manda consultar esses documentos antes de mudanças, então
eles precisam refletir o sistema atual.

## What Changes

- `project-overview.md`: seção da loja com confirmação de e-mail,
  recuperação de senha e status do pedido; funcionalidades da gestão
  com ajuste de estoque e status dos pedidos; papéis atualizados
  (cliente da loja tem conta própria; vendedor avança status); decisão
  de 2026-11-09 de manter o catálogo da loja (nomes, preços, fotos,
  categorias) como está; envio de e-mail via Brevo na arquitetura.
- `domain-model.md`: diagrama e conceitos com origem da venda, dados do
  pagamento simulado e status do pedido em Venda; Cliente com conta na
  loja e e-mail confirmado; regra de estoque incluindo o ajuste manual;
  novo conceito Histórico de eventos (event_log).

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
<!-- nenhuma: só documentação (skip_specs) -->

## Impact

- Só arquivos em `docs/`. Sem código, sem Xano.
- Prefixo `backend-` porque a maior parte descreve modelo de dados e
  regras aplicadas no Xano.
