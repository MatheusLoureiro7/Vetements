## ADDED Requirements

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
