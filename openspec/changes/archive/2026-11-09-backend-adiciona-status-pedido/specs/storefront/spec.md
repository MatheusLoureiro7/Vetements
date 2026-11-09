## MODIFIED Requirements

### Requirement: Meus pedidos
O backend SHALL listar, para o cliente logado, somente os pedidos feitos
por ele na loja virtual, do mais recente para o mais antigo, com data,
total, dados do pagamento (forma, parcelas, final do cartão quando
houver e data/hora do pagamento), status do pedido (`pago`, `enviado`
ou `entregue`, com as datas de envio e entrega quando houver) e itens
(nome do produto, tamanho, cor, quantidade e preço unitário), sem SKU
nem estoque.

#### Scenario: Cliente vê os próprios pedidos
- **WHEN** um cliente logado pede a lista de pedidos
- **THEN** recebe apenas os pedidos dele, mais recentes primeiro, cada um com os dados do pagamento e o status

#### Scenario: Pedido enviado
- **WHEN** a equipe marcou um pedido do cliente como enviado
- **THEN** a lista traz esse pedido com status `enviado` e a data/hora do envio
