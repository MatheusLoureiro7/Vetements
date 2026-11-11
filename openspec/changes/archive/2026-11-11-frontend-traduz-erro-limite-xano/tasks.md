## 1. Cliente

- [x] 1.1 `xano_client`: resposta 429 vira a mensagem em português
  (constante `MENSAGEM_LIMITE`), mantendo o `status_code`.

## 2. Verificação

- [x] 2.1 Teste com resposta 429 falsa (sem esperar as novas
  tentativas): mensagem em português e status 429. `pytest` completo e
  `reflex compile --dry` sem erros, sem subir um segundo servidor (o
  servidor de desenvolvimento do usuário recarrega sozinho).

Resultado (2026-11-11): 224 testes (1 novo, resposta 429 falsa → mensagem
em português e status 429). `reflex compile --dry` não foi rodado de
propósito: o servidor de desenvolvimento do usuário estava aberto na
mesma pasta e uma compilação anterior refez a `.web` e quebrou o site
dele (websocket error). A mudança é só no cliente Python (sem
componentes); o servidor dele recarrega sozinho.
