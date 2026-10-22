## ADDED Requirements

### Requirement: Fotos e publicação do produto na loja
Cada produto SHALL poder ter uma lista de imagens e um indicador de
publicação na loja virtual. Todo produto novo, e todo produto já
existente antes desta mudança, SHALL começar como não publicado e sem
imagens, até que a equipe decida publicá-lo.

#### Scenario: Produto recém-cadastrado
- **WHEN** um administrador cadastra um produto pela gestão
- **THEN** o produto fica como não publicado e não aparece na loja virtual

#### Scenario: Produto publicado
- **WHEN** a equipe marca um produto como publicado
- **THEN** ele passa a aparecer no catálogo público da loja, com suas imagens
