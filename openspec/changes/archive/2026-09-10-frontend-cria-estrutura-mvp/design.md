## Context

Não existe app Reflex no repositório ainda — apenas skills de suporte
(`reflex-docs`, `reflex-process-management`, `setup-python-env`) e o
workspace Xano com a tabela `user` e endpoints de autenticação
(`login_POST`, `signup_POST`, reset por magic link, `enforce_role`).
Não há tabelas de produto, categoria, variação, estoque, venda ou
cliente no Xano. Ver `proposal.md` para o motivo de construir a
camada de frontend antes dessas tabelas existirem.

## Goals / Non-Goals

**Goals:**
- Entregar as seis telas do MVP (Login, Dashboard, Produtos &
  Categorias, Estoque, Vendas, Clientes) navegáveis, com dados
  mockados e comportamento fiel às specs desta change.
- Isolar os dados mockados atrás de uma interface por módulo, para
  que trocar por chamadas ao Xano seja uma mudança pequena e
  localizada, sem tocar em componentes visuais.
- Estabelecer o sistema visual "Atelier" (paleta, tipografia, tokens
  de layout) como base reutilizável para as próximas telas do
  projeto.

**Non-Goals:**
- Persistência real de dados (tudo em `rx.State`, perdido ao
  recarregar a página — ver requisito "Sessão sem persistência" em
  `auth`).
- Qualquer chamada de rede ao Xano nesta change, autenticação
  inclusa.
- Responsividade mobile completa (o ERP é usado em desktop/tablet na
  loja; o layout deve ao menos não quebrar em telas menores, mas não
  é otimizado para celular nesta change).

## Decisions

### Estrutura do app Reflex
Um único pacote `vetements/` na raiz (`rxconfig.py` + `vetements/`),
seguindo a convenção padrão do Reflex, com subpastas `state/`,
`components/` e `pages/` por responsabilidade:

```
rxconfig.py
vetements/
  vetements.py        # cria o app e registra as rotas (add_page)
  styles.py            # tokens de cor/tipografia e estilos compartilhados
  state/
    auth.py             # AuthState: sessão, papel, login()/logout()
    mock_data.py        # dados-semente + funções de acesso (get/list/create)
    products.py, inventory.py, sales.py, customers.py
  components/
    shell.py            # sidebar + topbar (layout das páginas autenticadas)
    ui.py                # tabela hairline, indicador de estoque baixo, bloco de estatística
  pages/
    login.py, dashboard.py, products.py, inventory.py, sales.py, customers.py
assets/
```
Alternativa considerada: dividir em múltiplos apps Reflex por módulo.
Rejeitada — over-engineering para 6 telas; um único app com State
modular já isola bem as responsabilidades.

### Sessão e controle de acesso por papel
`AuthState(rx.State)` guarda `is_authenticated`, `role`
(`"administrador" | "vendedor"`), `current_user`. Os demais States
(`ProductsState`, `InventoryState`, etc.) herdam de `AuthState` para
ler o papel via `computed var` (ex.: `can_edit_products`), e cada
página usa isso para condicionar botões/rotas com `rx.cond`. A
verificação de rota autenticada acontece em `on_load` de cada página
protegida, redirecionando para `/login` se `is_authenticated` for
falso.

Alternativa considerada: um único State monolítico para o app
inteiro. Rejeitada — mistura responsabilidades de telas não
relacionadas, contrariando a orientação do projeto de evitar
duplicação/acoplamento desnecessário entre módulos.

Nota de arquitetura (ver `AGENTS.md`): esse controle de papel no
Reflex é apenas de **interface**. Quando a integração real com o
Xano existir, a autorização de fato deve ser reforçada no backend —
esta change não deve ser tratada como mecanismo de segurança.

### Dados mockados no formato do domínio
`state/mock_data.py` define os dados-semente como `dataclasses`
espelhando exatamente as entidades de `docs/domain-model.md`
(Produto, VariaçãoProduto, Categoria, Venda, ItemVenda, Cliente,
Usuário) e expõe funções simples de leitura/escrita em memória (ex.:
`list_products()`, `create_product(...)`, `decrement_stock(...)`).
Cada State de tela chama exclusivamente essas funções — nunca acessa
os dados-semente diretamente. Isso cria um ponto único de
substituição: uma change futura troca o conteúdo de `mock_data.py`
(ou o substitui por um módulo `xano_client.py` com a mesma
assinatura de funções) sem alterar States ou componentes.

Alternativa considerada: gerar dados mockados via biblioteca externa
(ex. Faker) para parecer mais realista. Rejeitada — adiciona
dependência sem necessidade; poucos registros escritos à mão já
bastam para validar os fluxos.

### Sistema visual "Atelier"
Tokens centralizados em `styles.py`:
- Cor: `#F7F5F0` fundo, `#1A1815` tinta, `#6B665D` texto secundário,
  `#DDD8CC` hairline, `#6E1423` accent (bordô), `#F1E4E1` fundo de
  alerta.
- Tipografia: **Fraunces** (títulos/wordmark) e **IBM Plex Sans**
  (dados/formulários/UI, com `font-variant-numeric: tabular-nums`
  para colunas de preço/quantidade). Fontes carregadas via Google
  Fonts em `assets/` ou `stylesheets` do Reflex.
- Componentes de UI compartilhados (`components/ui.py`): tabela com
  hairline entre linhas (sem sombra/card), tick lateral bordô para
  indicar estoque baixo, bloco de estatística "número grande + rótulo
  pequeno" separado por hairline vertical (usado no dashboard).

### Limite de estoque baixo
Fixado como constante (`LOW_STOCK_THRESHOLD = 5`) em
`state/inventory.py` nesta change, em vez de configurável por
produto/categoria — o domain-model não define essa regra e configurar
por variação é complexidade sem requisito claro ainda. Pode virar
requisito configurável em change futura, se necessário.

## Risks / Trade-offs

- **[Risco] Dados mockados criam expectativa de persistência que não
  existe** → Mitigado pela requirement explícita "Sessão sem
  persistência nesta fase" em `auth`, e por um aviso discreto na UI
  (ex. nota no rodapé do login) sobre a natureza mockada dos dados.
- **[Risco] Retrabalho ao integrar com o Xano de verdade** → Mitigado
  pela camada `mock_data.py` com assinatura estável, pensada para ser
  trocada por um cliente HTTP sem alterar States/páginas.
- **[Trade-off] Seis telas em uma única change é uma unidade grande**
  → Aceito porque todas compartilham o mesmo shell, autenticação e
  sistema visual; dividir agora geraria changes interdependentes sem
  benefício real de revisão incremental. Tasks.md quebra o trabalho em
  passos pequenos e verificáveis dentro da change.

## Migration Plan

Não há dado real a migrar (não existe app hoje). Rollback, se
necessário, é remover o pacote `vetements/` e o `rxconfig.py` — não
há efeitos colaterais em outros sistemas, pois esta change não toca
no Xano.

## Open Questions

Nenhuma — decisões de escopo e visual já foram fechadas com o usuário
antes da criação desta change.
