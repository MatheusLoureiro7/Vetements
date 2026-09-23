## Purpose

Mantém um cadastro básico de clientes para que possam ser associados
a vendas.

## ADDED Requirements

### Requirement: Cadastro de cliente
O sistema SHALL permitir cadastrar um cliente com nome e ao menos um
contato (telefone e/ou e-mail).

#### Scenario: Cadastro válido
- **WHEN** um usuário preenche nome e ao menos um contato (telefone
  ou e-mail) e confirma
- **THEN** um novo cliente aparece na listagem

#### Scenario: Contato obrigatório
- **WHEN** um usuário tenta salvar um cliente sem telefone e sem
  e-mail
- **THEN** o sistema impede o salvamento e indica que ao menos um
  contato é obrigatório

### Requirement: Listagem e busca de clientes
O sistema SHALL exibir a lista de clientes cadastrados e SHALL
permitir filtrar essa lista por nome.

#### Scenario: Buscar cliente por nome
- **WHEN** um usuário digita um termo no campo de busca da tela de
  Clientes
- **THEN** a lista é filtrada para clientes cujo nome contém o termo
