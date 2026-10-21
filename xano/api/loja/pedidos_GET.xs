// Pedidos do cliente logado na loja virtual, mais recentes primeiro, com
// os itens no formato público (sem SKU nem estoque).
query "loja/pedidos" verb=GET {
  api_group = "Loja"
  description = "Pedidos do cliente logado, com itens"
  auth = "cliente"

  input {
  }

  stack {
    db.query venda {
      where = $db.venda.cliente_id == $auth.id && $db.venda.origem == "loja_virtual"
      sort = {venda.created_at: "desc"}
      output = ["id", "created_at", "total"]
      return = {type: "list"}
    } as $vendas

    var $pedidos {
      value = []
    }

    foreach ($vendas) {
      each as $venda {
        function.run "Loja/itens_do_pedido" {
          input = {venda_id: $venda.id}
        } as $itens

        array.push $pedidos {
          value = $venda|set:"itens":$itens
        }
      }
    }
  }

  response = $pedidos
  guid = "Q2AS1g4SaBFQXVVTA3883BIi9Go"
}
