## Why

O usuário viu na tela de Usuários (2026-11-11) a mensagem crua do Xano
"Whoa there! Your plan only supports 10 requests per 20 seconds…". O
plano gratuito limita o servidor inteiro a 10 requisições por 20
segundos; depois de reiniciar o app várias telas carregam juntas e
estouram o limite. As leituras já são repetidas automaticamente (3
tentativas, ~1,5 s), mas quando o limite persiste a mensagem em inglês
chega à tela.

## What Changes

- O cliente do Xano passa a trocar a resposta 429 (limite de
  requisições) por uma mensagem em português, igual em todas as telas:
  "O servidor está recebendo muitas requisições agora (limite do plano
  gratuito do Xano). Aguarde alguns segundos e tente de novo."
- Nenhuma mudança no backend nem nas regras de nova tentativa.

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
- `xano-api-client`: nova regra "Mensagem clara para o limite de
  requisições".

## Impact

- `vetements/xano_client.py` e testes.
