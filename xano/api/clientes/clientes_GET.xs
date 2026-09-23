// Lista clientes cadastrados, com filtro opcional por nome.
query "clientes" verb=GET {
  api_group = "Clientes"
  description = "Lista clientes, com filtro opcional por nome (busca)"
  auth = "user"

  input {
    text q? filters=trim {
      description = "Termo de busca por nome do cliente (opcional)"
    }
  }

  stack {
    db.query cliente {
      where = ($db.cliente.nome|to_lower) includes? ($input.q|to_lower)
      sort = {cliente.nome: "asc"}
      return = {type: "list"}
    } as $clientes
  }

  response = $clientes
  guid = "iob6yh84LYN2VxQV8zeK9MCbFEY"
}
