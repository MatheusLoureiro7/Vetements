// Pessoa para quem uma venda pode ser realizada. Uma venda pode existir sem
// cliente associado (venda avulsa/balcão). A exigência de ao menos um
// contato (telefone ou email) é validada nos endpoints de criação, já que
// o schema por si só não expressa "um dos dois obrigatório".
//
// Também é a tabela de login da loja virtual (auth = true): só clientes
// que criaram conta na loja têm senha; os cadastrados pela equipe não
// (change backend-cria-conta-cliente-pedidos). Contas da loja confirmam o
// e-mail e recuperam a senha com um código enviado por e-mail (Brevo).
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

    bool email_confirmado?=true {
      description = "E-mail confirmado por código. Padrão true para contas antigas; o cadastro da loja grava false"
    }

    text codigo_hash? {
      description = "sha256 do código por e-mail ativo (nunca o código em si)"
    }

    enum codigo_tipo? {
      values = ["confirmacao", "senha"]
      description = "Para que serve o código ativo: confirmar e-mail ou redefinir senha"
    }

    timestamp codigo_expira_em? {
      description = "Validade do código ativo (15 minutos após o envio)"
    }

    timestamp codigo_enviado_em? {
      description = "Último envio de código (intervalo mínimo de 60 s)"
    }

    int codigo_tentativas?=0 {
      description = "Tentativas erradas com o código ativo (bloqueia em 5)"
    }
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "btree", field: [{name: "nome", op: "asc"}]}
  ]
  guid = "zfhVrXf9cUb1iEEWerQelw8Xyyw"
}
