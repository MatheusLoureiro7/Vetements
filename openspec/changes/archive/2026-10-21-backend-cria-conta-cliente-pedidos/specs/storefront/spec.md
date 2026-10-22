## ADDED Requirements

### Requirement: Conta de cliente da loja
O backend SHALL permitir, sem login prévio, que um visitante crie uma
conta de cliente com nome, e-mail e senha (telefone opcional) e que entre
nela com e-mail e senha, recebendo um token de cliente. A senha SHALL ter
ao menos 8 caracteres, com letra e número. Um e-mail SHALL ter no máximo
uma conta. Tokens de cliente MUST NOT dar acesso a endpoints da gestão, e
nenhuma resposta MUST conter a senha ou seu hash.

#### Scenario: Criar conta
- **WHEN** um visitante envia nome, e-mail ainda sem conta e uma senha válida
- **THEN** a conta é criada e a resposta traz o token e os dados do cliente, sem a senha

#### Scenario: E-mail já com conta
- **WHEN** um visitante tenta criar conta com um e-mail que já tem conta
- **THEN** o backend recusa o cadastro informando que o e-mail já tem conta

#### Scenario: Senha fraca
- **WHEN** a senha tem menos de 8 caracteres ou não tem letra e número
- **THEN** o backend recusa o cadastro sem criar a conta

#### Scenario: Login inválido
- **WHEN** o e-mail não tem conta ou a senha está errada
- **THEN** o backend responde acesso negado, com a mesma mensagem nos dois casos

#### Scenario: Token de cliente na gestão
- **WHEN** um token de cliente é usado em um endpoint da gestão
- **THEN** o backend responde com erro de autenticação

### Requirement: Pedido pela loja virtual
O backend SHALL permitir que um cliente logado faça um pedido com um ou
mais itens (variação e quantidade). O pedido SHALL ser registrado como
venda de origem "loja virtual", associada ao cliente logado e sem
funcionário, com o preço unitário de cada item lido do produto no
momento do pedido. O backend SHALL rejeitar o pedido inteiro, sem baixar
estoque, se algum item for de produto não publicado, tiver quantidade
fora de 1 a 10 ou exceder o estoque disponível; caso contrário SHALL
baixar o estoque como numa venda de balcão.

#### Scenario: Pedido válido
- **WHEN** um cliente logado envia itens de produtos publicados com estoque suficiente
- **THEN** uma venda de origem "loja virtual" é criada para ele, o estoque de cada variação é reduzido e a resposta traz o número, o total e os itens do pedido

#### Scenario: Estoque insuficiente
- **WHEN** algum item pede mais unidades do que o estoque disponível
- **THEN** o pedido é recusado, nenhuma venda é criada e nenhum estoque é alterado

#### Scenario: Pedido sem login
- **WHEN** uma requisição sem token de cliente tenta criar um pedido
- **THEN** o backend responde com erro de autenticação

### Requirement: Meus pedidos
O backend SHALL listar, para o cliente logado, somente os pedidos feitos
por ele na loja virtual, do mais recente para o mais antigo, com data,
total e itens (nome do produto, tamanho, cor, quantidade e preço
unitário), sem SKU nem estoque.

#### Scenario: Cliente vê os próprios pedidos
- **WHEN** um cliente logado pede a lista de pedidos
- **THEN** recebe apenas os pedidos dele, mais recentes primeiro
