## Purpose

Controla quem entra no sistema e o que cada papel (administrador ou
vendedor) pode ver e fazer nas demais telas, através de uma sessão.

## Requirements

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

### Requirement: Encerramento de sessão
O sistema SHALL encerrar a sessão do usuário quando ele solicitar
logout e SHALL redirecioná-lo para a tela de login.

#### Scenario: Logout
- **WHEN** um usuário autenticado seleciona a opção de sair
- **THEN** sua sessão é encerrada e ele é redirecionado para a tela
  de login

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

### Requirement: Indicação de carregamento durante o login
O sistema SHALL indicar visualmente, no botão de entrar, que uma
tentativa de login está em andamento entre a confirmação do usuário e
a resposta do backend, e SHALL impedir que uma nova tentativa seja
iniciada enquanto a anterior ainda está em andamento.

#### Scenario: Botão de login indica carregamento
- **WHEN** um usuário confirma o login
- **THEN** o botão de entrar passa a indicar carregamento e fica
  desabilitado até que o backend responda (com sucesso ou erro)

#### Scenario: Confirmação repetida é ignorada durante o carregamento
- **WHEN** um usuário confirma o login novamente enquanto a tentativa
  anterior ainda está em andamento
- **THEN** o sistema não inicia uma segunda tentativa de login

### Requirement: Criação de contas da equipe restrita a administradores
O backend SHALL criar contas de usuário da equipe (tabela `user`) somente
a pedido de um usuário autenticado com papel `administrador`. Pedidos sem
autenticação ou de um `vendedor` MUST ser rejeitados sem criar a conta. A
resposta da criação MUST NOT conter a senha (nem seu hash) nem um token de
sessão da conta criada.

#### Scenario: Visitante tenta criar conta da equipe
- **WHEN** uma requisição sem token pede a criação de uma conta da equipe
- **THEN** o backend responde com erro de autenticação e nenhuma conta é criada

#### Scenario: Vendedor tenta criar conta da equipe
- **WHEN** um vendedor autenticado pede a criação de uma conta da equipe
- **THEN** o backend responde com acesso negado e nenhuma conta é criada

#### Scenario: Administrador cria um vendedor
- **WHEN** um administrador autenticado cria uma conta informando nome, e-mail e senha
- **THEN** a conta é criada com papel `vendedor` e a resposta traz id, nome, e-mail e papel, sem senha nem token

### Requirement: Histórico de eventos sem dados sensíveis
Os eventos de autenticação da equipe gravados no histórico (login,
redefinição de senha e login pelo link de redefinição) SHALL guardar
nos detalhes apenas o identificador, nome, e-mail e papel do usuário.
O backend MUST NOT gravar nesses detalhes a senha, o hash da senha nem
qualquer dado do token de redefinição.

#### Scenario: Login da equipe
- **WHEN** um usuário da equipe entra com e-mail e senha válidos
- **THEN** o evento de login é registrado com id, nome, e-mail e papel, sem senha nem hash

#### Scenario: Redefinição de senha
- **WHEN** um usuário redefine a senha ou entra pelo link de redefinição
- **THEN** o evento registrado não contém o hash da senha nem dados do token de redefinição

### Requirement: Gestão de usuários da equipe
Apenas administradores SHALL poder listar os usuários da equipe, editar
nome, e-mail e papel, definir uma nova senha e desativar ou reativar o
acesso de um usuário. A listagem SHALL trazer nome, e-mail, papel, se o
usuário está ativo e a data/hora do último login (vazia se nunca
entrou), e MUST NOT trazer senha, hash nem dados de redefinição. O
backend SHALL recusar, sem alterar nada: e-mail já usado por outro
usuário; senha com menos de 8 caracteres ou sem letras e números; um
administrador tirar o próprio papel de administrador ou desativar a si
mesmo; qualquer alteração que deixe o sistema sem nenhum administrador
ativo. Cada alteração aceita SHALL ser registrada no histórico de
eventos sem senha nem hash.

#### Scenario: Listar a equipe
- **WHEN** um administrador pede a lista de usuários
- **THEN** recebe todos os usuários com nome, e-mail, papel, ativo e último login, sem senha nem hash

#### Scenario: Vendedor tenta gerenciar
- **WHEN** um vendedor tenta listar, editar, trocar a senha ou desativar um usuário
- **THEN** o backend recusa com "Apenas administradores podem gerenciar a equipe."

