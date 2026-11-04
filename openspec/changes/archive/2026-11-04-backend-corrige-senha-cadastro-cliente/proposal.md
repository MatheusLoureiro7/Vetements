## Why

O cadastro de cliente da loja (`POST loja/conta/cadastro`) recusa
**qualquer** senha com "A senha deve ter ao menos 8 caracteres, com
letras e números." — inclusive `abcd1234` e `Cliente123`. Hoje nenhum
visitante consegue criar conta e, portanto, comprar pela loja.
Encontrado em 2026-11-04 ao criar a conta de teste da change
`frontend-adiciona-ajuste-estoque`.

Causa: o filtro `regex_matches` do XanoScript recebe o **padrão à
esquerda** e o texto como argumento (`"/padrão/"|regex_matches:texto`,
conforme a referência de filtros de string do XanoScript). O endpoint
usava a ordem inversa (`$input.senha|regex_matches:"/[A-Za-z]/"`),
tratando a senha como padrão. A troca aconteceu quando o Xano
normalizou o antigo `regex_test` para `regex_matches` no envio de
2026-10-21.

## What Changes

- Corrigir a ordem dos operandos das duas checagens de senha em
  `xano/api/loja/conta/cadastro_POST.xs` (letra e número).
- Nenhuma outra regra muda: continua exigindo 8+ caracteres, ao menos
  uma letra e ao menos um número.

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
<!-- nenhuma: o requisito "Conta de cliente da loja" (spec storefront)
já exige exatamente esse comportamento; só a implementação estava
errada. Por isso a change usa skip_specs. -->

## Impact

- Xano: 1 endpoint atualizado (`loja/conta/cadastro` POST).
- Reflex: nenhum arquivo.
- Desbloqueia: a verificação de token de cliente no ajuste de estoque
  (movida da change `frontend-adiciona-ajuste-estoque`) e os próximos
  itens da loja (pagamento simulado, e-mails de confirmação).
