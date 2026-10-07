## Context

`DashboardState.load` (evento síncrono do Reflex) chama em sequência 5
funções de `vetements/xano_client.py`. O cliente HTTP é um `httpx.Client`
compartilhado e thread-safe (change `frontend-add-xano-resilience`).

## Goals / Non-Goals

**Goals:**
- Reduzir o tempo de carregamento do dashboard sem mudar o resultado exibido.

**Non-Goals:**
- Converter o state para eventos assíncronos (`async def`) ou trocar o
  cliente HTTP para `httpx.AsyncClient`.

## Decisions

- **`ThreadPoolExecutor` com 5 workers, dentro do evento.** As chamadas são
  I/O (o GIL é liberado durante a rede) e o cliente já é thread-safe; é a
  menor mudança possível. Alternativa descartada: `async` +
  `httpx.AsyncClient` — exigiria duplicar o cliente ou migrar todos os
  states, fora do escopo.
- **Função auxiliar `_buscar_dados(token)`** que devolve as 5 listas.
  `future.result()` repropaga a primeira `XanoAPIError`, mantendo o
  tratamento de erro atual do `load`. Isolá-la permite testar o paralelismo
  sem instanciar o state do Reflex.

## Risks / Trade-offs

- [5 conexões simultâneas por carregamento do dashboard] → bem abaixo do
  limite do pool do httpx (100) e do volume de uma loja única.
- [Falha em uma consulta não cancela as demais] → elas terminam em
  segundo plano e os resultados são descartados; custo desprezível.
