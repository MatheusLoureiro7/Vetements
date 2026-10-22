## ADDED Requirements

### Requirement: Pedidos da loja na gestão
A gestão SHALL identificar as vendas de origem loja virtual: na tela de
Vendas o cliente aparece como "Nome (loja virtual)", e no dashboard o
responsável aparece como "Loja virtual", em vez de um usuário da equipe.

#### Scenario: Pedido da loja no histórico de vendas
- **WHEN** existe um pedido feito pela loja virtual e a equipe abre a tela de Vendas
- **THEN** a venda aparece com o nome do cliente seguido de "(loja virtual)"
