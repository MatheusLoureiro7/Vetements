// Cadastra um novo produto. Categoria é obrigatória. Restrito a
// administradores — verificado no backend.
query "produtos" verb=POST {
  api_group = "Catalogo"
  description = "Cadastra um novo produto (somente administrador); categoria é obrigatória"
  auth = "user"

  input {
    text nome filters=trim|min:1 {
      description = "Nome do produto"
    }

    text descricao? filters=trim {
      description = "Descrição do produto"
    }

    int categoria_id {
      table = "categoria"
      description = "Categoria do produto (obrigatória)"
    }

    decimal preco_base filters=min:0 {
      description = "Preço base do produto"
    }
  }

  stack {
    db.get "user" {
      description = "Carrega o usuário autenticado para checar o papel"
      field_name = "id"
      field_value = $auth.id
    } as $current_user

    precondition ($current_user.role == "administrador") {
      description = "Apenas administradores cadastram produtos"
      error_type = "accessdenied"
      error = "Apenas administradores podem cadastrar produtos."
    }

    db.get "categoria" {
      field_name = "id"
      field_value = $input.categoria_id
    } as $categoria

    precondition ($categoria != null) {
      description = "Categoria obrigatória e deve existir"
      error_type = "inputerror"
      error = "Categoria informada não existe."
    }

    db.add produto {
      data = {
        nome: $input.nome
        descricao: $input.descricao
        categoria_id: $input.categoria_id
        preco_base: $input.preco_base
      }
    } as $produto
  }

  response = $produto
  guid = "NKKXBRr53IVzqSFzqXdW-JI7UGA"
}
