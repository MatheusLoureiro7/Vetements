## 1. Banco

- [x] 1.1 `cliente`: `auth = true` e `password` opcional.
- [x] 1.2 `venda`: `usuario_id` opcional e `origem` (`balcao` | `loja_virtual`, padrão `balcao`).

## 2. Endpoints

- [x] 2.1 `clientes` GET/POST com `output` explícito (sem senha).
- [x] 2.2 Function `Loja/itens_do_pedido`.
- [x] 2.3 `loja/conta/cadastro`, `loja/conta/login`, `loja/conta`.
- [x] 2.4 `loja/pedidos` POST e GET.
- [x] 2.5 `xano workspace push --dry-run -i` só com os arquivos desta change; mostrar o preview ao usuário e aplicar após confirmação. Feito em 2026-10-21: preview (2 tabelas UPDATE com ADD_FIELD/UPDATE_FIELD, 1 function e 5 endpoints CREATE, 2 endpoints UPDATE) confirmado pelo usuário; push com `--force --guids`. Pull de verificação: expressões preservadas, só `regex_test` foi normalizado para `regex_matches` (arquivo local alinhado).

## 3. Verificação

- [x] 3.1 Sem token: `loja/conta` e `loja/pedidos` → 401; cadastro com senha fraca ou sem e-mail → erro; login com credenciais erradas → 403. Feito com `curl`: 401/401/401 (GET conta, GET e POST pedidos), 400 para senha curta, sem número e sem e-mail, 403 "E-mail ou senha inválidos."; `clientes` da gestão sem token 401; `loja/categorias` segue 200.
- [x] 3.2 Token de cliente não acessa endpoints da gestão (`clientes`, `vendas`) → 401. Movido para a change `frontend-cria-conta-cliente-checkout` (precisa de uma conta de cliente; contas e pedidos de teste são criados pelo usuário, não automaticamente, por gravarem dados reais).
- [x] 3.3 Movido para a change `frontend-cria-conta-cliente-checkout`. Fluxo completo (feito pelo usuário pela loja): cadastro, login, pedido baixa o estoque, pedido aparece em "meus pedidos" e na tela de Vendas da gestão; pedido com estoque insuficiente é rejeitado sem baixar nada.
