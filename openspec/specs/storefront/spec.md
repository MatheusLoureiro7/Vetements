# storefront Specification

## Purpose
Loja virtual do Vetements voltada ao cliente final, acessível sem login e
separada da área de gestão usada pela equipe da loja.

## Requirements

### Requirement: Página inicial pública da loja
O sistema SHALL exibir, na raiz do site (`/`), a página inicial da loja
virtual para qualquer visitante, sem exigir login, com a marca Vetements,
uma chamada principal e um rodapé. Enquanto o catálogo da loja não estiver
disponível, a página SHALL informar que a coleção estará disponível em
breve.

#### Scenario: Visitante acessa o site
- **WHEN** um visitante sem sessão acessa `/`
- **THEN** vê a página inicial da loja, sem ser redirecionado para o login

#### Scenario: Catálogo ainda indisponível
- **WHEN** um visitante acessa a página inicial da loja nesta fase
- **THEN** vê o aviso de que a coleção estará disponível em breve, sem erros nem listagens vazias

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
