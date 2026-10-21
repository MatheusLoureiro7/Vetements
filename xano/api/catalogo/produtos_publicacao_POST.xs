// Publica ou retira um produto da loja virtual (campo `publicado`).
// Restrito a administradores — verificado no backend.
query "produtos/{produto_id}/publicacao" verb=POST {
  api_group = "Catalogo"
  description = "Publica ou despublica um produto na loja (somente administrador)"
  auth = "user"

  input {
    int produto_id {
      table = "produto"
      description = "Produto a publicar ou despublicar"
    }

    bool publicado {
      description = "true para exibir na loja, false para retirar"
    }
  }

  stack {
    db.get "user" {
      description = "Carrega o usuário autenticado para checar o papel"
      field_name = "id"
      field_value = $auth.id
    } as $current_user

    precondition ($current_user.role == "administrador") {
      description = "Apenas administradores publicam produtos"
      error_type = "accessdenied"
      error = "Apenas administradores podem publicar produtos."
    }

    db.get "produto" {
      field_name = "id"
      field_value = $input.produto_id
    } as $produto

    precondition ($produto != null) {
      error_type = "notfound"
      error = "Produto não encontrado."
    }

    db.edit "produto" {
      field_name = "id"
      field_value = $produto.id
      data = {
        publicado: $input.publicado
      }
    } as $produto_atualizado
  }

  response = $produto_atualizado
  guid = "VifEfTdlbvHfmyv_7o4n1xAWj1E"
}
