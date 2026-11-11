// Recusa a requisição se o usuário da equipe estiver desativado. Chamada
// no início de todo endpoint com auth = "user" (e no login): assim um token
// emitido antes da desativação para de valer na hora. Registro sem valor em
// `ativo` conta como ativo. Devolve o usuário (id, role, ativo).
function "Equipe/exigir_ativo" {
  description = "Recusa usuário da equipe desativado"
  input {
    int user_id
  }

  stack {
    db.get user {
      field_name = "id"
      field_value = $input.user_id
      output = ["id", "role", "ativo"]
    } as $usuario

    precondition ($usuario != null && $usuario.ativo != false) {
      error_type = "accessdenied"
      error = "Seu acesso foi desativado. Fale com um administrador."
    }
  }

  response = $usuario
  guid = "Igi7ndAZfLwSKg_w6FI-F_hhJZc"
}
