// Adiciona uma variação (tamanho/cor/SKU/estoque inicial) a um produto
// existente. Restrito a administradores — verificado no backend.
query "produtos/{produto_id}/variacoes" verb=POST {
  api_group = "Catalogo"
  description = "Adiciona uma variação a um produto existente (somente administrador)"
  auth = "user"

  input {
    int produto_id {
      table = "produto"
      description = "Produto ao qual a variação será adicionada"
    }

    text tamanho filters=trim|min:1 {
      description = "Tamanho da variação (ex.: P, M, G, GG)"
    }

    text cor filters=trim|min:1 {
      description = "Cor da variação"
    }

    text sku filters=trim|min:1 {
      description = "SKU (código identificador) da variação"
    }

    int estoque?=0 filters=min:0 {
      description = "Quantidade inicial em estoque"
    }
  }

  stack {
    db.get "user" {
      description = "Carrega o usuário autenticado para checar o papel"
      field_name = "id"
      field_value = $auth.id
    } as $current_user

    precondition ($current_user.role == "administrador") {
      description = "Apenas administradores cadastram variações"
      error_type = "accessdenied"
      error = "Apenas administradores podem cadastrar variações."
    }

    db.get "produto" {
      field_name = "id"
      field_value = $input.produto_id
    } as $produto

    precondition ($produto != null) {
      error_type = "inputerror"
      error = "Produto informado não existe."
    }

    db.add variacao_produto {
      data = {
        produto_id: $input.produto_id
        tamanho: $input.tamanho
        cor: $input.cor
        sku: $input.sku
        estoque: $input.estoque
      }
    } as $variacao
  }

  response = $variacao
  guid = "DhzRAhmfZqlb14QiHtr90j8wdR0"
}
