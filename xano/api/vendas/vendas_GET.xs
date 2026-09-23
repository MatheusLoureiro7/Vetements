// Lista as vendas registradas, com os itens de cada venda, mais recentes
// primeiro — usado pelo dashboard e pela tela de vendas.
query "vendas" verb=GET {
  api_group = "Vendas"
  description = "Lista vendas registradas (mais recentes primeiro), com os itens de cada uma"
  auth = "user"

  input {
    int limit?=50 filters=min:1|max:200 {
      description = "Quantidade máxima de vendas a retornar"
    }
  }

  stack {
    db.query venda {
      sort = {venda.created_at: "desc"}
      return = {
        type: "list"
        paging: {page: 1, per_page: $input.limit}
      }
      addon = [
        {
          name: "item_venda_by_venda"
          input: {venda_id: $output.id}
          as: "items.itens"
        }
      ]
    } as $vendas
  }

  response = $vendas
  guid = "4Ex_K8VEGesci6WNNP16jtAbgL0"
}
