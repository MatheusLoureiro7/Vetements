## ADDED Requirements

### Requirement: Pagamento simulado na loja
A loja SHALL oferecer uma página de pagamento ao cliente logado com
carrinho não vazio, mostrando os itens, o total e a escolha entre Pix,
cartão e boleto, com o aviso permanente de que o pagamento é simulado e
nenhum valor é cobrado. Pix SHALL mostrar um QR code ilustrativo e um
código "copia e cola" fictício; boleto SHALL mostrar uma linha
digitável fictícia; cartão SHALL pedir número, nome, validade (MM/AA),
código de segurança e parcelas de 1 a 6. A página SHALL validar o
cartão antes de enviar (número de 13 a 19 dígitos, validade não
vencida, código de 3 ou 4 dígitos, nome preenchido), mostrando o erro
junto ao campo, e SHALL enviar ao backend somente a forma de pagamento,
as parcelas e os 4 últimos dígitos do cartão. Sem login, a página SHALL
levar para entrar e voltar a ela; com o carrinho vazio, SHALL levar ao
carrinho.

#### Scenario: Pagar com Pix
- **WHEN** o cliente escolhe Pix e confirma o pagamento
- **THEN** o pedido é criado já pago, o carrinho é esvaziado e ele vê a confirmação com o número do pedido e "Pagamento aprovado"

#### Scenario: Pagar com cartão parcelado
- **WHEN** o cliente preenche um cartão válido, escolhe 3 parcelas e confirma
- **THEN** o pedido é criado com cartão em 3x, e só o final do cartão é enviado ao backend

#### Scenario: Cartão com dados inválidos
- **WHEN** o cliente confirma com validade vencida ou código de segurança de 2 dígitos
- **THEN** a página mostra o erro no campo e nada é enviado ao backend

#### Scenario: Pagamento recusado (simulação)
- **WHEN** o cliente paga com um cartão de final 0000
- **THEN** continua na página de pagamento com a mensagem de recusa, e o carrinho mantém os itens

#### Scenario: Página sem login
- **WHEN** um visitante sem login abre a página de pagamento
- **THEN** é levado para entrar e, depois de entrar, volta à página de pagamento

## MODIFIED Requirements

### Requirement: Finalizar pedido pelo carrinho
O carrinho SHALL oferecer "Finalizar pedido" ao cliente logado, que
leva à página de pagamento simulado; o pedido só é criado quando o
pagamento é confirmado nessa página. Ao concluir com sucesso, o
carrinho SHALL ser esvaziado e o cliente levado à confirmação com o
número do pedido. Se o backend recusar o pedido (por exemplo, estoque
insuficiente ou pagamento recusado), o carrinho SHALL manter os itens e
a página de pagamento SHALL mostrar o motivo.

#### Scenario: Pedido concluído
- **WHEN** o cliente logado finaliza um carrinho com itens disponíveis e confirma o pagamento
- **THEN** vê a confirmação com o número do pedido e o carrinho fica vazio

#### Scenario: Pedido recusado
- **WHEN** o backend recusa o pedido por estoque insuficiente
- **THEN** o carrinho continua com os itens e a página de pagamento mostra a mensagem do backend

### Requirement: Minha conta
A loja SHALL oferecer, ao cliente logado, uma página com seus dados, a
opção de sair e a lista dos seus pedidos (número, data, total, forma de
pagamento e itens). Pedidos antigos sem dados de pagamento SHALL
aparecer como "Pagamento não informado". Sem login, a página SHALL
levar para entrar e voltar a ela depois.

#### Scenario: Ver meus pedidos
- **WHEN** o cliente logado abre "Minha conta"
- **THEN** vê seus pedidos, mais recentes primeiro, com itens, total e forma de pagamento (ex.: "Cartão 3x · final 4242")

#### Scenario: Sair
- **WHEN** o cliente usa "Sair"
- **THEN** a sessão do cliente é encerrada e ele volta à página inicial da loja
