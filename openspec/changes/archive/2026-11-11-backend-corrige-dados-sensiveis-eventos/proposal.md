## Why

Na revisão da documentação (2026-11-09) apareceu que três endpoints de
autenticação da equipe, herdados do modelo pronto do Xano, gravam no
`event_log` o registro inteiro do usuário, com dados sensíveis:

- `auth/login`: hash da senha;
- `reset/update_password`: hash da senha e dados do token de redefinição;
- `reset/magic-link-login`: hash da senha e hash do token de redefinição.

Isso contraria a regra do AGENTS.md de nunca expor senhas ou dados
sensíveis em logs. O `auth/me` já grava só campos seguros.

## What Changes

- Os três endpoints passam a gravar nos detalhes do evento só `id`,
  `name`, `email` e `role` do usuário.
- Registros antigos ficam como estão (decisão do usuário em
  2026-11-11): a correção vale daqui para frente.
- `docs/domain-model.md`: o "problema conhecido" passa a dizer que foi
  corrigido e que registros anteriores a 2026-11-11 ainda podem conter
  o hash.

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
- `auth`: nova regra "Histórico de eventos sem dados sensíveis".

## Impact

- Xano: 3 endpoints do grupo de autenticação (só o que é gravado no
  `event_log`; respostas e regras de login não mudam).
- Nenhuma mudança no frontend nem em dados existentes.
