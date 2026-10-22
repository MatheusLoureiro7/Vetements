## Context

Ver `proposal.md` — "Why" e "What Changes". `SHADOW` (o token que vira
`SHADOW_MD`) só é importado dentro do próprio `vetements/styles.py`
(usado por `card_style()` e `primary_button_style()`); nenhuma página
ou estado importa `SHADOW` diretamente, então renomeá-lo é seguro.
Reflex compila `style={...}` para CSS-in-JS por componente — não há um
arquivo CSS global próprio do projeto além do que `base_style`
(`rx.App(style=...)`) já injeta, então uma animação `@keyframes`
precisa ser declarada dentro de `base_style` para ficar disponível
globalmente.

## Goals / Non-Goals

**Goals:**
- Registrar como a escala de elevação, a transição e o gradiente são
  nomeados e onde a animação de entrada é declarada, para as tarefas
  saírem sem ambiguidade.

**Non-Goals:**
- Não cobre motivação/prioridade (está no proposal) nem o passo a
  passo de edição (está em tasks.md).

## Decisions

- **Renomear `SHADOW` → `SHADOW_MD` mantendo o valor.** Como só é
  usado dentro de `styles.py`, o rename não quebra nenhum import
  externo (confirmado via grep). Alternativa descartada: manter
  `SHADOW` e só acrescentar `SHADOW_SM`/`SHADOW_LG` — rejeitada porque
  "SHADOW" sozinho fica ambíguo ao lado de uma escala nomeada.
- **`@keyframes` declarado em `base_style` (`styles.py`), aplicado via
  `style={"animation": "..."}` no container de conteúdo do
  `shell()`.** Evita depender de JS/GSAP (fora do stack Reflex) e
  mantém a animação num único lugar reaproveitável. Alternativa
  descartada: `rx.el` com classe Tailwind — o projeto não usa
  Tailwind.
- **Hover de `card`/`stat` via `style={"&:hover": {...}}` com
  `transition=TRANSITION_FAST`**, no mesmo padrão já usado em
  `primary_button_style()` — reaproveita a convenção existente em vez
  de introduzir uma nova (ex.: `_hover=` prop do Radix, usada só onde
  o componente já tem um `_hover` padrão que precisa ser sobrescrito,
  como em `_nav_link_item`).
- **`BRAND_GRADIENT` como `linear-gradient` só com tons de bordô já
  existentes** (`BORDEAUX` e uma variação mais escura calculada a
  mão, sem novo token de cor) — evita introduzir uma cor nova fora da
  paleta "Atelier" já aprovada.
- **`empty_state(text, icon: str | None = None)`** — parâmetro
  opcional com default `None` para não quebrar as chamadas existentes
  (`ui.empty_state("Nenhuma venda registrada ainda.")` etc., sem
  precisar tocar nas páginas que já usam a função).

## Risks / Trade-offs

- [Risco] Animação de entrada rodar toda vez que o Reflex re-renderiza
  o container (não só no primeiro load) e parecer "piscar" em
  atualizações de estado → Mitigação: aplicar a animação só no wrapper
  externo do `shell()` (montado uma vez por navegação de página, não
  por re-render de estado interno) e usar duração curta (~250ms) com
  `animation-fill-mode: both`.
- [Risco] `prefers-reduced-motion` não respeitado → Mitigação: envolver
  a regra da animação em `@media (prefers-reduced-motion: no-preference)`
  dentro de `base_style`, igual ao que já existe para outras regras
  condicionais em `styles.py`.
- [Trade-off] Hover em `card()` é ligado por padrão para todo cartão,
  mesmo os que não são clicáveis (ex.: cartão do formulário de login) —
  aceitável porque o hover é puramente decorativo (sombra/elevação),
  não implica em affordance de clique nem muda cursor.
