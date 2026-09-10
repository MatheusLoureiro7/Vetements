// Retorna os itens de uma venda, usado como addon pela listagem de vendas.
addon item_venda_by_venda {
  input {
    int venda_id? {
      table = "venda"
    }
  }

  stack {
    db.query item_venda {
      where = $db.item_venda.venda_id == $input.venda_id
      return = {type: "list"}
    }
  }
  guid = "AYZ4oLeiyNNjJmt8Yz7tIbZipSI"
}
