// Modelo de roupa cadastrado no catálogo (ex.: "Camiseta Básica Algodão").
// Não é vendido diretamente — a venda ocorre no nível de variacao_produto.
table produto {
  auth = false

  schema {
    int id

    text nome filters=trim {
      description = "Nome do produto"
    }

    text descricao? filters=trim {
      description = "Descrição do produto"
    }

    int categoria_id {
      table = "categoria"
      description = "Categoria à qual o produto pertence (obrigatória)"
    }

    decimal preco_base filters=min:0 {
      description = "Preço base do produto, antes de variações"
    }

    timestamp created_at?=now
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "btree", field: [{name: "categoria_id", op: "asc"}]}
    {type: "btree", field: [{name: "nome", op: "asc"}]}
  ]
  guid = "7gMJTnD7aj9Z1wIsiSdnpCg75EY"
}
