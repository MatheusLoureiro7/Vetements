## Decisions

- **Fonte única no navegador**: `CarrinhoState.salvo` é um
  `rx.LocalStorage` com a lista de itens em JSON; os itens exibidos, a
  contagem e o subtotal são vars calculadas a partir dele. Dados salvos
  inválidos (JSON quebrado, campos faltando) viram carrinho vazio, sem
  erro na tela.
- **Regras em funções puras** (`adicionar`, `alterar_quantidade`,
  `remover`, `ler_itens`) para testar sem servidor. Um item é identificado
  pela variação (`variacao_id`); adicionar a mesma variação soma a
  quantidade, limitada a 10 (a API pública só diz se há estoque, não
  quanto).
- **Preço guardado no item** no momento de adicionar (como o preço
  unitário de `ItemVenda`). Revalidar preço/estoque com o Xano fica para a
  finalização do pedido, que é quem cria a venda.
- `ProdutoState.adicionar_ao_carrinho` é assíncrono para obter o
  `CarrinhoState` (`get_state`). Com uma só variação disponível, ela já
  vem escolhida.
- Estados da loja continuam sem herdar `AuthState`.
