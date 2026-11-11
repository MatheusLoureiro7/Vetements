## Context

`user` é a tabela de autenticação da equipe (`auth = true`), com `name`,
`email` (único), `password`, `role` e `password_reset`. `auth/signup`
já cria contas (só admin). O login grava o evento `login` no
`event_log` (só dados seguros desde 2026-11-11). O Xano valida o token
mas não sabe de "ativo": é preciso checar no endpoint. O `db.edit` só
aceita `data` literal.

## Goals / Non-Goals

**Goals:** gerenciar a equipe com travas no backend; bloquear de fato
quem foi desativado.

**Non-Goals:** apagar usuário; middleware do Xano (nunca usado no
projeto; preferi o padrão já testado de `function.run`).

## Decisions

- **Campo** `bool ativo?=true` em `user`. Comparação sempre
  `ativo != false`, para que registros sem valor contem como ativos.
- **Função** `Equipe/exigir_ativo` (input `user_id`): `db.get user` e
  precondition `ativo != false` com `accessdenied` "Seu acesso foi
  desativado. Fale com um administrador.". Chamada como primeira linha
  do `stack` de todos os endpoints com `auth = "user"` e no
  `auth/login` (depois de conferir a senha, para não revelar quais
  e-mails existem).
- **Função** `Equipe/exigir_admin` (input `user_id`): carrega o usuário,
  exige ativo e `role == "administrador"` ("Apenas administradores podem
  gerenciar a equipe."). Usada pelos 4 endpoints novos.
- **Endpoints novos no grupo Authentication** (mesmo grupo do
  `auth/signup`, URL já conhecida pelo frontend): `GET usuarios`,
  `PATCH usuarios/{user_id}`, `POST usuarios/{user_id}/senha`,
  `POST usuarios/{user_id}/ativo`.
- **Último login**: para cada usuário, `db.query event_log` com
  `action == "login"`, mais recente, `single`. A equipe é pequena; sem
  campo novo nem migração, e já vale para logins antigos.
- **Travas de administrador**: contar administradores ativos
  (`role == "administrador" && ativo != false`) e, se a alteração tira
  um administrador ativo (rebaixar ou desativar) e a contagem é 1,
  recusar. Mais a trava explícita contra si mesmo.
- **Senha**: precondition com regex na ordem certa
  (`"/[A-Za-z]/"|regex_matches:$input.senha`) antes do `db.edit`; o
  campo `password` faz o hash ao gravar.
- **Histórico**: `user_edit`, `user_password_set`, `user_active_set`
  com `alvo_id` e o que mudou (nunca a senha).

## Risks / Trade-offs

- [Checagem extra em todo endpoint da equipe] → +1 leitura por
  requisição; aceitável no volume do projeto.
- [Esquecer a checagem num endpoint futuro] → registrado no design e no
  domain-model; a função tem nome claro.
- [Push de muitos arquivos] → prévia antes, só com os arquivos desta
  change; nada é apagado.
