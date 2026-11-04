## Why

Hoje a quantidade em estoque de uma variação só é definida quando a
variação é cadastrada e depois só diminui com vendas. Não existe como
dar entrada de mercadoria que chegou nem corrigir o número depois de
uma contagem, o que contraria um objetivo central do MVP ("visualizar e
atualizar a quantidade disponível de cada variação"). Esta change cria
no Xano a operação de ajuste de estoque; a tela vem numa change
`frontend-` separada.

## What Changes

- Novo endpoint autenticado no grupo **Catalogo** do Xano para ajustar
  o estoque de uma variação: recebe uma quantidade de ajuste (positiva
  para entrada, negativa para saída/perda) e um motivo opcional.
- Somente **administradores** podem ajustar; vendedores recebem acesso
  negado (verificado no backend).
- O backend rejeita ajuste igual a zero, variação inexistente e
  qualquer ajuste que deixaria o estoque negativo.
- Cada ajuste aceito é registrado na tabela `event_log` já existente
  (ação `ajuste_estoque`), com quem ajustou, estoque anterior, novo
  estoque, quantidade ajustada e motivo.

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
- `inventory`: passa a permitir que administradores ajustem a
  quantidade em estoque de uma variação (entrada ou saída), com
  registro de quem ajustou, mantendo a regra de estoque nunca negativo.

## Impact

- **Xano**: novo arquivo `xano/api/catalogo/variacoes_ajustes_POST.xs`
  (endpoint `POST variacoes/{variacao_id}/ajustes`). Sem tabela nova:
  reaproveita `variacao_produto` e `event_log`.
- **Reflex**: nenhum arquivo nesta change.
- Fora do escopo: a chamada no `xano_client.py` e a tela de ajuste na
  gestão (change `frontend-adiciona-ajuste-estoque`), histórico de ajustes visível na
  interface e edição dos demais campos da variação.
