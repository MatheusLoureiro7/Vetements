## Context

Todo acesso HTTP ao Xano passa por `_request` em `vetements/xano_client.py`,
que hoje chama `httpx.request(...)` (conexão nova por chamada, timeout único
de 10s, sem novas tentativas) e converte falhas em `XanoAPIError`. Os
`state/*.py` só conhecem as funções públicas do módulo e `XanoAPIError`, então
a mudança pode ficar inteiramente dentro desse arquivo.

## Goals / Non-Goals

**Goals:**
- Concentrar a resiliência em `_request`, sem alterar a assinatura das
  funções públicas nem o contrato de `XanoAPIError`.
- Manter os testes rápidos (sem esperas reais).

**Non-Goals:**
- Chamadas assíncronas/paralelas e cache.
- Biblioteca externa de retry (ex.: `tenacity`).

## Decisions

- **`httpx.Client` em nível de módulo.** Um único cliente compartilhado,
  criado na importação, com `httpx.Timeout(15.0, connect=5.0)`. O `Client`
  do httpx é thread-safe e mantém o pool de conexões, o que atende os
  event handlers do Reflex. Alternativa descartada: um `Client` por state
  (duplicaria configuração e não compartilharia conexões).
- **Laço de tentativas próprio, sem dependência nova.** São ~15 linhas:
  `_MAX_TENTATIVAS = 3`, espera `0.5 * 2**(tentativa-1)` via `time.sleep`.
  Alternativa descartada: `httpx.HTTPTransport(retries=...)`, que só repete
  falhas de conexão e não cobre 502/503/504/429 nem timeouts de leitura.
- **Regra de repetição por método:**
  - GET: repete em `httpx.TransportError` (rede/timeout) e nos status
    `{429, 502, 503, 504}`.
  - POST (e demais): repete apenas em `httpx.ConnectError` e
    `httpx.ConnectTimeout`, que garantem que nada foi enviado.
- **Testabilidade:** os testes fazem `monkeypatch` de `client._client.request`
  e de `client.time.sleep`, em vez de `httpx.request`.

## Risks / Trade-offs

- [GET lento com falha persistente pode levar até ~3×15s + 1,5s] →
  aceitável para o MVP; o caso comum (servidor fora) cai no timeout de
  conexão de 5s.
- [Handlers do Reflex bloqueiam durante a espera entre tentativas] → as
  esperas somam no máximo 1,5s; a interface já mostra estado de carregamento.
- [Cliente de módulo não é fechado explicitamente] → o processo do Reflex
  vive enquanto o app roda; o SO libera as conexões ao encerrar.
