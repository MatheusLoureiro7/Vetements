## Purpose

Mantém um cadastro básico de clientes para que possam ser associados
a vendas.

## Requirements

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

### Requirement: Erro ao cadastrar cliente
O sistema SHALL exibir uma mensagem de erro e SHALL não adicionar o
cliente à listagem quando o backend rejeitar o cadastro (falha de
validação ou de comunicação), mantendo os dados preenchidos no
formulário para o usuário corrigir ou tentar de novo.

#### Scenario: Backend rejeita o cadastro de cliente
- **WHEN** um usuário confirma o cadastro de um cliente e o backend
  retorna um erro (validação ou falha de comunicação)
- **THEN** o sistema exibe uma mensagem de erro, não adiciona o
  cliente à listagem, e mantém os dados preenchidos no formulário
