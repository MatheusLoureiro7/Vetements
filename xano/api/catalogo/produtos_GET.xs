// Lista produtos cadastrados, com filtro opcional por nome e a categoria
// de cada produto.
query "produtos" verb=GET {
  api_group = "Catalogo"
  description = "Lista produtos, com filtro opcional por nome (busca)"
  auth = "user"

  input {
    text q? filters=trim {
      description = "Termo de busca por nome do produto (opcional)"
    }
  }

  stack {
    db.query produto {
      where = ($db.produto.nome|to_lower) includes? ($input.q|to_lower)
      join = {
        categoria: {
          table: "categoria"
          where: $db.produto.categoria_id == $db.categoria.id
        }
      }
      eval = {categoria_nome: $db.categoria.nome}
      sort = {produto.nome: "asc"}
      return = {type: "list"}
    } as $produtos
  }

  response = $produtos
  guid = "O7f4OL1s6p5WD7-cjXLM9nsAvJk"
}
