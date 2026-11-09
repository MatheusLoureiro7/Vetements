## MODIFIED Requirements

### Requirement: Minha conta
A loja SHALL oferecer, ao cliente logado, uma página com seus dados, a
opção de sair e a lista dos seus pedidos (número, data, total, forma de
pagamento, status e itens). Pedidos antigos sem dados de pagamento SHALL
aparecer como "Pagamento não informado". O status SHALL aparecer como
"Pago", "Enviado em <data>" ou "Entregue em <data>"; pedido sem status
SHALL aparecer como "Pago". Sem login, a página SHALL levar para entrar
e voltar a ela depois.

#### Scenario: Ver meus pedidos
- **WHEN** o cliente logado abre "Minha conta"
- **THEN** vê seus pedidos, mais recentes primeiro, com itens, total, forma de pagamento (ex.: "Cartão 3x · final 4242") e status

#### Scenario: Pedido enviado
- **WHEN** a equipe marcou o pedido como enviado em 10/11/2026
- **THEN** o pedido aparece em "Minha conta" com "Enviado em 10/11/2026"

#### Scenario: Sair
- **WHEN** o cliente usa "Sair"
- **THEN** a sessão do cliente é encerrada e ele volta à página inicial da loja
