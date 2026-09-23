## Purpose

Permite organizar o catálogo de roupas por categoria e cadastrar
produtos com suas variações de tamanho e cor.

## ADDED Requirements

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
