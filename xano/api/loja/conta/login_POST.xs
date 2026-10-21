// Login do cliente na loja virtual. E-mail sem conta e senha errada
// respondem a mesma mensagem.
query "loja/conta/login" verb=POST {
  api_group = "Loja"
  description = "Login do cliente da loja; devolve o token de cliente"

  input {
    email email filters=trim|lower
    text senha
  }

  stack {
    db.query cliente {
      where = $db.cliente.email == $input.email && $db.cliente.password != null
      output = ["id", "nome", "email", "telefone", "password"]
      return = {type: "single"}
    } as $conta

    precondition ($conta != null) {
      error_type = "accessdenied"
      error = "E-mail ou senha inválidos."
    }

    security.check_password {
      text_password = $input.senha
      hash_password = $conta.password
    } as $senha_confere

    precondition ($senha_confere) {
      error_type = "accessdenied"
      error = "E-mail ou senha inválidos."
    }

    security.create_auth_token {
      table = "cliente"
      extras = {}
      expiration = 86400
      id = $conta.id
    } as $authToken
  }

  response = {
    authToken: $authToken
    cliente  : {id: $conta.id, nome: $conta.nome, email: $conta.email, telefone: $conta.telefone}
  }
  guid = "n2kmEXDrnJbN_s1nOzXpVP-y34g"
}
