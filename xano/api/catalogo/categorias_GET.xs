// Lista as categorias cadastradas.
query "categorias" verb=GET {
  api_group = "Catalogo"
  description = "Lista as categorias cadastradas, ordenadas por nome"
  auth = "user"

  input {
  }

  stack {
    db.query categoria {
      sort = {categoria.nome: "asc"}
      return = {type: "list"}
    } as $categorias
  }

  response = $categorias
  guid = "cY4okc8w76RC79WzNYft8rNFyew"
}
