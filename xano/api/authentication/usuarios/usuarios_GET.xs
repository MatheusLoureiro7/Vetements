// Lista a equipe para a tela de usuários (somente administrador): nome,
// e-mail, papel, ativo e último login (lido do histórico de eventos). Nunca
// devolve senha nem dados de redefinição.
query "usuarios" verb=GET {
  api_group = "Authentication"
  description = "Lista os usuários da equipe (somente administrador)"
  auth = "user"

  input {
  }

  stack {
    function.run "Equipe/exigir_admin" {
      input = {user_id: $auth.id}
    } as $admin

    db.query user {
      sort = {user.name: "asc"}
      output = ["id", "created_at", "name", "email", "role", "ativo"]
      return = {type: "list"}
    } as $usuarios

    var $lista {
      value = []
    }

    foreach ($usuarios) {
      each as $usuario {
        db.query event_log {
          where = $db.event_log.user_id == $usuario.id && $db.event_log.action == "login"
          sort = {event_log.created_at: "desc"}
          output = ["created_at"]
          return = {type: "single"}
        } as $ultimo

        array.push $lista {
          value = $usuario|set:"ultimo_login_em":($ultimo.created_at ?? null)
        }
      }
    }
  }

  response = $lista
  guid = "_v1TzreBYP185Y3cJnQlky6XS9A"
}
