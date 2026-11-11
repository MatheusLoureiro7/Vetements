// Desativa ou reativa o acesso de um usuário da equipe (somente
// administrador). Desativado não entra e os tokens já emitidos param de
// valer (Equipe/exigir_ativo). Ninguém desativa a si mesmo, e o sistema
// nunca fica sem nenhum administrador ativo.
query "usuarios/{user_id}/ativo" verb=POST {
  api_group = "Authentication"
  description = "Desativa ou reativa o acesso de um usuário da equipe (somente administrador)"
  auth = "user"

  input {
    int user_id {
      table = "user"
    }

    bool ativo
  }

  stack {
    function.run "Equipe/exigir_admin" {
      input = {user_id: $auth.id}
    } as $admin

    db.get user {
      field_name = "id"
      field_value = $input.user_id
      output = ["id", "role", "ativo"]
    } as $alvo

    precondition ($alvo != null) {
      error_type = "inputerror"
      error = "Usuário não encontrado."
    }

    precondition ($input.ativo || $alvo.id != $auth.id) {
      error_type = "inputerror"
      error = "Você não pode desativar o seu próprio acesso."
    }

    conditional {
      if (!$input.ativo && $alvo.role == "administrador" && $alvo.ativo != false) {
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
      data = {ativo: $input.ativo}
      output = ["id", "created_at", "name", "email", "role", "ativo"]
    } as $editado

    function.run "Quick Start/log_event" {
      input = {
        user_id : $auth.id
        action  : "user_active_set"
        metadata: {alvo_id: $alvo.id, ativo: $input.ativo}
      }
    } as $evento
  }

  response = $editado
  guid = "jc_1CYxB1TgqU-zxgMW23O2HOPM"
}
