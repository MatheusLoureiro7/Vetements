## 1. Cliente HTTP resiliente

- [x] 1.1 Criar `httpx.Client` compartilhado em `vetements/xano_client.py` com `httpx.Timeout(15.0, connect=5.0)` e fazer `_request` usá-lo; verificar com `pytest tests/test_xano_client.py` (testes existentes ajustados para mockar `_client.request`)
- [x] 1.2 Implementar novas tentativas em `_request` (até 3, espera 0,5s/1s) para GET em erro de rede e status 429/502/503/504, e para outros métodos só em `ConnectError`/`ConnectTimeout`; verificar com os testes da seção 2

## 2. Testes

- [x] 2.1 Adicionar testes em `tests/test_xano_client.py`: GET falha de rede → sucesso; GET 503 → sucesso; GET esgota tentativas → `XanoAPIError` de rede; GET 403 não repete; POST `ConnectError` → sucesso; POST `ReadTimeout` não repete; POST 503 não repete; verificar com `pytest` passando sem esperas reais (`time.sleep` mockado)

## 3. Verificação integrada

- [x] 3.1 Rodar `pytest` completo e `reflex compile --dry` sem erros
- [x] 3.2 Teste manual: com o app rodando, fazer login e abrir dashboard, produtos, clientes e vendas; confirmar que os dados carregam normalmente
