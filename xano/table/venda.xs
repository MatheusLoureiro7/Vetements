// Registro de uma venda realizada na loja. Deve conter ao menos um item
// (garantido pelo endpoint de criação); o total é derivado da soma dos
// itens no momento da criação. Pedidos da loja virtual também são vendas
// (origem = loja_virtual, sem usuário da equipe).
table venda {
  auth = false

  schema {
    int id

    timestamp created_at?=now {
      description = "Data/hora do registro da venda"
    }

    int usuario_id? {
      table = "user"
      description = "Usuário (administrador ou vendedor) que registrou a venda; vazio em pedidos da loja virtual"
    }

    int cliente_id? {
      table = "cliente"
      description = "Cliente associado (opcional — venda avulsa/balcão quando ausente)"
    }

    enum origem?=balcao {
      values = ["balcao", "loja_virtual"]
      description = "Onde a venda foi feita: balcão (gestão) ou loja virtual (pedido do cliente)"
    }

    decimal total?=0 filters=min:0 {
      description = "Valor total da venda, derivado da soma dos itens"
    }
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "btree", field: [{name: "usuario_id", op: "asc"}]}
    {type: "btree", field: [{name: "cliente_id", op: "asc"}]}
    {type: "btree", field: [{name: "created_at", op: "desc"}]}
  ]
  guid = "D8reJutB4IVx_BhQIAY7iIHStbU"
}
