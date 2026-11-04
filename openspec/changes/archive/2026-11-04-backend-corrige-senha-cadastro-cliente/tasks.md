## 1. Correção

- [x] 1.1 Em `xano/api/loja/conta/cadastro_POST.xs`, trocar
  `$input.senha|regex_matches:"/[A-Za-z]/"` e
  `$input.senha|regex_matches:"/[0-9]/"` por
  `"/[A-Za-z]/"|regex_matches:$input.senha` e
  `"/[0-9]/"|regex_matches:$input.senha`.
- [x] 1.2 `xano workspace push --dry-run` só com esse arquivo; mostrar o
  preview ao usuário e aplicar após confirmação. Pull de verificação.
  Feito em 2026-11-04: preview com 1 endpoint UPDATE confirmado pelo
  usuário; push com `--force --guids`; pull mostrou a expressão
  preservada exatamente.

## 2. Verificação (com script, respeitando o limite de 10 req/20 s)

- [x] 2.1 Senha válida é aceita: cria a conta de teste
  `cliente.teste@vetements.local` com a senha `cliente123` (uma conta
  só, para não deixar cadastros de teste espalhados).
- [x] 2.2 Senhas inválidas continuam recusadas com a mesma mensagem:
  `abc123` (curta), `abcdefgh` (sem número), `12345678` (sem letra).
- [x] 2.3 Login da conta criada devolve token de cliente.
- [x] 2.4 Movida da change `frontend-adiciona-ajuste-estoque`: token de
  cliente em `POST variacoes/{id}/ajustes` → 401 e estoque inalterado.

Resultado (2026-11-04, script Python): `abc123`, `abcdefgh` e
`12345678` → 400 com a mensagem de senha; `cliente123` → 200 com
token e sem senha/hash na resposta; login do cliente → 200 com token;
token de cliente no ajuste de estoque da variação `CAM-BAS-G-PT` →
401, estoque segue 2. Conta de teste criada:
`cliente.teste@vetements.local` / `cliente123`.
