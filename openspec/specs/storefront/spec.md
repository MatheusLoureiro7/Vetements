# storefront Specification

## Purpose
Loja virtual do Vetements voltada ao cliente final, acessível sem login e
separada da área de gestão usada pela equipe da loja.

## Requirements

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

### Requirement: Acesso da equipe a partir da loja
A página inicial da loja SHALL oferecer um link "Área da equipe" que leva à
tela de login da gestão. A loja MUST NOT exibir dados ou atalhos internos da
gestão.

#### Scenario: Funcionário entra pela loja
- **WHEN** um funcionário clica em "Área da equipe" na loja
- **THEN** é levado à tela de login (`/login`)

### Requirement: Catálogo público de produtos
O backend SHALL oferecer, sem exigir login, a listagem dos produtos
marcados como publicados, cada um com id, nome, descrição, preço base,
categoria (id e nome), imagens (com URL pública) e suas variações
(tamanho, cor e se há estoque disponível). A listagem SHALL aceitar filtro
opcional por categoria e por parte do nome (sem diferenciar maiúsculas) e
MUST NOT incluir produtos não publicados.

#### Scenario: Visitante lista produtos
- **WHEN** uma requisição sem token pede a listagem pública de produtos
- **THEN** o backend responde com sucesso apenas os produtos publicados

#### Scenario: Produto não publicado fica de fora
- **WHEN** existe um produto cadastrado com publicado = não
- **THEN** ele não aparece na listagem pública, mesmo com filtro pelo seu nome ou categoria

#### Scenario: Filtro por categoria
- **WHEN** a listagem pública é pedida com o id de uma categoria
- **THEN** só os produtos publicados daquela categoria são retornados

#### Scenario: Variação sem estoque
- **WHEN** um produto publicado tem uma variação com estoque 0
- **THEN** a variação aparece na resposta indicada como indisponível

### Requirement: Detalhe público de produto
O backend SHALL oferecer, sem exigir login, os dados de um único produto
publicado pelo seu id, no mesmo formato da listagem pública. Para um id
inexistente ou de produto não publicado, o backend SHALL responder como
não encontrado.

#### Scenario: Produto publicado
- **WHEN** uma requisição sem token pede o detalhe de um produto publicado
- **THEN** o backend responde com os dados do produto e suas variações

#### Scenario: Produto não publicado
- **WHEN** uma requisição sem token pede o detalhe de um produto não publicado
- **THEN** o backend responde com erro de não encontrado, sem revelar dados do produto

### Requirement: Categorias públicas
O backend SHALL oferecer, sem exigir login, a lista de categorias (id e
nome) ordenada por nome.

#### Scenario: Visitante lista categorias
- **WHEN** uma requisição sem token pede as categorias da loja
- **THEN** o backend responde com id e nome de cada categoria

### Requirement: Dados internos nunca expostos pela API pública
As respostas da API pública da loja MUST NOT conter quantidade exata em
estoque, SKU, data de criação de registros internos, nem qualquer dado de
clientes, vendas ou usuários.

#### Scenario: Resposta sem dados internos
- **WHEN** a listagem ou o detalhe público de produto é retornado
- **THEN** nenhuma variação contém os campos de estoque numérico ou SKU

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

### Requirement: Escolha de variação e adição ao carrinho
A página de detalhe do produto SHALL permitir ao visitante escolher uma
das variações disponíveis (tamanho e cor) e adicioná-la ao carrinho.
Variações esgotadas MUST NOT poder ser escolhidas. Sem variação escolhida,
a adição ao carrinho SHALL ficar indisponível. Após adicionar, a página
SHALL confirmar a adição e oferecer um link para o carrinho.

#### Scenario: Adicionar uma variação disponível
- **WHEN** o visitante escolhe uma variação disponível e usa "Adicionar ao carrinho"
- **THEN** a variação entra no carrinho com quantidade 1 e a página confirma a adição

#### Scenario: Variação esgotada
- **WHEN** o visitante tenta escolher uma variação esgotada
- **THEN** a variação não fica selecionada e não pode ser adicionada ao carrinho

#### Scenario: Mesma variação de novo
- **WHEN** o visitante adiciona uma variação que já está no carrinho
- **THEN** a quantidade daquele item aumenta em 1, sem criar outro item

### Requirement: Carrinho de compras
A loja SHALL manter, sem exigir login, um carrinho no navegador do
visitante, acessível por um ícone no cabeçalho que mostra a quantidade
de itens. A página do carrinho SHALL listar cada item com foto, nome,
tamanho, cor, preço unitário, quantidade e total da linha, permitir
alterar a quantidade entre 1 e 10 e remover o item, e exibir o subtotal.
O carrinho SHALL continuar disponível ao recarregar a página. Com o
carrinho vazio, a página SHALL mostrar um aviso com link para a vitrine.

#### Scenario: Ver o carrinho
- **WHEN** o visitante tem itens no carrinho e abre a página do carrinho
- **THEN** vê cada item com quantidade e total da linha, e o subtotal em reais

#### Scenario: Alterar quantidade
- **WHEN** o visitante aumenta ou diminui a quantidade de um item
- **THEN** a quantidade muda dentro do limite de 1 a 10 e o subtotal é recalculado

#### Scenario: Remover item
- **WHEN** o visitante remove um item
- **THEN** o item sai do carrinho e a contagem do cabeçalho diminui

#### Scenario: Recarregar a página
- **WHEN** o visitante recarrega a loja depois de adicionar itens
- **THEN** o carrinho mantém os mesmos itens

#### Scenario: Carrinho vazio
- **WHEN** o visitante abre o carrinho sem itens
- **THEN** vê o aviso de carrinho vazio e um link para a vitrine
