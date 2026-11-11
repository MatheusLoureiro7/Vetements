// Ajusta o estoque de uma variação: quantidade positiva = entrada de
// mercadoria, negativa = saída (perda, avaria, correção de contagem).
// Restrito a administradores (verificado no backend). Toda validação vem
// antes de qualquer escrita; o ajuste e o registro em event_log são
// gravados juntos numa transação, então ajuste rejeitado não altera nada
// nem gera registro.
//
// Mesma limitação conhecida das vendas: leitura e escrita do estoque não
// são uma única operação atômica no banco (ver spec inventory).
query "variacoes/{variacao_id}/ajustes" verb=POST {
  api_group = "Catalogo"
  description = "Ajusta o estoque de uma variação (somente administrador)"
  auth = "user"

  input {
    int variacao_id {
      table = "variacao_produto"
      description = "Variação cujo estoque será ajustado"
    }

    int quantidade {
      description = "Quantidade a somar (positiva) ou subtrair (negativa) do estoque"
    }

    text motivo? filters=trim|max:200 {
      description = "Motivo do ajuste (ex.: reposição do fornecedor, avaria)"
    }
  }

  stack {
    function.run "Equipe/exigir_ativo" {
      input = {user_id: $auth.id}
    } as $equipe_ativo

    db.get "user" {
      description = "Carrega o usuário autenticado para checar o papel"
      field_name = "id"
      field_value = $auth.id
    } as $current_user

    precondition ($current_user.role == "administrador") {
      description = "Apenas administradores ajustam estoque"
      error_type = "accessdenied"
      error = "Apenas administradores podem ajustar o estoque."
    }

    precondition ($input.quantidade != 0) {
      error_type = "inputerror"
      error = "Informe uma quantidade de ajuste diferente de zero."
    }

    db.get "variacao_produto" {
      field_name = "id"
      field_value = $input.variacao_id
    } as $variacao

    precondition ($variacao != null) {
      error_type = "inputerror"
      error = "Variação informada não existe."
    }

    var $estoque_novo {
      value = $variacao.estoque + $input.quantidade
    }

    precondition ($estoque_novo >= 0) {
      description = "O estoque nunca pode ficar negativo"
      error_type = "inputerror"
      error = "Estoque insuficiente: há " ~ $variacao.estoque ~ " unidade(s) disponível(is)."
    }

    db.transaction {
      description = "Grava o ajuste e o registro de quem ajustou juntos"
      stack {
        db.edit "variacao_produto" {
          field_name = "id"
          field_value = $variacao.id
          data = {
            estoque: $estoque_novo
          }
        } as $variacao_atualizada

        db.add event_log {
          data = {
            user_id: $auth.id
            action: "ajuste_estoque"
            metadata: {}
              |set:"variacao_id":$variacao.id
              |set:"sku":$variacao.sku
              |set:"estoque_anterior":$variacao.estoque
              |set:"estoque_novo":$estoque_novo
              |set:"quantidade":$input.quantidade
              |set:"motivo":$input.motivo
          }
        } as $registro
      }
    }

    db.get "produto" {
      field_name = "id"
      field_value = $variacao_atualizada.produto_id
    } as $produto

    var $resposta {
      description = "Mesmos campos de uma linha de variacoes GET"
      value = $variacao_atualizada
        |set:"produto_nome":$produto.nome
        |set:"preco_base":$produto.preco_base
    }
  }

  response = $resposta
  guid = "6q1LvjCa-1GNjlSDDAUbwrkZrsY"
}
