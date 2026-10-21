// Cria a conta de um cliente na loja virtual e já devolve o token de
// cliente. O e-mail é único entre contas (registros com senha); clientes
// cadastrados pela equipe, sem senha, não são "assumidos" pelo cadastro.
query "loja/conta/cadastro" verb=POST {
  api_group = "Loja"
  description = "Cria a conta de um cliente da loja e devolve o token"

  input {
    text nome filters=trim|min:1 {
      description = "Nome do cliente"
    }

    email email filters=trim|lower {
      description = "E-mail de login"
    }

    text senha {
      description = "Senha: ao menos 8 caracteres, com letra e número"
    }

    text telefone? filters=trim {
      description = "Telefone de contato (opcional)"
    }
  }

  stack {
    precondition (($input.senha|strlen) >= 8 && ($input.senha|regex_matches:"/[A-Za-z]/") && ($input.senha|regex_matches:"/[0-9]/")) {
      error_type = "inputerror"
      error = "A senha deve ter ao menos 8 caracteres, com letras e números."
    }

    db.query cliente {
      where = $db.cliente.email == $input.email && $db.cliente.password != null
      output = ["id"]
      return = {type: "single"}
    } as $conta_existente

    precondition ($conta_existente == null) {
      error_type = "inputerror"
      error = "Este e-mail já tem uma conta. Entre com sua senha."
    }

    db.add cliente {
      data = {
        nome    : $input.nome
        email   : $input.email
        telefone: $input.telefone
        password: $input.senha
      }
      output = ["id", "nome", "email", "telefone"]
    } as $cliente

    security.create_auth_token {
      table = "cliente"
      extras = {}
      expiration = 86400
      id = $cliente.id
    } as $authToken
  }

  response = {authToken: $authToken, cliente: $cliente}
  guid = "UM2WqGokiTEAvQSxAPvJG9Sav7o"
}
