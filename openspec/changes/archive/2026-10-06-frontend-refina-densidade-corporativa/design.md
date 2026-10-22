## Context

Ver `proposal.md` — "Why"/"What Changes". `vendas` já é buscado
inteiro pelo dashboard (`xano_client.list_sales`, limitado a
`HISTORICO_VENDAS_LIMIT=200`) só para montar o gráfico de 14 dias e o
total do mês corrente; o mesmo dado já tem `created_at` por venda, então
a variação mês a mês não exige nova chamada ao Xano. `ui.loading_state`
é a única função usada pelas 5 telas com listagem (`grep` confirma:
products, dashboard, sales, inventory, customers) — trocar sua
implementação afeta as 5 sem tocar nas páginas.

## Goals / Non-Goals

**Goals:**
- Definir a forma do esqueleto de carregamento (genérico o bastante
  para listas de tamanhos diferentes, sem replicar a estrutura exata
  de cada página) e como ele fica acessível a leitor de tela.
- Definir de onde vem a cor de "queda" (`TREND_DOWN`), já que não
  existe hoje um tom "negativo" separado do bordô de marca.
- Definir a fórmula da variação percentual e seus casos de borda (mês
  anterior sem vendas, mês anterior com total zero).

**Non-Goals:**
- Não cobre paginação/virtualização de tabela nem cabeçalho fixo
  (fora de escopo, ver proposal.md).
- Não cobre tendência para os outros três cartões de estatística.

## Decisions

- **Esqueleto genérico, não pixel-perfect.** `loading_state(text, kind:
  Literal["table", "dashboard"] = "table")`: `"table"` renderiza ~4
  barras (imitando linhas de tabela) dentro de um `ui.card`;
  `"dashboard"` renderiza uma linha de 4 blocos quadrados (imitando os
  cartões de estatística) + o esqueleto de tabela por cima. Não tenta
  imitar exatamente cada página (ex. os dois gráficos do dashboard) —
  o objetivo é comunicar "conteúdo estruturado chegando", não
  reproduzir o layout final. Alternativa descartada: um esqueleto por
  página — mais fiel, mas contraria o ganho de trocar uma função
  central e cria 5 componentes nunca antes necessários.
- **Acessibilidade do esqueleto**: o `text` continua obrigatório, mas
  passa a ir para um `rx.text` com estilo "sr-only" (posição absoluta,
  tamanho 1px, `overflow: hidden`) em vez de aparecer visualmente —
  suficiente para leitor de tela sem repetir o texto ao lado do
  spinner antigo. Sem `aria-live`: o esqueleto já é o próprio
  indicador de carregamento (como o spinner era), não uma atualização
  dinâmica que precise ser anunciada de novo.
- **Shimmer via `@keyframes` + `background-position`** (gradiente
  linear entre `SKELETON_BASE` e `SKELETON_HIGHLIGHT` animando de -100%
  a 100%), no mesmo padrão já usado para `vetements-fade-in`: declarado
  em `base_style` dentro de `@media (prefers-reduced-motion:
  no-preference)`. Sob movimento reduzido, os blocos ficam estáticos em
  `SKELETON_BASE` (ainda comunicam "carregando" pela forma, só sem
  animação).
- **Tendência só no cartão "vendido no mês"**: os outros três (produtos
  cadastrados, estoque baixo, clientes) são contagens totais, não
  medidas por período — comparar com "mês anterior" não faria sentido
  para eles e inventaria uma métrica que a spec não define. `stat()`
  recebe um parâmetro opcional `trend: tuple[float, bool] | None`
  (percentual arredondado, `True` se alta) — `None` por padrão, então
  as chamadas existentes não mudam.
- **Cor de queda**: `TREND_DOWN` novo token (`#B24444`, tom dessaturado
  na mesma família de `SUCCESS`/`WARNING`/`INFO`), com `TREND_DOWN_SOFT`
  de fundo — evita usar `BORDEAUX` (já sobrecarregado como accent de
  ação primária e cor de erro) para "queda de vendas", que é uma
  semântica diferente. Alta reaproveita `SUCCESS`/`SUCCESS_SOFT`, já
  existentes.
- **Fórmula da variação**: `(total_mes_atual - total_mes_anterior) /
  total_mes_anterior * 100`, calculada em `DashboardState.load()` a
  partir do mesmo `vendas` já buscado, filtrando por
  `ano == atual`/`mes == atual - 1` (com o cuidado de janeiro → mês 12
  do ano anterior). Se `total_mes_anterior == 0` (nenhuma venda no mês
  anterior, mesmo que o mês exista), a variação é `None` e o cartão não
  mostra indicador — dividir por zero ou mostrar "+∞%" seria mais
  confuso que omitir.

## Risks / Trade-offs

- [Risco] Esqueleto genérico não bate exatamente com o número de linhas
  reais (ex. tabela com 2 linhas depois de carregar) → Mitigação:
  aceitável — esqueletos de mercado (Linear, Stripe) também não tentam
  prever a contagem exata, só comunicam "isto é uma lista/tabela
  chegando".
- [Trade-off] Reduzir o padding de `data_cell`/`data_table` deixa a
  tabela mais densa mas também deixa o alvo de toque (linha) mais
  baixo — ainda acima do mínimo de 24px CSS (WCAG 2.2 AA para ponteiro
  web) já que a linha inteira é a área de leitura, não um alvo de
  toque isolado; não há botão/link dentro da linha nas tabelas afetadas
  hoje.
