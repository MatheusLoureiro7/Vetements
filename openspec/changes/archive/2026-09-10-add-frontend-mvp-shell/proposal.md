## Why

O Vetements ainda não tem nenhuma tela. O Xano já expõe autenticação
(`login_POST`, papéis via `enforce_role`), mas não existem tabelas de
produto, estoque, venda ou cliente. Para validar a experiência do
ERP (fluxos, papéis, regras de domínio) sem esperar o backend
completo, construímos primeiro toda a camada de frontend em Reflex,
com dados mockados no formato do `docs/domain-model.md`, prontos para
serem trocados por chamadas reais ao Xano em changes futuras
incrementais.

## What Changes

- Cria o app Reflex (`rxconfig.py` + pacote `vetements/`) com as
  seguintes telas: Login, Shell/Dashboard, Produtos & Categorias,
  Estoque, Vendas e Clientes.
- Define um sistema visual próprio ("Atelier"): paleta marfim/tinta
  com accent bordô único, tipografia Fraunces (títulos) + IBM Plex
  Sans (dados/UI), layout de sidebar fixa e tabelas com hairline em
  vez de cards com sombra.
- Implementa `AuthState` com login **mockado** (credenciais-semente
  fixas) e papéis (administrador, vendedor); as demais telas herdam
  dessa sessão para decidir o que é visível/editável por papel.
- Implementa uma camada de dados mockados (`state/mock_data.py`) no
  mesmo formato do domínio (Produto → Variação, Venda → ItemVenda,
  Cliente), isolada por trás de cada State para que a troca futura
  por chamadas HTTP ao Xano seja uma mudança pequena e localizada.
- Aplica, mesmo com dados mockados, as regras estruturais do domínio
  que são observáveis na UI: uma venda não pode reduzir o estoque de
  uma variação abaixo de zero; o valor total da venda é derivado da
  soma dos itens.
- Restringe por papel, na interface: apenas administrador vê
  cadastro/edição de produtos e categorias; vendedor consulta
  produtos/estoque e registra vendas/clientes.

**Fora do escopo desta change** (fica para changes futuras):
- Qualquer chamada real ao Xano (login incluso) — tudo mockado nesta
  leva.
- Tabelas novas no Xano (produto, categoria, variação, estoque,
  venda, item de venda, cliente).
- Loja online / vitrine para o cliente final (permanece fora do
  escopo do projeto, conforme `docs/project-overview.md`).

## Capabilities

### New Capabilities

- `auth`: sessão mockada (login/logout) e controle de acesso por
  papel (administrador/vendedor) que as demais telas consultam.
- `dashboard`: tela inicial com visão geral (contagens e números
  resumidos) após o login.
- `product-catalog`: listagem e cadastro de produtos, categorias e
  variações (tamanho/cor) — cadastro restrito a administrador.
- `inventory`: visualização da quantidade em estoque por variação de
  produto, com indicação de estoque baixo.
- `sales`: registro de venda com um ou mais itens, cliente opcional,
  baixa simulada de estoque e bloqueio de itens além do estoque
  disponível.
- `customers`: cadastro e consulta de clientes.

### Modified Capabilities

Nenhuma — não há specs existentes no projeto ainda.

## Impact

- Código novo: pacote Reflex completo (`rxconfig.py`,
  `vetements/vetements.py`, `state/`, `components/`, `pages/`,
  `assets/`). Nenhum código existente é alterado (não há app hoje).
- Sem impacto no Xano: nenhuma tabela ou endpoint é criado/alterado
  nesta change.
- Sem dependências novas além do Reflex já instalado
  (`.venv`, `reflex.lock`).
