## Why

O sistema visual "Atelier" (bordô, Fraunces/IBM Plex Sans, cartões com
sombra, sidebar escura) já está construído e recebeu um passo de
polish (hover em cartão, transição de página, login com identidade) na
change anterior (`add-visual-polish-atelier`). Mesmo assim, o app ainda
passa a impressão de protótipo, não de "sistema de verdade": as linhas
de tabela não reagem ao mouse, o cartão de "vendido no mês" mostra só
o número absoluto sem dizer se subiu ou caiu, o carregamento inicial é
um spinner genérico em vez de um esqueleto do conteúdo que vai
aparecer, e o espaçamento das páginas é mais largo do que o esperado
numa ferramenta densa em dados (ver `--domain style "data-dense
dashboard"` do skill ui-ux-pro-max: cartões de KPI com tendência,
tabelas com hover, esqueleto de carregamento e grade compacta são os
elementos que diferenciam uma ferramenta interna "de verdade" de uma
tela estática).

## What Changes

- Linhas de tabela (`ui.data_row`) ganham destaque sutil ao passar o
  mouse (mesmo padrão de transição já usado em cartões).
- Tabelas ficam mais densas: menos padding vertical por linha e menos
  padding do cartão que envolve a tabela.
- O cartão "vendido no mês" do dashboard passa a exibir a variação
  percentual em relação ao mês anterior (seta para cima/baixo + cor
  semântica), quando existir dado do mês anterior para comparar. Os
  demais cartões de estatística (contagens totais, sem período de
  comparação significativo) não ganham indicador de tendência, para
  não inventar uma métrica sem base real.
- `ui.loading_state()` passa a renderizar um esqueleto (blocos com
  brilho animado) na forma aproximada do conteúdo que vai substituí-lo
  — uma variante para listas/tabelas (usada por Produtos, Estoque,
  Vendas, Clientes) e uma variante para o dashboard (linha de cartões +
  tabela). O texto passado continua existindo como rótulo acessível
  (leitor de tela), só deixa de aparecer visualmente como legenda do
  spinner.
- O conteúdo das páginas autenticadas (`shell()`) ganha um respiro
  vertical/horizontal um pouco mais compacto.

Fora de escopo: indicador de tendência nos demais cartões de
estatística (não há período de comparação significativo para eles);
paginação ou virtualização de tabela; cabeçalho fixo (sticky) de
tabela (as listas atuais são curtas, o ganho seria cosmético sem
benefício real); mudança de paleta de cor primária ou tipografia;
qualquer lógica de negócio, autorização ou dado do Xano além do
cálculo de variação percentual (que usa dados já buscados).

## Capabilities

### New Capabilities

(nenhuma)

### Modified Capabilities

- `dashboard`: o requisito "Resumo de métricas principais" passa a
  também descrever a variação percentual do total vendido no mês
  exibida junto ao cartão correspondente, quando há dado do mês
  anterior.

## Impact

- `vetements/styles.py` — token de hover de linha (`ROW_HOVER`), cores
  de tendência (`TREND_DOWN`/`TREND_DOWN_SOFT`, reaproveitando
  `SUCCESS` para tendência positiva), tokens e `@keyframes` de
  esqueleto de carregamento.
- `vetements/components/ui.py` — `data_row()` (hover), `data_cell()` e
  `data_table()` (densidade), `stat()` (parâmetro opcional de
  tendência), `loading_state()` (esqueleto no lugar do spinner) e novo
  helper `skeleton_block()`.
- `vetements/components/shell.py` — espaçamento do conteúdo.
- `vetements/state/dashboard.py` — cálculo da variação percentual do
  total vendido no mês vs. mês anterior, a partir das vendas já
  buscadas (`HISTORICO_VENDAS_LIMIT`).
- `vetements/pages/dashboard.py` — passa a variação calculada para o
  cartão "vendido no mês" e usa a variante de esqueleto do dashboard.
- `vetements/pages/{products,inventory,sales,customers}.py` — nenhuma
  mudança de código (continuam chamando `ui.loading_state(texto)`
  normalmente; a variante padrão já é a de lista/tabela).
- `openspec/specs/dashboard/spec.md` — requisito "Resumo de métricas
  principais" atualizado.
