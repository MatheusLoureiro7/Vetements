## 1. Tokens visuais (`vetements/styles.py`)

- [x] 1.1 Trocar `BG` de marfim (`#F7F5F0`) para cinza-claro frio (ex.
      `#F6F7F9`) e confirmar que `SURFACE` (branco) continua servindo
      de fundo de cartão.
- [x] 1.2 Adicionar tokens de cor de apoio abafados: `SUCCESS`,
      `WARNING`, `INFO` (ex. `#2F6D4F`, `#B7791F`, `#3A5A8C`) e
      verificar que importam sem erro em `components/ui.py`.
- [x] 1.3 Subir `RADIUS` de `2px` para um valor arredondado (ex.
      `10px`) e adicionar novo token `SHADOW` (sombra suave em duas
      camadas). Radius dos componentes Radix nativos (botão/input/
      select) sobe via `rxconfig.py` (`RadixThemesPlugin(theme=...
      radius="large")`, já existia com `radius="small"`).
- [x] 1.4 Adicionar `card_title_style()` (IBM Plex Sans, peso médio)
      para títulos de card/seção, mantendo `heading_style()`
      (Fraunces) reservado à marca/títulos grandes de página.
- [x] 1.5 Rodar o app (skill `reflex-process-management`) e confirmar
      que carrega sem erro de compilação após as mudanças de tokens.
      `reflex compile --dry` compila com sucesso.

## 2. Componentes compartilhados

- [x] 2.1 `components/shell.py`: destacar o item de navegação ativo
      (fundo bordô-soft + ícone/texto bordô) comparando a rota atual
      com `href`; verificar visualmente que só o item da página
      corrente aparece destacado em cada uma das 6 páginas. Implementado
      com `rx.cond(AuthState.router.page.path == href, ...)`; compila
      sem erro (`reflex compile --dry`) — checagem visual final na
      tarefa 5.2.
- [x] 2.2 `components/shell.py`: adicionar avatar/iniciais do usuário
      na topbar ao lado do nome; verificar que exibe as iniciais
      corretas para os dois usuários-semente (admin e vendedor). Novo
      `AuthState.iniciais` (computed var) gera "AF"/"BL" para os dois
      usuários-semente.
- [x] 2.3 `components/ui.py`: reescrever `stat()` como cartão (fundo
      `SURFACE`, `RADIUS`, `SHADOW`, ícone colorido por métrica) em
      vez do texto com hairline atual; verificar que os 4 stats do
      dashboard renderizam como cartões. `pages/dashboard.py` atualizado
      para passar ícone/cor por métrica (produtos=info, estoque
      baixo=warning, vendido no mês=success, clientes=accent padrão);
      compila sem erro.
- [x] 2.4 `components/ui.py`: envolver `data_table`/`data_row` num
      contêiner de cartão (fundo, radius, sombra) preservando o
      hairline entre linhas; verificar que as tabelas de vendas
      recentes, produtos, estoque e clientes continuam legíveis. Novo
      helper `ui.card()` reaproveitado também para os formulários
      (tarefa 4.2).
- [x] 2.5 Aplicar `RADIUS`/leve sombra de hover-focus a `rx.button` e
      aos inputs usados em `ui.field`; verificar visualmente em um
      formulário (ex. login) que o foco é perceptível. Radius sobe
      globalmente via `rxconfig.py` (`RadixThemesPlugin radius="large"`);
      foco com sombra bordô via CSS global em `base_style` (inputs) e
      `styles.primary_button_style()` (hover/focus dos botões de ação
      primária) — checagem visual final na tarefa 5.2.

## 3. Dashboard: agregação e gráficos

- [x] 3.1 `state/dashboard.py`: adicionar agregação "vendas por dia"
      (últimos 14 dias, dias sem venda com total 0) lendo
      `mock_data.list_sales()`; cobrir com teste unitário (ou
      verificação manual descrita) que confirma 14 pontos sempre
      presentes, inclusive quando não há vendas no período.
      `tests/test_dashboard_state.py` cobre isso (4 testes).
- [x] 3.2 `state/dashboard.py`: adicionar agregação "produtos por
      categoria" lendo `mock_data.list_categories()` e
      `mock_data.list_products()`; verificar que a soma das
      contagens por categoria bate com `len(mock_data.list_products())`.
      Coberto por `tests/test_dashboard_state.py` (2 testes).
