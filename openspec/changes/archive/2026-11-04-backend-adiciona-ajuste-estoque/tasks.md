## 1. Endpoint

- [x] 1.1 Criar `xano/api/catalogo/variacoes_ajustes_POST.xs`
  (`POST variacoes/{variacao_id}/ajustes`, grupo Catalogo,
  `auth = "user"`), com inputs `variacao_id`, `quantidade` (int) e
  `motivo?` (`trim|max:200`).
- [x] 1.2 Stack: checagem de papel administrador → `quantidade != 0`
  → variação existe → novo estoque `>= 0` (mensagem com a quantidade
  disponível) → `db.transaction` com `db.edit variacao_produto` e
  `db.add event_log` (`action = "ajuste_estoque"`, metadata com
  variacao_id, sku, estoque_anterior, estoque_novo, quantidade,
  motivo). Resposta = variação atualizada.
- [x] 1.3 `xano workspace push --dry-run` só com o arquivo novo;
  mostrar o preview ao usuário e aplicar após confirmação. Fazer pull
  de verificação e alinhar o arquivo local se o Xano normalizar algo.
  Feito em 2026-11-04: preview com 1 endpoint CREATE confirmado pelo
  usuário; push com `--force --guids`. Pull de verificação: o Xano só
  reformatou o arquivo e removeu os `description` (lógica idêntica);
  arquivo local mantido como está, por ser mais legível.

## 2. Verificação (com `curl`)

- [x] 2.1 Sem token e com token de cliente da loja → 401; estoque
  inalterado. Sem token e com token inválido: 401 (feito com `curl` em
  2026-11-04). Token de cliente: movido para a change
  `frontend-adiciona-ajuste-estoque` (precisa de uma conta de cliente;
  contas de teste são criadas pelo usuário, por gravarem dados reais).
- [x] 2.2 Com token de administrador numa variação de teste: +N soma;
  -N subtrai; ajuste que zera é aceito; ajuste além do disponível →
  400 com a quantidade disponível na mensagem; `quantidade = 0` → 400;
  variação inexistente → erro. Conferir o estoque via `variacoes` GET
  depois de cada passo e deixar a variação no valor original no fim.
  Feito em 2026-11-04 com script Python (login `admin@vetements.com`,
  variação 1 `CAM-BAS-M-BR`, estoque original 0): +10 → 10; −3 → 7;
  −8 → 400 "Estoque insuficiente: há 7 unidade(s) disponível(is)." e
  estoque segue 7; 0 → 400; variação 999999 → 400 "Variação informada
  não existe."; −7 → 0. Estoque final 0. Obs.: o plano gratuito do Xano
  limita a 10 requisições a cada 20 s, então o script espera ~2 s entre
  chamadas.
- [x] 2.3 Conferir em `event_log` que só os ajustes aceitos geraram
  registro, com usuário e metadata corretos. Feito: 3 ajustes aceitos
  → 3 registros `ajuste_estoque` no `my_events` do admin; metadata do
  primeiro = {variacao_id 1, sku, estoque_anterior 0, estoque_novo 10,
  quantidade 10, motivo "Teste: reposição"}.
- [x] 2.4 Com token de vendedor → acesso negado (403). Requer uma
  conta de vendedor; se não houver, pedir ao usuário (criar contas
  grava dados reais) ou mover este passo para a change de frontend.
  Movido para a change `frontend-adiciona-ajuste-estoque`.
