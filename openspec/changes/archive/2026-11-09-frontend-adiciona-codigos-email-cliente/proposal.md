## Why

O backend passa a confirmar o e-mail do cliente e a recuperar senha por
código enviado por e-mail (change `backend-adiciona-codigos-email-cliente`).
A loja precisa das telas para o cliente digitar esses códigos.

## What Changes

- Nova página **Confirmar e-mail** (`/conta/confirmar`): campo do código
  de 6 dígitos, "Reenviar código" e aviso para olhar o spam. Depois de
  criar a conta, o cliente vai para essa página (mantendo para onde ia,
  ex.: o pagamento).
- Nova página **Recuperar senha** (`/conta/recuperar`), com link
  "Esqueci minha senha" na página de entrar: passo 1 pede o e-mail;
  passo 2 pede o código e a nova senha. Ao concluir, o cliente entra na
  conta.
- **Pagamento** e **Minha conta**: conta não confirmada vê um aviso com
  link para confirmar; a página de pagamento leva à confirmação antes de
  permitir pagar.
- `xano_client`: métodos para confirmar, reenviar, pedir código de
  recuperação e redefinir a senha.

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
- `storefront`: telas de confirmação de e-mail e de recuperação de
  senha; pagamento e "Minha conta" tratam conta não confirmada.

## Impact

- `vetements/routes.py`, `vetements/xano_client.py`,
  `vetements/loja/state/conta.py` (ou módulo novo para códigos),
  `vetements/loja/state/pagamento.py`, `vetements/loja/pages/conta.py`
  (novas páginas e link), `vetements/vetements.py`, CSS e testes.
- Depende da change de backend aplicada e das variáveis do Brevo
  configuradas.
