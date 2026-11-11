## Context

`cliente` é ao mesmo tempo cadastro da gestão e tabela de login da loja
(`auth = true`). Login, "esqueci a senha" e "redefinir senha" da loja
procuram por `email == X && password != null`, então só contas com
senha precisam de e-mail único entre si. Campos de código:
`codigo_hash`, `codigo_tipo`, `codigo_expira_em`, `codigo_tentativas`.
Gravar `null` em timestamp via `db.edit` foi ignorado antes; o hash vazio
já basta para invalidar o código (o `verificar_codigo` exige hash não
vazio).

## Goals / Non-Goals

**Goals:** editar nome/telefone/e-mail na gestão sem quebrar o login da
loja.

**Non-Goals:** autoedição pelo cliente; histórico de edições.

## Decisions

- **`PATCH clientes/{cliente_id}`**, `auth = "user"`, inputs `nome`,
  `telefone?`, `email?` (substituição completa: o formulário sempre manda
  os três). Mesmos filtros do cadastro.
- **Papel**: qualquer usuário da equipe (como o cadastro). A checagem de
  papel explícita (`administrador` ou `vendedor`) fica no endpoint.
- **"Tem conta na loja"** = `password != null` no registro (mesmo critério
  dos endpoints da loja). Lido com `db.get` sem expor o campo.
- **E-mail mudou** (comparação depois de `trim|lower`) e tem conta:
  preconditions (e-mail não vazio; nenhum outro cliente com senha e esse
  e-mail); edição com `email_confirmado: false`, `codigo_hash: ""`,
  `codigo_tentativas: 0`. Sem conta: só a regra de ao menos um contato.
- **Duas gravações literais** num `conditional` (o `db.edit` não aceita
  `data` vindo de variável): uma com o reset de confirmação e outra sem.
- **Resposta**: `id`, `nome`, `telefone`, `email`, `created_at` e
  `reconfirmar_email` (bool).

## Risks / Trade-offs

- [Cliente com conta não é avisado por e-mail da troca] → ele vê o aviso
  "confirme seu e-mail" ao entrar e pede o código pela própria loja.
  Envio automático ao novo e-mail ficou fora para não depender do Brevo
  num endpoint da gestão.
- [Leitura e escrita não atômicas] → duas edições simultâneas: vale a
  última, como em qualquer cadastro simples.
