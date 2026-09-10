## Context

Ver `proposal.md` para a motivação. Contexto técnico relevante para o
"como":

- O Xano do projeto (workspace `vetements`, id `166854`, instância
  `x8ki-letl-twmt.n7.xano.io`) já está sincronizado com este
  repositório via XanoScript (`xano/`) e o perfil `vetements` do
  `@xano/cli` já está autenticado localmente. Alterações são feitas
  editando os `.xs` e aplicadas com `xano workspace push`.
- Hoje só existe a tabela `user` (auth) e os endpoints de
  autenticação/reset do template quick-start. O enum `role` da
  tabela `user` está como `["admin", "member"]`, divergente do
  domínio (`administrador`/`vendedor`).
- O Reflex (`vetements/`) tem um `state/*.py` por capability, todos
  lendo/escrevendo em `state/mock_data.py`. Essa camada foi desenhada
  na change `add-frontend-mvp-shell` justamente para que a troca por
  chamadas HTTP fosse localizada.

## Goals / Non-Goals

**Goals:**
- Definir o schema Xano (tabelas + endpoints) para todo o domínio
  ainda não modelado (categoria, produto, variação, cliente, venda,
  item de venda).
- Garantir, no backend, que a baixa de estoque de uma venda nunca
  deixe uma variação negativa, mesmo com vendas concorrentes — hoje
  essa regra só existe no `state` do Reflex.
- Definir a forma de autenticação real (token) e como o Reflex
  guarda/usa esse token.
- Definir o cliente HTTP do Reflex e o padrão de tratamento de erro
  usado por todos os `state/*.py`.
- Definir a sequência segura de aplicação no Xano real (dry-run
  sempre antes do push, atenção especial à mudança do enum `role`).

**Non-Goals:**
- Cadastro de usuário pela UI do Reflex (login/signup continuam via
  `auth/login` já existente; criação de novos usuários administradores
  fica fora desta change).
- Qualquer forma de sincronização offline ou cache otimista — cada
  ação faz uma chamada síncrona ao Xano e espera a resposta.
- Testes automatizados contra o Xano real — verificação é manual,
  como já é prática no projeto (`AGENTS.md` — Testes).

## Decisions

### 1. Uma tabela por entidade do domínio, nomes em português
`categoria`, `produto`, `variacao_produto`, `cliente`, `venda`,
`item_venda` — nomes e campos seguindo `docs/domain-model.md`
diretamente (ex.: `variacao_produto.estoque`, `item_venda.preco_unitario`
copiado no momento da venda). Alternativa considerada: nomes em
inglês para consistência com o template quick-start (`user`) — 
rejeitada porque o restante do domínio e a documentação do projeto já
são em português; `user` fica como está por já existir e ser do
template de auth.

### 2. Criação de venda é um único endpoint que recebe todos os itens
`POST /venda` recebe `cliente_id` (opcional) e uma lista de itens
(`variacao_id`, `quantidade`). O backend processa a lista inteira
dentro de uma única execução de function stack (que o Xano já trata
como uma transação: se qualquer passo falhar, nada é persistido).
Para cada item, o backend faz a baixa de estoque de forma
condicional (equivalente a `UPDATE variacao_produto SET estoque =
estoque - :quantidade WHERE id = :variacao_id AND estoque >=
:quantidade`) e verifica se a atualização afetou um registro; se não
afetou (estoque insuficiente), a function lança erro, o que aborta a
transação inteira — nenhuma venda parcial ou baixa parcial é
persistida.
Alternativa considerada: o Reflex chamar um endpoint de "baixar
estoque" por item, em sequência — rejeitada porque não garante
atomicidade entre itens (uma falha no meio deixaria itens já
baixados) e abre uma janela de corrida entre a leitura do estoque
pelo Reflex e a baixa real.

### 3. Autenticação: token do Xano guardado em cookie do navegador
`state/auth.py` guarda o `authToken` retornado por `auth/login` em um
`rx.Cookie` (em vez de variável de estado comum), para que a sessão
sobreviva tanto a um reload da página quanto a um reinício do
processo do Reflex (spec `auth`: Sessão sobrevive a reinício do
servidor). Toda chamada ao Xano feita pelo cliente HTTP anexa esse
token no header `Authorization`. Logout limpa o cookie.
Alternativa considerada: manter o token só em memória no `State`
(como o mock atual) — rejeitada porque não sobrevive a reinício do
servidor, regressão em relação ao requisito atualizado.

