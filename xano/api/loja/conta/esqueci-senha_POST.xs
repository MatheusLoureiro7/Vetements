// Pede o código para redefinir a senha. A resposta é sempre a mesma,
// exista ou não a conta (e mesmo dentro do intervalo de 60 s), para não
// revelar quais e-mails têm conta na loja.
query "loja/conta/esqueci-senha" verb=POST {
  api_group = "Loja"
  description = "Envia o código de redefinição de senha, se houver conta"

  input {
    email email filters=trim|lower
  }

  stack {
    db.query cliente {
      where = $db.cliente.email == $input.email && $db.cliente.password != null
      output = ["id", "codigo_enviado_em"]
      return = {type: "single"}
    } as $cliente

    conditional {
      if ($cliente != null && ($cliente.codigo_enviado_em == null || $cliente.codigo_enviado_em < (now|transform_timestamp:"-60 seconds"))) {
        function.run "Loja/enviar_codigo" {
          input = {cliente_id: $cliente.id, tipo: "senha"}
        } as $enviado
      }
    }
  }

  response = {mensagem: "Se houver uma conta com este e-mail, enviamos um código."}
  guid = "PJlbbwwG3aFcWhfV8j5foXt5Hqw"
}
