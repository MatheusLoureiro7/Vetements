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

### Requirement: Registro de venda em popup
A tela de Vendas SHALL exibir o título "Vendas" com um botão "+ Nova
venda" que abre um popup contendo a seleção de itens, o carrinho, o
cliente opcional, o total e a ação de confirmar. Fechar o popup sem
confirmar (Cancelar, X, Esc ou clique fora) SHALL descartar os itens e o
cliente selecionados. Enquanto a confirmação estiver em andamento, o
popup MUST NOT ser fechado.

#### Scenario: Abrir nova venda
- **WHEN** o usuário clica em "+ Nova venda"
- **THEN** o popup de nova venda abre com o carrinho vazio e sem cliente selecionado

#### Scenario: Cancelar descarta o carrinho
- **WHEN** o usuário adiciona itens no popup e o fecha sem confirmar
- **THEN** ao abrir "+ Nova venda" novamente o carrinho está vazio

#### Scenario: Falha ao confirmar mantém o popup aberto
- **WHEN** a confirmação da venda falha (rede ou rejeição do backend)
- **THEN** o popup continua aberto com o carrinho preenchido e a mensagem de erro visível

### Requirement: Aviso de venda registrada
Após uma venda ser confirmada com sucesso, o sistema SHALL fechar o popup
e exibir na tela de Vendas o aviso de sucesso no padrão visual da
aplicação, com o texto "Venda registrada.", e o histórico SHALL já
incluir a nova venda.

#### Scenario: Confirmação bem-sucedida
- **WHEN** o usuário confirma uma venda válida
- **THEN** o popup fecha, o aviso "Venda registrada." aparece acima do histórico e a venda consta na listagem

### Requirement: Erro de carregamento visível na tela de Vendas
Se o carregamento de clientes, variações ou do histórico de vendas
falhar, a tela de Vendas SHALL exibir a mensagem de erro correspondente.

#### Scenario: Falha ao carregar o histórico
- **WHEN** a tela de Vendas é aberta e a consulta do histórico falha
- **THEN** a tela exibe "Não foi possível carregar o histórico de vendas."

### Requirement: Busca no histórico de vendas por cliente
A tela de Vendas SHALL oferecer um campo "Buscar por cliente..." que
filtra o histórico exibido, mantendo as vendas cujo nome do cliente
contenha o texto digitado, sem diferenciar maiúsculas de minúsculas.
Vendas sem cliente SHALL ser encontradas pelo termo "Balcão". Com o campo
vazio, todo o histórico SHALL ser exibido.

#### Scenario: Filtrar por parte do nome
- **WHEN** o usuário digita "ana" no campo de busca
- **THEN** o histórico mostra apenas as vendas cujo cliente contém "ana" (ex.: "Ana Souza", "Mariana")

#### Scenario: Nenhuma venda encontrada
- **WHEN** o termo digitado não corresponde a nenhum cliente do histórico
- **THEN** a tela exibe o estado vazio "Nenhuma venda encontrada."

### Requirement: Origem da venda
Toda venda SHALL ter uma origem: `balcao` (registrada por um usuário da
equipe na gestão) ou `loja_virtual` (pedido feito por um cliente na loja).
Vendas de balcão SHALL continuar associadas ao usuário que as registrou;
vendas da loja virtual SHALL ter cliente associado e nenhum usuário da
equipe. Vendas existentes sem origem registrada SHALL ser tratadas como
de balcão.

#### Scenario: Venda registrada na gestão
- **WHEN** um usuário da equipe registra uma venda na gestão
- **THEN** a venda tem origem `balcao` e o usuário responsável

#### Scenario: Pedido da loja virtual
- **WHEN** um cliente conclui um pedido na loja virtual
- **THEN** a venda tem origem `loja_virtual`, o cliente associado e nenhum usuário da equipe

### Requirement: Pedidos da loja na gestão
A gestão SHALL identificar as vendas de origem loja virtual: na tela de
Vendas o cliente aparece como "Nome (loja virtual)", e no dashboard o
responsável aparece como "Loja virtual", em vez de um usuário da equipe.

#### Scenario: Pedido da loja no histórico de vendas
- **WHEN** existe um pedido feito pela loja virtual e a equipe abre a tela de Vendas
- **THEN** a venda aparece com o nome do cliente seguido de "(loja virtual)"

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