### 4. Cliente HTTP central (`vetements/xano_client.py`)
Um módulo único com uma função/classe por recurso (`login`, `me`,
`list_produtos`, `create_produto`, `create_venda`, etc.), usando
`httpx` (suporta chamadas síncronas e assíncronas, e os event
handlers do Reflex costumam ser `async`). Erros de rede e respostas
de erro do Xano (4xx/5xx) são convertidos numa exceção própria
`XanoAPIError(message, status_code)`, capturada em cada
`state/*.py` para popular uma var `error` exibida na tela
correspondente. Alternativa considerada: `requests` — descartada por
não ter suporte assíncrono nativo.

### 5. Correção do enum `role` é feita com verificação prévia de dados
Antes de alterar `xano/table/user.xs`, rodar `xano workspace pull
--records` (ou consulta equivalente) para checar se existem usuários
reais além dos de seed/exemplo. Se houver algum com `role` = `admin`
ou `member`, a mesma tarefa que aplica a mudança de enum inclui
atualizar esses registros para `administrador`/`vendedor` antes do
push do novo schema, para não deixar nenhum usuário com um valor de
papel que não exista mais no enum.

### 6. `mock_data.py` deixa de ser fonte de dados, mas continua no repo
Os `state/*.py` passam a chamar `xano_client.py` em vez de
`mock_data.py`. O arquivo `mock_data.py` e seus testes unitários
existentes (regra de estoque nunca negativo, cálculo de total)
permanecem no repositório como referência/fixture de teste da lógica
de domínio pura, mas nenhum `state` de produção depende dele depois
desta change.

## Risks / Trade-offs

- [Renomear o enum `role` pode deixar usuários reais com um valor
  inválido] → Mitigado pela decisão 5: checar registros existentes e
  migrá-los como parte da mesma tarefa, antes do push.
- [Duas vendas da mesma variação confirmadas no mesmo instante podem
  ambas passar da checagem de estoque antes de qualquer uma escrever
  — "lost update"] → **Confirmado experimentalmente** (não é só
  hipótese): um teste de concorrência real contra o Xano mostrou as
  duas vendas sendo aceitas quando deveria haver apenas uma.
  `db.transaction` garante atomicidade da venda (tudo ou nada), mas
  não isolamento entre vendas concorrentes na mesma variação. As duas
  formas de fechar essa janela por completo — `db.direct_query` (SQL
  puro, UPDATE condicional atômico) e `redis.*` (contador atômico) —
  **não estão disponíveis no plano atual do Xano** (erro "Not
  supported. Please upgrade your Xano instance." em ambas). Decisão
  (confirmada com o usuário): aceitar esse risco residual nesta
  change — `db.get` (lê estoque) + `precondition` + `db.edit`
  (grava), dentro de `db.transaction`, sem trava adicional — dado o
  volume de uso esperado (poucos vendedores simultâneos numa loja).
  Caminhos para fechar a janela por completo no futuro, se necessário:
  (a) fazer upgrade do plano do Xano e trocar por `db.direct_query`;
  ou (b) implementar um lock manual via tabela com índice único
  (`db.add` falha atomicamente se a variação já estiver travada) —
  mais código e com seu próprio risco (lock não liberado em um
  caminho de erro trava a variação até intervenção manual), por isso
  não escolhido nesta change.
- [Uma change grande, tocando Xano e Reflex ao mesmo tempo, aumenta a
  superfície de regressão] → Mitigado organizando `tasks.md` em
  blocos pequenos e verificáveis por capability (auth primeiro, cada
  capability só avança depois da anterior verificada manualmente).
- [Push real ao Xano é uma operação com efeito em um ambiente vivo] →
  Mitigado seguindo sempre `--dry-run` revisado com o usuário antes de
  qualquer push real, e nunca usando `--force`/`--truncate`/`--delete`
  sem confirmação explícita no momento.

## Migration Plan

1. `xano workspace pull --records` para ter um snapshot atual do
   workspace antes de qualquer alteração (backup, comparação).
2. Push das tabelas novas (`categoria`, `produto`, `variacao_produto`,
   `cliente`, `venda`, `item_venda`) e seus endpoints — não afeta
   dados existentes, então é o passo de menor risco.
3. Push da correção do enum `role` e da function `enforce_role`,
   incluindo migração dos registros existentes de `user` (decisão 5).
4. Verificar manualmente `auth/login` + `auth/me` reais com um
   usuário administrador e um vendedor antes de tocar no Reflex.
5. Trocar o Reflex capability por capability (auth → categoria/produto
   → estoque → clientes → vendas → dashboard), cada uma verificada
   manualmente antes de seguir para a próxima.

Rollback: como o schema é definido como código em `xano/`, reverter é
reverter o commit correspondente nesses arquivos e rodar `xano
workspace push` de novo (sempre com `--dry-run` primeiro). Tabelas
novas sem dados reais podem ser removidas com segurança; a mudança de
enum `role` só é revertida depois de confirmar que nenhum usuário
recebeu o novo valor que precisaria ser migrado de volta.
