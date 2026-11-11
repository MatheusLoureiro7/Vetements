## Why

O backend passa a permitir gerenciar a equipe (change
`backend-adiciona-gestao-usuarios-equipe`), mas a gestão não tem tela
para isso. O administrador precisa ver a equipe e criar, editar,
trocar a senha e desativar/reativar usuários por ali.

## What Changes

- Nova tela **Gestão > Usuários** (`/gestao/usuarios`), só para
  administradores: o item aparece no menu só para eles e um vendedor que
  abrir o endereço volta ao dashboard.
- Tabela com nome, e-mail, papel, status (Ativo/Desativado), último
  login e ações: **Editar** (nome, e-mail, papel), **Nova senha** e
  **Desativar**/**Reativar** (com confirmação).
- Botão **+ Novo usuário** (nome, e-mail, papel, senha), usando o
  `auth/signup` já existente.
- O próprio administrador logado aparece como "você" e não vê as ações
  que o backend recusaria para si (desativar, mudar o próprio papel).
- Popups no padrão da gestão: carregamento, bloqueio de clique duplo,
  erro do backend no popup mantendo o que foi digitado, aviso de sucesso
  e lista atualizada.
- Login: a mensagem "Seu acesso foi desativado…" aparece como qualquer
  erro de login (já é o comportamento atual para erros do backend).

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
- `auth`: nova regra "Tela de usuários da equipe".

## Impact

- `vetements/routes.py`, `vetements/vetements.py`,
  `vetements/components/shell.py`, novo `state/users.py` e
  `pages/users.py`, `xano_client.py` e testes.
- Depende da change de backend aplicada antes.
