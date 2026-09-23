// Lista todas as variações de produto com estoque, incluindo o produto ao
// qual cada uma pertence — usado pela tela de Estoque e pelo formulário de
// nova venda.
query "variacoes" verb=GET {
  api_group = "Catalogo"
  description = "Lista variações de produto com estoque e o produto ao qual pertencem"
  auth = "user"

  input {
  }

  stack {
    db.query variacao_produto {
      join = {
        produto: {
          table: "produto"
          where: $db.variacao_produto.produto_id == $db.produto.id
        }
      }
      eval = {produto_nome: $db.produto.nome, preco_base: $db.produto.preco_base}
      sort = {variacao_produto.id: "asc"}
      return = {type: "list"}
    } as $variacoes
  }

  response = $variacoes
  guid = "vBaO2NtCs2V2mZ6XLPmfCnxGpz0"
}
