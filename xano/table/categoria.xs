// Tipo de roupa usado para organizar o catálogo de produtos (ex.: camisetas,
// calças, vestidos, jaquetas).
table categoria {
  auth = false

  schema {
    int id

    text nome filters=trim {
      description = "Nome da categoria (ex.: Camisetas, Calças, Vestidos)"
    }

    timestamp created_at?=now
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "btree", field: [{name: "nome", op: "asc"}]}
  ]
  guid = "nB0lgaXZ0PSEzML-wcsdflh-Ows"
}
