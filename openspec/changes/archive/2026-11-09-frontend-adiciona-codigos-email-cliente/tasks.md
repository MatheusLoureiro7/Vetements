## 1. Cliente e estado

- [x] 1.1 `xano_client`: `confirm_email(token, codigo)`,
  `resend_code(token)`, `request_password_reset(email)`,
  `reset_password(email, codigo, nova_senha)`, com testes.
- [x] 1.2 `ContaState.email_confirmado` (cadastro, login + `loja/conta`,
  `load_conta`); cadastro redireciona para `/conta/confirmar`.
- [x] 1.3 `CodigosState` (confirmar, reenviar, pedir código, redefinir)
  e testes das partes puras.

## 2. Telas e rotas

- [x] 2.1 Rotas `/conta/confirmar` e `/conta/recuperar` registradas.
- [x] 2.2 Página de confirmação (código, reenviar, aviso de spam).
- [x] 2.3 Página de recuperação em dois passos e link "Esqueci minha
  senha" na página de entrar.
- [x] 2.4 Aviso em "Minha conta" e redirecionamento no pagamento para
  conta não confirmada.

## 3. Verificação

- [x] 3.1 `pytest` completo e `reflex compile --dry` sem erros. Feito:
  195 testes; compilação com sucesso.
- [x] 3.2 No navegador, com um e-mail real indicado pelo usuário:
  criar conta → página de confirmação; pagamento antes de confirmar →
  leva à confirmação; código errado → mensagem; código correto →
  confirmado e volta ao destino; "Esqueci minha senha" → código →
  nova senha → logado em "Minha conta"; senha antiga não funciona mais.
  Parcial em 2026-11-09 (sem o e-mail chegar, Brevo bloqueado por IP):
  cadastro pelo carrinho → `/conta/confirmar?proximo=/carrinho&enviado=0`
  com o aviso para reenviar; código malformado → "Digite os 6 números do
  código."; código errado → mensagem do backend; reenviar → botão
  desabilitado durante o envio e "Não foi possível enviar o código agora…";
  `/pagamento` antes de confirmar → `/conta/confirmar?proximo=/pagamento`;
  "Minha conta" mostra o aviso com link para confirmar; link "Esqueci
  minha senha" na página de entrar; recuperação: passo 1 → mensagem
  padrão e passo 2; código errado → mensagem e continua no passo 2.
  Completo em 2026-11-09 com e-mail real (bibibico+vetements@gmail.com):
  cadastro pelo carrinho → código chegou → confirmado e voltou a
  `/carrinho`, aviso sumiu e `/pagamento` abre; "Esqueci minha senha" →
  código chegou → nova senha → logado em "Minha conta"; senha antiga
  recusada. Bug achado e corrigido: o `on_load` roda de novo quando a
  conexão cai e volta (aba parada enquanto o cliente lê o e-mail), o que
  zerava a recuperação para o passo 1; agora o passo do código é mantido
  enquanto houver e-mail pedido (o botão "Usar outro e-mail" recomeça) e
  é limpo após redefinir. Conferido recarregando a página no passo 2.
