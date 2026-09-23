## 1. Tokens

- [x] 1.1 Em `vetements/styles.py`, adicionar `ROW_HOVER` (fundo sutil para linha de tabela em hover, tom próximo de `BG`/`LINE`); verificar com `.venv/bin/python -c "from vetements import styles; print(styles.ROW_HOVER)"`
- [x] 1.2 Adicionar `TREND_DOWN` e `TREND_DOWN_SOFT` (tom dessaturado, família de `SUCCESS`/`WARNING`/`INFO`) em `vetements/styles.py`; verificar com `.venv/bin/python -c "from vetements import styles; print(styles.TREND_DOWN, styles.TREND_DOWN_SOFT)"`
- [x] 1.3 Adicionar `SKELETON_BASE` e `SKELETON_HIGHLIGHT` (tons neutros claros) e o `@keyframes vetements-shimmer` (background-position -100% → 100%) dentro do mesmo bloco `@media (prefers-reduced-motion: no-preference)` já usado por `vetements-fade-in` em `base_style`; verificar com `.venv/bin/reflex compile --dry` sem erros

## 2. Densidade e hover de tabela

- [x] 2.1 Em `data_row()` (`vetements/components/ui.py`), adicionar `_hover={"background_color": ROW_HOVER}` com `transition`; verificar visualmente no navegador (ex.: Estoque) que passar o mouse sobre uma linha a destaca
- [x] 2.2 Em `data_cell()`, reduzir `padding_y` de `0.65rem` para `0.5rem`; em `data_table()`, reduzir o `padding_bottom` do cabeçalho de `0.6rem` para `0.5rem` e o padding do `card()` que envolve a tabela de `"0.25rem 1.5rem 1rem"` para `"0.25rem 1.25rem 0.75rem"`; verificar com `.venv/bin/reflex compile --dry` e checagem visual (tabela mais compacta, ainda legível)
- [x] 2.3 Em `shell()` (`vetements/components/shell.py`), reduzir o `padding` do container de conteúdo de `"2rem"` para `"1.5rem"`; verificar no navegador que as páginas não ficam apertadas nem com scroll horizontal em 1440px e 375px

## 3. Esqueleto de carregamento

- [x] 3.1 Adicionar `skeleton_block(height, width="100%", radius=RADIUS_SM)` em `vetements/components/ui.py`: um `rx.box` com gradiente linear `SKELETON_BASE`→`SKELETON_HIGHLIGHT`→`SKELETON_BASE`, `background_size="200% 100%"` e `animation="vetements-shimmer 1.4s ease-in-out infinite"`; verificar com `.venv/bin/reflex compile --dry`
- [x] 3.2 Reescrever `loading_state(text: str, kind: Literal["table", "dashboard"] = "table")`: o `text` vira um `rx.text` com estilo sr-only (posição absoluta, `width`/`height` 1px, `overflow: hidden`, `clip: rect(0,0,0,0)`); `kind="table"` renderiza ~4 `skeleton_block` de altura ~2.5rem dentro de um `ui.card`; `kind="dashboard"` renderiza uma `rx.grid` de 4 `skeleton_block` quadrados (imitando os cartões de estatística) seguida do esqueleto de tabela; verificar com `.venv/bin/reflex compile --dry` sem erros
- [x] 3.3 Em `vetements/pages/dashboard.py`, passar `kind="dashboard"` na chamada de `ui.loading_state`; verificar no navegador (recarregar `/`) que aparece o esqueleto em vez do spinner antigo antes do conteúdo chegar — confirmado ao vivo (capturado em screenshot: 4 blocos de estatística + esqueleto de tabela)
- [x] 3.4 Verificar no navegador (Produtos, Estoque, Vendas, Clientes) que o esqueleto de lista aparece corretamente nas chamadas existentes de `ui.loading_state(texto)`, sem precisar alterar essas páginas — confirmado em Estoque (esqueleto de 4 barras antes do conteúdo); Vendas/Produtos/Clientes usam a mesma função, sem alteração de código

## 4. Variação percentual do total vendido no mês

- [x] 4.1 Em `vetements/state/dashboard.py`, calcular `total_sold_month_prev` (total vendido no mês anterior, cuidando da virada de ano) a partir do `vendas` já buscado em `load()`; calcular `total_sold_month_delta: tuple[float, bool] | None` (percentual arredondado, `True` se alta) — `None` quando `total_sold_month_prev == 0`; adicionar o teste `tests/test_dashboard_state.py` (ou estender o existente) cobrindo: mês anterior com vendas maior/menor que o atual, mês anterior sem vendas (retorna `None`), e virada de ano (mês atual = janeiro); verificar com `.venv/bin/pytest`
- [x] 4.2 Implementado de forma diferente do previsto: em vez de um `trend: tuple[float, bool]` (Vars do Reflex não suportam desempacotamento de tupla Python), `stat()` ganhou um slot genérico `extra: rx.Component | None = None`, e `ui.trend_indicator(label, is_up)` (novo, em `ui.py`) monta a seta + rótulo + "vs. mês anterior" via `rx.cond` — mesmo resultado visual e mesma regra de cor (`SUCCESS`/`TREND_DOWN`), só a assinatura interna mudou por segurança de reatividade; verificado com `.venv/bin/reflex compile --dry`
- [x] 4.3 Em `vetements/pages/dashboard.py`, o cartão "vendido no mês" passa `extra=rx.cond(DashboardState.has_month_trend, ui.trend_indicator(...), rx.fragment())`; verificado ao vivo que o cartão renderiza normalmente sem indicador quando não há dado do mês anterior (caso real do ambiente de teste — só há vendas de setembro/2026). Não foi possível verificar visualmente o caminho "com tendência" por falta de vendas de agosto/2026 nos dados de teste; a lógica de cálculo está coberta pelos 4 testes novos em `test_dashboard_state.py` e a renderização usa o mesmo padrão `rx.cond` já comprovado em outros componentes do app (ex. `_nav_link`)

## 5. Sincronizar spec e verificação final

- [x] 5.1 Rodar `.venv/bin/reflex compile --dry` e a suíte completa `.venv/bin/pytest` uma última vez, sem erros — 44/44 testes passando, compilação limpa
- [x] 5.2 Percorrido Dashboard, Estoque e Vendas ao vivo: hover de linha confirmado (Estoque), densidade de tabela e de página confirmada em todas, esqueleto de carregamento confirmado (Dashboard e Estoque). Não verificado ao vivo: indicador de tendência "com dado" (sem base de agosto/2026 no ambiente) e Produtos/Clientes especificamente (mesma função compartilhada já verificada em Estoque) — sessão interrompida por limite de uso antes de completar a volta por todas as telas
