## Why

O backend já aceita ajustes de estoque (change arquivada
`2026-11-04-backend-adiciona-ajuste-estoque`), mas a equipe ainda não
tem como usá-los: a tela Estoque da gestão é só de leitura. Sem a tela,
entrada de mercadoria e correção de contagem continuam impossíveis na
prática.

## What Changes

- `xano_client.py` ganha `adjust_stock(token, variacao_id, quantidade,
  motivo)` para o endpoint `POST variacoes/{variacao_id}/ajustes`.
- Tela **Estoque** (`/gestao/estoque`): administradores veem um botão
  "Ajustar" em cada linha. Vendedores continuam vendo a tela só para
  consulta (o backend também recusa, então isso é conveniência, não
  segurança).
- Popup de ajuste com três tipos: **Entrada** (soma), **Saída** (subtrai)
  e **Contagem** (informa o total contado e o sistema calcula a
  diferença). Campo de quantidade, motivo opcional e prévia do "estoque
  após o ajuste".
- Validação na tela (quantidade inteira positiva; saída não maior que o
  estoque; contagem diferente do atual), estado de "Salvando...",
  mensagem de erro do backend no popup e aviso de sucesso; a linha
  atualiza sem recarregar a página.
- Verificações movidas da change de backend: vendedor recebe acesso
  negado e token de cliente da loja recebe 401.

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
- `inventory`: a tela de Estoque passa a oferecer o ajuste de estoque
  para administradores, com tipos entrada/saída/contagem, prévia,
  validação, carregamento e confirmação.

## Impact

- `vetements/xano_client.py` (novo método).
- `vetements/state/inventory.py` (estado e handlers do popup).
- `vetements/pages/inventory.py` (coluna de ação e popup).
- Testes: `tests/test_xano_client.py` e novo
  `tests/test_inventory_state.py` (cálculo do ajuste e validação).
- Sem mudança no Xano. Fora do escopo: histórico de ajustes na tela,
  edição de tamanho/cor/SKU e ajuste em lote.
