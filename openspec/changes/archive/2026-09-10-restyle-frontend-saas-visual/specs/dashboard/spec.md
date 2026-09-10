## ADDED Requirements

### Requirement: Visualização gráfica de vendas e categorias
Além dos números-resumo e da lista de vendas recentes já existentes, o
sistema SHALL exibir, no dashboard, um gráfico de vendas por dia
cobrindo os últimos 14 dias e um gráfico de mix de produtos por
categoria (quantidade de produtos cadastrados por categoria).

#### Scenario: Gráfico de vendas por dia com vendas registradas
- **WHEN** um usuário autenticado acessa o dashboard e existem vendas
  registradas nos últimos 14 dias
- **THEN** vê um gráfico mostrando o total vendido em cada um desses
  dias

#### Scenario: Gráfico de vendas por dia sem vendas registradas
- **WHEN** um usuário autenticado acessa o dashboard e não existem
  vendas registradas no período
- **THEN** vê o gráfico de vendas por dia vazio (todos os dias com
  total zero), sem erro

#### Scenario: Gráfico de mix de categorias
- **WHEN** um usuário autenticado acessa o dashboard e existem
  produtos cadastrados em pelo menos uma categoria
- **THEN** vê um gráfico mostrando a quantidade de produtos
  cadastrados por categoria
