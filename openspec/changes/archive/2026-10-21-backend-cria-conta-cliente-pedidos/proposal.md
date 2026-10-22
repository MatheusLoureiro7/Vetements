## Why

A loja virtual já tem vitrine, detalhe e carrinho, mas o visitante não
consegue concluir a compra. Falta (1) o cliente se identificar com uma
conta própria e (2) o pedido entrar no sistema. Decisões do grupo
(2026-10-21): conta com e-mail e senha na tabela `cliente`, e pedido da
loja virtual registrado como **venda** com origem "loja virtual", com a
mesma baixa de estoque da venda de balcão.

## What Changes

- Tabela `cliente` passa a autenticar (`auth = true`) com campo `password`
  opcional: clientes cadastrados pela equipe continuam sem senha.
- Tabela `venda`: `usuario_id` passa a ser opcional (pedido online não
  tem funcionário) e entra `origem` (`balcao` | `loja_virtual`, padrão
  `balcao`).
- Novos endpoints no grupo Loja:
  - `POST loja/conta/cadastro` e `POST loja/conta/login` (públicos,
    devolvem token de cliente);
  - `GET loja/conta` (dados do cliente logado);
  - `POST loja/pedidos` (cria a venda a partir do carrinho, com
    revalidação de produto publicado, quantidade e estoque, em transação);
  - `GET loja/pedidos` (pedidos do cliente logado, com itens).
- `clientes` (GET/POST da gestão) passam a listar campos explícitos, sem
  a senha.

Fora do escopo: pagamento, frete, status do pedido (aprovar/cancelar),
recuperação de senha, e as telas (change `frontend-` separada). A gestão
já lista os pedidos online na tela de Vendas (são vendas); destacar a
origem na tela fica para a change de frontend.

## Capabilities

### Modified Capabilities
- `storefront`: conta de cliente e pedido pela loja virtual (backend).
- `sales`: venda com origem; pedido online sem funcionário.
- `customers`: listagem não expõe senha.

## Impact

- Backend: `xano/table/cliente.xs`, `xano/table/venda.xs`,
  `xano/api/clientes/clientes_GET.xs`, `xano/api/clientes/clientes_POST.xs`,
  novos `xano/api/loja/conta*`, `xano/api/loja/pedidos*` e
  `xano/function/loja/itens_do_pedido.xs`.
- Frontend: nenhum nesta change. Atenção para a change de frontend: a
  tela de Vendas precisa aceitar `usuario_id` nulo.
