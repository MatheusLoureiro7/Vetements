## ADDED Requirements

### Requirement: Fotos do produto
O backend SHALL permitir que um administrador envie uma foto (JPEG, PNG,
GIF ou WEBP) para um produto existente; a foto SHALL ser guardada com
acesso público e adicionada ao fim da lista de fotos do produto,
preservando as anteriores. Apenas administradores MUST poder enviar
fotos.

#### Scenario: Administrador envia foto
- **WHEN** um administrador envia uma imagem para um produto existente
- **THEN** o produto passa a ter a nova foto ao fim da sua lista de fotos, com URL pública

#### Scenario: Vendedor tenta enviar foto
- **WHEN** um vendedor envia uma imagem para um produto
- **THEN** o backend responde acesso negado e o produto não muda

#### Scenario: Produto inexistente
- **WHEN** um administrador envia uma imagem para um id de produto que não existe
- **THEN** o backend responde não encontrado

### Requirement: Publicação do produto na loja
O backend SHALL permitir que um administrador publique ou retire da loja
virtual um produto existente. Apenas administradores MUST poder alterar a
publicação.

#### Scenario: Publicar produto
- **WHEN** um administrador marca um produto como publicado
- **THEN** o produto passa a aparecer no catálogo público da loja

#### Scenario: Retirar produto da loja
- **WHEN** um administrador marca um produto publicado como não publicado
- **THEN** o produto deixa de aparecer no catálogo público e seu detalhe público responde não encontrado

#### Scenario: Vendedor tenta publicar
- **WHEN** um vendedor tenta alterar a publicação de um produto
- **THEN** o backend responde acesso negado e a publicação não muda
