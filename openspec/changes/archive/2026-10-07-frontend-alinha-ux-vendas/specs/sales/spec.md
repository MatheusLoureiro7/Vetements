## ADDED Requirements

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
