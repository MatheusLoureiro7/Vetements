// Registro de uma venda realizada na loja. Deve conter ao menos um item
// (garantido pelo endpoint de criação); o total é derivado da soma dos
// itens no momento da criação. Pedidos da loja virtual também são vendas
// (origem = loja_virtual, sem usuário da equipe) e já nascem pagos, com
// os dados do pagamento simulado; depois a equipe avança o status do
// pedido (pago → enviado → entregue).
table venda {
  auth = false

  schema {
    int id

    timestamp created_at?=now {
      description = "Data/hora do registro da venda"
    }

    int usuario_id? {
      table = "user"
      description = "Usuário (administrador ou vendedor) que registrou a venda; vazio em pedidos da loja virtual"
    }

    int cliente_id? {
      table = "cliente"
      description = "Cliente associado (opcional — venda avulsa/balcão quando ausente)"
    }

    enum origem?=balcao {
      values = ["balcao", "loja_virtual"]
      description = "Onde a venda foi feita: balcão (gestão) ou loja virtual (pedido do cliente)"
    }

    decimal total?=0 filters=min:0 {
      description = "Valor total da venda, derivado da soma dos itens"
    }

    enum forma_pagamento? {
      values = ["pix", "cartao", "boleto"]
      description = "Forma do pagamento simulado (pedidos da loja); vazio no balcão"
    }

    int parcelas? {
      description = "Parcelas do pagamento com cartão (1 a 6); vazio fora de cartão"
    }

    text cartao_final? filters=trim {
      description = "Somente os 4 últimos dígitos do cartão; nunca o número completo"
    }

    timestamp pago_em? {
      description = "Data/hora em que o pagamento simulado foi aprovado"
    }

    enum status_pedido? {
      values = ["pago", "enviado", "entregue"]
      description = "Status do pedido da loja (pago → enviado → entregue); vazio no balcão e em pedidos antigos (contam como pago)"
    }

    timestamp enviado_em? {
      description = "Data/hora em que a equipe marcou o pedido como enviado"
    }

    timestamp entregue_em? {
      description = "Data/hora em que a equipe marcou o pedido como entregue"
    }
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "btree", field: [{name: "usuario_id", op: "asc"}]}
    {type: "btree", field: [{name: "cliente_id", op: "asc"}]}
    {type: "btree", field: [{name: "created_at", op: "desc"}]}
  ]
  guid = "D8reJutB4IVx_BhQIAY7iIHStbU"
}
