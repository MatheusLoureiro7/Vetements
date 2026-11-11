// Edita nome, e-mail e papel de um usuário da equipe (somente
// administrador). E-mail não pode repetir o de outro usuário. Ninguém tira
// o próprio papel de administrador, e o sistema nunca fica sem nenhum
// administrador ativo.
query "usuarios/{user_id}" verb=PATCH {
  api_group = "Authentication"
  description = "Edita nome, e-mail e papel de um usuário da equipe (somente administrador)"
  auth = "user"

  input {
    int user_id {
      table = "user"
    }

    text name filters=trim|min:1

    email email filters=trim|lower

    enum role {
      values = ["administrador", "vendedor"]
    }
  }

  stack {
    function.run "Equipe/exigir_admin" {
      input = {user_id: $auth.id}
    } as $admin

    db.get user {
      field_name = "id"
      field_value = $input.user_id
      output = ["id", "email", "role", "ativo"]
    } as $alvo

    precondition ($alvo != null) {
      error_type = "inputerror"
      error = "Usuário não encontrado."
    }

    db.query user {
      where = $db.user.email == $input.email && $db.user.id != $alvo.id
      return = {type: "exists"}
    } as $email_em_uso

    precondition (!$email_em_uso) {
      error_type = "inputerror"
      error = "Já existe uma conta com este e-mail."
    }

    var $rebaixa {
      value = $alvo.role == "administrador" && $input.role != "administrador"
    }

    precondition (!($rebaixa && $alvo.id == $auth.id)) {
      error_type = "inputerror"
      error = "Você não pode tirar o seu próprio papel de administrador."
    }

    conditional {
      if ($rebaixa && $alvo.ativo != false) {
        db.query user {
          where = $db.user.role == "administrador" && $db.user.ativo != false && $db.user.id != $alvo.id
          return = {type: "exists"}
        } as $outro_admin

        precondition ($outro_admin) {
          error_type = "inputerror"
          error = "O sistema precisa de ao menos um administrador ativo."
        }
      }
    }

    db.edit user {
      field_name = "id"
      field_value = $alvo.id
      data = {name: $input.name, email: $input.email, role: $input.role}
      output = ["id", "created_at", "name", "email", "role", "ativo"]
    } as $editado

    function.run "Quick Start/log_event" {
      input = {
        user_id : $auth.id
        action  : "user_edit"
        metadata: {alvo_id: $alvo.id, role_anterior: $alvo.role, role_novo: $input.role, email_mudou: $alvo.email != $input.email}
      }
    } as $evento
  }

  response = $editado
  guid = "xwXhlZm35hLvF_SUR8RrTsj3JaI"
}
