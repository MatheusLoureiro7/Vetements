// Gera um código de 6 dígitos para o cliente, guarda só o hash (válido por
// 15 minutos, tentativas zeradas) e envia por e-mail pelo Brevo. Chave e
// remetente vêm das variáveis de ambiente BREVO_API_KEY e
// BREVO_SENDER_EMAIL. Respeita o intervalo mínimo de 60 s entre envios
// aceitos (o horário do envio só é gravado quando o Brevo aceita).
// Devolve true se o Brevo aceitou o e-mail (status 201), false se não; a
// resposta do Brevo nunca é exposta.
function "Loja/enviar_codigo" {
  description = "Gera, guarda (hash) e envia por e-mail um código de 6 dígitos"
  input {
    int cliente_id {
      table = "cliente"
    }

    enum tipo {
      values = ["confirmacao", "senha"]
    }
  }

  stack {
    db.get cliente {
      field_name = "id"
      field_value = $input.cliente_id
      output = ["id", "nome", "email", "codigo_enviado_em"]
    } as $cliente

    precondition ($cliente != null && $cliente.email != null && $cliente.email != "") {
      error_type = "inputerror"
      error = "Conta sem e-mail para enviar o código."
    }

    precondition ($cliente.codigo_enviado_em == null || $cliente.codigo_enviado_em < (now|transform_timestamp:"-60 seconds")) {
      error_type = "inputerror"
      error = "Aguarde 1 minuto para pedir um novo código."
    }

    security.random_number {
      min = 100000
      max = 999999
    } as $numero

    var $codigo {
      value = $numero|to_text
    }

    db.edit cliente {
      field_name = "id"
      field_value = $cliente.id
      data = {
        codigo_hash      : ($codigo ~ ":" ~ ($cliente.id|to_text))|sha256
        codigo_tipo      : $input.tipo
        codigo_expira_em : now|transform_timestamp:"+15 minutes"
        codigo_tentativas: 0
      }
      output = ["id"]
    } as $gravado

    var $assunto {
      value = "Seu código para confirmar o e-mail na Vetements"
    }

    var $motivo {
      value = "Use o código abaixo para confirmar seu e-mail na loja Vetements."
    }

    conditional {
      if ($input.tipo == "senha") {
        var.update $assunto {
          value = "Seu código para redefinir a senha na Vetements"
        }

        var.update $motivo {
          value = "Use o código abaixo para criar uma nova senha na loja Vetements."
        }
      }
    }

    var $html {
      value = "<div style=\"font-family:Arial,sans-serif;color:#161615;max-width:480px\"><h2>Vetements</h2><p>Olá, " ~ $cliente.nome ~ "!</p><p>" ~ $motivo ~ "</p><p style=\"font-size:32px;font-weight:bold;letter-spacing:6px\">" ~ $codigo ~ "</p><p>O código vale por 15 minutos. Se você não pediu, ignore este e-mail.</p></div>"
    }

    api.request {
      url = "https://api.brevo.com/v3/smtp/email"
      method = "POST"
      params = {
        sender     : {name: "Vetements", email: $env.BREVO_SENDER_EMAIL}
        to         : [{email: $cliente.email, name: $cliente.nome}]
        subject    : $assunto
        htmlContent: $html
      }
      headers = ["Content-Type: application/json", "Accept: application/json", "api-key: " ~ $env.BREVO_API_KEY]
      timeout = 20
    } as $envio

    var $enviado {
      value = $envio.response.status == 201
    }

    conditional {
      description = "Só um envio aceito conta para o intervalo de 60 s; falha permite tentar de novo na hora"
      if ($enviado) {
        db.edit cliente {
          field_name = "id"
          field_value = $cliente.id
          data = {codigo_enviado_em: now}
          output = ["id"]
        } as $registrado
      }
    }
  }

  response = $enviado
  guid = "1qfjdZRvA08KDYeDrVwI_HtGZ8U"
}
