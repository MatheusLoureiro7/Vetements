## 1. Componentes compartilhados

- [x] 1.1 Adicionar `loading_state(text)` e `success_message(text)` em
  `vetements/components/ui.py`, no mesmo padrão de `empty_state`, e
  verificar com `reflex compile --dry` que compilam sem erro
- [x] 1.2 Envolver o `rx.table.root` dentro de `data_table` (em
  `ui.py`) em um `rx.box(overflow_x="auto")` e verificar visualmente
  (janela estreita) que uma tabela larga existente (ex.: Produtos)
  rola horizontalmente em vez de quebrar o layout

## 2. Sidebar responsiva

- [x] 2.1 Adicionar Var de UI (aberta/fechada) para a sidebar e um
  botão de menu na topbar visível abaixo do breakpoint de 768px, em
  `vetements/components/shell.py`
- [x] 2.2 Colapsar a sidebar por padrão abaixo de 768px e mostrá-la ao
  acionar o botão de menu; verificar reduzindo a largura da janela do
  navegador que a sidebar some/aparece conforme esperado, sem afetar o
  layout em telas largas

## 3. Auth — carregamento no login

- [x] 3.1 Adicionar `is_submitting: bool = False` a `AuthState`, setar
  `True` no início de `login()` e `False` em todo caminho de saída
  (sucesso ou erro), e retornar cedo se já `True`
- [x] 3.2 Em `pages/login.py`, usar `AuthState.is_submitting` para
  desabilitar o botão "Entrar" e indicar carregamento; verificar no
  navegador que o botão desabilita durante o login e volta ao normal
  depois

## 4. Produtos — carregamento, sucesso e distinção de carregamento inicial

- [x] 4.1 Adicionar `is_submitting_product` e `is_submitting_variant`
  (bool, `False`) a `ProductsState`, com a mesma lógica de
  entrar/sair/guarda de duplo envio de 3.1, em `create_product()` e
  `add_variant()`
- [x] 4.2 Adicionar `product_success: str` e `variant_success: str` a
  `ProductsState`, preenchidos após sucesso de `create_product()` e
  `add_variant()` respectivamente, e limpos no início da submissão
  seguinte
- [x] 4.3 Adicionar `is_loading_page: bool = True` a `ProductsState`,
  setado `False` ao final de `load()`
- [x] 4.4 Em `pages/products.py`, usar os Vars de 4.1–4.3: botões
  "Salvar produto" e "Adicionar" desabilitam/indicam carregamento,
  `success_message` aparece após cada sucesso, e a tabela mostra
  `loading_state` durante `is_loading_page` em vez do `empty_state`;
  verificar cada um no navegador (cadastrar produto, cadastrar
  variação, recarregar a página)

## 5. Clientes — carregamento, sucesso e distinção de carregamento inicial

- [x] 5.1 Adicionar `is_submitting: bool = False` e `success: str` a
  `CustomersState`, com a mesma lógica de 4.1/4.2 em
  `create_customer()`
- [x] 5.2 Adicionar `is_loading_page: bool = True` a `CustomersState`,
  setado `False` ao final de `load()`
- [x] 5.3 Em `pages/customers.py`, usar os Vars de 5.1–5.2: botão
  "Salvar cliente" desabilita/indica carregamento, `success_message`
  aparece após sucesso, e a tabela mostra `loading_state` durante
  `is_loading_page`; verificar no navegador (cadastrar cliente,
  recarregar a página)

## 6. Vendas — carregamento e distinção de carregamento inicial

- [x] 6.1 Adicionar `is_submitting: bool = False` a `SalesState`, com
  a mesma lógica de 3.1 em `confirm_sale()`
- [x] 6.2 Adicionar `is_loading_page: bool = True` a `SalesState`,
  setado `False` ao final de `load()`
- [x] 6.3 Em `pages/sales.py`, usar os Vars de 6.1–6.2: botão
  "Confirmar venda" desabilita/indica carregamento, e a listagem de
  "Vendas registradas" mostra `loading_state` durante
  `is_loading_page`; verificar no navegador (confirmar venda,
  recarregar a página)

## 7. Estoque e dashboard — distinção de carregamento inicial

- [x] 7.1 Adicionar `is_loading_page: bool = True` a `InventoryState`,
  setado `False` ao final de `load()`, e usar em `pages/inventory.py`
  para mostrar `loading_state` em vez do `empty_state` durante o
  carregamento; verificar recarregando a página
- [x] 7.2 Adicionar `is_loading_page: bool = True` a `DashboardState`,
  setado `False` ao final de `load()`, e em `pages/dashboard.py`
  mostrar `loading_state` no lugar dos números-resumo/gráficos/vendas
  recentes durante o carregamento (antes de checar `load_error`);
  verificar recarregando a página

## 8. Verificação final

- [x] 8.1 Rodar `pytest` e confirmar que a suíte existente continua
  passando
- [x] 8.2 Rodar `reflex compile --dry` e confirmar compilação sem erro
- [x] 8.3 Subir o app (`reflex run --env prod --single-port`) e, pelo
  navegador, percorrer os 4 pontos de verificação do `proposal.md`:
  botões de carregamento voltando ao normal, carregamento inicial
  distinto de vazio nas 5 telas com listagem, mensagens de sucesso em
  produto/variação/cliente, e colapso da sidebar + rolagem de tabela
  em janela estreita — servidor reiniciado e responde normalmente
  (`curl` a `/login` → 307); verificação visual pelo navegador não foi
  possível nesta sessão (extensão Claude in Chrome não conectou) —
  usuário optou por concluir sem essa etapa e verificar manualmente
  depois
