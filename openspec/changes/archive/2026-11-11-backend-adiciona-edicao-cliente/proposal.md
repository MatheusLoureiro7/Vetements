## Why

A gestão só cadastra clientes: um nome digitado errado ou um telefone ou
e-mail que mudou não pode ser corrigido. O usuário pediu (2026-11-11) a
edição de clientes na gestão. Esta change prepara o backend; a tela vem
na change `frontend-adiciona-edicao-cliente`.

## What Changes

- Novo endpoint `PATCH clientes/{cliente_id}` (grupo Clientes) para
  editar nome, telefone e e-mail, com as mesmas regras do cadastro (nome
  obrigatório, ao menos um contato).
- Administrador e vendedor podem editar (decisão do usuário).
- Cliente com conta na loja (tem senha): o e-mail é o login, então não
  pode ficar vazio nem ser o e-mail de outra conta da loja. Se o e-mail
  mudar, a conta volta a "e-mail não confirmado" (decisão do usuário) e
  qualquer código pendente é invalidado: o cliente confirma o novo
  e-mail com código antes do próximo pedido (fluxo já existente).
- A resposta nunca traz senha, hash nem dados de código, e informa se o
  cliente precisará reconfirmar o e-mail.

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
- `customers`: nova regra "Edição de cliente".

## Impact

- Xano: 1 endpoint novo no grupo Clientes. Tabela `cliente` sem campos
  novos.
- Fora do escopo: o cliente editar os próprios dados em "Minha conta",
  desativar cliente, histórico de edições, unicidade de e-mail entre
  clientes só de balcão (o cadastro de hoje também não exige).
