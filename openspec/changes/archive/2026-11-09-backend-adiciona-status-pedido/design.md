## Context

`venda` guarda balcão e loja juntos (campo `origem`). Pedidos da loja
já têm `pago_em`. O Xano grava campos opcionais não preenchidos como
`""`/`0` e ignorou `null` em timestamp via `db.edit`, por isso "sem
status" precisa aceitar `""` e `null`. O ajuste de estoque já usa o
padrão "valida tudo antes, grava venda + `event_log` numa transação".

## Goals / Non-Goals

**Goals:**
- Status de entrega dos pedidos da loja com avanço controlado no backend.
- Registro de quem avançou e quando (event_log).

**Non-Goals:**
- Cancelamento/estorno, e-mail de aviso, rastreio, frete.
- Alterar qualquer dado do catálogo.

## Decisions

- **Campos em `venda`**: `enum status_pedido? ["pago","enviado","entregue"]`,
  `timestamp enviado_em?`, `timestamp entregue_em?`. Nome
  `status_pedido` (não `status`) para deixar claro que é da loja e
  evitar palavra genérica. Sem default no schema: assim vendas de
  balcão ficam sem status; o `POST loja/pedidos` grava `"pago"`.
- **Status efetivo**: `status_pedido` vazio/nulo num pedido da loja
  conta como `pago` (pedidos de antes desta change). A regra fica no
  endpoint de avanço e no frontend; não há migração de dados.
- **Endpoint** `POST vendas/{venda_id}/status` (grupo Vendas,
  `auth = "user"`), input `enum status ["enviado","entregue"]`.
  Preconditions, nesta ordem: usuário da equipe com papel
  administrador ou vendedor; venda existe; origem `loja_virtual`
  ("Somente pedidos da loja virtual têm status."); transição permitida
  — `enviado` exige atual `pago`, `entregue` exige atual `enviado`;
  senão "Este pedido está <atual>; o próximo passo é <próximo>." (ou
  "Este pedido já foi entregue."). Depois, numa transação: `db.edit`
  da venda (status + `enviado_em`/`entregue_em = now`) e `db.add
  event_log` (`action: "status_pedido"`, metadata com venda_id,
  anterior, novo). Resposta: a venda atualizada (id, status_pedido,
  enviado_em, entregue_em).
- **Por que um endpoint com `status` e não "avançar"**: o cliente diz
  qual passo quer; se duas pessoas clicarem ao mesmo tempo, a segunda
  recebe erro claro em vez de pular para `entregue` sem querer.
- **Papel**: vendedor também pode avançar (é operação do dia a dia do
  balcão/expedição); a checagem fica no backend, como manda o AGENTS.md.
- **`GET loja/pedidos`**: adicionar `status_pedido`, `enviado_em`,
  `entregue_em` ao `output`. `GET vendas` não tem `output` explícito e
  já devolve os campos novos.

## Risks / Trade-offs

- [Leitura e escrita não atômicas] → duas atualizações simultâneas do
  mesmo pedido: ambas validam contra o mesmo status lido; como pedem o
  mesmo passo, o resultado final é o mesmo (só gera 2 registros no
  event_log). Aceitável no projeto.
- [Sem voltar etapa] → um clique errado não tem desfazer pela tela.
  Mitigação: o frontend pede confirmação antes de avançar; correção
  manual pelo painel do Xano se preciso.
