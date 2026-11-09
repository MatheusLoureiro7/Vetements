## ADDED Requirements

### Requirement: Status do pedido na tela de Vendas
A tela de Vendas SHALL mostrar uma coluna "Status": "Pago", "Enviado"
ou "Entregue" para pedidos da loja virtual (pedido sem status aparece
como "Pago") e "—" para vendas de balcão. Para pedidos da loja ainda
não entregues, a tela SHALL oferecer o botão do próximo passo ("Marcar
como enviado" ou "Marcar como entregue") a administradores e
vendedores. O avanço SHALL pedir confirmação antes de ser enviado,
indicar carregamento e bloquear um segundo clique enquanto envia; em
caso de sucesso SHALL mostrar um aviso e atualizar o histórico; em caso
de erro SHALL mostrar a mensagem sem alterar a linha.

#### Scenario: Ver status no histórico
- **WHEN** a equipe abre a tela de Vendas com um pedido da loja pago e uma venda de balcão
- **THEN** o pedido mostra "Pago" com o botão "Marcar como enviado" e a venda de balcão mostra "—" sem botão

#### Scenario: Marcar como enviado
- **WHEN** um vendedor usa "Marcar como enviado" e confirma
- **THEN** o pedido passa a "Enviado", aparece o aviso "Pedido #N marcado como enviado." e o botão vira "Marcar como entregue"

#### Scenario: Cancelar a confirmação
- **WHEN** a equipe usa "Marcar como enviado" e cancela a confirmação
- **THEN** nada é enviado e o pedido continua "Pago"

#### Scenario: Pedido entregue
- **WHEN** um pedido está "Entregue"
- **THEN** a linha não mostra botão de avanço

#### Scenario: Erro ao avançar
- **WHEN** o backend recusa o avanço (ex.: outra pessoa já avançou o pedido)
- **THEN** a tela mostra a mensagem do backend e recarrega o histórico
