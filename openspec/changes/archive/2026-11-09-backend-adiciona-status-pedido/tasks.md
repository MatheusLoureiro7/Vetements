## 1. Banco

- [x] 1.1 `venda`: campos opcionais `status_pedido` (enum `pago` |
  `enviado` | `entregue`), `enviado_em` e `entregue_em` (timestamp).

## 2. Endpoints

- [x] 2.1 `loja/pedidos` POST: gravar `status_pedido: "pago"` ao criar
  o pedido; resposta inclui o status.
- [x] 2.2 `loja/pedidos` GET: `output` inclui `status_pedido`,
  `enviado_em`, `entregue_em`.
- [x] 2.3 Novo `vendas/{venda_id}/status` POST (grupo Vendas, auth
  user): preconditions (papel, venda existe, origem loja, transição
  permitida tratando vazio como `pago`) antes de gravar; transação com
  `db.edit` da venda e `db.add event_log`.
- [x] 2.4 Dry-run só com esses arquivos; mostrar preview; aplicar após
  confirmação; pull de verificação. Feito em 2026-11-09 (usuário
  autorizou aplicar): preview `venda` UPDATE + 3 ADD_FIELD, 2 endpoints
  UPDATE, 1 CREATE, nada removido. O primeiro push foi recusado inteiro
  (`db.edit` não aceita `data` vindo de variável); trocado por dois
  `db.edit` com dados literais dentro de um `conditional`. Pull: só
  diferenças de formatação.

## 3. Verificação (script, conta `cliente.teste` e logins de teste da equipe)

- [x] 3.1 Pedido novo (Pix, 1 unidade) → GET `loja/pedidos` com
  status `pago`. Devolver o estoque depois com o ajuste (admin).
- [x] 3.2 Vendedor marca `enviado` → 200, `enviado_em` preenchido;
  admin marca `entregue` → 200, `entregue_em` preenchido; o GET do
  cliente mostra `entregue` com as duas datas; `event_log` tem 2
  registros `status_pedido`.
- [x] 3.3 Recusas (400, nada muda): `entregue` num pedido `pago`;
  `enviado` num pedido `entregue`; qualquer status numa venda de
  balcão. Sem token → 401; token de cliente → 401.
- [x] 3.4 Pedido antigo sem status (um dos pedidos de teste 11–16) →
  `enviado` aceito.

Resultado (2026-11-09, script Python; variação 7, estoque 10 → 10):
pedido #17 (Pix) nasce `pago` e o GET do cliente mostra `pago`;
`entregue` num pedido pago → 400 "Este pedido está pago; o próximo passo
é marcar como enviado."; vendedor `enviado` → 200 com `enviado_em`;
`enviado` de novo → 400; admin `entregue` → 200 com `entregue_em`;
`enviado` num entregue → 400 "Este pedido já foi entregue."; GET do
cliente com `entregue` e as duas datas; venda de balcão #10 → 400
"Somente pedidos da loja virtual têm status."; pedido antigo #16 sem
status → `enviado` aceito (fica `enviado`); sem token → 401; token de
cliente → 401; event_log com `status_pedido` (anterior/novo) para
vendedor (#17, #16) e admin (#17). Estoque devolvido com o ajuste.
Datas não preenchidas voltam como `0` (não nulo).
