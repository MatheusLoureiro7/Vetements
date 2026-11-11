## 1. Banco e funções

- [x] 1.1 `user`: campo `bool ativo?=true`.
- [x] 1.2 Função `Equipe/exigir_ativo` e função `Equipe/exigir_admin`.

## 2. Endpoints

- [x] 2.1 `GET usuarios` (admin): lista sem senha/redefinição, com
  `ultimo_login_em` do `event_log`.
- [x] 2.2 `PATCH usuarios/{user_id}` (admin): nome, e-mail, papel; e-mail
  único; travas de si mesmo e de último administrador; evento.
- [x] 2.3 `POST usuarios/{user_id}/senha` (admin): regra da senha;
  evento sem a senha.
- [x] 2.4 `POST usuarios/{user_id}/ativo` (admin): travas; evento.
- [x] 2.5 `auth/login`: recusa usuário desativado; `auth/signup`: grava
  `ativo: true` e passa a conferir a senha com a mesma regra e mensagem
  de "nova senha" (antes só o filtro da tabela, com mensagem genérica).
- [x] 2.6 Chamar `Equipe/exigir_ativo` no início dos 19 endpoints com
  `auth = "user"`.
- [x] 2.7 Dry-run só com os arquivos desta change; mostrar preview;
  aplicar após confirmação; pull de verificação. Feito em 2026-11-11:
  preview com `user` UPDATE + 1 ADD_FIELD, 2 funções e 4 endpoints
  CREATE, 20 endpoints UPDATE, nada removido; push aplicado (27
  documentos). Pull: os 23 endpoints com `auth = "user"` chamam
  `Equipe/exigir_ativo` ou `Equipe/exigir_admin`, e o login também.

## 3. Verificação (script; logins de teste; usuário de teste criado para isso)

- [x] 3.1 Admin lista a equipe: sem `password`/`password_reset`, com
  `ativo` e `ultimo_login_em`; vendedor → 403.
- [x] 3.2 Criar um usuário de teste (vendedor) pelo `auth/signup`;
  editar nome/e-mail; e-mail de outro usuário → 400; promover a admin e
  voltar a vendedor.
- [x] 3.3 Nova senha fraca → 400; nova senha válida → login com a nova
  funciona, a antiga não.
- [x] 3.4 Desativar o usuário de teste: login → 403 com a mensagem; um
  token emitido antes → `auth/me` e `GET vendas` recusados; reativar →
  login volta a funcionar.
- [x] 3.5 Travas: admin rebaixar/desativar a si mesmo → 400.
  A trava do último administrador fica coberta pela leitura do código
  (testá-la exigiria rebaixar todos os outros administradores).
- [x] 3.6 Fumaça: login do admin e do vendedor de teste e as telas da
  gestão continuam respondendo (catálogo, estoque, vendas, clientes).
- [x] 3.7 No fim, o usuário de teste fica desativado (não há como apagar
  pela API), com nome indicando que é de teste.

Resultado (2026-11-11, script Python): admin lista 4 usuários, todos com
`ativo` true e `ultimo_login_em`, sem `password`/`password_reset`;
vendedor → 403 "Apenas administradores podem gerenciar a equipe.".
Signup com senha fraca → 400; usuário de teste #5 `usuarios.teste@
vetements.local` criado; editar nome → 200; e-mail do vendedor → 400 "Já
existe uma conta com este e-mail."; promover e rebaixar → 200; vendedor
edita → 403. Senha fraca → 400; senha nova → 200, login com a antiga →
403 e com a nova → 200. Desativado: login → 403 "Seu acesso foi
desativado. Fale com um administrador."; token emitido antes → `auth/me`
e `GET vendas` com o mesmo 403; reativado → login volta. Admin rebaixar
a si → 400; desativar a si → 400. Fumaça: variações (vendedor) e clientes
(admin) → 200. O usuário de teste #5 ficou desativado.
