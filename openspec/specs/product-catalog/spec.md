## Purpose

Permite organizar o catálogo de roupas por categoria e cadastrar
produtos com suas variações de tamanho e cor.

## Requirements

### Requirement: Listagem e busca de produtos
O sistema SHALL exibir a lista de produtos cadastrados com nome,
categoria e preço base, e SHALL permitir filtrar essa lista por nome.

#### Scenario: Listar produtos
- **WHEN** um usuário autenticado acessa a tela de Produtos
- **THEN** vê a lista de produtos com nome, categoria e preço base

#### Scenario: Buscar produto por nome
- **WHEN** o usuário digita um termo no campo de busca
- **THEN** a lista é filtrada para produtos cujo nome contém o termo

### Requirement: Cadastro de produto
O sistema SHALL permitir que um administrador cadastre um novo
produto com nome, descrição, categoria e preço base, exigindo que
uma categoria seja selecionada.

#### Scenario: Cadastro válido
- **WHEN** um administrador preenche nome, categoria, descrição e
  preço base e confirma
- **THEN** um novo produto aparece na listagem

#### Scenario: Categoria obrigatória
- **WHEN** um administrador tenta salvar um produto sem selecionar
  categoria
- **THEN** o sistema impede o salvamento e indica que a categoria é
  obrigatória

### Requirement: Cadastro de variação de produto
O sistema SHALL permitir que um administrador adicione, a um
produto, variações identificadas por tamanho, cor e SKU, cada uma com
uma quantidade inicial em estoque.

#### Scenario: Adicionar variação
- **WHEN** um administrador adiciona uma variação informando
  tamanho, cor, SKU e quantidade inicial a um produto existente
- **THEN** a variação passa a existir e aparece associada a esse
  produto

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
