## 1. Cliente e regras

- [x] 1.1 `xano_client.create_order(token, itens, forma_pagamento,
  parcelas=None, cartao_final=None)`; só envia parcelas/final para
  cartão. Testes do corpo enviado.
- [x] 1.2 `vetements/loja/state/pagamento.py`: `validar_cartao`,
  `dados_pagamento`, códigos fictícios de Pix/boleto e
  `pagamento_label`, com testes em `tests/test_loja_pagamento.py`.
  (`pagamento_label` ficou em `state/conta.py`, junto de
  `pedido_da_api`, para evitar importação circular.)

## 2. Estado e rotas

- [x] 2.1 `routes.LOJA_PAGAMENTO = "/pagamento"` e registro da página.
- [x] 2.2 `PagamentoState`: forma escolhida, campos do cartão,
  parcelas, erros por campo, erro geral, `enviando`; `load_pagamento`
  (redireciona sem login/carrinho vazio); `confirmar_pagamento` (valida,
  chama `create_order`, esvazia carrinho, redireciona para
  `/conta?pedido=<id>`); limpa dados do cartão ao trocar de forma, ao
  confirmar e ao sair. Implementado com formulário não controlado: os
  campos do cartão são lidos só no envio e nunca ficam no estado; ao
  trocar de forma, os campos saem da tela e são descartados.
- [x] 2.3 Carrinho: "Finalizar pedido" navega para `/pagamento` (ou
  entrar com `proximo=/pagamento`); remover a criação do pedido do
  `ContaState` sem deixar código morto; atualizar o texto que diz que
  pagamento não existe.

## 3. Telas

- [x] 3.1 Página de pagamento no visual `lj-*`: resumo, seletor
  Pix/Cartão/Boleto, conteúdo de cada forma, aviso de simulação, dica
  do final 0000, botão "Confirmar pagamento"/"Processando...".
- [x] 3.2 Minha conta: forma de pagamento em cada pedido e "Pagamento
  aprovado" na confirmação.
- [x] 3.3 `docs/project-overview.md`: pagamento simulado registrado;
  integração real continua fora do escopo; remover "loja em
  construção".

## 4. Verificação

- [x] 4.1 `pytest` completo e `reflex compile --dry` sem erros. Feito:
  181 testes; compilação com sucesso.
- [x] 4.2 No navegador (`cliente.teste@vetements.local`): página sem
  login leva para entrar e volta; carrinho vazio leva ao carrinho;
  cartão inválido mostra erros sem enviar; final 0000 mostra recusa e
  mantém o carrinho; Pix, boleto e cartão 3x final 4242 criam pedidos
  pagos (1 unidade cada), carrinho esvazia e "Minha conta" mostra a
  forma de pagamento. Devolver o estoque ao final com o ajuste de
  estoque (admin). Feito em 2026-11-09 (`reflex run --env prod
  --single-port --backend-port 8010`, eventos disparados por
  JavaScript): `/pagamento` sem login → `/conta/entrar?proximo=/pagamento`;
  após entrar com carrinho vazio → `/carrinho`; peça adicionada pela
  página do produto 8 (variação 7, estoque 10); "Finalizar pedido" →
  `/pagamento`; cartão sem nome, validade 10/26 e CVV 12 → três erros
  nos campos, nada enviado; final 0000 → "Pagamento recusado pela
  operadora (simulação).", carrinho e campos mantidos; cartão 3x final
  4242 → pedido 14, carrinho vazio, "Pagamento aprovado · Pedido nº 14
  registrado!" e "Pagamento: Cartão 3x · final 4242"; Pix → pedido 15;
  boleto → pedido 16 (linha digitável exibida). Estoque devolvido de 7
  para 10. Ajuste visual feito durante o teste: preço do resumo sem
  quebra de linha.
