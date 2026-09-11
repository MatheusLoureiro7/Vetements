## ADDED Requirements

### Requirement: Indicação de carregamento durante o login
O sistema SHALL indicar visualmente, no botão de entrar, que uma
tentativa de login está em andamento entre a confirmação do usuário e
a resposta do backend, e SHALL impedir que uma nova tentativa seja
iniciada enquanto a anterior ainda está em andamento.

#### Scenario: Botão de login indica carregamento
- **WHEN** um usuário confirma o login
- **THEN** o botão de entrar passa a indicar carregamento e fica
  desabilitado até que o backend responda (com sucesso ou erro)

#### Scenario: Confirmação repetida é ignorada durante o carregamento
- **WHEN** um usuário confirma o login novamente enquanto a tentativa
  anterior ainda está em andamento
- **THEN** o sistema não inicia uma segunda tentativa de login
