// Define uma nova senha para um usuário da equipe (somente administrador).
// A gestão não tem recuperação de senha por e-mail. A senha nunca vai para
// o histórico de eventos nem para a resposta.
query "usuarios/{user_id}/senha" verb=POST {
  api_group = "Authentication"
  description = "Define uma nova senha para um usuário da equipe (somente administrador)"
  auth = "user"

  input {
    int user_id {
      table = "user"
    }

    text senha
  }

  stack {
    function.run "Equipe/exigir_admin" {
      input = {user_id: $auth.id}
    } as $admin

    db.get user {
      field_name = "id"
      field_value = $input.user_id
      output = ["id"]
    } as $alvo

    precondition ($alvo != null) {
      error_type = "inputerror"
      error = "Usuário não encontrado."
    }

    precondition (($input.senha|strlen) >= 8 && ("/[A-Za-z]/"|regex_matches:$input.senha) && ("/[0-9]/"|regex_matches:$input.senha)) {
      error_type = "inputerror"
      error = "A senha precisa ter ao menos 8 caracteres, com letras e números."
    }

    db.edit user {
      field_name = "id"
      field_value = $alvo.id
      data = {password: $input.senha}
      output = ["id"]
    } as $editado

    function.run "Quick Start/log_event" {
      input = {
        user_id : $auth.id
        action  : "user_password_set"
        metadata: {alvo_id: $alvo.id}
      }
    } as $evento
  }

  response = {id: $alvo.id, senha_definida: true}
  guid = "K9sDXihJoSl0AOC85laCHejtIJ8"
}
