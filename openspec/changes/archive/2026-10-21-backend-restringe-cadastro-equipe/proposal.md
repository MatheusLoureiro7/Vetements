## Why

O endpoint `auth/signup` (grupo Authentication, herdado do modelo inicial
do Xano) é público e cria uma conta na tabela `user` com papel
`vendedor`, já devolvendo um token. Qualquer pessoa que conheça a URL
pode criar uma conta de funcionário e entrar na gestão (`/gestao`). Isso
precisa ser fechado antes de a loja ganhar cadastro de clientes.

## What Changes

- `auth/signup` passa a exigir um usuário autenticado com papel
  `administrador` (checado no backend).
- O administrador escolhe o papel da conta nova (`vendedor`, padrão, ou
  `administrador`).
- A resposta deixa de trazer token: devolve só `id`, `name`, `email` e
  `role` da conta criada (quem cria não "entra" como o novo usuário, e a
  senha nunca volta na resposta).

Fora do escopo: tela de cadastro de usuários na gestão (o frontend não
usa este endpoint hoje) e revisão dos demais endpoints do modelo inicial
(`reset/*`, `message/*`).

## Capabilities

### Modified Capabilities
- `auth`: criação de contas da equipe restrita a administradores.

## Impact

- Backend: `xano/api/authentication/auth/signup_POST.xs`.
- Frontend: nenhum (o app não chama `auth/signup`).
