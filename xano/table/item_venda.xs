// Linha dentro de uma venda: uma variação de produto vendida em determinada
// quantidade. O preço unitário é gravado aqui (e não apenas lido do
// produto) para preservar o histórico caso o preço mude no futuro.
table item_venda {
  auth = false

  schema {
    int id

    int venda_id {
      table = "venda"
      description = "Venda à qual este item pertence"
    }

    int variacao_id {
      table = "variacao_produto"
      description = "Variação de produto vendida"
    }

    int quantidade filters=min:1 {
      description = "Quantidade vendida desta variação"
    }

    decimal preco_unitario filters=min:0 {
      description = "Preço unitário no momento da venda"
    }
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "btree", field: [{name: "venda_id", op: "asc"}]}
    {type: "btree", field: [{name: "variacao_id", op: "asc"}]}
  ]
  guid = "fR6co6cSUCai1YGGnRP1J62Y96s"
}
