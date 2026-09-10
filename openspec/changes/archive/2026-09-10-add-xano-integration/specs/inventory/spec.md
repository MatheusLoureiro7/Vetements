## MODIFIED Requirements

### Requirement: Estoque nunca fica negativo
O backend SHALL impedir que a quantidade em estoque de qualquer
variação fique negativa em qualquer operação sequencial — a garantia
vale independentemente de qualquer validação feita na interface.

**Limitação conhecida**: a checagem de estoque disponível e a baixa
não são uma única operação atômica no banco (o plano atual do Xano
não oferece SQL puro nem contador atômico em cache para fechar essa
janela por completo — ver `design.md`, Risks/Trade-offs). Duas vendas
da mesma variação confirmadas no exato mesmo instante podem, em
teoria, ambas passar da checagem antes de qualquer uma escrever.
Aceito como risco residual para o volume de uso deste ERP.

#### Scenario: Piso zero
- **WHEN** a quantidade de uma variação chega a zero após uma baixa
  de venda
- **THEN** nenhuma operação subsequente reduz essa quantidade abaixo
  de zero

#### Scenario: Vendas sequenciais na mesma variação
- **WHEN** duas vendas envolvendo a mesma variação, com quantidade
  somada maior que o estoque disponível, são confirmadas uma depois
  da outra (não simultâneas)
- **THEN** o backend aceita apenas as vendas cuja quantidade total,
  na ordem em que chegam, não exceda o estoque disponível, e rejeita
  as demais sem deixar a quantidade em estoque negativa

## ADDED Requirements

### Requirement: Erro ao carregar estoque
O sistema SHALL exibir uma mensagem de erro no lugar da listagem de
estoque quando não conseguir obter esses dados do backend.

#### Scenario: Backend indisponível ao abrir a tela de Estoque
- **WHEN** um usuário autenticado acessa a tela de Estoque e o
  backend não responde (erro de rede ou tempo limite excedido)
- **THEN** o sistema exibe uma mensagem de erro no lugar da listagem
