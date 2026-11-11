// Avança o status de um pedido da loja virtual, um passo por vez e sem
// voltar: pago → enviado → entregue. Administrador e vendedor podem
// avançar (verificado no backend). Pedido sem status gravado (anterior a
// esta regra) conta como pago. Vendas de balcão não têm status. Toda
// validação vem antes de qualquer escrita; a venda e o registro em
// event_log são gravados juntos numa transação.
query "vendas/{venda_id}/status" verb=POST {
  api_group = "Vendas"
  description = "Avança o status de um pedido da loja (pago → enviado → entregue)"
  auth = "user"

  input {
    int venda_id {
      table = "venda"
      description = "Pedido (venda de origem loja virtual) a atualizar"
    }

    enum status {
      values = ["enviado", "entregue"]
      description = "Próximo status desejado"
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

    precondition ($current_user.role == "administrador" || $current_user.role == "vendedor") {
      error_type = "accessdenied"
      error = "Apenas a equipe pode mudar o status do pedido."
    }

    db.get venda {
      field_name = "id"
      field_value = $input.venda_id
    } as $venda

    precondition ($venda != null) {
      error_type = "inputerror"
      error = "Pedido não encontrado."
    }

    precondition ($venda.origem == "loja_virtual") {
      error_type = "inputerror"
      error = "Somente pedidos da loja virtual têm status."
    }

    var $atual {
      value = $venda.status_pedido ?? ""
    }

    conditional {
      if ($atual == "") {
        var.update $atual {
          value = "pago"
        }
      }
    }

    precondition ($atual != "entregue") {
      error_type = "inputerror"
      error = "Este pedido já foi entregue."
    }

    var $esperado {
      description = "Status em que o pedido precisa estar para o passo pedido"
      value = "pago"
    }

    var $proximo {
      description = "Próximo passo possível a partir do status atual"
      value = "enviado"
    }

    conditional {
      if ($input.status == "entregue") {
        var.update $esperado {
          value = "enviado"
        }
      }
    }

    conditional {
      if ($atual == "enviado") {
        var.update $proximo {
          value = "entregue"
        }
      }
    }

    precondition ($atual == $esperado) {
      error_type = "inputerror"
      error = "Este pedido está " ~ $atual ~ "; o próximo passo é marcar como " ~ $proximo ~ "."
    }

    var $atualizada {
      value = null
    }

    db.transaction {
      description = "Grava o novo status e o registro de quem avançou juntos"
      stack {
        conditional {
          if ($input.status == "enviado") {
            db.edit venda {
              field_name = "id"
              field_value = $venda.id
              data = {status_pedido: "enviado", enviado_em: now}
              output = ["id", "origem", "status_pedido", "enviado_em", "entregue_em"]
            } as $editada_envio

            var.update $atualizada {
              value = $editada_envio
            }
          }
          else {
            db.edit venda {
              field_name = "id"
              field_value = $venda.id
              data = {status_pedido: "entregue", entregue_em: now}
              output = ["id", "origem", "status_pedido", "enviado_em", "entregue_em"]
            } as $editada_entrega

            var.update $atualizada {
              value = $editada_entrega
            }
          }
        }

        db.add event_log {
          data = {
            user_id: $auth.id
            action: "status_pedido"
            metadata: {}
              |set:"venda_id":$venda.id
              |set:"status_anterior":$atual
              |set:"status_novo":$input.status
          }
        } as $registro
      }
    }
  }

  response = $atualizada
  guid = "PU2rnnsoJE_Q3U0CzlkP1F_qGck"
}
