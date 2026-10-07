## Why

O dashboard faz 5 chamadas ao Xano em sequência (produtos, variações,
clientes, categorias e vendas). Com a internet oscilando, o tempo de
carregamento é a soma de todas elas — e, com as novas tentativas
automáticas da change `frontend-add-xano-resilience`, uma chamada lenta
atrasa todas as que vêm depois.

## What Changes

- O carregamento do dashboard passa a disparar as 5 consultas ao Xano ao
  mesmo tempo, de modo que o tempo total fique próximo ao da chamada mais
  lenta, e não à soma de todas.
- O comportamento em caso de falha não muda: se qualquer consulta falhar
  (depois das novas tentativas do cliente HTTP), a tela mostra a mesma
  mensagem de erro de hoje.
- Nenhuma mudança visual nem nos números exibidos.

Fora do escopo: paralelizar outras telas (produtos, vendas), cache de
dados e qualquer mudança nos endpoints do Xano (backend).

## Capabilities

### New Capabilities
<!-- Nenhuma. -->

### Modified Capabilities
- `dashboard`: novo requisito de carregamento simultâneo das consultas.

## Impact

- Código: `vetements/state/dashboard.py` (evento `load`).
- Testes: novo teste em `tests/test_dashboard_state.py`.
- Dependências: nenhuma nova (usa `concurrent.futures` da biblioteca padrão).
- Backend (Xano): nenhum impacto.
