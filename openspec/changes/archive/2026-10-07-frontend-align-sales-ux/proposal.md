## Why

A tela de Vendas ficou fora do padrão de UX que Produtos e Clientes já
seguem: não tem título de seção com a ação principal, o formulário de
venda ocupa o topo da tela o tempo todo, erros de carregamento nunca são
exibidos (o estado `load_error` existe, mas não aparece) e a confirmação
de sucesso é um texto solto em vez do aviso padrão da aplicação.

## What Changes

- Título de seção "Vendas" com o botão "+ Nova venda", como em Produtos e
  Clientes.
- O registro de venda (itens, cliente, total, confirmar) passa para um
  popup aberto pelo botão "+ Nova venda", no mesmo padrão do cadastro de
  produto. Fechar o popup sem confirmar (Cancelar, X, Esc ou clique fora)
  descarta o carrinho.
- Ao confirmar com sucesso, o popup fecha e a tela mostra o aviso padrão
  de sucesso ("Venda registrada.") acima do histórico.
- Erros de carregamento da tela passam a ser exibidos, como em Produtos.
- Campo "Buscar por cliente..." que filtra o histórico de vendas já
  carregado pelo nome do cliente (vendas avulsas aparecem como "Balcão").
- As regras de venda (ao menos um item, limite de estoque, cliente
  opcional, erros de confirmação mantendo o carrinho) não mudam.

Fora do escopo: busca no backend, paginação do histórico, detalhes de uma
venda e qualquer mudança nos endpoints do Xano.

## Capabilities

### New Capabilities
<!-- Nenhuma. -->

### Modified Capabilities
- `sales`: novos requisitos de interface — popup de nova venda, aviso de
  sucesso, exibição de erro de carregamento e busca no histórico.

## Impact

- Código: `vetements/pages/sales.py`, `vetements/state/sales.py`.
- Testes: novo `tests/test_sales_state.py` (filtro do histórico).
- Dependências e backend (Xano): nenhum impacto.
