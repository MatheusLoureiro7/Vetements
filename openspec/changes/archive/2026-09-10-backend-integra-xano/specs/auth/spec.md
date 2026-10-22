## MODIFIED Requirements

### Requirement: Ações administrativas restritas por papel
O sistema SHALL exibir ações de cadastro e edição de produtos e
categorias apenas para usuários com papel administrador, e o backend
SHALL rejeitar essas operações quando solicitadas por um usuário com
papel vendedor, independentemente do que a interface exibir.

#### Scenario: Vendedor sem ações de cadastro
- **WHEN** um usuário com papel vendedor acessa a tela de Produtos
- **THEN** não vê opções para criar ou editar produto ou categoria

#### Scenario: Administrador com ações de cadastro
- **WHEN** um usuário com papel administrador acessa a tela de
  Produtos
- **THEN** vê as opções para criar e editar produto e categoria

#### Scenario: Backend rejeita ação administrativa de um vendedor
- **WHEN** uma requisição de criação ou edição de produto/categoria
  chega ao backend autenticada com um token de usuário com papel
  vendedor
- **THEN** o backend rejeita a operação com um erro de acesso negado,
  mesmo que a requisição não tenha passado pela interface do Reflex

### Requirement: Sessão sobrevive a recarregar a página
O sistema SHALL manter a sessão do usuário autenticado ao recarregar
a página, com base no token de autenticação emitido pelo backend, e
essa sessão SHALL continuar válida mesmo após um reinício do processo
do Reflex, até o token expirar ou o usuário fazer logout.

#### Scenario: Recarregar a página autenticado
- **WHEN** um usuário autenticado recarrega o navegador
- **THEN** ele continua autenticado, com o mesmo papel, sem precisar
  entrar novamente

#### Scenario: Sessão sobrevive a reinício do servidor
- **WHEN** o processo do Reflex é reiniciado enquanto o token de um
  usuário ainda é válido no backend
- **THEN** esse usuário continua autenticado ao recarregar a página,
  sem precisar entrar novamente

## ADDED Requirements

### Requirement: Erro de comunicação com o backend no login
O sistema SHALL exibir uma mensagem de erro clara e SHALL manter o
usuário na tela de login quando o backend estiver inacessível ou
demorar demais para responder a uma tentativa de login, sem tratar
essa falha como credencial inválida.

#### Scenario: Backend indisponível durante o login
- **WHEN** um usuário tenta entrar e o backend não responde (erro de
  rede ou tempo limite excedido)
- **THEN** o sistema exibe uma mensagem indicando falha de
  comunicação, distinta da mensagem de credencial inválida, e não
  autentica o usuário
