## ADDED Requirements

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
