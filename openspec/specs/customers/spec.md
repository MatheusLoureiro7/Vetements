## Purpose

Mantém um cadastro básico de clientes para que possam ser associados
a vendas.

## Requirements

### Requirement: Cadastro de cliente
O sistema SHALL permitir cadastrar um cliente com nome e ao menos um
contato (telefone e/ou e-mail).

#### Scenario: Cadastro válido
- **WHEN** um usuário preenche nome e ao menos um contato (telefone
  ou e-mail) e confirma
- **THEN** um novo cliente aparece na listagem

#### Scenario: Contato obrigatório
- **WHEN** um usuário tenta salvar um cliente sem telefone e sem
  e-mail
- **THEN** o sistema impede o salvamento e indica que ao menos um
  contato é obrigatório

### Requirement: Listagem e busca de clientes
O sistema SHALL exibir a lista de clientes cadastrados e SHALL
permitir filtrar essa lista por nome.

#### Scenario: Buscar cliente por nome
- **WHEN** um usuário digita um termo no campo de busca da tela de
  Clientes
- **THEN** a lista é filtrada para clientes cujo nome contém o termo

### Requirement: Erro ao cadastrar cliente
O sistema SHALL exibir uma mensagem de erro e SHALL não adicionar o
cliente à listagem quando o backend rejeitar o cadastro (falha de
validação ou de comunicação), mantendo os dados preenchidos no
formulário para o usuário corrigir ou tentar de novo.

#### Scenario: Backend rejeita o cadastro de cliente
- **WHEN** um usuário confirma o cadastro de um cliente e o backend
  retorna um erro (validação ou falha de comunicação)
- **THEN** o sistema exibe uma mensagem de erro, não adiciona o
  cliente à listagem, e mantém os dados preenchidos no formulário

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

### Requirement: Dados de acesso do cliente não são expostos
As respostas de listagem e cadastro de clientes da gestão MUST NOT conter
a senha da conta do cliente na loja (nem seu hash), mesmo para clientes
que tenham conta.

#### Scenario: Listar clientes com conta na loja
- **WHEN** a gestão lista clientes e algum deles tem conta na loja
- **THEN** a resposta traz id, nome, telefone, e-mail e data de cadastro, sem senha

### Requirement: Edição de cliente
O backend SHALL permitir que um usuário da equipe (administrador ou
vendedor) edite o nome, o telefone e o e-mail de um cliente, com as
mesmas regras do cadastro: nome obrigatório e ao menos um contato
(telefone ou e-mail). Para cliente com conta na loja virtual, o e-mail
MUST NOT ficar vazio nem ser igual ao e-mail de outra conta da loja; se
o e-mail mudar, a conta SHALL voltar a "e-mail não confirmado" e
qualquer código de verificação pendente SHALL ser invalidado, de modo
que o cliente confirme o novo e-mail antes do próximo pedido. A resposta
MUST NOT conter a senha, o hash da senha nem dados de código, e SHALL
informar se o cliente precisará confirmar o novo e-mail.

#### Scenario: Corrigir nome e telefone
- **WHEN** um vendedor edita o nome e o telefone de um cliente
- **THEN** os dados são salvos e a resposta traz o cliente atualizado

#### Scenario: Sem contato
- **WHEN** a edição deixa telefone e e-mail vazios
- **THEN** o backend recusa com "Informe ao menos um contato: telefone ou e-mail." e nada muda

#### Scenario: Trocar e-mail de cliente com conta na loja
- **WHEN** a equipe troca o e-mail de um cliente que tem conta na loja
- **THEN** o novo e-mail passa a ser o login, a conta fica com e-mail não confirmado, o código pendente deixa de valer e a resposta indica que ele precisará confirmar o novo e-mail

#### Scenario: E-mail de outra conta da loja
- **WHEN** a equipe tenta dar a um cliente com conta na loja o e-mail de outra conta da loja
- **THEN** o backend recusa com "Este e-mail já é usado por outra conta da loja." e nada muda

#### Scenario: Apagar o e-mail de quem tem conta
- **WHEN** a equipe deixa vazio o e-mail de um cliente com conta na loja
- **THEN** o backend recusa com "Cliente com conta na loja precisa de e-mail." e nada muda

#### Scenario: Cliente inexistente ou sem login da equipe
- **WHEN** a edição é de um cliente que não existe, ou vem sem token da equipe
- **THEN** o backend recusa (erro de entrada ou de autenticação) e nada muda

### Requirement: Edição de cliente na tela de Clientes
A tela de Clientes SHALL oferecer, em cada linha, a ação "Editar", que
abre um popup com nome, telefone e e-mail do cliente já preenchidos.
Ao salvar, a tela SHALL indicar carregamento e impedir um segundo envio
enquanto o primeiro não termina. Se o backend recusar, a tela SHALL
mostrar a mensagem no popup e manter o que foi digitado. Se aceitar, a
tela SHALL fechar o popup, mostrar um aviso de sucesso e atualizar a
lista; quando o backend indicar que o cliente precisará confirmar o novo
e-mail, o aviso SHALL dizer isso. Fechar o popup sem salvar SHALL
descartar o que foi digitado.

#### Scenario: Editar telefone
- **WHEN** a equipe edita o telefone de um cliente e salva
- **THEN** o popup fecha, aparece "Cliente atualizado." e a lista mostra o novo telefone

#### Scenario: Trocar e-mail de quem tem conta na loja
- **WHEN** a equipe troca o e-mail de um cliente com conta na loja e salva
- **THEN** aparece "Cliente atualizado. Ele precisará confirmar o novo e-mail na loja antes do próximo pedido."

#### Scenario: Backend recusa
- **WHEN** a equipe apaga telefone e e-mail e salva
- **THEN** o popup continua aberto com a mensagem do backend e os campos como foram digitados

#### Scenario: Fechar sem salvar
- **WHEN** a equipe altera campos e fecha o popup sem salvar
- **THEN** nada é enviado e, ao abrir de novo, os campos mostram os dados atuais do cliente
