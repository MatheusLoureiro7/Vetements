// Exige usuário da equipe ativo e administrador (gestão de usuários).
function "Equipe/exigir_admin" {
  description = "Exige administrador ativo"
  input {
    int user_id
  }

  stack {
    function.run "Equipe/exigir_ativo" {
      input = {user_id: $input.user_id}
    } as $usuario

    precondition ($usuario.role == "administrador") {
      error_type = "accessdenied"
      error = "Apenas administradores podem gerenciar a equipe."
    }
  }

  response = $usuario
  guid = "qmjjAjk53snu1kEbjJBDLF-gvtg"
}
