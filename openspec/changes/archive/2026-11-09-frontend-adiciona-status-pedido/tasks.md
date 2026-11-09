## 1. Cliente e estado

- [x] 1.1 `xano_client.update_order_status(token, venda_id, status)`
  → `POST vendas/{venda_id}/status`.
- [x] 1.2 `state/sales.py`: funções `status_efetivo`, `rotulo_status`,
  `proximo_status`, `rotulo_acao`; `VendaResumo` com `status_label`,
  `proximo_status`, `acao_label`; handlers para abrir/cancelar a
  confirmação e avançar (com carregamento, aviso, erro e recarga).
- [x] 1.3 `loja/state/conta.py`: `PedidoLoja.status_label`
  ("Pago" / "Enviado em dd/mm/aaaa" / "Entregue em dd/mm/aaaa").

## 2. Telas

- [x] 2.1 Gestão > Vendas: coluna "Status", coluna de ação com o botão
  do próximo passo e diálogo de confirmação; aviso de sucesso e erro.
- [x] 2.2 Loja > Minha conta: status em cada pedido (com estilo
  discreto no CSS da loja).

## 3. Verificação

- [x] 3.1 Testes das funções puras e do cliente; `pytest` completo e
  `reflex compile --dry` sem erros.
- [x] 3.2 No navegador (localhost): na gestão, pedido pago → cancelar
  confirmação (nada muda) → "Marcar como enviado" → aviso e "Enviado";
  "Marcar como entregue" → "Entregue" sem botão; venda de balcão com
  "—". Em "Minha conta" do cliente de teste, o pedido aparece com
  "Entregue em <data>".

Resultado (2026-11-09): 3.1 — 213 testes (18 novos em
`tests/test_status_pedido.py`), compilação com sucesso. 3.2 — logado
como vendedor: coluna Status com "Pago"/"Enviado"/"Entregue" nos pedidos
da loja e "—" nas vendas de balcão, entregue sem botão; no pedido #18
(criado para o teste) o diálogo mostrou "Marcar o pedido #18 como
enviado? Não é possível desfazer."; Cancelar fechou sem mudar nada;
Confirmar → "Enviado", aviso "Pedido #18 marcado como enviado." e botão
"Marcar como entregue"; Confirmar de novo → "Entregue" sem botão. Erro:
com o #16 avançado para entregue fora da tela, o botão antigo "Marcar
como entregue" mostrou "Este pedido já foi entregue." e a linha foi
atualizada. "Minha conta" do `cliente.teste`: #18, #17 e #16 com
"Status: Entregue em 09/11/2026", #15 (antigo) com "Status: Pago".
Estoque da variação 7 devolvido (10).
