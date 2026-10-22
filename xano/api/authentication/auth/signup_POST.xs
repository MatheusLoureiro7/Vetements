// Cria uma conta da equipe (tabela user). Restrito a administradores —
// antes era público e qualquer pessoa conseguia criar um vendedor e entrar
// na gestão (change backend-restringe-cadastro-equipe). Não devolve token nem
// senha: quem cria a conta não entra como o novo usuário.
query "auth/signup" verb=POST {
  api_group = "Authentication"
  description = "Cria uma conta da equipe (somente administrador)"
  auth = "user"

  input {
    text name? filters=trim
    email email? filters=trim|lower
    text password?
    enum role?=vendedor {
      values = ["administrador", "vendedor"]
    }
  }

  stack {
    db.get user {
      description = "Carrega o usuário autenticado para checar o papel"
      field_name = "id"
      field_value = $auth.id
      output = ["id", "role"]
    } as $current_user

    precondition ($current_user.role == "administrador") {
      description = "Apenas administradores criam contas da equipe"
      error_type = "accessdenied"
      error = "Apenas administradores podem criar contas da equipe."
    }

    db.get user {
      field_name = "email"
      field_value = $input.email
      output = ["id"]
    } as $existente

    precondition ($existente == null) {
      error_type = "inputerror"
      error = "Já existe uma conta com este e-mail."
    }

    db.add user {
      data = {
        created_at: "now"
        name      : $input.name
        email     : $input.email
        password  : $input.password
        role      : $input.role
      }
      output = ["id", "name", "email", "role"]
    } as $novo_usuario

    function.run "Quick Start/log_event" {
      input = {
        user_id : $auth.id
        action  : "create_staff_user"
        metadata: {novo_usuario_id: $novo_usuario.id, role: $novo_usuario.role}
      }
    } as $event_log
  }

  response = $novo_usuario
  tags = ["xano:quick-start"]
  guid = "7OCMKT9e5dGzNn_WQP6rmLUmP3c"
}
