## Purpose

Dá ao usuário autenticado uma visão geral rápida do estado da loja
assim que ele entra no sistema, sem precisar navegar pelas telas
individuais.

## ADDED Requirements

### Requirement: Resumo de métricas principais
O sistema SHALL exibir, na tela inicial após o login, a contagem de
produtos cadastrados, a quantidade de variações com estoque baixo, o
total vendido no mês corrente e o número de clientes cadastrados.

#### Scenario: Métricas visíveis após login
- **WHEN** um usuário autenticado acessa o dashboard
- **THEN** vê os quatro números-resumo (produtos, variações com
  estoque baixo, total vendido no mês, clientes)

### Requirement: Vendas recentes
O sistema SHALL exibir, no dashboard, as vendas mais recentemente
registradas, ordenadas da mais recente para a mais antiga.

#### Scenario: Lista de vendas recentes
- **WHEN** o dashboard carrega e existem vendas registradas
- **THEN** as vendas mais recentes aparecem no topo da lista