#### Scenario: Promover vendedor
- **WHEN** um administrador muda o papel de um vendedor para administrador
- **THEN** o usuário passa a ser administrador

#### Scenario: Tirar o próprio papel
- **WHEN** um administrador tenta mudar o próprio papel para vendedor
- **THEN** o backend recusa com "Você não pode tirar o seu próprio papel de administrador." e nada muda

#### Scenario: Último administrador
- **WHEN** uma alteração deixaria o sistema sem nenhum administrador ativo
- **THEN** o backend recusa com "O sistema precisa de ao menos um administrador ativo." e nada muda

#### Scenario: E-mail repetido
- **WHEN** um administrador troca o e-mail de um usuário para o e-mail de outro usuário
- **THEN** o backend recusa com "Já existe uma conta com este e-mail." e nada muda

#### Scenario: Nova senha
- **WHEN** um administrador define uma nova senha válida para um usuário
- **THEN** o usuário passa a entrar com a nova senha e a antiga deixa de funcionar

#### Scenario: Senha fraca
- **WHEN** a nova senha tem menos de 8 caracteres ou não tem letras e números
- **THEN** o backend recusa com "A senha precisa ter ao menos 8 caracteres, com letras e números." e nada muda

### Requirement: Usuário desativado não acessa a gestão
Um usuário da equipe desativado SHALL ter o login recusado com "Seu
acesso foi desativado. Fale com um administrador." e qualquer
requisição feita com um token dele, emitido antes da desativação, SHALL
ser recusada com a mesma mensagem. Ao ser reativado, o usuário SHALL
voltar a entrar normalmente. Usuários existentes antes desta regra
SHALL ser tratados como ativos.

#### Scenario: Login de desativado
- **WHEN** um usuário desativado tenta entrar com a senha correta
- **THEN** o login é recusado com "Seu acesso foi desativado. Fale com um administrador."

#### Scenario: Sessão aberta de desativado
- **WHEN** um vendedor é desativado enquanto está logado e faz uma nova ação na gestão
- **THEN** a ação é recusada com a mesma mensagem

#### Scenario: Reativar
- **WHEN** um administrador reativa um usuário
- **THEN** o usuário volta a entrar com a senha dele

### Requirement: Tela de usuários da equipe
A gestão SHALL oferecer, só a administradores, a tela "Usuários", com a
lista da equipe (nome, e-mail, papel, status "Ativo"/"Desativado" e
último login, ou "Nunca entrou") e as ações: criar usuário (nome,
e-mail, papel e senha), editar nome, e-mail e papel, definir nova senha,
e desativar ou reativar o acesso — desativar e reativar pedem
confirmação. O item "Usuários" SHALL aparecer no menu só para
administradores, e um vendedor que abrir o endereço da tela SHALL ser
levado ao dashboard. Na linha do próprio administrador logado, a tela
MUST NOT oferecer desativar nem mudar o papel. Cada popup SHALL indicar
carregamento, impedir um segundo envio, mostrar a mensagem do backend
em caso de recusa mantendo o que foi digitado e, em caso de sucesso,
fechar, mostrar um aviso e atualizar a lista.

#### Scenario: Administrador abre a tela
- **WHEN** um administrador abre "Usuários"
- **THEN** vê a equipe com papel, status e último login

#### Scenario: Vendedor não vê a tela
- **WHEN** um vendedor está logado
- **THEN** o menu não mostra "Usuários" e o endereço da tela leva ao dashboard

#### Scenario: Criar usuário
- **WHEN** o administrador cria um vendedor com dados válidos
- **THEN** o popup fecha, aparece "Usuário criado." e ele entra na lista como Ativo e "Nunca entrou"

#### Scenario: Desativar com confirmação
- **WHEN** o administrador usa "Desativar" num vendedor e confirma
- **THEN** o vendedor aparece como "Desativado" e a ação vira "Reativar"

#### Scenario: Recusa do backend
- **WHEN** o administrador tenta salvar um e-mail já usado
- **THEN** o popup continua aberto com "Já existe uma conta com este e-mail." e os campos como foram digitados

#### Scenario: Próprio usuário
- **WHEN** o administrador vê a própria linha
- **THEN** ela mostra "você" e não oferece "Desativar" nem a troca de papel
