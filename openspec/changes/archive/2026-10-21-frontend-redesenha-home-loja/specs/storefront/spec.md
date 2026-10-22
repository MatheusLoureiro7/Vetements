## MODIFIED Requirements

### Requirement: Página inicial pública da loja
O sistema SHALL exibir, na raiz do site (`/`), a página inicial da loja
virtual para qualquer visitante, sem exigir login, seguindo o layout da
home de referência: barra de anúncio, cabeçalho com a marca Vetements,
banner principal com chamada para a vitrine, a vitrine de produtos em
carrossel, um segundo banner, bloco de newsletter, blocos de imagem com
texto e um rodapé. A vitrine SHALL listar os produtos publicados obtidos
do catálogo público, cada um com foto (ou um marcador neutro quando não
houver foto), nome, categoria e preço em reais, e cada produto SHALL levar
à sua página de detalhe. Quando o catálogo não tiver nenhum produto
publicado, a página SHALL informar que a coleção estará disponível em
breve, sem exibir uma listagem vazia.

#### Scenario: Visitante acessa o site
- **WHEN** um visitante sem sessão acessa `/`
- **THEN** vê a página inicial da loja, sem ser redirecionado para o login

#### Scenario: Vitrine com produtos publicados
- **WHEN** existe ao menos um produto publicado e um visitante acessa `/`
- **THEN** vê cada produto publicado com nome, categoria e preço formatado em reais (ex.: "R$ 49,90")

#### Scenario: Produto sem foto
- **WHEN** um produto publicado não tem nenhuma imagem cadastrada
- **THEN** o card do produto mostra um marcador visual no lugar da foto, sem imagem quebrada

#### Scenario: Abrir um produto
- **WHEN** o visitante clica em um produto da vitrine
- **THEN** é levado à página de detalhe daquele produto

#### Scenario: Catálogo ainda indisponível
- **WHEN** nenhum produto está publicado e um visitante acessa `/`
- **THEN** vê o aviso de que a coleção estará disponível em breve, sem filtros nem listagem vazia

#### Scenario: Chamada do banner
- **WHEN** o visitante usa o botão do banner principal
- **THEN** a página leva até a vitrine de produtos

### Requirement: Filtros da vitrine
A vitrine SHALL permitir filtrar os produtos por categoria, por abas com
as categorias do catálogo público e uma aba "Tudo", e buscar por parte do
nome pelo campo de busca do cabeçalho da loja, combinando os dois filtros.
Uma busca feita fora da página inicial SHALL levar à página inicial já
filtrada pelo termo. Quando os filtros não retornarem nenhum produto, a
vitrine SHALL exibir a mensagem "Nenhuma peça encontrada" com uma ação
para limpar os filtros, em vez do aviso de coleção em breve.

#### Scenario: Filtrar por categoria
- **WHEN** o visitante escolhe a aba de uma categoria na vitrine
- **THEN** só os produtos publicados daquela categoria são exibidos

#### Scenario: Buscar por nome
- **WHEN** o visitante busca, pelo cabeçalho, por parte do nome de um produto publicado, em qualquer combinação de maiúsculas e minúsculas
- **THEN** o produto aparece na vitrine e os que não correspondem ao termo não aparecem

#### Scenario: Buscar a partir de outra página da loja
- **WHEN** o visitante está na página de detalhe de um produto e faz uma busca pelo cabeçalho
- **THEN** é levado à página inicial com a vitrine filtrada pelo termo

#### Scenario: Filtros sem resultado
- **WHEN** a combinação de categoria e busca não corresponde a nenhum produto publicado
- **THEN** a vitrine mostra "Nenhuma peça encontrada" e uma ação que, ao ser usada, limpa os filtros e volta a exibir todos os produtos publicados
