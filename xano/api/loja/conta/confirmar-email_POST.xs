// Confirma o e-mail do cliente logado com o código recebido por e-mail.
// Conta já confirmada responde sucesso sem exigir código.
query "loja/conta/confirmar-email" verb=POST {
  api_group = "Loja"
  description = "Confirma o e-mail do cliente logado com o código recebido"
  auth = "cliente"

  input {
    text codigo filters=trim
  }

  stack {
    db.get cliente {
      field_name = "id"
      field_value = $auth.id
      output = ["id", "email_confirmado"]
    } as $cliente

    conditional {
      if ($cliente.email_confirmado != true) {
        function.run "Loja/verificar_codigo" {
          input = {cliente_id: $auth.id, tipo: "confirmacao", codigo: $input.codigo}
        } as $valido

        db.edit cliente {
          field_name = "id"
          field_value = $auth.id
          data = {email_confirmado: true}
          output = ["id"]
        } as $confirmado
      }
    }
  }

  response = {email_confirmado: true}
  guid = "z6x-0VFI9DrfyO9ZgyjtmVNOkCM"
}
