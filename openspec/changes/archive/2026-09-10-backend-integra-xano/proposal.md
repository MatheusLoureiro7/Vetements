## Why

O Vetements hoje roda inteiramente sobre dados mockados
(`state/mock_data.py`); nada é persistido de fato e o login não valida
contra um backend real. O Xano já existe como projeto (workspace
`vetements`) com autenticação básica pronta, mas nenhuma tabela do
domínio de moda (produto, categoria, variação, estoque, cliente,
venda) foi criada ainda. Para o ERP ser utilizável de verdade — dados
persistentes, múltiplos usuários, regras de negócio garantidas no
backend — é preciso ligar o frontend Reflex ao Xano real.

## What Changes

- Cria no Xano (via XanoScript em `xano/` + `xano workspace push`,
  sempre precedido de `--dry-run` revisado com o usuário) as tabelas
  `categoria`, `produto`, `variacao_produto` (com campo de estoque),
  `cliente`, `venda` e `item_venda`, seguindo `docs/domain-model.md`,
  com endpoints REST (listar/obter/criar/atualizar conforme a
  capability) e a regra "baixa de estoque nunca deixa a variação
  negativa" garantida no backend.
- **BREAKING**: corrige o enum `role` da tabela `user` existente, de
  `["admin", "member"]` (template padrão do quick-start) para
  `["administrador", "vendedor"]`, e ajusta a hierarquia usada pela
  function `Quick Start/enforce_role`. Se já houver usuários reais
  cadastrados com os valores antigos, eles precisam ser migrados como
  parte do push (dry-run mostra o impacto antes de qualquer alteração
  real).
- Cria um cliente HTTP central no Reflex (`vetements/xano_client.py`)
  responsável por montar requisições à API do Xano, anexar o token de
  autenticação e tratar erros de rede/API de forma uniforme.
- Reescreve `state/auth.py` para autenticar via `auth/login` e
  `auth/me` reais do Xano (token de sessão em vez de credenciais
  mockadas fixas), preservando o comportamento observável por papel já
  existente.
- Reescreve `state/products.py`, `state/inventory.py`,
  `state/sales.py`, `state/customers.py` e `state/dashboard.py` para
  consumir os endpoints reais do Xano em vez de
  `state/mock_data.py`, incluindo exibição de erro quando a API
  rejeitar uma operação (ex. estoque insuficiente, campo obrigatório
  ausente).
- `state/mock_data.py` deixa de ser a fonte de dados das telas; pode
  permanecer no repositório apenas como referência/seed para
  desenvolvimento local, sem uso pelos states de produção.

**Fora do escopo desta change** (fica para changes futuras):
- Loja online, pagamentos, nota fiscal, financeiro, múltiplas lojas
  (conforme `docs/project-overview.md`).
- Cadastro/edição de usuários pela UI (continua fora do escopo até uma
  change dedicada; usuários seguem sendo criados via Xano diretamente
  ou por `auth/signup`).
- Testes de carga ou otimizações de performance da API.

## Capabilities

### New Capabilities

Nenhuma — esta change não introduz uma capability nova; ela troca a
fonte de dados das capabilities já existentes (criadas mockadas em
`add-frontend-mvp-shell`) por integração real com o Xano.

### Modified Capabilities

- `auth`: login/logout/sessão passam a validar contra o Xano real
  (token, papéis `administrador`/`vendedor`), incluindo cenários de
  erro de rede e credencial inválida vindos da API.
- `dashboard`: números agregados passam a vir de consultas reais à
  API em vez de `mock_data.py`.
- `product-catalog`: listagem/cadastro de produto, categoria e
  variação passam a persistir no Xano; validações (ex. categoria
  obrigatória) passam a ser garantidas pelo backend.
- `inventory`: consulta de estoque por variação passa a refletir o
  valor real armazenado no Xano.
- `sales`: registro de venda passa a chamar o Xano, que garante no
  backend que a baixa de estoque nunca deixa uma variação negativa
  (hoje essa regra só existe no mock/estado do Reflex).
- `customers`: cadastro/consulta de cliente passa a persistir no
  Xano.

## Impact

- Código novo: `vetements/xano_client.py`; arquivos XanoScript novos
  em `xano/table/`, `xano/api/` (e possivelmente `xano/addon/`) para
  as tabelas e endpoints de domínio.
- Código alterado: `xano/table/user.xs` (enum `role`),
  `xano/function/quick_start/enforce_role.xs` (hierarquia de papéis),
  todos os `state/*.py` do Reflex (exceto `mock_data.py`, que passa a
  ser apenas referência), possivelmente `pages/*.py` para estados de
  carregamento/erro.
- Dependência nova: biblioteca HTTP para Python (a escolher em
  `design.md`) adicionada a `requirements.txt`.
- Infraestrutura: variável de ambiente com a URL base da API do Xano
  (perfil CLI já autenticado como `vetements`, workspace `166854`,
  instância `x8ki-letl-twmt.n7.xano.io`); nenhuma tabela ou endpoint é
  aplicado ao Xano real sem revisão prévia de um `xano workspace push
  --dry-run`.
- Sem impacto em loja online/pagamentos — permanecem fora do escopo do
  projeto.
