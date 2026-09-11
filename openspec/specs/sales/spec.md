## Purpose

Registra vendas internas da loja, associando itens de variações de
produto e dando baixa no estoque correspondente.

## Requirements

### Requirement: Registro de venda com itens
O sistema SHALL permitir registrar uma venda contendo um ou mais
itens, cada um referenciando uma variação de produto e uma
quantidade, associando a venda ao usuário logado e à data/hora do
registro.

#### Scenario: Confirmar venda com itens
- **WHEN** um usuário adiciona ao menos uma variação com quantidade e
  confirma a venda
- **THEN** uma nova venda é registrada com os itens, data/hora e o
  usuário responsável

### Requirement: Venda deve conter ao menos um item
O sistema SHALL impedir a confirmação de uma venda sem nenhum item.

#### Scenario: Bloquear venda vazia
- **WHEN** um usuário tenta confirmar uma venda sem nenhum item
  adicionado
- **THEN** o sistema impede a confirmação e indica que é necessário
  ao menos um item

### Requirement: Cliente associado é opcional
O sistema SHALL permitir registrar uma venda sem cliente associado
(venda avulsa/balcão).

#### Scenario: Venda sem cliente
- **WHEN** um usuário confirma uma venda sem selecionar um cliente
- **THEN** a venda é registrada como avulsa, sem cliente associado

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

### Requirement: Valor total derivado dos itens
O sistema SHALL calcular o valor total da venda como a soma de
quantidade multiplicada pelo preço unitário de cada item, e SHALL
recalcular esse total sempre que os itens forem alterados.

#### Scenario: Total recalculado
- **WHEN** um item é adicionado, removido ou tem sua quantidade
  alterada em uma venda em edição
- **THEN** o valor total exibido reflete a soma atualizada dos itens

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

### Requirement: Indicação de carregamento ao confirmar venda
O sistema SHALL indicar visualmente, no botão de confirmar venda, que
a confirmação está em andamento entre a ação do usuário e a resposta
do backend, SHALL desabilitar esse botão enquanto a operação está em
andamento, e SHALL impedir que uma nova confirmação da mesma venda
seja iniciada antes da resposta anterior.

#### Scenario: Botão de confirmar venda indica carregamento
- **WHEN** um usuário confirma uma venda com itens válidos
- **THEN** o botão de confirmar passa a indicar carregamento e fica
  desabilitado até que o backend responda

#### Scenario: Confirmação repetida é ignorada durante o carregamento
- **WHEN** um usuário confirma a venda novamente enquanto a
  confirmação anterior ainda está em andamento
- **THEN** o sistema não envia uma segunda confirmação da mesma venda

### Requirement: Distinção entre carregamento inicial e listagem vazia
O sistema SHALL exibir um indicador de carregamento, distinto da
mensagem de listagem vazia, enquanto a lista de vendas registradas
ainda não foi obtida do backend pela primeira vez na tela de Vendas.

#### Scenario: Carregamento inicial da listagem de vendas
- **WHEN** um usuário autenticado acessa a tela de Vendas e a primeira
  busca de vendas ao backend ainda está em andamento
- **THEN** o sistema exibe um indicador de carregamento no lugar da
  mensagem "Nenhuma venda registrada ainda"

#### Scenario: Listagem vazia após o carregamento concluir
- **WHEN** a busca de vendas ao backend termina e não retorna nenhuma
  venda registrada
- **THEN** o sistema exibe a mensagem de listagem vazia, não mais o
  indicador de carregamento
