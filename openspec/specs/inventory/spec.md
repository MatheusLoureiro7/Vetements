## Purpose

Mostra a quantidade disponível em estoque de cada variação de
produto e evidencia quando ela está baixa, para apoiar decisões de
reposição e venda.

## Requirements

### Requirement: Visualização de estoque por variação
O sistema SHALL exibir, para cada variação de produto, o produto ao
qual pertence, tamanho, cor, SKU e quantidade disponível em estoque.

#### Scenario: Listar estoque
- **WHEN** um usuário autenticado acessa a tela de Estoque
- **THEN** vê, para cada variação, produto, tamanho, cor, SKU e
  quantidade disponível

### Requirement: Indicação de estoque baixo
O sistema SHALL destacar visualmente as variações cuja quantidade em
estoque está abaixo de um limite configurado.

#### Scenario: Variação com estoque baixo
- **WHEN** a quantidade de uma variação está abaixo do limite de
  estoque baixo
- **THEN** a linha correspondente é destacada visualmente como
  estoque baixo

### Requirement: Estoque nunca fica negativo
O backend SHALL impedir que a quantidade em estoque de qualquer
variação fique negativa em qualquer operação sequencial — a garantia
vale independentemente de qualquer validação feita na interface.

**Limitação conhecida**: a checagem de estoque disponível e a baixa
não são uma única operação atômica no banco (o plano atual do Xano
não oferece SQL puro nem contador atômico em cache para fechar essa
janela por completo). Duas vendas da mesma variação confirmadas no
exato mesmo instante podem, em teoria, ambas passar da checagem
antes de qualquer uma escrever. Aceito como risco residual para o
volume de uso deste ERP.

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

### Requirement: Erro ao carregar estoque
O sistema SHALL exibir uma mensagem de erro no lugar da listagem de
estoque quando não conseguir obter esses dados do backend.

#### Scenario: Backend indisponível ao abrir a tela de Estoque
- **WHEN** um usuário autenticado acessa a tela de Estoque e o
  backend não responde (erro de rede ou tempo limite excedido)
- **THEN** o sistema exibe uma mensagem de erro no lugar da listagem

### Requirement: Distinção entre carregamento inicial e listagem vazia
O sistema SHALL exibir um indicador de carregamento, distinto da
mensagem de listagem vazia, enquanto a lista de variações em estoque
ainda não foi obtida do backend pela primeira vez na tela de Estoque.

#### Scenario: Carregamento inicial da listagem de estoque
- **WHEN** um usuário autenticado acessa a tela de Estoque e a
  primeira busca de variações ao backend ainda está em andamento
- **THEN** o sistema exibe um indicador de carregamento no lugar da
  mensagem "Nenhuma variação encontrada"

#### Scenario: Listagem vazia após o carregamento concluir
- **WHEN** a busca de variações ao backend termina e não retorna
  nenhuma variação
- **THEN** o sistema exibe a mensagem de listagem vazia, não mais o
  indicador de carregamento
