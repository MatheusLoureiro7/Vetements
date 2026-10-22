## Context

O frontend Reflex já existe (change `add-frontend-mvp-shell`): sistema
visual "Atelier" centralizado em `vetements/styles.py` (tokens) e
`vetements/components/ui.py`/`shell.py` (peças reutilizadas por todas
as 6 páginas). Ver `proposal.md` para o motivo da mudança. Esta change
não introduz páginas, estados ou chamadas novas — só reestiliza o que
existe e adiciona agregação de dados para dois gráficos no dashboard.

## Goals / Non-Goals

**Goals:**
- Trocar os tokens visuais e os componentes compartilhados de forma
  centralizada, para que a reestilização se propague às 6 páginas sem
  editar cada uma peça a peça.
- Dar ao dashboard uma leitura visual dos dados (gráficos), não só
  números.

**Non-Goals:**
- Não mexe em `state/auth.py`, `state/products.py`,
  `state/sales.py`, `state/customers.py`, `state/inventory.py` nem em
  `state/mock_data.py` — só `state/dashboard.py` ganha agregação nova
  para os gráficos.
- Não adiciona dark mode, tema configurável pelo usuário, nem
  animações além de transições simples de hover/focus.
- Não muda a navegação, os campos de formulário ou as regras de
  autorização por papel.

## Decisions

**Tokens em vez de estilos inline espalhados.** Todo valor novo
(cores de apoio, radius, sombra) entra em `vetements/styles.py` como
constante ou função de estilo, do mesmo jeito que `BORDEAUX`/`RADIUS`
já existem. Páginas e componentes importam os tokens — nunca hardcode
um hex novo numa página. Mantém a mesma convenção já usada no projeto.

**Cores de apoio abafadas, não saturadas.** `SUCCESS`/`WARNING`/`INFO`
seguem o mesmo tom dessaturado do `BORDEAUX` atual (ex.: verde
`#2F6D4F`, âmbar `#B7791F`, azul `#3A5A8C`) em vez de cores vivas de
SaaS genérico — mantém o produto reconhecível como "Vetements" e não
como um dashboard SaaS qualquer. Alternativa considerada (paleta nova
do zero) foi descartada na conversa de brainstorming: o usuário optou
por manter o bordô como accent de marca.

**`rx.recharts` para os gráficos.** Já vem embutido no Reflex
instalado (`reflex.components.recharts`), então não adiciona
dependência nova nem passo de `reflex init`/lockfile. Alternativa
(gráfico customizado em SVG) foi descartada por reinventar o que o
Reflex já resolve.

**Agregação dos gráficos vive em `DashboardState.load`, lendo direto
de `mock_data`.** Segue o padrão já usado pelos outros números-resumo
do dashboard (`total_products`, `low_stock_count`, etc.): o State
consulta as funções públicas de `mock_data` (`list_sales`,
`list_products`, `list_categories`) e monta listas de pontos prontas
para os componentes de gráfico (`list[dict]` ou dataclass), sem expor
a estrutura interna de `mock_data` para a página. Quando uma change
futura trocar `mock_data` por chamadas HTTP ao Xano, só
`DashboardState.load` muda.
- Vendas por dia: para cada um dos últimos 14 dias (incluindo hoje),
  soma `venda.total` das vendas cujo `data_hora` cai naquele dia;
  dias sem venda entram com total `0` (não somem do gráfico).
- Mix por categoria: para cada categoria de `list_categories()`, conta
  quantos produtos de `list_products()` têm aquele `categoria_id`.

**Tipografia dividida por papel, não por página.** Fraunces continua
reservado à marca ("VETEMENTS" na sidebar/login) e a títulos grandes
de página (`section_heading` de topo); títulos de card/estatística
passam a IBM Plex Sans. Isso é definido nas funções de estilo
compartilhadas (`heading_style`, novo `card_title_style`), não
página a página.

## Risks / Trade-offs

- **Radius/sombra maiores em toda a superfície de UI é uma mudança
  visível em todas as 6 páginas de uma vez** → mitigado por ser só a
  casca visual (tokens + componentes compartilhados), sem tocar
  lógica; verificação manual cobre as 6 páginas antes de considerar a
  change pronta.
- **Gráfico de vendas por dia pode ficar quase vazio com os dados
  mockados atuais** (só 2 vendas-semente) → aceitável para esta fase
  mockada; o requisito cobre explicitamente o cenário de gráfico
  "vazio" (todos os dias com total zero) sem erro.
- **`rx.recharts` pode exigir ajuste fino de estilo pra combinar com
  os tokens novos** (cores/fonte dos eixos, tooltip) → resolvido na
  implementação lendo a documentação do componente via skill
  `reflex-docs` antes de codar, em vez de adivinhar a API.
