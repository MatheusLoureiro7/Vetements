## Decisions

- **Cookie próprio** (`vetements_cliente`) para o token de cliente,
  separado do `auth_token` da equipe, como `AuthState` faz (sobrevive a
  recarregar e a reinício do servidor). O estado da loja não herda
  `AuthState`.
- **Campos não controlados** nos formulários de conta (valores lidos no
  envio), como na busca do cabeçalho.
- **Destino após o login** via `?proximo=`, aceitando só caminhos
  internos (`/...`, não `//...`) para não virar redirecionamento aberto.
- **Pedido não é repetido automaticamente**: `create_order` é POST, e o
  `xano_client` só repete escritas quando a conexão nem foi aberta. Se a
  conexão cair depois do envio, o carrinho mostra um aviso para conferir
  em "Minha conta" antes de tentar de novo.
- Só `variacao_id` e `quantidade` vão no pedido; preço e estoque são
  decididos no backend.
- Token expirado (401) em `/conta` ou no pedido: limpa a sessão e leva a
  entrar de novo, mantendo o carrinho.
