## 1. Estado

- [x] 1.1 `ProdutoLoja.preco` numérico em `dados.py`.
- [x] 1.2 `vetements/loja/state/carrinho.py`: funções puras + `CarrinhoState` com `rx.LocalStorage`. Testes em `tests/test_loja_carrinho.py`.
- [x] 1.3 `ProdutoState`: variação escolhida e `adicionar_ao_carrinho`.

## 2. Telas

- [x] 2.1 Página de produto: variações selecionáveis e botão "Adicionar ao carrinho" com confirmação e link para o carrinho.
- [x] 2.2 Cabeçalho: ícone da sacola com contagem.
- [x] 2.3 Página `/carrinho` (rota em `routes.py`, registro em `vetements.py`).

## 3. Verificação

- [x] 3.1 `pytest` e `reflex compile` sem erros.
- [x] 3.2 Manual: escolher tamanho e adicionar; contagem no cabeçalho muda; no carrinho, + / − respeitam 1 a 10; remover; recarregar a página mantém o carrinho; variação esgotada não pode ser escolhida; carrinho vazio mostra o aviso.
