// Itens de um pedido no formato público da loja: nome do produto, tamanho,
// cor, quantidade e preço unitário gravado na venda. Nunca devolve SKU nem
// estoque. Usada na criação e na listagem de pedidos do cliente.
function "Loja/itens_do_pedido" {
  input {
    int venda_id
  }

  stack {
    db.query item_venda {
      where = $db.item_venda.venda_id == $input.venda_id
      sort = {item_venda.id: "asc"}
      return = {type: "list"}
    } as $itens

    var $publicos {
      value = []
    }

    foreach ($itens) {
      each as $item {
        db.get "variacao_produto" {
          field_name = "id"
          field_value = $item.variacao_id
        } as $variacao

        db.get "produto" {
          field_name = "id"
          field_value = $variacao.produto_id
        } as $produto

        array.push $publicos {
          value = {
            variacao_id   : $item.variacao_id
            produto_id    : $produto.id
            nome          : $produto.nome
            tamanho       : $variacao.tamanho
            cor           : $variacao.cor
            quantidade    : $item.quantidade
            preco_unitario: $item.preco_unitario
          }
        }
      }
    }
  }

  response = $publicos
  guid = "cA1BLkUqWwu1c9c33i-ILwF1C6I"
}
