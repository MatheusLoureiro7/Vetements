## ADDED Requirements

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
