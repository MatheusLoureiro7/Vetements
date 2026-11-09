## 1. Banco

- [x] 1.1 `venda`: campos opcionais `forma_pagamento` (enum `pix` |
  `cartao` | `boleto`), `parcelas` (int), `cartao_final` (texto) e
  `pago_em` (timestamp).

## 2. Endpoints

- [x] 2.1 `loja/pedidos` POST: inputs `forma_pagamento`, `parcelas?`,
  `cartao_final?`; preconditions antes da transação (forma válida;
  cartão exige parcelas 1–6 e final de 4 dígitos; final `0000` →
  "Pagamento recusado pela operadora (simulação)."); grava os campos e
  `pago_em = now` (parcelas/final nulos fora de cartão); resposta com
  os dados de pagamento.
- [x] 2.2 `loja/pedidos` GET: output inclui `forma_pagamento`,
  `parcelas`, `cartao_final`, `pago_em`.
- [x] 2.3 Dry-run só com esses 3 arquivos; mostrar preview; aplicar
  após confirmação; pull de verificação. Feito em 2026-11-09 (o
  usuário autorizou aplicar as changes de pagamento): preview com
  `venda` UPDATE + 4 ADD_FIELD e 2 endpoints UPDATE, nada removido;
  push com `--force --guids`. Pull: lógica preservada; o Xano removeu
  os parênteses de `regex_matches:($input.cartao_final ?? "")`, sem
  efeito no resultado (cartão sem final → 400, ver 3.1).

## 3. Verificação (script com conta `cliente.teste@vetements.local`)

- [x] 3.1 Sem forma de pagamento, forma desconhecida, cartão sem
  parcelas, parcelas 7, final com 3 dígitos → 400, nenhuma venda nova.
- [x] 3.2 Cartão final 0000 → 400 com a mensagem de recusa; estoque
  inalterado e nenhuma venda nova.
- [x] 3.3 Pedidos válidos de 1 unidade com Pix, boleto e cartão 3x
  final 4242 → 200, dados de pagamento na resposta e no GET; estoque
  baixado em 1 por pedido. No fim, devolver o estoque com o ajuste de
  estoque (admin). Os 3 pedidos de teste ficam registrados (dados de
  teste da conta de cliente de teste).

Resultado (2026-11-09, script Python, conta `cliente.teste`, variação
7 `FIT-T-SHIRT-CLASS-CLS-MASTER-OFF-WHITE-3-26-P`, estoque 10):
sem forma, forma "cheque", cartão sem parcelas, parcelas 7, final de 3
dígitos e cartão sem final → 400 com mensagem; final 0000 → 400
"Pagamento recusado pela operadora (simulação)." sem pedido novo e
estoque 10. Pedidos 11 (Pix), 12 (boleto) e 13 (cartão 3x final 4242)
→ 200 com `pago_em`; Pix enviado com parcelas/final foi gravado sem
eles (`parcelas = 0`, `cartao_final = ""`, ver design); estoque 10 → 7;
GET traz os dados de pagamento sem SKU/estoque. Estoque devolvido a 10
com o ajuste de estoque (admin).
