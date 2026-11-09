## Context

A tela de Vendas (`SalesState`, herda `AuthState`) monta `VendaResumo`
a partir de `GET vendas`, que já traz `origem` e, após o backend, os
campos `status_pedido`, `enviado_em`, `entregue_em`. "Minha conta"
monta `PedidoLoja` a partir de `GET loja/pedidos`. Esta versão do
Reflex não tem setters automáticos e usa dataclasses.

## Goals / Non-Goals

**Goals:** mostrar e avançar o status na gestão; mostrar o status ao
cliente.

**Non-Goals:** cancelamento, filtro por status, e-mail, atualização em
tempo real da página do cliente (ele vê ao recarregar).

## Decisions

- **Funções puras testáveis** em `state/sales.py`: `status_efetivo(venda)`
  (None para balcão; vazio → `"pago"`), `rotulo_status`,
  `proximo_status` (`pago`→`enviado`, `enviado`→`entregue`, senão `""`)
  e `rotulo_acao`. Em `loja/state/conta.py`: `status_label(pedido)`
  com a data formatada em dd/mm/aaaa.
- **`VendaResumo`** ganha `status_label`, `proximo_status` e
  `acao_label`; a coluna de ação só renderiza o botão quando
  `proximo_status != ""`.
- **Confirmação**: diálogo do Radix (`rx.alert_dialog`) controlado
  pelo estado (`confirmar_venda_id`, `confirmar_status`), seguindo o
  popup de ajuste de estoque; evita `window.confirm` (bloqueia a
  automação e destoa do visual).
- **Envio**: handler gerador com `yield` para mostrar "Salvando...";
  qualquer erro → mensagem do backend (ou de falha de conexão) e recarga
  do histórico, como nas outras telas da gestão (não há fluxo próprio
  de sessão expirada).
- **Ambos os papéis** veem o botão (o backend autoriza os dois).

## Risks / Trade-offs

- [Histórico limitado às 50 vendas mais recentes] → pedidos antigos
  fora da lista não podem ser avançados pela tela. Aceitável no volume
  do projeto.
