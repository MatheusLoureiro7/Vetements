## MODIFIED Requirements

### Requirement: Login com credenciais válidas
O sistema SHALL autenticar o usuário quando as credenciais informadas
corresponderem a um usuário existente e SHALL direcioná-lo à tela
inicial da gestão (`/gestao`) com o papel correspondente.

#### Scenario: Login de administrador
- **WHEN** um administrador informa e-mail e senha válidos e confirma
- **THEN** ele é autenticado e levado ao dashboard da gestão (`/gestao`)
  com papel administrador

#### Scenario: Login de vendedor
- **WHEN** um vendedor informa e-mail e senha válidos e confirma
- **THEN** ele é autenticado e levado ao dashboard da gestão (`/gestao`)
  com papel vendedor

### Requirement: Acesso exige autenticação
O sistema SHALL exigir uma sessão autenticada para acessar qualquer
tela da gestão (rotas sob `/gestao`). As páginas da loja virtual e a
tela de login SHALL permanecer acessíveis sem sessão.

#### Scenario: Acesso direto sem sessão
- **WHEN** um usuário não autenticado tenta acessar qualquer rota sob
  `/gestao`
- **THEN** o sistema o redireciona para a tela de login

#### Scenario: Loja acessível sem sessão
- **WHEN** um visitante não autenticado acessa a página inicial da loja
  (`/`)
- **THEN** a página é exibida normalmente, sem redirecionamento
