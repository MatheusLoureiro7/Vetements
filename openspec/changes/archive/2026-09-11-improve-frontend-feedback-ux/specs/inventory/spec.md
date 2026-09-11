## ADDED Requirements

### Requirement: Distinção entre carregamento inicial e listagem vazia
O sistema SHALL exibir um indicador de carregamento, distinto da
mensagem de listagem vazia, enquanto a lista de variações em estoque
ainda não foi obtida do backend pela primeira vez na tela de Estoque.

#### Scenario: Carregamento inicial da listagem de estoque
- **WHEN** um usuário autenticado acessa a tela de Estoque e a
  primeira busca de variações ao backend ainda está em andamento
- **THEN** o sistema exibe um indicador de carregamento no lugar da
  mensagem "Nenhuma variação encontrada"

#### Scenario: Listagem vazia após o carregamento concluir
- **WHEN** a busca de variações ao backend termina e não retorna
  nenhuma variação
- **THEN** o sistema exibe a mensagem de listagem vazia, não mais o
  indicador de carregamento
