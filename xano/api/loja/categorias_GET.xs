// Categorias da loja (id e nome), para o menu e os filtros da vitrine.
query "loja/categorias" verb=GET {
  api_group = "Loja"
  description = "Lista pública das categorias, ordenadas por nome"

  input {
  }

  stack {
    db.query categoria {
      output = ["id", "nome"]
      sort = {categoria.nome: "asc"}
      return = {type: "list"}
    } as $categorias
  }

  response = $categorias
  guid = "FdQ2yBDh62e8xIYrI0xflmAf6zo"
}
