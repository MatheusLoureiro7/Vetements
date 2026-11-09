## 1. Preparação

- [x] 1.1 Adicionar `canonical = "v-znCPQU"` em `xano/api/loja/loja.xs`.
- [x] 1.2 Nova prévia `push --sync --delete --dry-run`: conferir que os
  únicos DELETE são o addon `variacoes_publicas_by_produto` e o endpoint
  `diag-brevo`, e que nenhum UPDATE muda lógica. Feito em 2026-11-09:
  com o `canonical`, o grupo `Loja` saiu da lista; restam 1 UPDATE
  (`auth/signup`, só formatação/descrições) e os 2 DELETE esperados.

## 2. Aplicação

- [x] 2.1 Com a confirmação do usuário, aplicar o push completo com
  `--sync --delete --force --guids`. O usuário autorizou em 2026-11-09,
  mas o modo automático do Claude Code bloqueou o comando: o usuário
  precisa rodá-lo no próprio terminal. O usuário rodou: "Pushed 60
  documents".

## 3. Verificação

- [x] 3.1 Pull do workspace: o addon e o `diag-brevo` não existem mais;
  grupo `Loja` com o mesmo `canonical`.
- [x] 3.2 Chamadas de fumaça: catálogo público e detalhe de produto da
  loja (usa `Loja/variacoes_publicas`), login da equipe e `GET vendas`
  respondem 200.

Resultado (2026-11-09): pull do workspace sem o addon
`variacoes_publicas_by_produto` nem o endpoint `diag-brevo`; grupo `Loja`
com `canonical = "v-znCPQU"`. Fumaça: vitrine com 62 produtos, detalhe de
produto com variações (via `Loja/variacoes_publicas`), 7 categorias,
login da equipe, `GET vendas` (13) e pedidos do `cliente.teste` (8),
tudo 200.
