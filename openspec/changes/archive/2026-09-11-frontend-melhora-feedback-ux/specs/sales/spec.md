## ADDED Requirements

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
