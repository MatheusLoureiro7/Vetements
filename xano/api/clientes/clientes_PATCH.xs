// Edita nome, telefone e e-mail de um cliente (substituição completa: o
// formulário sempre manda os três). Mesmas regras do cadastro: nome
// obrigatório e ao menos um contato. Administrador e vendedor podem editar.
//
// Cliente com conta na loja (tem senha): o e-mail é o login, então não pode
// ficar vazio nem repetir o de outra conta da loja (login, "esqueci a senha"
// e "redefinir senha" procuram por e-mail entre clientes com senha). Se o
// e-mail mudar, a conta volta a "e-mail não confirmado" e o código pendente
// deixa de valer (hash vazio): o cliente confirma o novo e-mail pela loja
// antes do próximo pedido. A resposta nunca traz senha nem dados de código.
query "clientes/{cliente_id}" verb=PATCH {
  api_group = "Clientes"
  description = "Edita nome, telefone e e-mail de um cliente"
  auth = "user"

  input {
    int cliente_id {
      table = "cliente"
      description = "Cliente a editar"
    }

    text nome filters=trim|min:1 {
      description = "Nome do cliente"
    }

    text telefone? filters=trim {
      description = "Telefone de contato (obrigatório se e-mail não for informado)"
    }

    email email? filters=trim|lower {
      description = "E-mail de contato (obrigatório se telefone não for informado)"
    }
  }

  stack {
    function.run "Equipe/exigir_ativo" {
      input = {user_id: $auth.id}
    } as $equipe_ativo

    db.get "user" {
      description = "Carrega o usuário autenticado para checar o papel"
      field_name = "id"
      field_value = $auth.id
    } as $current_user

    precondition ($current_user.role == "administrador" || $current_user.role == "vendedor") {
      error_type = "accessdenied"
      error = "Apenas a equipe pode editar clientes."
    }

    db.get cliente {
      field_name = "id"
      field_value = $input.cliente_id
      output = ["id", "email", "password"]
    } as $atual

    precondition ($atual != null) {
      error_type = "inputerror"
      error = "Cliente não encontrado."
    }

    var $email_novo {
      value = $input.email ?? ""
    }

    precondition (($input.telefone != null && ($input.telefone|strlen) > 0) || ($email_novo|strlen) > 0) {
      error_type = "inputerror"
      error = "Informe ao menos um contato: telefone ou e-mail."
    }

    var $tem_conta {
      value = $atual.password != null && $atual.password != ""
    }

    var $reconfirmar {
      value = $tem_conta && $email_novo != ($atual.email ?? "")
    }

    var $cliente {
      value = null
    }

    conditional {
      if ($reconfirmar) {
        precondition (($email_novo|strlen) > 0) {
          error_type = "inputerror"
          error = "Cliente com conta na loja precisa de e-mail."
        }

        db.query cliente {
          where = $db.cliente.email == $email_novo && $db.cliente.password != null && $db.cliente.id != $atual.id
          output = ["id"]
          return = {type: "single"}
        } as $outra_conta

        precondition ($outra_conta == null) {
          error_type = "inputerror"
          error = "Este e-mail já é usado por outra conta da loja."
        }

        db.edit cliente {
          field_name = "id"
          field_value = $atual.id
          data = {
            nome: $input.nome
            telefone: $input.telefone
            email: $input.email
            email_confirmado: false
            codigo_hash: ""
            codigo_tentativas: 0
          }
          output = ["id", "nome", "telefone", "email", "created_at"]
        } as $editado_reconfirmar

        var.update $cliente {
          value = $editado_reconfirmar
        }
      }
      else {
        db.edit cliente {
          field_name = "id"
          field_value = $atual.id
          data = {
            nome: $input.nome
            telefone: $input.telefone
            email: $input.email
          }
          output = ["id", "nome", "telefone", "email", "created_at"]
        } as $editado

        var.update $cliente {
          value = $editado
        }
      }
    }
  }

  response = $cliente|set:"reconfirmar_email":$reconfirmar
  guid = "Ay2sQna6Sfjvc98BohirC-iP6SQ"
}
