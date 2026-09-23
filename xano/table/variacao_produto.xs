// Combinação específica de tamanho e cor de um produto — é o item que
// efetivamente possui estoque e é vendido. A quantidade em estoque nunca
// pode ficar negativa (garantido pelos endpoints que a alteram, não pelo
// schema em si).
table variacao_produto {
  auth = false

  schema {
    int id

    int produto_id {
      table = "produto"
      description = "Produto ao qual esta variação pertence"
    }

    text tamanho filters=trim {
      description = "Tamanho da variação (ex.: P, M, G, GG)"
    }

    text cor filters=trim {
      description = "Cor da variação"
    }

    text sku filters=trim {
      description = "Código identificador único da variação"
    }

    int estoque?=0 filters=min:0 {
      description = "Quantidade disponível em estoque (nunca negativa)"
    }

    timestamp created_at?=now
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "btree", field: [{name: "produto_id", op: "asc"}]}
    {type: "btree|unique", field: [{name: "sku", op: "asc"}]}
  ]
  guid = "aVStaD4PulPH4NCJyw83R_f_O74"
}
