## 1. Endpoint

- [x] 1.1 `xano/api/clientes/clientes_PATCH.xs`
  (`clientes/{cliente_id}` PATCH): papel; cliente existe; ao menos um
  contato; se tem conta e o e-mail mudou: e-mail não vazio e não usado
  por outra conta da loja, depois gravar com `email_confirmado: false`,
  `codigo_hash: ""`, `codigo_tentativas: 0`; senão gravar só os dados.
  Resposta sem senha/código, com `reconfirmar_email`.
- [x] 1.2 Dry-run só com esse arquivo; mostrar preview; aplicar após
  confirmação; pull de verificação. Feito em 2026-11-11: preview com 1
  CREATE, nada atualizado nem removido; push aplicado.

## 2. Verificação (script; dados de teste)

- [x] 2.1 Cliente de balcão: editar nome/telefone → 200,
  `reconfirmar_email` false; sem contato → 400; restaurar os dados
  originais.
- [x] 2.2 Conta de teste da loja (`codigo.teste…@example.com`, id 5):
  e-mail de outra conta (`cliente.teste@vetements.local`) → 400; e-mail
  vazio → 400; e-mail novo → 200 com `reconfirmar_email` true; login da
  loja com o novo e-mail funciona e `GET loja/conta` mostra
  `email_confirmado` false; login com o e-mail antigo falha.
- [x] 2.3 Vendedor edita → 200; sem token → 401; token de cliente → 401;
  cliente inexistente → erro; a resposta nunca tem `password` nem
  `codigo_*`.

Resultado (2026-11-11, script Python): balcão #1 editado pelo vendedor →
200 (`reconfirmar_email` false); sem contato → 400 "Informe ao menos um
contato: telefone ou e-mail."; dados originais restaurados. Conta de
teste #5: e-mail de `cliente.teste` → 400 "Este e-mail já é usado por
outra conta da loja."; e-mail vazio → 400 "Cliente com conta na loja
precisa de e-mail."; só o nome com o mesmo e-mail → 200 sem
reconfirmação; e-mail novo `codigo.editado1794232794@example.com` → 200
com `reconfirmar_email` true; login da loja com o e-mail novo funciona e
`GET loja/conta` mostra `email_confirmado` false; o e-mail antigo → 403.
Cliente inexistente → 400 "Cliente não encontrado."; sem token → 401;
token de cliente → 401. Nenhuma resposta trouxe `password` nem
`codigo_*`. A conta #5 ficou com o e-mail novo e não confirmada (dado de
teste).
