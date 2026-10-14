// Detalhe público de um produto publicado. Produto inexistente ou não
// publicado responde "não encontrado", sem revelar dados.
query "loja/produtos/{produto_id}" verb=GET {
  api_group = "Loja"
  description = "Detalhe público de um produto publicado"

  input {
    int produto_id
  }

  stack {
    db.query produto {
      where = $db.produto.id == $input.produto_id && $db.produto.publicado == true
      join = {
        categoria: {
          table: "categoria"
          where: $db.produto.categoria_id == $db.categoria.id
        }
      }
      eval = {categoria_nome: $db.categoria.nome}
      output = ["id", "nome", "descricao", "preco_base", "categoria_id", "categoria_nome", "imagens"]
      return = {type: "single"}
    } as $produto

    precondition ($produto != null) {
      error_type = "notfound"
      error = "Produto não encontrado."
    }

    function.run "Loja/variacoes_publicas" {
      input = {produto_id: $produto.id}
    } as $variacoes

    var $resposta {
      value = $produto|set:"variacoes":$variacoes
    }
  }

  response = $resposta
  guid = "zyQlSofBxh6Kmg9Mjo9MpPQUi7I"
}
