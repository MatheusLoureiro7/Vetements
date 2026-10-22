## Context

A referência (`ai-website-cloner/src/components/sites/classofficial`) é
Next.js + uma folha CSS própria (`classofficial.css`, classes `co-*`). A
loja é Reflex, com estado da vitrine em `CatalogoState`.

## Decisions

- **CSS portado como arquivo estático** (`assets/loja/loja.css`, classes
  `lj-*`) carregado pelo app, e componentes `rx.el.*` com `class_name`.
  Mantém medidas/transições da referência sem traduzir centenas de regras
  para dicionários de estilo do Reflex. Só o tema claro é portado.
- **Carrossel sem JavaScript**: rolagem horizontal nativa com
  `scroll-snap`; a barra de rolagem é estilizada como a "scrollbar" da
  referência (trilho cinza, polegar arredondado), no lugar do Embla.
- **Barra de anúncio** alterna as mensagens com animação CSS
  (`@keyframes`), sem timer no estado.
- **Abas = filtro de categoria**: "Tudo" equivale a "Todas"; continuam
  usando `CatalogoState.set_categoria` (filtro feito pela API).
- **Busca no cabeçalho**: o formulário envia para
  `CatalogoState.buscar_pelo_cabecalho`; na home consulta e rola até a
  vitrine; nas outras páginas redireciona para `/?q=termo`, e `load` lê
  `q` da URL.
- **Marca**: VETEMENTS em texto (Fraunces) no lugar do logo da
  referência; textos e links da referência trocados por textos da
  Vetements. Itens sem destino no projeto (carrinho, redes sociais,
  políticas) não são exibidos.
- **Newsletter** só visual: valida o e-mail no estado e mostra
  confirmação; não grava nada (documentado como limitação).

## Risks

- Imagens de banner pertencem à referência (projeto acadêmico, mesma
  origem das fotos já usadas no seed do catálogo).
