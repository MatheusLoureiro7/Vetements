// Cadastra uma nova categoria. Restrito a administradores — verificado no
// backend, não apenas na interface (spec auth: Backend rejeita ação
// administrativa de um vendedor).
query "categorias" verb=POST {
  api_group = "Catalogo"
  description = "Cadastra uma nova categoria (somente administrador)"
  auth = "user"

  input {
    text nome filters=trim|min:1 {
      description = "Nome da categoria"
    }
  }

  stack {
    db.get "user" {
      description = "Carrega o usuário autenticado para checar o papel"
      field_name = "id"
      field_value = $auth.id
    } as $current_user

    precondition ($current_user.role == "administrador") {
      description = "Apenas administradores cadastram categorias"
      error_type = "accessdenied"
      error = "Apenas administradores podem cadastrar categorias."
    }

    db.add categoria {
      data = {
        nome: $input.nome
      }
    } as $categoria
  }

  response = $categoria
  guid = "1XbFisSCat57z6dOZqSbvbd2o10"
}
