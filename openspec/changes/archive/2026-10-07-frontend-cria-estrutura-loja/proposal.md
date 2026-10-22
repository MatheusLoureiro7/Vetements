## Why

O grupo decidiu iniciar a parte 2 do Vetements: uma loja virtual voltada ao
cliente final. Hoje a gestão ocupa a raiz do site (`/` é o dashboard) e a
documentação coloca a loja online fora do escopo. Antes de construir a
vitrine, é preciso preparar o ambiente: separar as rotas públicas da loja
das rotas internas da gestão e criar a estrutura de código onde a loja vai
crescer, sem misturá-la com as telas internas.

## What Changes

- **BREAKING (rotas):** a gestão sai da raiz e passa para `/gestao`
  (`/gestao`, `/gestao/produtos`, `/gestao/estoque`, `/gestao/vendas`,
  `/gestao/clientes`). Os endereços antigos (`/produtos` etc.) deixam de
  existir.
- A raiz `/` passa a ser a página inicial da loja, pública (sem login), com
  uma vitrine provisória: cabeçalho com a marca, chamada principal, aviso de
  coleção em breve, rodapé e link discreto "Área da equipe" para `/login`.
- O login continua em `/login`; após autenticar, administrador e vendedor
  vão para `/gestao`. As regras de papel dentro da gestão não mudam.
- As rotas passam a ser definidas em um único módulo, usado pelo registro de
  páginas, pela navegação lateral e pelos redirecionamentos.
- Nova estrutura `vetements/loja/` (páginas, componentes, estado) para o
  código da loja, separada das telas da gestão.
- `docs/project-overview.md` e o contexto do OpenSpec passam a incluir a
  loja virtual como parte 2 do projeto.

Fora do escopo (próximas changes): produtos reais na vitrine, página de
produto, carrinho, conta/login de cliente, pagamento e os endpoints
públicos de catálogo no Xano (change `backend-`).

## Capabilities

### New Capabilities
- `storefront`: loja virtual pública — página inicial acessível sem login e
  acesso da equipe à gestão.

### Modified Capabilities
- `auth`: o login leva à gestão em `/gestao`, e a exigência de sessão passa a
  valer apenas para as rotas da gestão (a loja é pública).

## Impact

- Código: `vetements/vetements.py` (registro de rotas), novo
  `vetements/routes.py`, `vetements/components/shell.py` (links da
  navegação), `vetements/state/auth.py` (redirecionamento pós-login), novo
  pacote `vetements/loja/`.
- Documentação: `docs/project-overview.md`, `openspec/config.yaml`.
- Backend (Xano): nenhum impacto nesta change.
