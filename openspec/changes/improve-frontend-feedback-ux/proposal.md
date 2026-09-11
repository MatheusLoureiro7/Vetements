## Why

Desde a integração com o Xano real, as ações do app (login, cadastrar
produto/variação/cliente, registrar venda) passaram a depender de
chamadas de rede que podem demorar ou falhar, mas a interface não dá
nenhuma pista visual disso: botões não desabilitam nem mostram
carregamento, a maioria das ações de sucesso não confirma nada ao
usuário, e o estado de "carregando" é visualmente idêntico ao de
"lista vazia". Isso gera a sensação de que a ação "não funcionou"
mesmo quando funcionou (ou incentiva cliques duplicados quando
realmente não funcionou). Além disso, a casca do app autenticado
(sidebar + tabelas) não é responsiva, diferente do login e do
dashboard, que já têm breakpoints.

## What Changes

- Cada ação assíncrona de escrita (login, salvar produto, adicionar
  variação, salvar cliente, adicionar item de venda, confirmar venda)
  passa a ter um estado de carregamento explícito: o botão
  correspondente desabilita e mostra um indicador de carregamento
  enquanto a chamada está em andamento, e volta ao normal ao final
  (sucesso ou erro). Cliques repetidos enquanto uma chamada está em
  andamento são ignorados.
- Cada tela com listagem carregada via `on_load` (Dashboard, Produtos,
  Estoque, Clientes, Vendas) passa a distinguir visualmente "ainda
  carregando a primeira vez" de "lista vazia" — hoje os dois mostram o
  mesmo texto de estado vazio.
- Criar produto, adicionar variação e criar cliente passam a mostrar
  uma mensagem de sucesso após a ação, no mesmo padrão visual já usado
  em Vendas (`sale_success`), reaproveitado como componente
  compartilhado.
- A casca autenticada (sidebar + área de conteúdo) ganha um breakpoint
  responsivo: abaixo de uma largura pequena, a sidebar colapsa e pode
  ser reaberta por um botão de menu. Tabelas com várias colunas ganham
  rolagem horizontal em vez de quebrar o layout da página.

Fora de escopo desta change (fica para uma change futura, se
priorizado): erros de formulário vinculados ao campo específico
(`aria-describedby`) e paginação de listagens grandes.

## Capabilities

### New Capabilities

(nenhuma — esta change só adiciona requisitos de feedback/responsividade
a capabilities já existentes)

### Modified Capabilities

- `auth`: login passa a indicar carregamento durante a autenticação e
  a impedir envios repetidos enquanto uma tentativa está em andamento.
- `product-catalog`: cadastro de produto e de variação passam a
  indicar carregamento durante o envio e a confirmar sucesso visualmente
  após concluir; a listagem de produtos distingue carregamento inicial
  de lista vazia.
- `customers`: cadastro de cliente passa a indicar carregamento durante
  o envio e a confirmar sucesso visualmente; a listagem de clientes
  distingue carregamento inicial de lista vazia.
- `sales`: adicionar item e confirmar venda passam a indicar
  carregamento durante o envio, com proteção contra envio duplicado; a
  listagem de vendas registradas distingue carregamento inicial de
  lista vazia.
- `inventory`: a listagem de estoque distingue carregamento inicial de
  lista vazia.
- `dashboard`: o carregamento das métricas/gráficos/vendas recentes
  distingue carregamento inicial de erro e de "sem dados".

## Impact

- `vetements/state/auth.py`, `products.py`, `customers.py`,
  `sales.py`, `inventory.py`, `dashboard.py` — novos Vars de
  carregamento/sucesso e proteção contra duplo envio nos event
  handlers de escrita e de `load()`.
- `vetements/components/ui.py` — novo componente compartilhado de
  mensagem de sucesso e um estado visual de "carregando" para listas.
- `vetements/components/shell.py` — sidebar responsiva (colapsável
  abaixo de um breakpoint) com botão de menu.
- `vetements/pages/*.py` — botões passam a usar os novos Vars de
  carregamento (`disabled=...`, rótulo/indicador condicional); tabelas
  envolvidas em wrapper com rolagem horizontal.
- Nenhuma alteração no Xano/backend. Nenhuma alteração de paleta,
  tipografia ou dos tokens em `vetements/styles.py`.
