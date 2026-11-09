## ADDED Requirements

### Requirement: Confirmação do e-mail do cliente
Ao criar uma conta na loja, o backend SHALL registrá-la com e-mail não
confirmado e SHALL enviar ao e-mail informado um código numérico de 6
dígitos, válido por 15 minutos. O cliente logado SHALL poder confirmar
o e-mail informando o código e pedir um novo código, com intervalo
mínimo de 60 segundos entre envios; um novo código invalida o anterior.
Depois de 5 tentativas erradas, o código SHALL deixar de valer e um
novo código será necessário. O código MUST NOT aparecer em nenhuma
resposta da API e MUST ser guardado de forma não legível (hash). Contas
criadas antes desta mudança SHALL ser consideradas confirmadas.

#### Scenario: Cadastro envia o código
- **WHEN** um visitante cria uma conta com e-mail válido
- **THEN** a conta é criada com e-mail não confirmado, a resposta traz o token e indica que o e-mail não está confirmado, e um código de 6 dígitos é enviado para o e-mail informado

#### Scenario: Código correto confirma
- **WHEN** o cliente logado envia o código recebido dentro de 15 minutos
- **THEN** o e-mail passa a constar como confirmado

#### Scenario: Código errado ou vencido
- **WHEN** o cliente envia um código errado, ou o correto depois de 15 minutos
- **THEN** o backend recusa com mensagem de código inválido ou vencido e o e-mail continua não confirmado

#### Scenario: Muitas tentativas
- **WHEN** o cliente erra o código 5 vezes
- **THEN** o código deixa de valer, mesmo o correto, até que um novo seja pedido

#### Scenario: Reenvio antes de 60 segundos
- **WHEN** o cliente pede um novo código menos de 60 segundos depois do último envio
- **THEN** o backend recusa informando para aguardar, sem enviar e-mail

### Requirement: Pedido exige e-mail confirmado
O backend SHALL recusar pedidos da loja de clientes cujo e-mail não
foi confirmado, sem criar venda nem baixar estoque.

#### Scenario: Conta não confirmada tenta comprar
- **WHEN** um cliente com e-mail não confirmado envia um pedido válido
- **THEN** o backend recusa com a mensagem "Confirme seu e-mail para finalizar o pedido." e nada é gravado

### Requirement: Recuperação de senha do cliente
O backend SHALL permitir, sem login, pedir um código de recuperação de
senha informando o e-mail. Se houver conta com senha para esse e-mail,
SHALL enviar um código de 6 dígitos válido por 15 minutos (com o mesmo
intervalo mínimo de 60 segundos entre envios); a resposta SHALL ser a
mesma exista ou não a conta. Com e-mail, código válido e uma nova senha
que siga a regra de senha (8+ caracteres, com letra e número), o
backend SHALL trocar a senha, invalidar o código, marcar o e-mail como
confirmado e devolver um token de cliente. As mesmas regras de 5
tentativas e de não expor o código valem aqui.

#### Scenario: Pedir código de recuperação
- **WHEN** alguém pede recuperação para um e-mail com conta
- **THEN** recebe a resposta padrão e o código é enviado para esse e-mail

#### Scenario: E-mail sem conta
- **WHEN** alguém pede recuperação para um e-mail sem conta
- **THEN** recebe exatamente a mesma resposta padrão e nenhum e-mail é enviado

#### Scenario: Redefinir com código válido
- **WHEN** o cliente envia e-mail, código válido e nova senha válida
- **THEN** a senha é trocada, a senha antiga deixa de funcionar e a resposta traz um token de cliente

#### Scenario: Nova senha fraca
- **WHEN** o código é válido mas a nova senha não segue a regra
- **THEN** o backend recusa com a mensagem de senha e não troca a senha nem consome o código
