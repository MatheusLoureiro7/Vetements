## Why

A casca autenticada parece inacabada. A sidebar é branca como o resto
da tela, com apenas cinco itens e a marca em texto pequeno soltos no
topo, deixando centenas de pixels vazios abaixo. O usuário e o botão
"Sair" ficam na topbar, no extremo oposto da tela, longe do menu. E o
conteúdo se estica até a borda da janela: em monitores largos, as
colunas das tabelas ficam muito espaçadas e o botão de ação de cada
página fica longe do título.

## What Changes

- A sidebar passa a ser escura, em bordô muito profundo, ocupando a
  altura toda da janela, com texto claro. Ela ganha um bloco de marca
  (monograma "V" + "VETEMENTS"), um rótulo de seção "MENU", itens de
  navegação maiores e um rodapé ancorado embaixo com avatar, nome,
  papel e botão "Sair".
- O item ativo do menu ganha destaque próprio (fundo translúcido,
  barra lateral e texto branco em negrito) e os demais itens reagem ao
  mouse.
- A topbar deixa de existir em telas largas, já que usuário e "Sair"
  se mudam para o rodapé da sidebar. Em telas estreitas ela continua,
  contendo só o botão de menu e a marca, porque a sidebar fica
  escondida. O painel deslizante e o fundo escurecido do mobile são
  mantidos, agora com o tema escuro.
- O conteúdo das páginas autenticadas passa a ter largura máxima de
  1120px, centralizado ao lado da sidebar. Em janelas menores que isso,
  nada muda.
- As cores novas e a largura máxima entram como tokens em
  `vetements/styles.py` (`SIDEBAR_*` e `CONTENT_MAX_WIDTH`).

Fora de escopo: o conteúdo das páginas, as rotas, a lógica de logout e
de autenticação, a tela de login e a paleta de ação primária (o bordô
dos botões não muda).

## Capabilities

### New Capabilities

(nenhuma)

### Modified Capabilities

(nenhuma — mudança puramente visual, sem alteração de comportamento
especificado; por isso esta change declara `skip_specs: true`. Os specs
citam o logout e o "menu, cabeçalho" apenas de forma independente de
posição, e continuam verdadeiros.)

## Impact

- `vetements/components/shell.py` — `sidebar`, `_nav_link`, `topbar` e
  `shell` reescritos; novo bloco de rodapé de usuário.
- `vetements/styles.py` — novos tokens de cor da sidebar e
  `CONTENT_MAX_WIDTH`.
- Nenhuma alteração em páginas, estados, Xano ou testes existentes.
