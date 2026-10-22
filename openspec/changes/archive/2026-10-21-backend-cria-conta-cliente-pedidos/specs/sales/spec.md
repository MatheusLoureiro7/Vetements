## ADDED Requirements

### Requirement: Origem da venda
Toda venda SHALL ter uma origem: `balcao` (registrada por um usuário da
equipe na gestão) ou `loja_virtual` (pedido feito por um cliente na loja).
Vendas de balcão SHALL continuar associadas ao usuário que as registrou;
vendas da loja virtual SHALL ter cliente associado e nenhum usuário da
equipe. Vendas existentes sem origem registrada SHALL ser tratadas como
de balcão.

#### Scenario: Venda registrada na gestão
- **WHEN** um usuário da equipe registra uma venda na gestão
- **THEN** a venda tem origem `balcao` e o usuário responsável

#### Scenario: Pedido da loja virtual
- **WHEN** um cliente conclui um pedido na loja virtual
- **THEN** a venda tem origem `loja_virtual`, o cliente associado e nenhum usuário da equipe
