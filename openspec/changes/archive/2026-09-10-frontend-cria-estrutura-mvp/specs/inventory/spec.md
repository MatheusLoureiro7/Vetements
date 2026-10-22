## Purpose

Mostra a quantidade disponível em estoque de cada variação de
produto e evidencia quando ela está baixa, para apoiar decisões de
reposição e venda.

## ADDED Requirements

### Requirement: Visualização de estoque por variação
O sistema SHALL exibir, para cada variação de produto, o produto ao
qual pertence, tamanho, cor, SKU e quantidade disponível em estoque.

#### Scenario: Listar estoque
- **WHEN** um usuário autenticado acessa a tela de Estoque
- **THEN** vê, para cada variação, produto, tamanho, cor, SKU e
  quantidade disponível

### Requirement: Indicação de estoque baixo
O sistema SHALL destacar visualmente as variações cuja quantidade em
estoque está abaixo de um limite configurado.

#### Scenario: Variação com estoque baixo
- **WHEN** a quantidade de uma variação está abaixo do limite de
  estoque baixo
- **THEN** a linha correspondente é destacada visualmente como
  estoque baixo

### Requirement: Estoque nunca fica negativo
O sistema SHALL impedir que a quantidade em estoque de qualquer
variação fique negativa em qualquer operação.

#### Scenario: Piso zero
- **WHEN** a quantidade de uma variação chega a zero após uma baixa
  de venda
- **THEN** nenhuma operação subsequente reduz essa quantidade abaixo
  de zero
