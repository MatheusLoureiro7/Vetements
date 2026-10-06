## ADDED Requirements

### Requirement: Indicação de carregamento ao cadastrar produto ou variação
O sistema SHALL indicar visualmente, no botão correspondente, que o
cadastro de um produto ou de uma variação está em andamento entre a
confirmação do usuário e a resposta do backend, SHALL desabilitar esse
botão enquanto a operação está em andamento, e SHALL impedir que uma
nova submissão da mesma ação seja iniciada antes da resposta anterior.

#### Scenario: Botão de salvar produto indica carregamento
- **WHEN** um administrador confirma o cadastro de um produto
- **THEN** o botão de salvar passa a indicar carregamento e fica
  desabilitado até que o backend responda

#### Scenario: Botão de adicionar variação indica carregamento
- **WHEN** um administrador confirma a adição de uma variação
- **THEN** o botão correspondente passa a indicar carregamento e fica
  desabilitado até que o backend responda

#### Scenario: Confirmação repetida é ignorada durante o carregamento
- **WHEN** um administrador confirma o cadastro de um produto ou
  variação novamente enquanto a submissão anterior ainda está em
  andamento
- **THEN** o sistema não inicia uma segunda submissão da mesma ação

### Requirement: Confirmação de sucesso ao cadastrar produto ou variação
O sistema SHALL exibir uma mensagem de sucesso visível quando o
backend aceitar o cadastro de um produto ou de uma variação.

#### Scenario: Sucesso ao cadastrar produto
- **WHEN** o backend aceita o cadastro de um produto
- **THEN** o sistema exibe uma mensagem de sucesso, além de o produto
  aparecer na listagem

#### Scenario: Sucesso ao adicionar variação
- **WHEN** o backend aceita a adição de uma variação a um produto
- **THEN** o sistema exibe uma mensagem de sucesso, além de a variação
  aparecer associada ao produto

### Requirement: Distinção entre carregamento inicial e listagem vazia
O sistema SHALL exibir um indicador de carregamento, distinto da
mensagem de listagem vazia, enquanto a lista de produtos ainda não foi
obtida do backend pela primeira vez na tela de Produtos.

#### Scenario: Carregamento inicial da listagem de produtos
- **WHEN** um usuário autenticado acessa a tela de Produtos e a
  primeira busca de produtos ao backend ainda está em andamento
- **THEN** o sistema exibe um indicador de carregamento no lugar da
  mensagem "Nenhum produto encontrado"

#### Scenario: Listagem vazia após o carregamento concluir
- **WHEN** a busca de produtos ao backend termina e não retorna nenhum
  produto
- **THEN** o sistema exibe a mensagem de listagem vazia, não mais o
  indicador de carregamento
