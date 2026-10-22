## ADDED Requirements

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
