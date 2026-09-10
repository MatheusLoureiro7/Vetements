## Purpose

Dá ao usuário autenticado uma visão geral rápida do estado da loja
assim que ele entra no sistema, sem precisar navegar pelas telas
individuais.

## Requirements

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

### Requirement: Erro ao carregar métricas
O sistema SHALL exibir uma mensagem de erro no lugar dos números-resumo
e da lista de vendas recentes quando não conseguir obter esses dados
do backend, sem quebrar o restante da tela.

#### Scenario: Backend indisponível ao abrir o dashboard
- **WHEN** um usuário autenticado acessa o dashboard e o backend não
  responde (erro de rede ou tempo limite excedido)
- **THEN** o sistema exibe uma mensagem de erro no lugar dos
  números-resumo e da lista de vendas recentes, e o restante da tela
  (menu, cabeçalho) continua funcionando normalmente
