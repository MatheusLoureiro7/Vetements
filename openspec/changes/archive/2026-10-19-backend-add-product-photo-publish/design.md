## Context

Upload pela Metadata API é bloqueado no plano gratuito, mas
`storage.create_image` dentro de um endpoint funciona. Os endpoints de
escrita do grupo Catalogo já checam o papel carregando o usuário de
`$auth.id` e usando `precondition` com `accessdenied`.

## Decisions

- **Um endpoint por ação** (`/imagens` e `/publicacao`) em vez de um
  PATCH genérico do produto: cada um tem uma regra simples e testável, e
  o PATCH genérico (editar nome/preço) não foi pedido.
- **Input `file`** (não `image`): só `file` preenche `.path` no upload
  multipart, exigido por `storage.create_image`.
- **Acrescentar ao fim** da lista (`array.push` sobre as fotos atuais,
  partindo de `[]` quando `imagens` é nulo): a primeira foto enviada é a
  capa na loja. Remoção/reordenação ficam para quando houver tela.
- **POST** para a publicação, por consistência com os demais endpoints
  de escrita do grupo.

## Risks / Trade-offs

- [Duas requisições simultâneas de foto para o mesmo produto podem
  sobrescrever uma à outra (ler-modificar-gravar)] → aceitável: o seed
  envia em sequência e a gestão ainda não tem tela para isso.
- [Arquivo grande ou formato inválido] → `storage.create_image` rejeita
  formatos não suportados; o limite de tamanho é o do Xano.
