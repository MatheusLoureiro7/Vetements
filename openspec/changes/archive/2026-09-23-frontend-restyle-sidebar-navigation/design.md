## Context

`vetements/components/shell.py` monta a casca: `sidebar()` (coluna
branca de 240px, sticky), `topbar()` (barra branca com avatar, nome,
papel e "Sair") e `shell()` (que envolve o conteúdo de cada página
autenticada num `rx.box` de largura total). Abaixo de 768px a sidebar
vira um painel `position: fixed` que desliza, controlado por
`ShellState.sidebar_open`, com um fundo escurecido que a fecha ao
clicar. Os tokens visuais vivem em `vetements/styles.py`. Veja
`proposal.md` para a motivação.

## Goals / Non-Goals

**Goals:**
- Sidebar escura e estruturada, com usuário e "Sair" no rodapé.
- Conteúdo com largura máxima e centralizado.
- Preservar o comportamento responsivo já existente.

**Non-Goals:**
- Recolher a sidebar em telas largas (modo ícones), submenus,
  breadcrumbs ou busca global.
- Mudar `AuthState`, rotas ou qualquer página.

## Decisions

**1. Tokens `SIDEBAR_*` em `styles.py`, sem cores soltas no
componente.** Fundo `#2A0A12`; texto padrão em branco a 72% de
opacidade; texto forte `#FFFFFF`; rótulo "MENU" e papel em branco a 55%
(mantém contraste para texto pequeno sobre o fundo escuro); divisores em
branco a 10%; hover em branco a 6%; item ativo em branco a 10% com barra
lateral `#E7B7BE`. O bordô de ação primária (`BORDEAUX`) não muda; o
monograma da marca reutiliza `BORDEAUX` com uma borda translúcida para
se destacar do fundo. Usar opacidades sobre branco em vez de cores
opacas mantém os estados coerentes se o fundo for ajustado depois.

**2. Rodapé ancorado por `margin_top="auto"`.** A sidebar segue como
`rx.vstack` de altura `100vh`; um bloco com `margin_top="auto"` empurra
o rodapé para baixo, dispensando `rx.spacer`. O rodapé reutiliza
`AuthState.iniciais`, `AuthState.nome`, `AuthState.papel_label` e
`AuthState.logout`, que já existem e são usados pela topbar atual, sem
tocar no estado.

**3. Item ativo com barra lateral por `box-shadow` inset.** A barra de
3px é desenhada com `inset 3px 0 0 <accent>` em vez de `border-left`,
para o item não mudar de largura nem deslocar o ícone entre ativo e
inativo. O ativo/inativo é escolhido com `rx.cond` no nível do
componente (dois links com estilos estáticos), comparando
`AuthState.router.page.raw_path` com o `href`. Duas descobertas na
implementação: (a) o hover precisa ir na prop `_hover` do `rx.link`,
pois o `_hover` padrão dele sobrescreve um `&:hover` dentro de `style`;
(b) `router.page.path` é o padrão de rota casado e na página índice não
é `/`, então a comparação antiga nunca destacava o Dashboard — o
`raw_path` (caminho da URL) resolve as cinco rotas.

**4. Topbar só no mobile, por media query.** No estilo da `topbar()`,
`display: none` por padrão e `display: flex` dentro de
`@media (max-width: 768px)`, o mesmo padrão já usado pelo botão de menu.
Usuário e "Sair" saem dela: no mobile eles ficam acessíveis abrindo a
sidebar. *Alternativa:* manter usuário e "Sair" também na topbar mobile
duplicaria os controles e a lógica de layout para pouco ganho.

**5. Largura máxima no `shell()`, num único ponto.** O `rx.box` do
conteúdo ganha `max_width=CONTENT_MAX_WIDTH` e `margin_x="auto"`,
mantendo `width="100%"` e o padding atual. Como todas as páginas
autenticadas passam pelo `shell()`, as cinco telas mudam juntas; o
login não usa o `shell()` e não é afetado. O valor de 1120px é um token
para ser ajustado sem tocar no componente.

**6. Número do cartão de estatística sem quebra de linha.** Com o
conteúdo limitado, os quatro cartões do Dashboard ficam mais estreitos e
"R$ 499,00" quebrava entre o "R$" e o valor. `stat_number_style` passa a
usar `white_space: nowrap` e fonte de 1.75rem (antes 2rem). Valores
acima de ~R$ 10.000,00 podem exceder a largura do cartão; se isso virar
um caso real, o ajuste é um problema de layout do cartão, fora desta
change.

## Risks / Trade-offs

- [Contraste do texto pequeno (rótulo "MENU", papel) sobre o fundo
  escuro] → Opacidade de 55% no mínimo para texto pequeno; conferir
  visualmente na verificação manual.
- [Sem topbar em desktop, o usuário só vê quem está logado olhando o
  rodapé da sidebar] → Aceito: é o padrão de apps desse tipo, e o
  rodapé fica sempre visível porque a sidebar é sticky e ocupa a altura
  toda.
- [O `max-width` pode deixar conteúdo largo demais para 1120px (tabelas
  com muitas colunas)] → As tabelas já rolam horizontalmente em
  container estreito; o token permite alargar sem refatorar.
- [Reflex/Radix: `_hover` e media queries em `style` de `rx.link`
  podem não se comportar como esperado] → Verificar no navegador; se
  necessário, mover o estilo de hover para uma regra de CSS global em
  `base_style`.
