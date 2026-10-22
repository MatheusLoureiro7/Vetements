## 1. Backend

- [x] 1.1 Restringir `xano/api/authentication/auth/signup_POST.xs` a administradores, com `role` opcional e resposta sem token nem senha.
- [x] 1.2 `xano workspace push --dry-run -i` só deste arquivo; mostrar o preview ao usuário e, após confirmação, aplicar. Feito em 2026-10-21: preview `UPDATE query auth/signup POST` confirmado pelo usuário; push com `--force --guids` (avisos "Unresolved References" = falso positivo conhecido do `-i`).

## 2. Verificação

- [x] 2.1 `curl` sem token em `auth/signup` → 401, e nenhuma conta criada. Feito: 401 "Authentication Required".
- [x] 2.2 Login da equipe (`auth/login`) continua funcionando. Feito: endpoint inalterado e respondendo (403 para credenciais inválidas via `curl`); login real com a conta da equipe fica para o usuário confirmar no `/login`.
