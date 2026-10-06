## Purpose

Controla quem entra no sistema e o que cada papel (administrador ou
vendedor) pode ver e fazer nas demais telas, através de uma sessão.

## ADDED Requirements

### Requirement: Login com credenciais válidas
O sistema SHALL autenticar o usuário quando as credenciais informadas
corresponderem a um usuário existente e SHALL direcioná-lo à tela
inicial com o papel correspondente.

#### Scenario: Login de administrador
- **WHEN** um administrador informa e-mail e senha válidos e confirma
- **THEN** ele é autenticado e levado ao dashboard com papel
  administrador

#### Scenario: Login de vendedor
- **WHEN** um vendedor informa e-mail e senha válidos e confirma
- **THEN** ele é autenticado e levado ao dashboard com papel vendedor

### Requirement: Login com credenciais inválidas
O sistema SHALL rejeitar a autenticação quando e-mail e senha não
corresponderem a nenhum usuário existente e SHALL informar o motivo.

#### Scenario: Credencial incorreta
- **WHEN** o usuário informa e-mail ou senha que não correspondem a
  nenhum usuário cadastrado
- **THEN** o sistema exibe a mensagem "E-mail ou senha inválidos" e
  permanece na tela de login, sem autenticar

### Requirement: Acesso exige autenticação
O sistema SHALL exigir uma sessão autenticada para acessar qualquer
tela além do login.

#### Scenario: Acesso direto sem sessão
- **WHEN** um usuário não autenticado tenta acessar qualquer rota
  além de `/login`
- **THEN** o sistema o redireciona para a tela de login

### Requirement: Ações administrativas restritas por papel
O sistema SHALL exibir ações de cadastro e edição de produtos e
categorias apenas para usuários com papel administrador.

#### Scenario: Vendedor sem ações de cadastro
- **WHEN** um usuário com papel vendedor acessa a tela de Produtos
- **THEN** não vê opções para criar ou editar produto ou categoria

#### Scenario: Administrador com ações de cadastro
- **WHEN** um usuário com papel administrador acessa a tela de
  Produtos
- **THEN** vê as opções para criar e editar produto e categoria

### Requirement: Encerramento de sessão
O sistema SHALL encerrar a sessão do usuário quando ele solicitar
logout e SHALL redirecioná-lo para a tela de login.

#### Scenario: Logout
- **WHEN** um usuário autenticado seleciona a opção de sair
- **THEN** sua sessão é encerrada e ele é redirecionado para a tela
  de login

### Requirement: Sessão sobrevive a recarregar a página
O sistema SHALL manter a sessão do usuário autenticado ao recarregar
a página, enquanto o processo do servidor de desenvolvimento
continuar em execução (a sessão é mantida em memória, associada ao
token de navegador do Reflex; reiniciar o servidor encerra todas as
sessões).

#### Scenario: Recarregar a página autenticado
- **WHEN** um usuário autenticado recarrega o navegador
- **THEN** ele continua autenticado, com o mesmo papel, sem precisar
  entrar novamente
