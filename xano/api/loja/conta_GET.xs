// Dados do cliente logado na loja (token de cliente).
query "loja/conta" verb=GET {
  api_group = "Loja"
  description = "Dados do cliente logado na loja"
  auth = "cliente"

  input {
  }

  stack {
    db.get cliente {
      field_name = "id"
      field_value = $auth.id
      output = ["id", "nome", "email", "telefone"]
    } as $cliente
  }

  response = $cliente
  guid = "ppdJIXDkbvTME0vSXoVOLeRZRjc"
}
