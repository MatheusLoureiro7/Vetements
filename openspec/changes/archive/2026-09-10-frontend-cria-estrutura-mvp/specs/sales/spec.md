## Purpose

Registra vendas internas da loja, associando itens de variações de
produto e dando baixa no estoque correspondente.

## ADDED Requirements

### Requirement: Registro de venda com itens
O sistema SHALL permitir registrar uma venda contendo um ou mais
itens, cada um referenciando uma variação de produto e uma
quantidade, associando a venda ao usuário logado e à data/hora do
registro.

#### Scenario: Confirmar venda com itens
- **WHEN** um usuário adiciona ao menos uma variação com quantidade e
  confirma a venda
- **THEN** uma nova venda é registrada com os itens, data/hora e o
  usuário responsável

### Requirement: Venda deve conter ao menos um item
O sistema SHALL impedir a confirmação de uma venda sem nenhum item.

#### Scenario: Bloquear venda vazia
- **WHEN** um usuário tenta confirmar uma venda sem nenhum item
  adicionado
- **THEN** o sistema impede a confirmação e indica que é necessário
  ao menos um item

### Requirement: Cliente associado é opcional
O sistema SHALL permitir registrar uma venda sem cliente associado
(venda avulsa/balcão).

#### Scenario: Venda sem cliente
- **WHEN** um usuário confirma uma venda sem selecionar um cliente
- **THEN** a venda é registrada como avulsa, sem cliente associado

### Requirement: Quantidade vendida não excede o estoque disponível
O sistema SHALL impedir que a quantidade de um item de venda exceda
a quantidade em estoque disponível da variação no momento da venda.

#### Scenario: Tentativa de exceder o estoque
- **WHEN** um usuário tenta adicionar a um item de venda uma
  quantidade maior que o estoque disponível da variação
- **THEN** o sistema impede a adição e informa a quantidade máxima
  disponível

### Requirement: Baixa de estoque ao confirmar venda
O sistema SHALL reduzir a quantidade em estoque de cada variação
vendida pela quantidade do item correspondente ao confirmar a venda.

#### Scenario: Baixa após confirmação
- **WHEN** uma venda com itens válidos é confirmada
- **THEN** a quantidade em estoque de cada variação vendida é
  reduzida pela quantidade vendida

### Requirement: Valor total derivado dos itens
O sistema SHALL calcular o valor total da venda como a soma de
quantidade multiplicada pelo preço unitário de cada item, e SHALL
recalcular esse total sempre que os itens forem alterados.

#### Scenario: Total recalculado
- **WHEN** um item é adicionado, removido ou tem sua quantidade
  alterada em uma venda em edição
- **THEN** o valor total exibido reflete a soma atualizada dos itens
