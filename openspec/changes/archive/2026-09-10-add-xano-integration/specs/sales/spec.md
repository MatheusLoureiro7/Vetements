## MODIFIED Requirements

### Requirement: Quantidade vendida não excede o estoque disponível
O sistema SHALL impedir, na interface, que a quantidade de um item de
venda exceda o estoque disponível conhecido no momento; o backend
SHALL revalidar essa condição no momento da confirmação da venda e
SHALL rejeitar a venda (sem alterar estoque) caso o estoque
disponível real, no momento da confirmação, seja menor que a
quantidade solicitada.

#### Scenario: Tentativa de exceder o estoque na interface
- **WHEN** um usuário tenta adicionar a um item de venda uma
  quantidade maior que o estoque disponível exibido para a variação
- **THEN** o sistema impede a adição e informa a quantidade máxima
  disponível

#### Scenario: Backend rejeita venda por estoque insuficiente no momento da confirmação
- **WHEN** uma venda é confirmada com uma quantidade que, no momento
  em que o backend processa a requisição, excede o estoque
  disponível real da variação (por exemplo, consumido por outra
  venda confirmada entre a abertura da tela e a confirmação)
- **THEN** o backend rejeita a venda, nenhuma quantidade é
  descontada do estoque, e o sistema exibe uma mensagem informando o
  motivo

### Requirement: Baixa de estoque ao confirmar venda
O backend SHALL reduzir a quantidade em estoque de cada variação
vendida pela quantidade do item correspondente, de forma atômica com
a criação da venda: ou a venda e todas as baixas de estoque são
persistidas juntas, ou nenhuma delas é.

#### Scenario: Baixa após confirmação
- **WHEN** uma venda com itens válidos é confirmada
- **THEN** a quantidade em estoque de cada variação vendida é
  reduzida pela quantidade vendida

#### Scenario: Falha parcial não deixa dados inconsistentes
- **WHEN** a confirmação de uma venda com múltiplos itens falha após
  já ter iniciado o processamento no backend (por exemplo, um dos
  itens é rejeitado por estoque insuficiente)
- **THEN** nenhuma baixa de estoque referente a essa venda é
  aplicada e a venda não é criada

## ADDED Requirements

### Requirement: Erro ao confirmar venda por falha de comunicação
O sistema SHALL exibir uma mensagem de erro e SHALL manter a venda em
edição (itens preenchidos) quando o backend estiver inacessível ou
demorar demais para responder à confirmação da venda.

#### Scenario: Backend indisponível ao confirmar venda
- **WHEN** um usuário confirma uma venda e o backend não responde
  (erro de rede ou tempo limite excedido)
- **THEN** o sistema exibe uma mensagem de erro, a venda não é
  registrada e os itens preenchidos continuam na tela para nova
  tentativa
