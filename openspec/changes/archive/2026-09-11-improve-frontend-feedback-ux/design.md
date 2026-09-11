## Context

Ver `proposal.md` para a motivação. Hoje cada `State` de escrita
(`AuthState`, `ProductsState`, `CustomersState`, `SalesState`) chama
`vetements/xano_client.py` diretamente dentro do event handler, sem
nenhum Var de progresso. As páginas leem `load_error`/`form_error`
(string vazia = sem erro) para decidir o que mostrar, mas nunca sabem
se uma chamada está em andamento. Nesta versão do Reflex não existem
setters automáticos — todo Var editável precisa de
`@rx.event def set_<var>` explícito (mesma observação já registrada
na memória do projeto).

## Goals / Non-Goals

**Goals:**
- Um padrão único de "Var de carregamento por ação" e "Var de
  mensagem de sucesso por ação", reaproveitado nos 4 states de
  escrita, e um padrão único de "Var de carregamento de página"
  reaproveitado nos 6 states com `load()`.
- Componentes compartilhados em `vetements/components/ui.py` para o
  indicador de carregamento de lista e para a mensagem de sucesso, em
  vez de cada página reimplementar o próprio marcador.
- Sidebar colapsável e tabelas com rolagem horizontal, sem alterar
  paleta, tipografia ou os demais tokens de `vetements/styles.py`.

**Non-Goals:**
- Erros de formulário vinculados a um campo específico
  (`aria-describedby`) — fica para uma change futura.
- Paginação de listagens — fica para uma change futura.
- Qualquer alteração no Xano ou nos contratos de `xano_client.py`.
- Um sistema de toast/notificação flutuante genérico — a mensagem de
  sucesso continua inline, perto da ação, como já é feito em Vendas.

## Decisions

**Var de carregamento por ação, não um único Var global de "app
carregando".** Cada ação (`login`, `create_product`, `add_variant`,
`create_customer`, `add_item`, `confirm_sale`) ganha seu próprio bool
(ex.: `is_submitting_product: bool = False`), setado `True` no início
do handler e `False` em todo caminho de saída (sucesso ou erro,
`try/finally` conceitual). Alternativa descartada: um único
`is_loading` por State cobrindo todas as ações do State — mais simples,
mas desabilitaria (por acidente) um botão não relacionado à ação que
está em andamento quando duas ações share o mesmo State (ex.:
`add_variant` e `create_product` no `ProductsState`).

**Guarda de duplo-clique no início do handler, não `disabled` só na
UI.** Cada handler passa a checar `if self.is_submitting_x: return`
como primeira linha, além do botão usar `disabled=State.is_submitting_x`.
A checagem no handler é o que realmente impede o duplo envio (o
`disabled` da UI é só o reflexo visual); depender só do `disabled` não
protege contra um segundo evento que já estava na fila antes do
primeiro `set` chegar ao cliente.

**Var de carregamento de página distinto de `load_error` e da lista
vazia.** Cada State com `load()` ganha `is_loading_page: bool = True`
(começa `True` porque a primeira carga inicia assim que a página
monta), setado `False` ao final de `load()` (sucesso ou erro). As
páginas passam a checar, nessa ordem: `is_loading_page` → indicador de
carregamento; senão `load_error != ""` → mensagem de erro; senão lista
vazia → `empty_state`; senão a listagem. Alternativa descartada:
inferir "carregando" a partir de `load_error == "" and lista vazia`
— ambíguo, porque uma lista genuinamente vazia após carregar teria o
mesmo estado.

**Componentes compartilhados novos em `ui.py`:
`loading_state(text)` e `success_message(text)`.** Espelham o
`empty_state(text)` já existente (mesmo padrão de função simples que
recebe o texto/Var e devolve um `rx.Component`), para manter um único
lugar de estilo por conceito. `success_message` reaproveita a cor
`SUCCESS` já definida em `styles.py` (mesma usada em `sales.py` hoje).

**Sidebar responsiva com um Var de UI local (não em State
persistente).** Um novo `ShellState` (ou Var local ao componente,
decidido durante a implementação conforme o que o Reflex desta versão
permitir de forma mais simples) controla se a sidebar está aberta
abaixo do breakpoint; acima do breakpoint ela sempre aparece,
independente desse Var. Abaixo de 768px (mesmo breakpoint já usado no
login e no dashboard) a sidebar fica oculta por padrão, com um botão
de menu na topbar para abri-la.

**Rolagem horizontal via wrapper em `ui.data_table`, não em cada
página.** `data_table` (em `ui.py`) passa a envolver o `rx.table.root`
existente em um `rx.box` com `overflow_x="auto"`, então toda tabela já
existente ganha o comportamento sem precisar editar as páginas
individualmente.

## Risks / Trade-offs

- [Repetição do padrão "is_submitting_x + try/except/finally" em 6
  handlers diferentes] → Aceito: são poucos handlers e o padrão é
  simples; extrair um decorator/helper genérico ficaria mais difícil
  de ler nesta versão do Reflex (sem setters automáticos, um decorator
  teria que lidar com o Var certo por handler). Se o padrão crescer
  muito em changes futuras, extrair um helper pode ser revisitado.
- [Sidebar oculta por padrão em telas pequenas pode confundir quem
  usa em tablet pela primeira vez] → Mitigado com um botão de menu
  visível e claramente rotulado na topbar quando a sidebar está
  colapsada.
- [`is_loading_page` começando `True` por padrão em vez de `False`]
  → Intencional: a página sempre chama `load()` no `on_load`, então
  "carregando" é o estado real entre montar a página e a primeira
  resposta; começar `False` reintroduziria o flash de "lista vazia"
  que esta change existe para eliminar.
