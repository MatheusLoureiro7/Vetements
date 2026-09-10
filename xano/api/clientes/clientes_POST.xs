// Cadastra um novo cliente. Exige nome e ao menos um contato (telefone
// ou e-mail) — validado no backend.
query "clientes" verb=POST {
  api_group = "Clientes"
  description = "Cadastra um novo cliente; exige nome e ao menos um contato"
  auth = "user"

  input {
    text nome filters=trim|min:1 {
      description = "Nome do cliente"
    }

    text telefone? filters=trim {
      description = "Telefone de contato (obrigatório se e-mail não for informado)"
    }

    email email? filters=trim|lower {
      description = "E-mail de contato (obrigatório se telefone não for informado)"
    }
  }

  stack {
    precondition (($input.telefone != null && ($input.telefone|strlen) > 0) || $input.email != null) {
      description = "Exige ao menos um contato: telefone ou e-mail"
      error_type = "inputerror"
      error = "Informe ao menos um contato: telefone ou e-mail."
    }

    db.add cliente {
      data = {
        nome: $input.nome
        telefone: $input.telefone
        email: $input.email
      }
    } as $cliente
  }

  response = $cliente
  guid = "qFxGnr1GKRIb65vIukF_AdcX-q8"
}
