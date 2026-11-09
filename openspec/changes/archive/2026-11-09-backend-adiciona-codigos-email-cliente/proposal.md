## Why

O cadastro da loja aceita qualquer e-mail sem prova de que ele pertence
ao cliente, e quem esquece a senha não tem como recuperá-la. O grupo
decidiu (2026-11-09) enviar **códigos por e-mail** para confirmar o
cadastro e para recuperar a senha. O envio embutido do Xano só entrega
ao administrador da instância, então os e-mails saem pelo **Brevo**
(plano grátis, remetente verificado, sem domínio próprio).

## What Changes

- Envio de e-mail pelo Brevo (API transacional) numa function
  reutilizável; chave e remetente vêm de variáveis de ambiente do Xano
  (`BREVO_API_KEY`, `BREVO_SENDER_EMAIL`), nunca do código.
- **Confirmação de cadastro**: a conta nova nasce com e-mail não
  confirmado e recebe um código de 6 dígitos (vale 15 minutos, até 5
  tentativas). Novos endpoints para confirmar e para reenviar o código
  (intervalo mínimo de 60 s). Contas já existentes ficam como
  confirmadas.
- **Pedido exige e-mail confirmado**: `loja/pedidos` POST recusa pedido
  de conta não confirmada.
- **Recuperação de senha**: endpoint público que envia o código (resposta
  sempre igual, exista ou não a conta, para não revelar e-mails
  cadastrados) e endpoint que troca a senha com e-mail + código,
  devolvendo um token de cliente. Trocar a senha também confirma o
  e-mail.
- `loja/conta` GET passa a informar se o e-mail está confirmado.

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
- `storefront`: confirmação de e-mail do cliente, recuperação de senha
  por código e exigência de e-mail confirmado para fazer pedido.

## Impact

- Xano: tabela `cliente` (campos de confirmação e de código); function
  `Loja/enviar_codigo`; endpoints `loja/conta/cadastro` (atualizado),
  `loja/conta` GET (atualizado), `loja/pedidos` POST (atualizado),
  novos `loja/conta/confirmar-email`, `loja/conta/reenviar-codigo`,
  `loja/conta/esqueci-senha` e `loja/conta/redefinir-senha`.
- Configuração manual (feita pelo usuário no painel do Xano): variáveis
  de ambiente `BREVO_API_KEY` e `BREVO_SENDER_EMAIL` (e-mail verificado
  como remetente no Brevo).
- Fora do escopo: recuperação de senha da equipe (gestão), e-mail de
  confirmação do pedido, troca de e-mail da conta.
