// Cria uma venda com um ou mais itens em uma única chamada. Dentro de uma
// transação (db.transaction): cada item baixa o estoque da variação
// correspondente de forma condicional (só baixa se houver estoque
// suficiente); se qualquer item falhar, a venda inteira é abortada e nada
// é persistido (spec sales: Baixa de estoque ao confirmar venda / Falha
// parcial não deixa dados inconsistentes).
//
// LIMITAÇÃO CONHECIDA: a checagem de estoque disponível (leitura) e a
// baixa (escrita) são duas operações separadas — não uma única operação
// atômica no banco. Nem db.direct_query (SQL puro) nem redis.* estão
// disponíveis no plano atual do Xano, que são as formas de fechar essa
// janela por completo. Na prática, duas vendas da MESMA variação
// confirmadas no exato mesmo instante poderiam, em tese, ambas passar da
// checagem antes de qualquer uma escrever (ver design.md, decisão 2 e
// Risks/Trade-offs). Aceito como risco residual para o volume de uso
// deste ERP (poucos vendedores simultâneos); revisitar com
// db.direct_query se o plano do Xano for atualizado no futuro.
query "venda" verb=POST {
  api_group = "Vendas"
  description = "Registra uma venda com seus itens, baixando o estoque de cada variação"
  auth = "user"

  input {
    int cliente_id? {
      table = "cliente"
      description = "Cliente associado (opcional — venda avulsa/balcão quando ausente)"
    }

    json itens {
      description = "Lista de itens da venda: [{variacao_id, quantidade}, ...]"
    }
  }

  stack {
    precondition (($input.itens|count) > 0) {
      description = "Uma venda deve conter ao menos um item"
      error_type = "inputerror"
      error = "A venda deve conter ao menos um item."
    }

    conditional {
      description = "Valida o cliente informado, se houver"
      if ($input.cliente_id != null) {
        db.get "cliente" {
          field_name = "id"
          field_value = $input.cliente_id
        } as $cliente_validado

        precondition ($cliente_validado != null) {
          error_type = "inputerror"
          error = "Cliente informado não existe."
        }
      }
    }

    db.transaction {
      description = "Cria a venda e os itens; se qualquer item falhar, nada é persistido"
      stack {
        db.add venda {
          data = {
            usuario_id: $auth.id
            cliente_id: $input.cliente_id
            total: 0
          }
        } as $venda

        var $total_calculado {
          value = 0
        }

        foreach ($input.itens) {
          each as $item {
            db.get "variacao_produto" {
              field_name = "id"
              field_value = $item.variacao_id
            } as $variacao

            precondition ($variacao != null) {
              error_type = "inputerror"
              error = "Variação informada não existe."
            }

            precondition ($variacao.estoque >= $item.quantidade) {
              description = "Estoque disponível no momento da confirmação, revalidado no backend"
              error_type = "inputerror"
              error = "Estoque insuficiente para a variação " ~ $variacao.sku ~ "."
            }

            db.get "produto" {
              field_name = "id"
              field_value = $variacao.produto_id
            } as $produto_da_variacao

            db.edit "variacao_produto" {
              description = "Baixa o estoque desta variação pela quantidade vendida"
              field_name = "id"
              field_value = $variacao.id
              data = {
                estoque: $variacao.estoque - $item.quantidade
              }
            } as $variacao_atualizada

            db.add item_venda {
              data = {
                venda_id: $venda.id
                variacao_id: $item.variacao_id
                quantidade: $item.quantidade
                preco_unitario: $produto_da_variacao.preco_base
              }
            } as $item_criado

            math.add $total_calculado {
              value = ($item.quantidade * $produto_da_variacao.preco_base)
            }
          }
        }

        db.edit "venda" {
          field_name = "id"
          field_value = $venda.id
          data = {
            total: $total_calculado
          }
        } as $venda_final
      }
    }
  }

  response = $venda_final
  guid = "Fya-uiNoge0K4l66DQbpydyV2uM"
}
