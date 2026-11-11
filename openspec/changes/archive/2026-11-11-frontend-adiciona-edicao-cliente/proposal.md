## Why

O backend passa a aceitar a edição de clientes (change
`backend-adiciona-edicao-cliente`), mas a tela de Clientes da gestão só
lista e cadastra. A equipe precisa corrigir nome, telefone e e-mail por
ali.

## What Changes

- Tela de Clientes: botão "Editar" em cada linha, que abre um popup com
  nome, telefone e e-mail já preenchidos.
- Salvar com indicação de carregamento e bloqueio de clique duplo; erro
  do backend mostrado no popup, mantendo o que foi digitado; sucesso
  fecha o popup, mostra aviso e atualiza a lista.
- Quando o backend indicar que o cliente precisará confirmar o novo
  e-mail, o aviso diz isso ("Cliente atualizado. Ele precisará confirmar
  o novo e-mail na loja antes do próximo pedido.").
- Cliente Python do Xano: função de edição.

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
- `customers`: nova regra "Edição de cliente na tela de Clientes".

## Impact

- `vetements/xano_client.py`, `vetements/state/customers.py`,
  `vetements/pages/customers.py` e testes.
- Depende da change de backend aplicada antes.
- Fora do escopo: edição pelo próprio cliente na loja; desativar cliente.
