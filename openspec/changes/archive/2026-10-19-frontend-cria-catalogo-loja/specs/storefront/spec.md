## MODIFIED Requirements

### Requirement: Página inicial pública da loja
O sistema SHALL exibir, na raiz do site (`/`), a página inicial da loja
virtual para qualquer visitante, sem exigir login, com a marca Vetements,
uma chamada principal, a vitrine de produtos e um rodapé. A vitrine SHALL
listar os produtos publicados obtidos do catálogo público, cada um com
foto (ou um marcador neutro quando não houver foto), nome, categoria e
preço em reais, e cada produto SHALL levar à sua página de detalhe. Quando
o catálogo não tiver nenhum produto publicado, a página SHALL informar que
a coleção estará disponível em breve, sem exibir uma listagem vazia.

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

## ADDED Requirements

### Requirement: Filtros da vitrine
A vitrine SHALL permitir filtrar os produtos por categoria (entre as
categorias do catálogo público, com uma opção "Todas") e buscar por parte
do nome, combinando os dois filtros. Quando os filtros não retornarem
nenhum produto, a vitrine SHALL exibir a mensagem "Nenhuma peça
encontrada" com uma ação para limpar os filtros, em vez do aviso de
coleção em breve.

#### Scenario: Filtrar por categoria
- **WHEN** o visitante escolhe uma categoria na vitrine
- **THEN** só os produtos publicados daquela categoria são exibidos

#### Scenario: Buscar por nome
- **WHEN** o visitante busca por parte do nome de um produto publicado, em qualquer combinação de maiúsculas e minúsculas
- **THEN** o produto aparece na vitrine e os que não correspondem ao termo não aparecem

#### Scenario: Filtros sem resultado
- **WHEN** a combinação de categoria e busca não corresponde a nenhum produto publicado
- **THEN** a vitrine mostra "Nenhuma peça encontrada" e uma ação que, ao ser usada, limpa os filtros e volta a exibir todos os produtos publicados

### Requirement: Página de detalhe do produto
O sistema SHALL oferecer, sem exigir login, uma página de detalhe para
cada produto publicado, com fotos (ou o marcador neutro), nome, categoria,
preço em reais, descrição (quando houver) e a lista de variações com
tamanho e cor. Variações sem estoque disponível SHALL aparecer marcadas
como esgotadas. A página MUST NOT exibir quantidade em estoque nem SKU, e
SHALL oferecer um link de volta para a vitrine.

#### Scenario: Visitante abre um produto publicado
- **WHEN** um visitante acessa a página de detalhe de um produto publicado
- **THEN** vê nome, categoria, preço, descrição e as variações com tamanho e cor

#### Scenario: Variação esgotada
- **WHEN** o produto tem uma variação sem estoque disponível
- **THEN** essa variação aparece marcada como esgotada, e as demais aparecem como disponíveis

#### Scenario: Produto inexistente ou não publicado
- **WHEN** um visitante acessa a página de detalhe com o id de um produto inexistente ou não publicado
- **THEN** vê a mensagem "Produto não encontrado" e um link de volta para a vitrine, sem dados de produto

### Requirement: Falha ao carregar o catálogo
Quando a loja não conseguir obter dados do catálogo público (falha de
comunicação ou erro do servidor diferente de "não encontrado"), a página
SHALL exibir uma mensagem de erro com a opção de tentar novamente, sem
quebrar o layout e sem confundir a falha com ausência de produtos.

#### Scenario: Servidor indisponível
- **WHEN** a vitrine ou a página de detalhe é aberta e o catálogo público não responde
- **THEN** o visitante vê uma mensagem de erro e um botão "Tentar novamente", e não o aviso de coleção em breve nem "Produto não encontrado"

#### Scenario: Tentar novamente
- **WHEN** o visitante usa "Tentar novamente" após o catálogo voltar a responder
- **THEN** a página carrega os dados normalmente
