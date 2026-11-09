// Pedido do cliente logado na loja virtual: registra uma venda de origem
// loja_virtual (sem usuário da equipe) e baixa o estoque, como a venda de
// balcão (vendas/venda_POST.xs). Tudo dentro de db.transaction: se um item
// falhar (produto não publicado, quantidade fora de 1 a 10, estoque
// insuficiente), nada é gravado. O cliente vem do token, nunca do input,
// e o preço é lido do produto (o preço guardado no carrinho é ignorado).
//
// Pagamento SIMULADO (sem cobrança real): o pedido já nasce pago. Para
// cartão chegam só parcelas e os 4 últimos dígitos — nunca número
// completo, nome, validade ou CVV. Final 0000 simula recusa. Toda a
// validação do pagamento vem antes da transação: pagamento inválido ou
// recusado não cria venda nem baixa estoque.
//
// Mesma LIMITAÇÃO CONHECIDA de venda_POST: checagem e baixa de estoque não
// são uma única operação atômica no plano atual do Xano.
query "loja/pedidos" verb=POST {
  api_group = "Loja"
  description = "Cria o pedido do cliente logado (venda da loja virtual), baixando o estoque"
  auth = "cliente"

  input {
    json itens {
      description = "Itens do pedido: [{variacao_id, quantidade}, ...]"
    }

    enum forma_pagamento {
      values = ["pix", "cartao", "boleto"]
      description = "Forma do pagamento simulado"
    }

    int parcelas? {
      description = "Parcelas (1 a 6), obrigatório para cartão"
    }

    text cartao_final? filters=trim {
      description = "Somente os 4 últimos dígitos do cartão, obrigatório para cartão"
    }
  }

  stack {
    db.get cliente {
      field_name = "id"
      field_value = $auth.id
      output = ["id", "email_confirmado"]
    } as $conta

    precondition ($conta.email_confirmado == true) {
      error_type = "inputerror"
      error = "Confirme seu e-mail para finalizar o pedido."
    }

    precondition (($input.itens|count) > 0) {
      error_type = "inputerror"
      error = "O pedido deve ter ao menos um item."
    }

    precondition (($input.itens|count) <= 20) {
      error_type = "inputerror"
      error = "O pedido pode ter no máximo 20 itens."
    }

    var $parcelas {
      value = null
    }

    var $cartao_final {
      value = null
    }

    conditional {
      description = "Valida o cartão simulado; Pix e boleto não usam parcelas nem final"
      if ($input.forma_pagamento == "cartao") {
        precondition ($input.parcelas != null && $input.parcelas >= 1 && $input.parcelas <= 6) {
          error_type = "inputerror"
          error = "Escolha de 1 a 6 parcelas."
        }

        precondition ("/^[0-9]{4}$/"|regex_matches:($input.cartao_final ?? "")) {
          error_type = "inputerror"
          error = "Informe os 4 últimos dígitos do cartão."
        }

        precondition ($input.cartao_final != "0000") {
          description = "Simulação de recusa da operadora"
          error_type = "inputerror"
          error = "Pagamento recusado pela operadora (simulação)."
        }

        var.update $parcelas {
          value = $input.parcelas
        }

        var.update $cartao_final {
          value = $input.cartao_final
        }
      }
    }

    db.transaction {
      description = "Cria a venda e os itens; se qualquer item falhar, nada é persistido"
      stack {
        db.add venda {
          data = {
            usuario_id: null
            cliente_id: $auth.id
            origem    : "loja_virtual"
            total     : 0
            forma_pagamento: $input.forma_pagamento
            parcelas       : $parcelas
            cartao_final   : $cartao_final
            pago_em        : "now"
            status_pedido  : "pago"
          }
        } as $venda

        var $total_calculado {
          value = 0
        }

        foreach ($input.itens) {
          each as $item {
            precondition ($item.quantidade >= 1 && $item.quantidade <= 10) {
              error_type = "inputerror"
              error = "A quantidade de cada item deve ser de 1 a 10."
            }

            db.get "variacao_produto" {
              field_name = "id"
              field_value = $item.variacao_id
            } as $variacao

            precondition ($variacao != null) {
              error_type = "inputerror"
              error = "Um dos itens do pedido não existe mais."
            }

            db.get "produto" {
              field_name = "id"
              field_value = $variacao.produto_id
            } as $produto

            precondition ($produto != null && $produto.publicado == true) {
              error_type = "inputerror"
              error = "Um dos itens do pedido não está mais disponível na loja."
            }

            precondition ($variacao.estoque >= $item.quantidade) {
              description = "Estoque revalidado no backend no momento do pedido"
              error_type = "inputerror"
              error = "Estoque insuficiente para " ~ $produto.nome ~ " (" ~ $variacao.tamanho ~ " · " ~ $variacao.cor ~ ")."
            }

            db.edit "variacao_produto" {
              field_name = "id"
              field_value = $variacao.id
              data = {
                estoque: $variacao.estoque - $item.quantidade
              }
            } as $variacao_atualizada

            db.add item_venda {
              data = {
                venda_id      : $venda.id
                variacao_id   : $variacao.id
                quantidade    : $item.quantidade
                preco_unitario: $produto.preco_base
              }
            } as $item_criado

            math.add $total_calculado {
              value = ($item.quantidade * $produto.preco_base)
            }
          }
        }

        db.edit "venda" {
          field_name = "id"
          field_value = $venda.id
          data = {
            total: $total_calculado
          }
          output = ["id", "created_at", "total", "forma_pagamento", "parcelas", "cartao_final", "pago_em", "status_pedido", "enviado_em", "entregue_em"]
        } as $venda_final
      }
    }

    function.run "Loja/itens_do_pedido" {
      input = {venda_id: $venda_final.id}
    } as $itens_do_pedido

    var $pedido {
      value = $venda_final|set:"itens":$itens_do_pedido
    }
  }

  response = $pedido
  guid = "INZMuyHLEifKHvCdFGx48zR2NEY"
}
