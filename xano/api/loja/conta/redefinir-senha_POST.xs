// Troca a senha com e-mail + código recebido. A regra da senha é checada
// antes do código (senha fraca não gasta tentativa). Sucesso invalida o
// código, confirma o e-mail (o cliente provou ter acesso a ele) e devolve
// um token de cliente, como o login.
query "loja/conta/redefinir-senha" verb=POST {
  api_group = "Loja"
  description = "Redefine a senha do cliente com o código recebido por e-mail"

  input {
    email email filters=trim|lower
    text codigo filters=trim
    text nova_senha
  }

  stack {
    precondition (($input.nova_senha|strlen) >= 8 && ("/[A-Za-z]/"|regex_matches:$input.nova_senha) && ("/[0-9]/"|regex_matches:$input.nova_senha)) {
      error_type = "inputerror"
      error = "A senha deve ter ao menos 8 caracteres, com letras e números."
    }

    db.query cliente {
      where = $db.cliente.email == $input.email && $db.cliente.password != null
      output = ["id"]
      return = {type: "single"}
    } as $conta

    precondition ($conta != null) {
      error_type = "inputerror"
      error = "Código inválido ou vencido. Peça um novo código."
    }

    function.run "Loja/verificar_codigo" {
      input = {cliente_id: $conta.id, tipo: "senha", codigo: $input.codigo}
    } as $valido

    db.edit cliente {
      field_name = "id"
      field_value = $conta.id
      data = {password: $input.nova_senha, email_confirmado: true}
      output = ["id", "nome", "email", "telefone", "email_confirmado"]
    } as $cliente

    security.create_auth_token {
      table = "cliente"
      extras = {}
      expiration = 86400
      id = $cliente.id
    } as $authToken
  }

  response = {authToken: $authToken, cliente: $cliente}
  guid = "07s206CxE-2XK_0jyLLITsru3e0"
}
