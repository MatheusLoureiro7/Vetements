## Why

O sistema visual atual ("Atelier": marfim + tinta + accent bordô único,
hairlines finas, sem sombra/cards) foi avaliado pelo usuário como
visualmente básico demais para o produto. Queremos um frontend que
pareça um produto SaaS moderno (referência Linear/Notion/Stripe
Dashboard) — cards com profundidade, paleta de apoio além do accent
único, e um dashboard que comunique dados por meio de gráficos, não só
números soltos — mantendo o bordô como cor de marca.

## What Changes

- Atualiza os tokens visuais (`vetements/styles.py`): fundo passa de
  marfim quente para cinza-claro frio; `RADIUS` sobe de quase-reto para
  cantos arredondados; novo token de sombra suave; novos tokens de cor
  de apoio (sucesso, alerta, informação) além do bordô; tipografia
  Fraunces passa a ser usada só na marca/títulos grandes de página,
  IBM Plex Sans assume títulos de card/seção.
- Reestiliza os componentes compartilhados
  (`vetements/components/shell.py`, `vetements/components/ui.py`):
  item de navegação ativo destacado; `stat()` vira cartão com ícone e
  cor por métrica em vez de texto com hairline; tabelas passam a viver
  dentro de um cartão com sombra.
- Aplica os novos tokens/componentes às 6 telas existentes (login,
  dashboard, produtos, estoque, vendas, clientes) — sem alterar
  estrutura de dados, campos de formulário ou navegação.
- **Dashboard ganha visualização gráfica**: além dos quatro
  números-resumo já existentes, passa a exibir um gráfico de vendas
  por dia (últimos ~14 dias) e um gráfico de mix de produtos por
  categoria, usando `rx.recharts` (já incluso no Reflex).

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities

- `dashboard`: além dos números-resumo e da lista de vendas recentes
  já especificados, o dashboard passa a exigir a exibição de um
  gráfico de vendas por dia e de um gráfico de mix de produtos por
  categoria.

As demais telas (auth, product-catalog, inventory, sales, customers)
recebem apenas reestilização visual — nenhum requisito de
comportamento existente muda, por isso não geram spec delta.

## Impact

- Código alterado: `vetements/styles.py`,
  `vetements/components/shell.py`, `vetements/components/ui.py`,
  todas as páginas em `vetements/pages/`, e `vetements/state/dashboard.py`
  (nova agregação de dados para os gráficos).
- Sem impacto no Xano: nenhuma tabela ou endpoint é criado/alterado
  nesta change; os gráficos consomem os mesmos dados mockados já
  usados pelo dashboard.
- Sem dependências novas: `rx.recharts` já vem com o Reflex instalado.
- Sem mudança em regras de autorização por papel.
