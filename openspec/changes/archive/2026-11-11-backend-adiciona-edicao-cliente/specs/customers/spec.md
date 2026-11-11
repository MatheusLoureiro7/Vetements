## ADDED Requirements

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
