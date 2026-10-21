## ADDED Requirements

### Requirement: Dados de acesso do cliente não são expostos
As respostas de listagem e cadastro de clientes da gestão MUST NOT conter
a senha da conta do cliente na loja (nem seu hash), mesmo para clientes
que tenham conta.

#### Scenario: Listar clientes com conta na loja
- **WHEN** a gestão lista clientes e algum deles tem conta na loja
- **THEN** a resposta traz id, nome, telefone, e-mail e data de cadastro, sem senha
