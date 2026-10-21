// Pessoa para quem uma venda pode ser realizada. Uma venda pode existir sem
// cliente associado (venda avulsa/balcão). A exigência de ao menos um
// contato (telefone ou email) é validada nos endpoints de criação, já que
// o schema por si só não expressa "um dos dois obrigatório".
//
// Também é a tabela de login da loja virtual (auth = true): só clientes
// que criaram conta na loja têm senha; os cadastrados pela equipe não
// (change backend-add-customer-account-orders).
table cliente {
  auth = true

  schema {
    int id

    text nome filters=trim {
      description = "Nome do cliente"
    }

    text telefone? filters=trim {
      description = "Telefone de contato (opcional se houver email)"
    }

    email email? filters=trim|lower {
      description = "E-mail de contato (opcional se houver telefone)"
    }

    password password? filters=min:8|minAlpha:1|minDigit:1 {
      description = "Senha da conta na loja virtual (vazia para clientes cadastrados pela equipe)"
    }

    timestamp created_at?=now
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "btree", field: [{name: "nome", op: "asc"}]}
  ]
  guid = "zfhVrXf9cUb1iEEWerQelw8Xyyw"
}
