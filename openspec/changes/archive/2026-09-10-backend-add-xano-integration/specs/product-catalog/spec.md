## ADDED Requirements

### Requirement: Erro ao cadastrar produto ou variação
O sistema SHALL exibir uma mensagem de erro e SHALL não adicionar o
produto ou a variação à listagem quando o backend rejeitar o
cadastro (falha de validação ou de comunicação), mantendo os dados
preenchidos no formulário para o usuário corrigir ou tentar de novo.

#### Scenario: Backend rejeita o cadastro de produto
- **WHEN** um administrador confirma o cadastro de um produto e o
  backend retorna um erro (validação ou falha de comunicação)
- **THEN** o sistema exibe uma mensagem de erro, não adiciona o
  produto à listagem, e mantém os dados preenchidos no formulário

#### Scenario: Backend rejeita o cadastro de variação
- **WHEN** um administrador confirma a adição de uma variação a um
  produto e o backend retorna um erro (validação ou falha de
  comunicação)
- **THEN** o sistema exibe uma mensagem de erro e a variação não
  aparece associada ao produto
