// Vitrine: produtos publicados, com filtro opcional por categoria e por
// nome, cada um com categoria, imagens e variações públicas.
query "loja/produtos" verb=GET {
  api_group = "Loja"
  description = "Lista pública dos produtos publicados"

  input {
    int categoria_id? {
      description = "Filtra pela categoria (opcional)"
    }

    text q? filters=trim {
      description = "Termo de busca por nome do produto (opcional)"
    }
  }

  stack {
    db.query produto {
      where = $db.produto.publicado == true && $db.produto.categoria_id ==? $input.categoria_id && ($db.produto.nome|to_lower) includes? ($input.q|to_lower)
      join = {
        categoria: {
          table: "categoria"
          where: $db.produto.categoria_id == $db.categoria.id
        }
      }
      eval = {categoria_nome: $db.categoria.nome}
      output = ["id", "nome", "descricao", "preco_base", "categoria_id", "categoria_nome", "imagens"]
      sort = {produto.nome: "asc"}
      return = {type: "list"}
    } as $produtos

    var $resposta {
      value = []
    }

    foreach ($produtos) {
      each as $produto {
        function.run "Loja/variacoes_publicas" {
          input = {produto_id: $produto.id}
        } as $variacoes

        array.push $resposta {
          value = $produto|set:"variacoes":$variacoes
        }
      }
    }
  }

  response = $resposta
  guid = "q2o5ft2AZZtUhoYN4ZXYbpKnpfY"
}
