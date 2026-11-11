## 1. Cliente e rota

- [x] 1.1 `xano_client`: `list_users`, `create_user` (via
  `auth/signup`), `update_user`, `set_user_password`, `set_user_active`.
- [x] 1.2 `routes.GESTAO_USUARIOS = "/gestao/usuarios"`; página
  registrada com `on_load` que exige login e papel de administrador
  (vendedor → dashboard); item "Usuários" no menu só para admin.

## 2. Estado e tela

- [x] 2.1 `state/users.py`: lista (funções puras para rótulos de papel,
  status e último login), popups de criar, editar, senha e confirmação
  de ativo, com setters explícitos, carregamento e avisos.
- [x] 2.2 `pages/users.py`: tabela, botão "+ Novo usuário" e os 4 popups
  no padrão da gestão (botões de cancelar comuns, não `dialog.close`
  com `disabled`).

## 3. Verificação

- [x] 3.1 Testes das funções puras e do cliente; `pytest` completo e
  `reflex compile --dry` sem erros.
- [x] 3.2 No navegador (localhost, logins de teste): como vendedor, sem
  item no menu e `/gestao/usuarios` → dashboard. Como admin: lista;
  criar usuário de teste; e-mail repetido → mensagem no popup; editar;
  nova senha; desativar (confirmação) → "Desativado"; login do usuário
  de teste recusado com a mensagem; reativar. Própria linha sem
  desativar nem troca de papel. No fim, o usuário de teste fica
  desativado.

Resultado (2026-11-11): 3.1 — 223 testes (7 novos em
`tests/test_usuarios_equipe.py`), compilação com sucesso (o `rx.input`
não aceita `auto_complete` em texto; removido). 3.2 — como vendedor: sem
"Usuários" no menu e `/gestao/usuarios` → `/gestao`. Como admin: item no
menu; lista com papel, status e último login ("Nunca entrou" para quem
não entrou); própria linha "(você)" sem "Desativar" e, no popup de
edição, papel travado com o aviso. Criar com e-mail do vendedor → "Já
existe uma conta com este e-mail." no popup, campos mantidos; criar
`usuarios.tela@vetements.local` → "Usuário criado."; editar o nome →
"Usuário atualizado."; nova senha fraca → mensagem no popup; válida →
"Nova senha definida para …"; Desativar → confirmação; Cancelar não muda
nada; Confirmar → "Desativado" e ação "Reativar"; Reativar → "Ativo";
desativado de novo. Login com esse usuário → "Seu acesso foi desativado.
Fale com um administrador." na tela de login (antes viraria "E-mail ou
senha inválidos"; `AuthState.login` passou a mostrar essa mensagem). Os
usuários de teste #5 e `usuarios.tela` ficaram desativados.
