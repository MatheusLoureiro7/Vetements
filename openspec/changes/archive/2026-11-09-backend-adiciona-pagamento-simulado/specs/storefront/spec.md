## MODIFIED Requirements

### Requirement: Pedido pela loja virtual
O backend SHALL permitir que um cliente logado faça um pedido com um ou
mais itens (variação e quantidade) e uma forma de pagamento simulada:
Pix, cartão ou boleto. Para cartão, o pedido SHALL informar o número de
parcelas (1 a 6) e somente os 4 últimos dígitos do cartão; o backend
MUST NOT receber nem guardar número completo, nome impresso, validade
ou código de segurança. Um cartão com final 0000 SHALL ser tratado como
pagamento recusado: o backend SHALL rejeitar o pedido inteiro, sem
criar venda nem baixar estoque. O pedido aceito SHALL ser registrado
como venda de origem "loja virtual", associada ao cliente logado e sem
funcionário, já com pagamento aprovado (forma, parcelas, final do
cartão quando houver e data/hora do pagamento), com o preço unitário de
cada item lido do produto no momento do pedido. O backend SHALL
rejeitar o pedido inteiro, sem baixar estoque, se algum item for de
produto não publicado, tiver quantidade fora de 1 a 10 ou exceder o
estoque disponível; caso contrário SHALL baixar o estoque como numa
venda de balcão.

#### Scenario: Pedido válido
- **WHEN** um cliente logado envia itens de produtos publicados com estoque suficiente e uma forma de pagamento válida
- **THEN** uma venda de origem "loja virtual" é criada para ele já paga, o estoque de cada variação é reduzido e a resposta traz o número, o total, os itens e os dados do pagamento

#### Scenario: Pagamento com cartão em parcelas
- **WHEN** um cliente logado paga com cartão em 3 parcelas e final 4242
- **THEN** o pedido é criado com forma "cartao", 3 parcelas e final "4242"

#### Scenario: Cartão recusado (simulação)
- **WHEN** um cliente logado paga com cartão de final 0000
- **THEN** o backend responde "Pagamento recusado pela operadora (simulação).", nenhuma venda é criada e nenhum estoque é alterado

#### Scenario: Forma de pagamento ausente ou inválida
- **WHEN** o pedido não informa forma de pagamento, informa uma forma desconhecida, ou é cartão sem parcelas de 1 a 6 ou sem final de 4 dígitos
- **THEN** o backend recusa o pedido com erro de entrada e nada é gravado

#### Scenario: Estoque insuficiente
- **WHEN** algum item pede mais unidades do que o estoque disponível
- **THEN** o pedido é recusado, nenhuma venda é criada e nenhum estoque é alterado

#### Scenario: Pedido sem login
- **WHEN** uma requisição sem token de cliente tenta criar um pedido
- **THEN** o backend responde com erro de autenticação

### Requirement: Meus pedidos
O backend SHALL listar, para o cliente logado, somente os pedidos feitos
por ele na loja virtual, do mais recente para o mais antigo, com data,
total, dados do pagamento (forma, parcelas, final do cartão quando
houver e data/hora do pagamento) e itens (nome do produto, tamanho, cor,
quantidade e preço unitário), sem SKU nem estoque.

#### Scenario: Cliente vê os próprios pedidos
- **WHEN** um cliente logado pede a lista de pedidos
- **THEN** recebe apenas os pedidos dele, mais recentes primeiro, cada um com os dados do pagamento
