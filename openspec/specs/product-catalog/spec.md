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
