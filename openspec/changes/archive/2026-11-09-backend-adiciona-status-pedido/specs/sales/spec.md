## ADDED Requirements

### Requirement: Status do pedido da loja
Todo pedido de origem loja virtual SHALL ter um status: `pago`,
`enviado` ou `entregue`. O pedido SHALL nascer `pago`; pedidos antigos
sem status SHALL ser tratados como `pago`. Vendas de balcão MUST NOT
ter status. Um usuário da equipe (administrador ou vendedor) SHALL
poder avançar o status um passo por vez — de `pago` para `enviado` e de
`enviado` para `entregue` — e o backend SHALL guardar a data/hora de
envio e de entrega. O backend SHALL recusar, sem alterar nada, pular
etapa, voltar etapa, repetir o status atual ou mudar o status de uma
venda de balcão. Cada avanço aceito SHALL ser registrado no histórico
de eventos com o usuário, o pedido e os status anterior e novo.

#### Scenario: Marcar pedido como enviado
- **WHEN** um vendedor marca como enviado um pedido da loja com status `pago`
- **THEN** o pedido passa a `enviado`, com a data/hora do envio, e o avanço fica registrado no histórico de eventos

#### Scenario: Marcar pedido como entregue
- **WHEN** um administrador marca como entregue um pedido com status `enviado`
- **THEN** o pedido passa a `entregue`, com a data/hora da entrega

#### Scenario: Pedido antigo sem status
- **WHEN** a equipe marca como enviado um pedido da loja criado antes desta regra, sem status gravado
- **THEN** ele é tratado como `pago` e passa a `enviado`

#### Scenario: Pular ou voltar etapa
- **WHEN** a equipe tenta marcar como entregue um pedido `pago`, ou como enviado um pedido `entregue`
- **THEN** o backend recusa com uma mensagem explicando o status atual e nada é alterado

#### Scenario: Venda de balcão
- **WHEN** a equipe tenta mudar o status de uma venda de balcão
- **THEN** o backend recusa com "Somente pedidos da loja virtual têm status." e nada é alterado

#### Scenario: Sem login da equipe
- **WHEN** uma requisição sem token da equipe (ou com token de cliente da loja) tenta mudar o status
- **THEN** o backend responde com erro de autenticação
