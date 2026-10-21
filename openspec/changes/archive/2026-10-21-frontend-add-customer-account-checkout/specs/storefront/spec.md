## ADDED Requirements

### Requirement: Entrar e criar conta na loja
A loja SHALL oferecer uma página para o cliente entrar (e-mail e senha) ou
criar conta (nome, e-mail, senha e telefone opcional). Erros do backend
(credenciais inválidas, e-mail já com conta, senha fraca) SHALL aparecer
na página sem perder a navegação. Depois de entrar ou criar a conta, o
cliente SHALL voltar à página de onde veio na loja (por exemplo, o
carrinho) ou, sem origem, ir para "Minha conta".

#### Scenario: Entrar vindo do carrinho
- **WHEN** um visitante sem login usa "Entrar para finalizar" no carrinho e entra com credenciais válidas
- **THEN** volta ao carrinho, com os mesmos itens, já podendo finalizar o pedido

#### Scenario: Credenciais inválidas
- **WHEN** o cliente tenta entrar com e-mail ou senha errados
- **THEN** a página mostra "E-mail ou senha inválidos." e ele continua deslogado

### Requirement: Finalizar pedido pelo carrinho
O carrinho SHALL oferecer "Finalizar pedido" ao cliente logado. Ao
finalizar com sucesso, o carrinho SHALL ser esvaziado e o cliente levado
à confirmação com o número do pedido. Se o backend recusar o pedido (por
exemplo, estoque insuficiente), o carrinho SHALL manter os itens e mostrar
o motivo.

#### Scenario: Pedido concluído
- **WHEN** o cliente logado finaliza um carrinho com itens disponíveis
- **THEN** vê a confirmação com o número do pedido e o carrinho fica vazio

#### Scenario: Pedido recusado
- **WHEN** o backend recusa o pedido por estoque insuficiente
- **THEN** o carrinho continua com os itens e mostra a mensagem do backend

### Requirement: Minha conta
A loja SHALL oferecer, ao cliente logado, uma página com seus dados, a
opção de sair e a lista dos seus pedidos (número, data, total e itens).
Sem login, a página SHALL levar para entrar e voltar a ela depois.

#### Scenario: Ver meus pedidos
- **WHEN** o cliente logado abre "Minha conta"
- **THEN** vê seus pedidos, mais recentes primeiro, com itens e total

#### Scenario: Sair
- **WHEN** o cliente usa "Sair"
- **THEN** a sessão do cliente é encerrada e ele volta à página inicial da loja
