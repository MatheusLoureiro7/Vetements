## ADDED Requirements

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
