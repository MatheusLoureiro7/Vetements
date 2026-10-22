## Context

- A loja (`vetements/loja/`) tem hoje só `home_page` estática, o
  `store_layout` (cabeçalho/rodapé) e um pacote `state/` vazio. Rotas em
  `vetements/routes.py`; registro das páginas em `vetements/vetements.py`.
- A gestão já fala com o Xano por `vetements/xano_client.py` (cliente
  `httpx` único, retentativas em GET, `XanoAPIError` com `status_code`).
  Todas as funções atuais exigem token.
- API pública já publicada (grupo `loja`, alias `v-znCPQU`), sem token:
  `GET loja/categorias` → `[{id, nome}]`;
  `GET loja/produtos?categoria_id=&q=` → lista de
  `{id, nome, descricao, preco_base, categoria_id, categoria_nome, imagens, variacoes:[{id, tamanho, cor, disponivel}]}`;
  `GET loja/produtos/{produto_id}` → o mesmo objeto, ou 404.
  `imagens` vem `null` quando vazio; quando preenchido, é uma lista de
  objetos de imagem do Xano (com `url` pública e `path`).
- Reflex 0.9.10: sem setters automáticos (handlers `set_*` explícitos) e
  sem `rx.Base` (usar `dataclass`), como no resto do projeto.

## Goals / Non-Goals

**Goals:**
- Vitrine e detalhe funcionando contra o Xano real, com estados claros de
  carregando / vazio / sem resultado / erro / não encontrado.
- Conversão da resposta da API para dados de exibição isolada em funções
  puras, testáveis sem servidor.

**Non-Goals:**
- Paginação, ordenação escolhida pelo visitante, URL com os filtros
  (`?categoria=`), SEO/título dinâmico por produto.
- Reaproveitar estados da gestão: a loja não toca em `AuthState`.

## Decisions

1. **Funções públicas no `xano_client` existente**, sem token:
   `list_public_categories()`, `list_public_products(categoria_id=None, q="")`
   e `get_public_product(produto_id)`, com alias
   `XANO_GROUP_LOJA` (padrão `v-znCPQU`). Reaproveita retentativa e
   tratamento de erro; como `_request` só envia `Authorization` quando há
   token, nenhuma credencial vaza para a API pública.
   *Alternativa*: um cliente separado para a loja — duplicaria a lógica
   de rede, contra a regra de não duplicar.

2. **Filtros aplicados pela API**, não em memória: a mudança de categoria
   e a busca recarregam `loja/produtos` com `categoria_id`/`q`. Mantém a
   regra de "só publicados" e o filtro case-insensitive num único lugar
   (backend) e evita baixar o catálogo inteiro a cada visita no futuro.
   A busca dispara ao enviar (Enter ou botão), não a cada tecla, para não
   gerar uma requisição por caractere; a categoria dispara ao selecionar.

3. **Dois estados da loja, ambos `rx.State`** em `vetements/loja/state/`:
   `CatalogoState` (vitrine: produtos, categorias, filtros, flags
   `carregando`/`erro`) e `ProdutoState` (detalhe: produto, imagem
   selecionada, flags `carregando`/`nao_encontrado`/`erro`). Separados
   para que abrir o detalhe não recarregue a vitrine e vice-versa.

4. **"Coleção em breve" vs. "Nenhuma peça encontrada"**: o estado guarda
   se a última consulta foi feita com algum filtro. Lista vazia sem
   filtro → coleção em breve (sem barra de filtros); lista vazia com
   filtro → nenhuma peça encontrada + "Limpar filtros". Assim não é
   preciso uma consulta extra só para saber se o catálogo está vazio.

5. **Rota de detalhe dinâmica** `/produto/[produto_id]`: constante
   `LOJA_PRODUTO` em `routes.py` e um helper `produto_href(id)` usado
   pelos cards, mantendo `routes.py` como fonte única. O `on_load` lê o
   parâmetro da rota; id não numérico vai direto para "não encontrado"
   sem chamar a API. `XanoAPIError` com `status_code == 404` →
   `nao_encontrado`; qualquer outra → `erro` (com "Tentar novamente").

6. **Dados de exibição como `dataclass`** (`ProdutoVitrine`,
   `VariacaoVitrine`) montados por funções puras que: formatam o preço
   com `format_currency` já existente; extraem as URLs das imagens
   (`url` do objeto; se ausente, `XANO_INSTANCE_URL + path`; `null` →
   lista vazia); e repassam só `tamanho`, `cor` e `disponivel` das
   variações. Campos inesperados (ex.: se algum dia vier `estoque`) são
   ignorados por construção.

7. **Imagem ausente** → marcador neutro (fundo `BORDEAUX_SOFT` com ícone
   `shirt`), o mesmo usado no aviso atual, em proporção fixa 3:4 para o
   grid não pular. No detalhe, a primeira foto é a principal e as demais
   viram miniaturas clicáveis.

8. **Visual**: grid responsivo de cards (1 coluna no celular, 2 no
   tablet, 3–4 no desktop) dentro do `store_layout`, tokens de
   `vetements/styles.py` (Atelier: bordô, Fraunces nos títulos). A
   chamada principal (hero) continua no topo da home, mais compacta.
   Variações no detalhe como "chips" `tamanho · cor`; esgotadas com texto
   riscado/esmaecido e o rótulo "Esgotado".

## Risks / Trade-offs

- [Formato do objeto `image` do Xano não confirmado com dados reais —
  nenhum produto tem foto ainda] → extração tolerante (`url` ou `path`)
  coberta por teste; na verificação, cadastrar uma foto no produto 1 pelo
  painel e conferir a URL renderizada.
- [Chamadas `httpx` síncronas dentro do handler bloqueiam aquele evento
  até ~15 s em falha de rede] → mesmo padrão já aceito na gestão; as
  retentativas são limitadas e o estado `carregando` dá retorno visual.
- [Sem paginação: catálogo grande deixaria a home pesada] → aceitável no
  MVP (poucos produtos); paginação fica para change futura.
- [Variação de tamanho/cor exibida sem ordenação de grade (P, M, G…)] →
  usa a ordem da API (por id), suficiente para o MVP.

## Migration Plan

Só frontend; sem migração de dados. Rollback = reverter o commit (a home
volta ao aviso "Coleção em breve"). A API pública já está no ar.
