## Purpose

Dá ao usuário autenticado uma visão geral rápida do estado da loja
assim que ele entra no sistema, sem precisar navegar pelas telas
individuais.

## Requirements

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

### Requirement: Indicação de carregamento inicial do dashboard
O sistema SHALL exibir um indicador de carregamento, distinto da
mensagem de erro e dos números-resumo, enquanto os dados do dashboard
ainda não foram obtidos do backend pela primeira vez.

#### Scenario: Carregamento inicial do dashboard
- **WHEN** um usuário autenticado acessa o dashboard e a primeira
  busca de dados ao backend ainda está em andamento
- **THEN** o sistema exibe um indicador de carregamento no lugar dos
  números-resumo, gráficos e lista de vendas recentes

#### Scenario: Conteúdo substitui o indicador de carregamento
- **WHEN** a busca de dados do dashboard ao backend termina com
  sucesso
- **THEN** o indicador de carregamento é substituído pelos
  números-resumo, gráficos e lista de vendas recentes