- [x] 3.3 `pages/dashboard.py`: renderizar gráfico de linha (vendas
      por dia) com `rx.recharts`, consultando a doc via skill
      `reflex-docs`; verificar que renderiza com os dados mock sem
      erro no console do navegador. API do `rx.recharts` confirmada
      lendo os componentes instalados (`line_chart`/`line`/`x_axis`/
      `y_axis`/`cartesian_grid`/`graphing_tooltip`); `reflex compile
      --dry` ok — checagem de console no navegador na tarefa 5.2.
- [x] 3.4 `pages/dashboard.py`: renderizar gráfico de barras (mix por
      categoria) com `rx.recharts`; verificar que as barras somam a
      quantidade total de produtos cadastrados. Garantido pela
      agregação (`test_products_by_category_soma_bate_com_total_de_produtos`);
      compila sem erro.
- [x] 3.5 Verificar cenário de gráfico vazio: com `mock_data.reset()`
      seguido da remoção manual das vendas-semente (ou um teste que
      simula `list_sales()` vazio), confirmar que o gráfico de vendas
      por dia mostra os 14 dias com total zero, sem erro.
      `test_sales_by_day_sem_vendas_fica_zerado_sem_erro` cobre isso.

## 4. Aplicar aos demais telas

- [x] 4.1 `pages/login.py`: aplicar os novos tokens (fundo, radius,
      sombra no painel de formulário); verificar visualmente em
      desktop e no breakpoint mobile já existente (`max-width: 768px`).
      Form agora usa `ui.card()` (radius+sombra) e
      `primary_button_style()`; breakpoint existente preservado.
      Compila sem erro — checagem visual final na tarefa 5.2.
- [x] 4.2 `pages/products.py`, `pages/inventory.py`,
      `pages/sales.py`, `pages/customers.py`: substituir usos diretos
      de tokens antigos (se houver) pelos novos e confirmar que usam
      os componentes atualizados de `ui.py`/`shell.py` sem estilo
      duplicado; verificar visualmente cada página. Painéis com
      borda hairline (`Novo produto`, `Nova variação`, `Nova venda`,
      `Novo cliente`) agora usam `ui.card()`/`ui.card_title()`;
      botões de ação primária usam `primary_button_style()`;
      `inventory.py` já usava só os componentes de `ui.py`, sem
      token direto. Compila sem erro — checagem visual final na
      tarefa 5.2.

## 5. Verificação final

- [x] 5.1 Rodar a suíte de testes existente (`pytest`) e confirmar
      que passa sem alterações de comportamento fora do dashboard.
      `pytest -q` → 20 passed (14 já existentes + 6 novos de
      `test_dashboard_state.py`).
- [x] 5.2 Percorrer manualmente as 6 páginas logado como
      administrador e como vendedor (skill `reflex-process-management`
      pra subir o app), confirmando visual novo consistente e que
      nenhuma permissão por papel mudou. Feito via Chrome
      (`reflex run --env prod --single-port`): login, dashboard
      (stats+gráficos+avatar+nav ativo), produtos (lista, "Novo
      produto", "Nova variação"), estoque, vendas ("Nova venda" +
      histórico) e clientes — todos com cartões/sombra/radius/ícones
      coloridos aplicados. Confirmado que vendedor não vê "+ Novo
      produto" nem "Variações" (mesma restrição de antes). Breakpoint
      mobile do login confirmado via a regra CSS compilada
      (`@media (max-width: 768px)`), já que este ambiente de browser
      não permite redimensionar a janela de teste.
      Observação à parte (não corrigida nesta change, pré-existente):
      o console mostra um erro de hidratação do React (#418) em toda
      navegação completa de página, inclusive em `/login` sem
      qualquer lógica desta change — não afeta funcionalidade
      (confirmado clicando/entrando em todas as páginas) nem é
      causado pelo reskin visual; fica registrado para investigação
      futura, fora do escopo desta change.
- [x] 5.3 Rodar `openspec validate restyle-frontend-saas-visual
      --strict` e confirmar que passa. "Change 'restyle-frontend-saas-visual' is valid".
