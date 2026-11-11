## ADDED Requirements

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
