## Context

Um único app Reflex (`vetements/vetements.py`) registra 6 páginas com rotas
literais espalhadas por `vetements.py`, `components/shell.py` (navegação) e
`state/auth.py` (redirecionamentos). A proteção de rota é feita por página,
via `on_load=<State>.load` → `AuthState.require_auth()`.

## Goals / Non-Goals

**Goals:**
- Loja e gestão no mesmo app Reflex, com fronteira clara de rotas e de
  pastas, para a loja crescer sem tocar nas telas internas.
- Uma fonte única para os caminhos de rota.

**Non-Goals:**
- Mover o código da gestão para um pacote `gestao/` (refatoração grande sem
  ganho funcional agora).
- Login/conta de cliente e qualquer chamada ao Xano pela loja.
- Redirecionar as rotas antigas (`/produtos` etc.): o sistema ainda não está
  em produção, não há links salvos a preservar.

## Decisions

- **Mesmo app Reflex, prefixo `/gestao`.** Mantém um único deploy, um único
  backend e o mesmo sistema visual. Alternativa descartada: um segundo app
  Reflex só para a loja — duplicaria configuração, estilos e cliente do Xano.
- **`vetements/routes.py` com constantes** (`LOJA_HOME`, `LOGIN`,
  `GESTAO_DASHBOARD`, `GESTAO_PRODUTOS`, …) usadas em `add_page`, nos links
  da sidebar e nos `rx.redirect`. Evita que uma rota mude em um lugar e
  quebre em outro.
- **Pacote `vetements/loja/`** com `pages/`, `components/` e `state/`,
  espelhando a organização da gestão. A página inicial não usa o `shell` da
  gestão (sidebar); tem um layout próprio (`loja/components/layout.py`:
  cabeçalho + rodapé) que as próximas páginas da loja reaproveitam.
- **Proteção continua por página.** As páginas da gestão seguem com
  `on_load` chamando `require_auth`; as da loja simplesmente não chamam.
  Alternativa descartada: um guard global por prefixo — mudaria o mecanismo
  já testado sem necessidade.
- **Visual da loja** reaproveita os tokens de `vetements/styles.py` (bordô,
  Fraunces/IBM Plex), mas com fundo claro e mais respiro, adequado a uma
  vitrine; nenhum token novo da gestão é alterado.

## Risks / Trade-offs

- [Alguém da equipe acessa um endereço antigo e cai em 404] → a sidebar e o
  login já levam aos novos endereços; avisar o grupo na entrega.
- [A loja pública e a gestão compartilham o mesmo processo] → a autorização
  real continua no Xano; a loja não chama nenhum endpoint autenticado.
