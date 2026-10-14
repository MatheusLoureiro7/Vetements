// Variações de um produto no formato público da loja: só tamanho, cor e se
// há estoque. A quantidade exata e o SKU nunca saem do backend.
// `disponivel` é calculado aqui no stack porque os filtros de consulta
// (eval do db.query) não têm comparação — por isso não é um addon.
function "Loja/variacoes_publicas" {
  input {
    int produto_id
  }

  stack {
    db.query variacao_produto {
      where = $db.variacao_produto.produto_id == $input.produto_id
      sort = {variacao_produto.id: "asc"}
      return = {type: "list"}
    } as $variacoes

    var $publicas {
      value = []
    }

    foreach ($variacoes) {
      each as $variacao {
        array.push $publicas {
          value = {
            id        : $variacao.id
            tamanho   : $variacao.tamanho
            cor       : $variacao.cor
            disponivel: $variacao.estoque|greater_than:0
          }
        }
      }
    }
  }

  response = $publicas
  guid = "w19f633LfJX9dujaQtxpLneksUc"
}
