## ADDED Requirements

### Requirement: Carregamento simultâneo das métricas
Ao abrir o dashboard, o sistema SHALL buscar ao mesmo tempo, e não em
sequência, os dados de produtos, variações, clientes, categorias e vendas
usados nas métricas, de forma que o tempo de carregamento seja próximo ao
da consulta mais lenta. Se qualquer uma das consultas falhar, o sistema
SHALL exibir a mensagem de erro de carregamento do dashboard, sem mostrar
métricas parciais.

#### Scenario: Consultas disparadas em paralelo
- **WHEN** um usuário autenticado acessa o dashboard
- **THEN** as cinco consultas ao Xano estão em andamento ao mesmo tempo, em vez de uma aguardar o término da anterior

#### Scenario: Falha em uma das consultas
- **WHEN** um usuário autenticado acessa o dashboard e uma das cinco consultas falha
- **THEN** o dashboard exibe "Não foi possível carregar as métricas do dashboard." e nenhuma métrica parcial
