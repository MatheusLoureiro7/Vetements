## Why

A gestão só cria contas da equipe pelo endpoint `auth/signup` (restrito
a administradores), sem nenhuma tela e sem como listar, corrigir,
bloquear ou trocar a senha de alguém. O usuário pediu (2026-11-11) a
tela de usuários da equipe com: listar e criar, trocar o papel, editar
nome e e-mail, definir nova senha, desativar/reativar o acesso e ver o
último login. Esta change prepara o backend; a tela vem na change
`frontend-adiciona-tela-usuarios-equipe`.

## What Changes

- Tabela `user`: campo `ativo` (padrão verdadeiro).
- Novos endpoints, todos só para administrador:
  - `GET usuarios`: lista a equipe (sem senha nem dados de redefinição)
    com o papel, se está ativo e a data do último login (lida do
    histórico de eventos).
  - `PATCH usuarios/{user_id}`: edita nome, e-mail e papel.
  - `POST usuarios/{user_id}/senha`: define uma nova senha.
  - `POST usuarios/{user_id}/ativo`: desativa ou reativa o acesso.
- Travas: o sistema nunca fica sem administrador ativo; ninguém tira o
  próprio papel de administrador nem desativa a si mesmo; e-mail não
  pode repetir o de outro usuário; senha com ao menos 8 caracteres,
  letras e números.
- Usuário desativado não entra (`auth/login` recusa) e as sessões já
  abertas param de funcionar: todos os endpoints da equipe passam a
  checar se o usuário do token está ativo (função compartilhada).
- `auth/signup` grava `ativo: true`. Cada ação nova fica no histórico de
  eventos, só com dados seguros.

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
- `auth`: novas regras "Gestão de usuários da equipe" e "Usuário
  desativado não acessa a gestão".

## Impact

- Xano: tabela `user` (1 campo), 4 endpoints novos, 1 função nova,
  `auth/login`, `auth/signup` e os 19 endpoints com `auth = "user"`
  (só a checagem de ativo no início).
- Fora do escopo: apagar usuário (desativar cobre o caso sem perder o
  histórico de vendas), recuperação de senha por e-mail na gestão,
  vendedor editar o próprio perfil.
