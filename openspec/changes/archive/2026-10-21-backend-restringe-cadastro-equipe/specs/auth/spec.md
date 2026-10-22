## ADDED Requirements

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
