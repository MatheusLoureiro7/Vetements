## Why

O sistema visual "Atelier" (bordô + Fraunces/IBM Plex Sans, cartões com
sombra suave, sidebar escura) já está bem estabelecido — ver
`restyle-frontend-saas-visual` e `restyle-sidebar-navigation` — mas a
aplicação ainda passa a impressão de "protótipo simples" porque falta
polish nos detalhes que mais chamam atenção: a tela de login é só
texto centralizado em fundo branco, sem nenhuma identidade visual;
cartões e cartões de estatística (`ui.card`, `ui.stat`) não reagem ao
mouse; o conteúdo das páginas aparece "de repente" ao carregar, sem
nenhuma transição de entrada; e `ui.empty_state()` é só uma linha de
texto cinza, sem ícone. Nenhum desses pontos exige mudar cor, fonte ou
estrutura — só adicionar acabamento à camada visual já existente.

## What Changes

- `vetements/styles.py` ganha uma escala de elevação nomeada
  (`SHADOW_SM`, `SHADOW_MD` — renomeando o `SHADOW` atual mantendo o
  mesmo valor, `SHADOW_LG`), um token de transição padrão
  (`TRANSITION_FAST`) e um token de gradiente bordô
  (`BRAND_GRADIENT`) para o painel de marca do login.
- `ui.card()` e `ui.stat()` (`vetements/components/ui.py`) ganham um
  hover sutil (leve elevação de sombra e translateY, usando os tokens
  novos) — puramente decorativo, não altera clique nem navegação.
- `ui.empty_state()` ganha um ícone opcional (`rx.icon`, tom
  `INK_MUTED`) acima da mensagem; chamadas existentes continuam
  funcionando sem o ícone (parâmetro com default `None`).
- O conteúdo das páginas autenticadas (`shell()` em
  `vetements/components/shell.py`) ganha uma transição de entrada
  sutil (fade + leve translateY, via CSS `@keyframes`, sem
  JavaScript adicional).
- `_brand_panel()` em `vetements/pages/login.py` deixa de ser texto
  solto em fundo branco: ganha fundo com `BRAND_GRADIENT` (tons de
  bordô, só CSS, sem imagens externas), texto em branco e melhor
  hierarquia vertical.

Fora de escopo: conteúdo/lógica das páginas de produtos, estoque,
vendas e clientes; autenticação e integração com Xano; rotas; a cor de
accent primária (o bordô continua sendo a cor de ação); a change
`restyle-sidebar-navigation` (pendente de arquivamento, não é reaberta
aqui).

## Capabilities

### New Capabilities

(nenhuma)

### Modified Capabilities

(nenhuma — mudança puramente visual/decorativa, sem alteração de
comportamento especificado: nenhum requisito de navegação, dados ou
autorização muda. Por isso esta change declara `skip_specs: true`,
como `restyle-sidebar-navigation` fez.)

## Impact

- `vetements/styles.py` — novos tokens de elevação, transição e
  gradiente.
- `vetements/components/ui.py` — `card()`, `stat()` e `empty_state()`
  ajustados.
- `vetements/components/shell.py` — transição de entrada no container
  de conteúdo.
- `vetements/pages/login.py` — `_brand_panel()` redesenhado.
- Nenhuma alteração em estados (`vetements/state/*`), Xano, rotas ou
  testes existentes.
