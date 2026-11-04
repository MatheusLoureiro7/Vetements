## 1. Cliente do Xano

- [x] 1.1 `xano_client.adjust_stock(token, variacao_id, quantidade,
  motivo="")` → `POST variacoes/{variacao_id}/ajustes` (grupo
  Catalogo); só envia `motivo` se não vazio.
- [x] 1.2 Teste em `tests/test_xano_client.py`: método, URL e corpo
  enviados; motivo vazio não é enviado.

## 2. Estado

- [x] 2.1 Função pura `calcular_ajuste(tipo, valor_texto,
  estoque_atual)` com testes em `tests/test_inventory_state.py`:
  entrada, saída, contagem, saída maior que o estoque, contagem igual
  ao atual, texto vazio/não numérico/zero/negativo.
- [x] 2.2 `InventoryState`: vars do popup (variação selecionada, tipo,
  quantidade, motivo, erro de campo, erro geral, `is_submitting_ajuste`,
  aviso de sucesso), setters explícitos, `open_ajuste(id)`,
  `set_show_ajuste`, var computada `estoque_apos_ajuste`.
- [x] 2.3 Handler `salvar_ajuste`: valida com `calcular_ajuste`, chama
  `adjust_stock`, atualiza a linha em `_raw` + `refresh()`, fecha o
  popup e mostra o aviso; em `XanoAPIError` mantém o popup aberto com a
  mensagem.

## 3. Tela

- [x] 3.1 Coluna "Ações" com botão "Ajustar" só para administradores.
- [x] 3.2 Popup no padrão de Produtos/Vendas: produto/SKU/estoque
  atual, `segmented_control` de tipo, campo de quantidade com erro,
  motivo opcional, prévia do estoque após o ajuste, botão "Salvar
  ajuste"/"Salvando...".
- [x] 3.3 Aviso de sucesso acima da tabela.

## 4. Verificação

- [x] 4.1 `pytest` completo passa e `reflex compile` sem erros.
- [x] 4.2 No navegador, como administrador (`admin@vetements.com`):
  entrada, saída, contagem e saída maior que o estoque (erro no popup,
  nada enviado); linha atualiza e aviso aparece; devolver a variação
  usada ao valor original no fim. Feito em 2026-11-04 (`reflex run
  --env prod --single-port --backend-port 8010`, variação
  `CAM-BAS-G-PT`, estoque 2): coluna "Ações" visível ao admin; Saída 8
  → "Saída maior que o estoque: há 2 unidade(s)." sem envio; Entrada 10
  → prévia 12, popup fecha, linha 12 e aviso "Ajuste registrado:
  CAM-BAS-G-PT agora tem 12 unidade(s)."; Saída 3 → 9; Contagem 9 →
  "igual ao estoque atual"; Contagem 2 → prévia 2, linha 2. Recusa do
  backend: com o popup aberto, estoque zerado por fora e Saída 2 → popup
  segue aberto com "Estoque insuficiente: há 0 unidade(s)
  disponível(is).", campo preenchido e botão habilitado. Estoque final
  2 (conferido após recarregar). Obs.: os cliques/digitação simulados
  pela extensão do Chrome não chegavam à página nesta sessão; o teste
  foi feito disparando os mesmos eventos por JavaScript na página.
- [x] 4.3 Movida da change de backend: com conta de vendedor, a tela
  não mostra "Ajustar" e `POST variacoes/{id}/ajustes` com token de
  vendedor → 403. Requer conta de vendedor criada pelo usuário.
  Feito em 2026-11-04, com autorização do usuário: conta de vendedor
  `vendedor@vetements.com` / `vendedor123` (Bruno Lima) criada pelo
  `auth/signup` com token de admin. API: 403 "Apenas administradores
  podem ajustar o estoque." e estoque inalterado (2). Tela: logado como
  vendedor, Estoque sem coluna "Ações" e sem nenhum botão "Ajustar".
- [x] 4.4 Movida da change de backend: token de cliente da loja no
  endpoint de ajuste → 401. Requer conta de cliente criada pelo
  usuário. Bloqueada e movida para a change de correção do cadastro de
  cliente: ao tentar criar a conta de cliente de teste, o
  `loja/conta/cadastro` recusou toda senha (ex.: `abcd1234`,
  `Cliente123`) com "A senha deve ter ao menos 8 caracteres, com letras
  e números." — bug do backend (provável efeito do `regex_matches` em
  `cadastro_POST.xs`), fora do escopo desta change.
