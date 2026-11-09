## 1. Configuração (usuário)

- [x] 1.1 No painel do Xano, criar as variáveis de ambiente
  `BREVO_API_KEY` (chave do Brevo) e `BREVO_SENDER_EMAIL` (e-mail
  verificado como remetente no Brevo). Feito pelo usuário em
  2026-11-09; o agente não manipula a chave.

## 2. Banco e functions

- [x] 2.1 `cliente`: `email_confirmado` (bool, padrão true),
  `codigo_hash`, `codigo_tipo` (enum `confirmacao` | `senha`),
  `codigo_expira_em`, `codigo_enviado_em`, `codigo_tentativas`.
- [x] 2.2 Function `Loja/enviar_codigo` (intervalo de 60 s, gera e
  grava hash, envia pelo Brevo, devolve true/false).
- [x] 2.3 Function `Loja/verificar_codigo` (tipo, validade, 5
  tentativas, limpa ao acertar).

## 3. Endpoints

- [x] 3.1 `loja/conta/cadastro`: grava `email_confirmado = false`,
  envia o código, resposta com `email_confirmado` e `codigo_enviado`.
- [x] 3.2 `loja/conta` GET: inclui `email_confirmado`.
- [x] 3.3 `loja/conta/confirmar-email` (auth cliente) e
  `loja/conta/reenviar-codigo` (auth cliente).
- [x] 3.4 `loja/conta/esqueci-senha` (público, resposta fixa) e
  `loja/conta/redefinir-senha` (público, devolve token).
- [x] 3.5 `loja/pedidos` POST: recusa conta não confirmada antes de
  qualquer gravação.
- [x] 3.6 Dry-run só com esses arquivos; preview; push após
  confirmação; pull de verificação. Feito em 2026-11-09 (usuário
  autorizou aplicar): `cliente` UPDATE + 6 ADD_FIELD, 2 functions e 4
  endpoints CREATE, 3 endpoints UPDATE; nada removido. Pull: lógica
  preservada. Correção posterior em `Loja/enviar_codigo`: gravar
  `codigo_enviado_em: null` após falha era ignorado pelo Xano (o reenvio
  seguia bloqueado), então o horário do envio passou a ser gravado só
  quando o Brevo aceita (status 201).

## 4. Verificação

- [x] 4.1 Script: cadastro de conta de teste com e-mail fictício →
  `email_confirmado: false`; pedido dessa conta → recusado; reenviar
  antes de 60 s → recusado; código errado 5x → bloqueado; confirmar e
  esqueci-senha nunca devolvem o código; esqueci-senha com e-mail sem
  conta → mesma resposta; nova senha fraca → recusada sem consumir
  tentativa.
  Feito em 2026-11-09 (conta `codigo.teste1794232794@example.com`, id
  5): conta antiga (`cliente.teste`) aparece confirmada; cadastro →
  `email_confirmado: false`, sem código/hash na resposta nem no GET;
  pedido → "Confirme seu e-mail para finalizar o pedido."; 5 códigos
  errados → "Código inválido ou vencido…", 6ª → "Muitas tentativas…";
  esqueci-senha com e sem conta → mesma resposta; senha fraca na
  redefinição → mensagem de senha; código errado → recusado; senha
  antiga continua valendo. O envio em si falhou: o Brevo respondeu 401
  "unrecognised IP address 34.9.14.251" (bloqueio por IP da conta
  Brevo), diagnosticado com um endpoint temporário `diag-brevo`
  (somente admin, devolve só status/mensagem). Ação do usuário:
  liberar o IP ou desativar o bloqueio em
  https://app.brevo.com/security/authorised_ips.
- [x] 4.2 Envio real: com um e-mail de caixa real indicado pelo
  usuário, o código chega (cadastro e recuperação); confirmar com o
  código recebido → confirmado; redefinir a senha com o código →
  senha antiga deixa de funcionar e a nova entra. Exige o usuário ler o
  código no e-mail. Feito em 2026-11-09 (após liberar os IPs de saída do
  Xano no Brevo) com bibibico+vetements@gmail.com: código de cadastro
  chegou e confirmou a conta; código de recuperação chegou, a nova senha
  entra, a antiga é recusada e o mesmo código reutilizado é recusado
  ("Código inválido ou vencido."). Pedir um novo código invalida o
  anterior.
