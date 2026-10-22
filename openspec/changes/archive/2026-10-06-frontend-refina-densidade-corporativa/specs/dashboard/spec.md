## MODIFIED Requirements

### Requirement: Resumo de métricas principais
O sistema SHALL exibir, na tela inicial após o login, a contagem de
produtos cadastrados, a quantidade de variações com estoque baixo, o
total vendido no mês corrente e o número de clientes cadastrados.
Junto ao total vendido no mês corrente, o sistema SHALL exibir a
variação percentual em relação ao total vendido no mês anterior
(indicando alta ou queda), quando houver ao menos uma venda registrada
no mês anterior para servir de base de comparação; quando não houver
essa base, o sistema SHALL exibir apenas o total, sem variação.

#### Scenario: Métricas visíveis após login
- **WHEN** um usuário autenticado acessa o dashboard
- **THEN** vê os quatro números-resumo (produtos, variações com
  estoque baixo, total vendido no mês, clientes)

#### Scenario: Variação percentual exibida com base de comparação
- **WHEN** um usuário autenticado acessa o dashboard e existe pelo
  menos uma venda registrada no mês anterior
- **THEN** o cartão de total vendido no mês exibe também a variação
  percentual em relação ao mês anterior, indicando visualmente se é
  alta ou queda

#### Scenario: Sem variação percentual quando não há base de comparação
- **WHEN** um usuário autenticado acessa o dashboard e não existe
  nenhuma venda registrada no mês anterior
- **THEN** o cartão de total vendido no mês exibe apenas o total, sem
  indicador de variação percentual
