## MODIFIED Requirements

### Requirement: Cadastro de produto
O sistema SHALL permitir que um administrador cadastre um novo
produto com nome, descrição, categoria e preço base em um popup
(diálogo modal) aberto a partir da tela de Produtos, exigindo que nome
e categoria sejam informados e que o preço base seja um número válido.
Quando algum desses campos for inválido, o sistema SHALL impedir o
salvamento e SHALL indicar o erro junto ao campo correspondente. O
popup SHALL oferecer as ações "Cancelar" e "Salvar produto".

#### Scenario: Abrir o popup de cadastro
- **WHEN** um administrador aciona "+ Novo produto" na tela de Produtos
- **THEN** um popup de cadastro é exibido sobre a tela, com os campos
  nome, categoria, preço base e descrição, e a listagem de produtos
  não é deslocada

#### Scenario: Cadastro válido
- **WHEN** um administrador preenche nome, categoria, descrição e
  preço base no popup e confirma
- **THEN** o popup é fechado, o formulário é limpo e um novo produto
  aparece na listagem

#### Scenario: Nome obrigatório
- **WHEN** um administrador tenta salvar um produto sem informar o nome
- **THEN** o sistema impede o salvamento, mantém o popup aberto e
  indica que o nome é obrigatório junto ao campo de nome

#### Scenario: Categoria obrigatória
- **WHEN** um administrador tenta salvar um produto sem selecionar
  categoria
- **THEN** o sistema impede o salvamento, mantém o popup aberto e
  indica que a categoria é obrigatória junto ao campo de categoria

#### Scenario: Preço base inválido
- **WHEN** um administrador tenta salvar um produto com preço base
  vazio ou que não seja um número válido
- **THEN** o sistema impede o salvamento, mantém o popup aberto e
  indica que o preço é inválido junto ao campo de preço

#### Scenario: Vários campos inválidos
- **WHEN** um administrador tenta salvar um produto com mais de um
  campo inválido
- **THEN** o sistema indica o erro junto a cada um dos campos
  inválidos, em uma única tentativa

#### Scenario: Erro do campo some ao corrigi-lo
- **WHEN** um campo do popup está exibindo um erro de validação e o
  administrador altera o valor desse campo
- **THEN** o erro desse campo deixa de ser exibido, sem afetar os
  erros dos demais campos

#### Scenario: Fechar o popup sem salvar
- **WHEN** um administrador fecha o popup sem salvar (por "Cancelar",
  pelo botão de fechar, pela tecla Esc ou clicando fora dele)
- **THEN** o popup é fechado, nenhum produto é cadastrado, e os dados
  digitados e os erros exibidos são descartados, de modo que um novo
  popup abre com o formulário vazio

### Requirement: Erro ao cadastrar produto ou variação
O sistema SHALL exibir uma mensagem de erro e SHALL não adicionar o
produto ou a variação à listagem quando o backend rejeitar o
cadastro (falha de validação ou de comunicação), mantendo os dados
preenchidos no formulário para o usuário corrigir ou tentar de novo.
No cadastro de produto, a mensagem de erro SHALL ser exibida dentro do
popup, e o popup SHALL permanecer aberto.

#### Scenario: Backend rejeita o cadastro de produto
- **WHEN** um administrador confirma o cadastro de um produto e o
  backend retorna um erro (validação ou falha de comunicação)
- **THEN** o sistema exibe uma mensagem de erro dentro do popup, não
  adiciona o produto à listagem, mantém o popup aberto e mantém os
  dados preenchidos no formulário

#### Scenario: Backend rejeita o cadastro de variação
- **WHEN** um administrador confirma a adição de uma variação a um
  produto e o backend retorna um erro (validação ou falha de
  comunicação)
- **THEN** o sistema exibe uma mensagem de erro e a variação não
  aparece associada ao produto
