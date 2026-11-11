// Allows user to update the password in the password reset flow
query "reset/update_password" verb=POST {
  api_group = "Authentication"
  auth = "user"

  input {
    text password? filters=trim|min:8
    text confirm_password? filters=trim
  }

  stack {
    function.run "Equipe/exigir_ativo" {
      input = {user_id: $auth.id}
    } as $equipe_ativo

    // Check that the password inputs are matching
    precondition ($input.password == $input.confirm_password) {
      error = "Passwords do not match!"
    }
  
    // Get user record based on the id of the auth token
    db.get user {
      field_name = "id"
      field_value = $auth.id
    } as $user
  
    // Check that the user record id matches the auth id
    precondition ($user.id == $auth.id) {
      error_type = "accessdenied"
    }
  
    // Update user record with the new password
    db.edit user {
      field_name = "id"
      field_value = $auth.id
      data = {password: $input.password}
    } as $user
  
    // Create event log (só dados seguros: nunca senha, hash nem token)
    function.run "Quick Start/log_event" {
      input = {
        user_id : $user.id
        action  : "reset_password"
        metadata: {id: $user.id, name: $user.name, email: $user.email, role: $user.role}
      }
    } as $event_log
  }

  response = {
    message: {"success":"true","message":"Password updated"}
  }

  tags = ["xano:quick-start"]
  guid = "_JfEuUOjhGnMD5pGX4HbP_-AIJo"
}