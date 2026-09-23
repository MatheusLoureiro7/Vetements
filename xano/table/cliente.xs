// Pessoa para quem uma venda pode ser realizada. Uma venda pode existir sem
// cliente associado (venda avulsa/balcão). A exigência de ao menos um
// contato (telefone ou email) é validada nos endpoints de criação, já que
// o schema por si só não expressa "um dos dois obrigatório".
table cliente {
  auth = false

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

    timestamp created_at?=now
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "btree", field: [{name: "nome", op: "asc"}]}
  ]
  guid = "zfhVrXf9cUb1iEEWerQelw8Xyyw"
}
