## ADDED Requirements

### Requirement: Página de confirmação de e-mail
A loja SHALL oferecer ao cliente logado uma página para digitar o
código de confirmação recebido por e-mail, com a opção de reenviar o
código e o aviso de verificar a caixa de spam. Depois de criar a conta,
o cliente SHALL ser levado a essa página, preservando a página para a
qual voltaria (por exemplo, o pagamento). Ao confirmar, SHALL seguir
para essa página ou, sem destino, para "Minha conta". Erros do backend
(código inválido ou vencido, muitas tentativas, aguardar para reenviar)
SHALL aparecer na página. Sem login, a página SHALL levar para entrar.

#### Scenario: Confirmar depois do cadastro
- **WHEN** um visitante cria a conta vindo do carrinho e digita o código correto
- **THEN** o e-mail fica confirmado e ele segue para onde ia

#### Scenario: Código errado
- **WHEN** o cliente digita um código errado
- **THEN** a página mostra a mensagem do backend e ele pode tentar de novo ou reenviar

#### Scenario: Reenviar código
- **WHEN** o cliente usa "Reenviar código"
- **THEN** a página informa que um novo código foi enviado, ou mostra a mensagem para aguardar

### Requirement: Página de recuperação de senha
A página de entrar SHALL ter o link "Esqueci minha senha", que leva a
uma página em dois passos: primeiro o cliente informa o e-mail e vê a
mensagem padrão do backend; depois informa o código recebido e a nova
senha (com a dica da regra de senha). Ao concluir, o cliente SHALL ficar
logado e ir para "Minha conta". Erros do backend SHALL aparecer na
página sem perder o e-mail digitado.

#### Scenario: Recuperar a senha
- **WHEN** o cliente pede o código, recebe o e-mail e informa código e nova senha válidos
- **THEN** fica logado na loja e vai para "Minha conta"

#### Scenario: Código inválido na recuperação
- **WHEN** o cliente informa um código errado
- **THEN** a página mostra a mensagem do backend e continua no passo do código

### Requirement: Conta não confirmada na loja
Para cliente logado com e-mail não confirmado, "Minha conta" SHALL
mostrar um aviso com link para confirmar, e a página de pagamento SHALL
levar à página de confirmação (voltando ao pagamento depois de
confirmar) em vez de permitir pagar.

#### Scenario: Pagamento com conta não confirmada
- **WHEN** um cliente com e-mail não confirmado abre a página de pagamento
- **THEN** é levado para confirmar o e-mail e, depois de confirmar, volta ao pagamento
