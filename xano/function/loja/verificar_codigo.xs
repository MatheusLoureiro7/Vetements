// Confere o código por e-mail de um cliente. Falha se não há código ativo
// do tipo pedido, se venceu ou se já houve 5 tentativas erradas. Código
// errado soma uma tentativa (gravada mesmo com o erro, pois não há
// transação). Código certo limpa o código ativo. Devolve true.
function "Loja/verificar_codigo" {
  description = "Confere o código por e-mail (validade, tipo e tentativas)"
  input {
    int cliente_id {
      table = "cliente"
    }

    enum tipo {
      values = ["confirmacao", "senha"]
    }

    text codigo filters=trim
  }

  stack {
    db.get cliente {
      field_name = "id"
      field_value = $input.cliente_id
      output = ["id", "codigo_hash", "codigo_tipo", "codigo_expira_em", "codigo_tentativas"]
    } as $cliente

    precondition ($cliente != null && $cliente.codigo_tipo == $input.tipo && $cliente.codigo_hash != null && $cliente.codigo_hash != "" && $cliente.codigo_expira_em > now) {
      error_type = "inputerror"
      error = "Código inválido ou vencido. Peça um novo código."
    }

    precondition ($cliente.codigo_tentativas < 5) {
      error_type = "inputerror"
      error = "Muitas tentativas. Peça um novo código."
    }

    var $confere {
      value = (($input.codigo ~ ":" ~ ($cliente.id|to_text))|sha256) == $cliente.codigo_hash
    }

    conditional {
      if ($confere == false) {
        db.edit cliente {
          field_name = "id"
          field_value = $cliente.id
          data = {codigo_tentativas: $cliente.codigo_tentativas + 1}
          output = ["id"]
        } as $tentativa
      }
    }

    precondition ($confere) {
      error_type = "inputerror"
      error = "Código inválido ou vencido. Peça um novo código."
    }

    db.edit cliente {
      field_name = "id"
      field_value = $cliente.id
      data = {
        codigo_hash      : ""
        codigo_expira_em : null
        codigo_tentativas: 0
      }
      output = ["id"]
    } as $limpo
  }

  response = true
  guid = "aLngZ1FtvTlQDgCIaYoG4YyhGG0"
}
