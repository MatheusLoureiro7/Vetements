## 1. Implementação

- [x] 1.1 Extrair `_buscar_dados(token)` em `vetements/state/dashboard.py` executando as 5 consultas em um `ThreadPoolExecutor` e usá-la em `DashboardState.load`; verificar com o teste da tarefa 2.1

## 2. Testes

- [x] 2.1 Adicionar testes em `tests/test_dashboard_state.py`: as 5 consultas ficam em andamento ao mesmo tempo (barreira de 5 threads, que travaria se fossem sequenciais) e uma `XanoAPIError` em qualquer consulta é repropagada; verificar com `pytest` passando

## 3. Verificação integrada

- [x] 3.1 Rodar `pytest` completo e `reflex compile --dry` sem erros
- [x] 3.2 Teste manual: logar e abrir o dashboard; conferir que os quatro números, os gráficos e as vendas recentes aparecem como antes
