## ADDED Requirements

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
