## 1. Endpoints

- [x] 1.1 `auth/login`: `metadata` só com `id`, `name`, `email`, `role`.
- [x] 1.2 `reset/update_password`: idem.
- [x] 1.3 `reset/magic-link-login`: idem (a partir de `$user`, não do
  registro editado `$user1`).
- [x] 1.4 Dry-run só com os 3 arquivos; mostrar preview; aplicar após
  confirmação; pull de verificação. Feito em 2026-11-11: preview com 3
  UPDATE, nada criado nem removido; push aplicado; no pull, os 3
  endpoints gravam `metadata` com `id`, `name`, `email`, `role`.

## 2. Documentação

- [x] 2.1 `docs/domain-model.md`: trocar o "problema conhecido" pela
  correção, avisando que registros anteriores podem conter o hash.

## 3. Verificação

- [x] 3.1 Login como admin e como vendedor; o evento mais recente de
  `login` em `logs/user/my_events` tem só `id`, `name`, `email`, `role`.
- [x] 3.2 Login com senha errada continua recusado e o login certo
  continua devolvendo o token (regras não mudaram).
- [x] 3.3 Os fluxos de redefinição (`update_password`, `magic-link-login`)
  não são usados pelo app (a gestão não tem tela para eles) e exigem
  e-mail/token de redefinição: conferir só pela leitura do código e pelo
  pull, sem executar.

Resultado (2026-11-11): login como admin e como vendedor → o evento
`login` mais recente em `logs/user/my_events` tem só as chaves `email`,
`id`, `name`, `role`; senha errada → 403 "Invalid Credentials."; login
certo devolve o token normalmente. `update_password` e `magic-link-login`
conferidos pela leitura do código e pelo pull, sem executar.
