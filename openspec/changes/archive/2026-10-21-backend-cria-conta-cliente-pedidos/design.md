## Context

`venda_POST` (grupo Vendas, `auth = "user"`) já cria venda + itens e
baixa o estoque em `db.transaction`, com a limitação conhecida de
checagem/baixa não atômicas no plano atual do Xano.

## Decisions

1. **Conta na própria tabela `cliente`** (`auth = true`), não em `user`:
   tokens de cliente (`table = "cliente"`) não passam em endpoints
   `auth = "user"` e vice-versa, então um cliente nunca acessa a gestão.
2. **E-mail único só entre contas**: a tabela já pode ter clientes da
   equipe com o mesmo e-mail e sem senha. Cadastro e login consideram só
   registros com senha; o cadastro não "assume" um cliente da equipe
   (evita que alguém veja compras de outra pessoa só por saber o e-mail).
   Por isso não há índice único no banco.
3. **Pedido = venda** com `origem = loja_virtual`, `usuario_id` nulo e
   `cliente_id` = cliente logado (nunca vindo do input). O preço unitário
   é lido do produto no backend (o preço salvo no carrinho é ignorado).
   Só produtos publicados podem ser pedidos; quantidade por item de 1 a
   10; até 20 itens.
4. **Lógica duplicada de `venda_POST`, por enquanto**: o pedido repete a
   transação da venda em vez de extrair uma function compartilhada,
   porque mexer em `venda_POST` exigiria testar o fluxo do balcão com
   login da equipe nesta change. Unificar numa function fica registrado
   como melhoria; a mesma limitação de concorrência vale aqui.
5. **Itens do pedido no formato público** via function
   `Loja/itens_do_pedido` (nome do produto, tamanho, cor, quantidade,
   preço unitário), usada pela criação e pela listagem — sem SKU nem
   estoque.
6. Senha: mínimo 8 caracteres com letra e número (mesma regra da tabela
   `user`), validada no endpoint; nunca aparece em respostas.

## Risks

- `GET clientes` da gestão listaria o hash da senha se continuasse sem
  `output`; por isso os dois endpoints de clientes ganham campos
  explícitos.
- Pedidos online baixam estoque real sem pagamento: aceitável no escopo
  do projeto (pagamento está fora do MVP).
