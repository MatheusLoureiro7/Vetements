## ADDED Requirements

### Requirement: Indicação de carregamento ao cadastrar cliente
O sistema SHALL indicar visualmente, no botão de salvar cliente, que o
cadastro está em andamento entre a confirmação do usuário e a resposta
do backend, SHALL desabilitar esse botão enquanto a operação está em
andamento, e SHALL impedir que uma nova submissão seja iniciada antes
da resposta anterior.

#### Scenario: Botão de salvar cliente indica carregamento
- **WHEN** um usuário confirma o cadastro de um cliente
- **THEN** o botão de salvar passa a indicar carregamento e fica
  desabilitado até que o backend responda

#### Scenario: Confirmação repetida é ignorada durante o carregamento
- **WHEN** um usuário confirma o cadastro de um cliente novamente
  enquanto a submissão anterior ainda está em andamento
- **THEN** o sistema não inicia uma segunda submissão

### Requirement: Confirmação de sucesso ao cadastrar cliente
O sistema SHALL exibir uma mensagem de sucesso visível quando o
backend aceitar o cadastro de um cliente.

#### Scenario: Sucesso ao cadastrar cliente
- **WHEN** o backend aceita o cadastro de um cliente
- **THEN** o sistema exibe uma mensagem de sucesso, além de o cliente
  aparecer na listagem

### Requirement: Distinção entre carregamento inicial e listagem vazia
O sistema SHALL exibir um indicador de carregamento, distinto da
mensagem de listagem vazia, enquanto a lista de clientes ainda não foi
obtida do backend pela primeira vez na tela de Clientes.

#### Scenario: Carregamento inicial da listagem de clientes
- **WHEN** um usuário autenticado acessa a tela de Clientes e a
  primeira busca de clientes ao backend ainda está em andamento
- **THEN** o sistema exibe um indicador de carregamento no lugar da
  mensagem "Nenhum cliente encontrado"

#### Scenario: Listagem vazia após o carregamento concluir
- **WHEN** a busca de clientes ao backend termina e não retorna
  nenhum cliente
- **THEN** o sistema exibe a mensagem de listagem vazia, não mais o
  indicador de carregamento
