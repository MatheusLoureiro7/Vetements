## Why

Hoje o botão "+ Novo produto" abre um cartão inline que empurra a
listagem para baixo, com os quatro campos espremidos em uma linha e uma
única mensagem de erro genérica no topo. O nome nem é validado no
frontend, e um erro de categoria ou de preço não aponta qual campo
precisa de correção. O cadastro parece "simples demais" e pouco
destacado para uma ação central do catálogo.

## What Changes

- O cadastro de produto passa a acontecer em um popup (diálogo modal)
  aberto por "+ Novo produto", no lugar do cartão inline. O popup
  organiza os campos em duas linhas (Nome + Categoria; Preço base com
  prefixo "R$" + Descrição) e tem rodapé com "Cancelar" e "Salvar
  produto".
- A validação do formulário passa a indicar o erro no próprio campo
  (nome obrigatório, categoria obrigatória, preço válido), em vez de
  uma única mensagem geral. Erros vindos do backend continuam sendo
  exibidos como mensagem geral dentro do popup.
- Em caso de sucesso, o popup fecha, o formulário é limpo e a
  mensagem de sucesso aparece na página. Em caso de erro do backend, o
  popup permanece aberto com os dados preenchidos.
- Fechar o popup sem salvar (Cancelar, X, Esc ou clique fora) descarta
  o que foi digitado e os erros exibidos.
- O comportamento de carregamento (botão desabilitado e indicador
  durante o envio, proteção contra duplo envio) é mantido.

Fora de escopo: formulário de variações, novos campos do produto
(marca, custo, imagem etc.), cadastro de produto junto com variações,
e qualquer mudança no Xano/backend.

## Capabilities

### New Capabilities

(nenhuma)

### Modified Capabilities

- `product-catalog`: o requisito "Cadastro de produto" passa a
  especificar o cadastro em popup, com validação por campo e descarte
  do formulário ao fechar sem salvar; o requisito "Erro ao cadastrar
  produto ou variação" passa a referir-se ao popup mantido aberto.

## Impact

- `vetements/pages/products.py` — `_new_product_form` (cartão inline)
  é substituído por `_new_product_dialog` (`rx.dialog`).
- `vetements/state/products.py` — `toggle_form` é substituído por
  `open_form` e `set_show_form`; novos Vars de erro por campo
  (`nome_error`, `categoria_error`, `preco_error`); a validação passa
  para um helper puro testável.
- `tests/` — novo teste do helper de validação.
- Nenhuma alteração no Xano, na API consumida (`xano_client`) ou em
  `vetements/styles.py`.
