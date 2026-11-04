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

### Requirement: Ajuste de estoque por administrador
O backend SHALL permitir que um administrador autenticado ajuste a
quantidade em estoque de uma variação existente informando uma
quantidade de ajuste diferente de zero — positiva para entrada de
mercadoria, negativa para saída (perda, avaria, correção de
contagem) — e um motivo opcional. A resposta SHALL trazer a variação
com o estoque já atualizado.

#### Scenario: Entrada de mercadoria
- **WHEN** um administrador ajusta em +10 uma variação com estoque 5
- **THEN** o estoque da variação passa a ser 15 e a resposta traz a
  variação com estoque 15

#### Scenario: Saída por correção de contagem
- **WHEN** um administrador ajusta em -3 uma variação com estoque 5
- **THEN** o estoque da variação passa a ser 2

#### Scenario: Ajuste igual a zero
- **WHEN** um administrador envia um ajuste com quantidade 0
- **THEN** o backend rejeita a requisição com erro de entrada e o
  estoque não muda

#### Scenario: Variação inexistente
- **WHEN** um administrador ajusta uma variação que não existe
- **THEN** o backend rejeita a requisição com erro e nenhum estoque
  é alterado

### Requirement: Ajuste de estoque nunca deixa estoque negativo
O backend SHALL rejeitar qualquer ajuste cuja aplicação deixaria a
quantidade em estoque da variação abaixo de zero, sem alterar o
estoque, com uma mensagem que informe a quantidade disponível.

#### Scenario: Saída maior que o estoque
- **WHEN** um administrador ajusta em -8 uma variação com estoque 5
- **THEN** o backend rejeita o ajuste com erro de entrada informando
  que há 5 unidades disponíveis, e o estoque continua 5

#### Scenario: Zerar o estoque
- **WHEN** um administrador ajusta em -5 uma variação com estoque 5
- **THEN** o ajuste é aceito e o estoque passa a ser 0

### Requirement: Ajuste de estoque restrito a administradores
O backend SHALL aceitar ajustes de estoque apenas de usuários da
equipe autenticados com papel administrador; a verificação SHALL
ocorrer no backend, independentemente da interface.

#### Scenario: Vendedor tenta ajustar
- **WHEN** um usuário com papel vendedor envia um ajuste de estoque
- **THEN** o backend responde com acesso negado e o estoque não muda

#### Scenario: Sem autenticação
- **WHEN** uma requisição de ajuste chega sem token válido da equipe
  (incluindo token de cliente da loja)
- **THEN** o backend responde com não autorizado e o estoque não muda

### Requirement: Registro de quem ajustou o estoque
O backend SHALL registrar cada ajuste de estoque aceito com o usuário
que o fez, a data/hora, a variação, o estoque anterior, o novo
estoque, a quantidade ajustada e o motivo informado. Ajustes
rejeitados SHALL NOT gerar registro.

#### Scenario: Ajuste aceito gera registro
- **WHEN** um administrador ajusta em +10, com motivo "Reposição do
  fornecedor", uma variação com estoque 5
- **THEN** fica registrado um evento de ajuste de estoque com esse
  administrador, a variação, estoque anterior 5, novo estoque 15,
  ajuste +10 e o motivo informado

#### Scenario: Ajuste rejeitado não gera registro
- **WHEN** um ajuste é rejeitado (zero, negativo além do disponível,
  sem permissão)
- **THEN** nenhum evento de ajuste de estoque é registrado

### Requirement: Ajuste de estoque na tela de Estoque
A tela de Estoque SHALL oferecer a administradores, em cada variação,
uma ação para ajustar o estoque em um popup que mostra produto, SKU e
estoque atual e permite escolher entre três tipos: Entrada (soma a
quantidade informada), Saída (subtrai a quantidade informada) e
Contagem (o usuário informa o total contado e o ajuste é a diferença
em relação ao estoque atual). O popup SHALL aceitar um motivo opcional
e mostrar, antes de salvar, o estoque resultante do ajuste. Usuários
com papel vendedor SHALL NOT ver a ação.

#### Scenario: Administrador dá entrada de mercadoria
- **WHEN** um administrador abre o ajuste de uma variação com estoque
  5, escolhe Entrada, informa 10 e salva
- **THEN** o popup mostra "estoque após o ajuste: 15" antes de salvar,
  e após salvar a linha da variação passa a mostrar 15

#### Scenario: Correção por contagem
- **WHEN** um administrador escolhe Contagem numa variação com estoque
  5 e informa 3 como total contado
- **THEN** o ajuste enviado é de −2 e o estoque da linha passa a ser 3

#### Scenario: Vendedor não vê a ação
- **WHEN** um usuário com papel vendedor acessa a tela de Estoque
- **THEN** vê a listagem sem a ação de ajustar

### Requirement: Validação do ajuste antes de enviar
O popup SHALL impedir o envio, mostrando o erro junto ao campo, quando
a quantidade não for um número inteiro maior que zero (Entrada e
Saída) ou um inteiro maior ou igual a zero (Contagem), quando uma
Saída for maior que o estoque atual, ou quando a Contagem for igual ao
estoque atual (nada a ajustar).

#### Scenario: Saída maior que o estoque
- **WHEN** um administrador escolhe Saída de 8 numa variação com
  estoque 5
- **THEN** o popup mostra um erro informando que há 5 unidades e não
  envia nada ao backend

#### Scenario: Quantidade inválida
- **WHEN** a quantidade está vazia, não é número inteiro ou é zero
  (Entrada/Saída)
- **THEN** o popup mostra o erro no campo e não envia nada

### Requirement: Retorno ao salvar o ajuste
Enquanto o ajuste é enviado, o botão de salvar SHALL indicar
carregamento e ficar desabilitado. Em caso de sucesso, o popup SHALL
fechar, a linha SHALL mostrar o novo estoque (incluindo o destaque de
estoque baixo, se aplicável) e SHALL aparecer um aviso de ajuste
registrado. Em caso de erro do backend ou de comunicação, o popup
SHALL permanecer aberto com os dados preenchidos e mostrar a mensagem
de erro.

#### Scenario: Ajuste salvo
- **WHEN** o backend aceita o ajuste
- **THEN** o popup fecha, a linha mostra o novo estoque e aparece o
  aviso de ajuste registrado

#### Scenario: Backend recusa ou falha
- **WHEN** o backend recusa o ajuste (ex.: estoque mudou por uma venda
  e ficou insuficiente) ou não responde
- **THEN** o popup continua aberto com a mensagem de erro e os campos
  preenchidos, e o botão volta a ficar habilitado
