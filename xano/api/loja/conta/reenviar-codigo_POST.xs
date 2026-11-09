// Envia um novo código de confirmação ao cliente logado (intervalo mínimo
// de 60 s, verificado na function). O novo código invalida o anterior.
query "loja/conta/reenviar-codigo" verb=POST {
  api_group = "Loja"
  description = "Reenvia o código de confirmação do e-mail do cliente logado"
  auth = "cliente"

  input {
  }

  stack {
    db.get cliente {
      field_name = "id"
      field_value = $auth.id
      output = ["id", "email_confirmado"]
    } as $cliente

    precondition ($cliente.email_confirmado != true) {
      error_type = "inputerror"
      error = "Seu e-mail já está confirmado."
    }

    function.run "Loja/enviar_codigo" {
      input = {cliente_id: $auth.id, tipo: "confirmacao"}
    } as $enviado

    precondition ($enviado) {
      error_type = "inputerror"
      error = "Não foi possível enviar o código agora. Tente novamente em instantes."
    }
  }

  response = {codigo_enviado: true}
  guid = "uxEls76rST5rfOg0O1wF-7J_LNw"
}
