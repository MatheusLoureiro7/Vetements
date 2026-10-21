// Envia uma foto para um produto existente; a foto é adicionada ao fim da
// lista `imagens` (ordem de exibição na loja). Restrito a administradores
// — verificado no backend. Aceita JPEG, PNG, GIF ou WEBP.
query "produtos/{produto_id}/imagens" verb=POST {
  api_group = "Catalogo"
  description = "Adiciona uma foto a um produto (somente administrador)"
  auth = "user"

  input {
    int produto_id {
      table = "produto"
      description = "Produto que recebe a foto"
    }

    file imagem {
      description = "Arquivo da foto (JPEG, PNG, GIF ou WEBP)"
    }
  }

  stack {
    db.get "user" {
      description = "Carrega o usuário autenticado para checar o papel"
      field_name = "id"
      field_value = $auth.id
    } as $current_user

    precondition ($current_user.role == "administrador") {
      description = "Apenas administradores enviam fotos de produto"
      error_type = "accessdenied"
      error = "Apenas administradores podem enviar fotos de produto."
    }

    db.get "produto" {
      field_name = "id"
      field_value = $input.produto_id
    } as $produto

    precondition ($produto != null) {
      error_type = "notfound"
      error = "Produto não encontrado."
    }

    storage.create_image {
      value = $input.imagem
      access = "public"
      filename = $input.imagem.name
    } as $foto

    var $imagens {
      value = []
    }

    conditional {
      description = "Parte das fotos atuais, se houver"
      if ($produto.imagens != null) {
        var.update $imagens {
          value = $produto.imagens
        }
      }
    }

    array.push $imagens {
      value = $foto
    }

    db.edit "produto" {
      field_name = "id"
      field_value = $produto.id
      data = {
        imagens: $imagens
      }
    } as $produto_atualizado
  }

  response = $produto_atualizado
  guid = "Cx49JekLT0TdKUqQ3rFCgW2OHpI"
}
