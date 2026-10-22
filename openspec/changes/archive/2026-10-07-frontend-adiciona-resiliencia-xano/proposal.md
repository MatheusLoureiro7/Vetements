## Why

A conexão com a API do Xano oscila quando a internet da loja está instável:
uma falha momentânea (pacote perdido, timeout de conexão, 502/503 do Xano)
vira imediatamente uma mensagem de erro na tela, e cada requisição abre uma
conexão TLS nova, multiplicando os pontos de falha (o dashboard faz 4
chamadas seguidas, cada uma com handshake próprio).

## What Changes

- O cliente HTTP do frontend (`vetements/xano_client.py`) passa a reutilizar
  conexões com o Xano (keep-alive) em vez de abrir uma conexão nova por
  requisição.
- Leituras (GET) que falham por problema de rede ou por erro transitório do
  servidor (502, 503, 504, 429) são repetidas automaticamente, com espera
  crescente entre as tentativas, antes de exibir erro ao usuário.
- Escritas (POST) só são repetidas quando a falha ocorreu **antes** de a
  requisição chegar ao servidor (falha ao conectar). Qualquer outra falha
  de POST não é repetida, para não duplicar vendas, clientes ou produtos.
- Timeouts separados para conexão (curto) e leitura da resposta (mais
  longo), em vez de um timeout único de 10s.
- Nenhuma mudança na interface: as telas continuam recebendo
  `XanoAPIError` como hoje, só que com menos frequência.

Fora do escopo: paralelizar as chamadas do dashboard, cache local de dados,
modo offline e qualquer alteração nos endpoints do Xano (backend).

## Capabilities

### New Capabilities
- `xano-api-client`: comportamento de comunicação do frontend com a API do
  Xano diante de falhas de rede — reutilização de conexão, novas tentativas
  seguras e timeouts.

### Modified Capabilities
<!-- Nenhuma: os requisitos das telas (auth, sales etc.) não mudam. -->

## Impact

- Código: `vetements/xano_client.py` (único ponto de acesso HTTP ao Xano).
- Testes: `tests/test_xano_client.py` (ajuste do mock e novos casos).
- Dependências: nenhuma nova (`httpx` já é usado).
- Backend (Xano): nenhum impacto.
