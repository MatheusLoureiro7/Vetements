## Context

O cadastro de produto vive em `vetements/pages/products.py`
(`_new_product_form`, um `ui.card` renderizado condicionalmente por
`ProductsState.show_form`) e em `vetements/state/products.py`
(`toggle_form`, `create_product`, `form_error`). A validação hoje é
parcial: `create_product` checa categoria e preço, mas não o nome, e
todos os erros vão para um único `form_error` exibido no topo do
cartão. Veja `proposal.md` para a motivação.

Restrições do projeto: esta versão do Reflex não gera setters
automáticos (cada `set_<var>` é um `@rx.event` explícito) e não usa
`rx.Base` (dataclasses). A autorização de administrador continua sendo
aplicada no Xano; o frontend só esconde o botão para vendedores.

## Goals / Non-Goals

**Goals:**
- Cadastro de produto em popup, com validação e erro por campo.
- Manter o contrato já especificado de carregamento, proteção contra
  duplo envio, mensagem de sucesso e erro do backend.

**Non-Goals:**
- Formulário de variações, novos campos do produto e qualquer
  alteração no Xano ou em `xano_client`.
- Criar um componente genérico de "formulário em modal" para outras
  telas; só o necessário para este popup.

## Decisions

**1. `rx.dialog` controlado por `show_form`.** O popup usa
`rx.dialog.root(open=ProductsState.show_form, on_open_change=...)`, sem
`rx.dialog.trigger`: o botão "+ Novo produto" chama `open_form`.
Assim o estado é a única fonte de verdade e o handler de sucesso fecha
o popup só com `show_form = False`. O Radix não dispara
`on_open_change` para mudanças programáticas, então não há laço.
*Alternativa:* `rx.dialog.trigger` deixaria o Radix abrir sozinho, mas
o estado de abertura ficaria fora do `State`, e o reset dos campos
teria de ser feito em dois lugares.

**2. Fechar por qualquer via passa por `set_show_form(open)`.**
"Cancelar" é um `rx.dialog.close`; ele, o X, Esc e o clique fora
disparam `on_open_change(False)`. O handler `set_show_form` limpa
campos e erros quando `open` é falso. `open_form` faz o mesmo reset
antes de abrir e limpa `product_success`, como o `toggle_form` atual.
Descartar o formulário ao fechar (em vez de guardar rascunho) é o
comportamento mais simples e previsível para um cadastro curto.

**3. Validação em helper puro `validate_product_form`.** Função de
módulo em `state/products.py`, no mesmo estilo de `_sales_by_day` em
`state/dashboard.py`: recebe `nome`, `categoria_id` e `preco` (texto)
e devolve os erros por campo e o preço já convertido. `create_product`
a chama, copia os erros para `nome_error`, `categoria_error` e
`preco_error` e só chama o Xano se não houver erro. Assim a regra é
testável com pytest sem instanciar o `State`. O preço aceita vírgula
ou ponto, como hoje; valor não numérico, vazio ou negativo é inválido.
`form_error` fica só para erros do backend.

**4. Erro por campo via `ui.field(..., error=...)`.** O helper
`ui.field` ganha um parâmetro opcional `error`; quando preenchido,
mostra o texto em `BORDEAUX` abaixo do campo. O parâmetro é opcional,
então os outros formulários (variações, clientes, vendas) não mudam.
*Alternativa:* montar o texto de erro em cada campo dentro da página
duplicaria o padrão três vezes.

**5. Layout.** Popup com largura máxima de ~560px. Linha 1: Nome +
Categoria; linha 2: Preço base (com prefixo "R$" e `input_mode`
decimal) + Descrição; rodapé alinhado à direita com "Cancelar" e
"Salvar produto". Em telas estreitas as linhas empilham. Usa os
tokens existentes de `vetements/styles.py`, sem cores novas.

## Risks / Trade-offs

- [`rx.select` dentro do diálogo pode abrir o menu atrás do overlay ou
  fechar o diálogo ao clicar numa opção] → Verificar no navegador na
  tarefa de verificação manual; se ocorrer, ajustar o `z_index` do
  conteúdo do select.
- [O X, o Esc e o clique fora descartam o que foi digitado, o que pode
  frustrar quem fechou sem querer] → Aceito: o formulário é curto (4
  campos), e o requisito de descarte está no spec.
- [Preço negativo passa a ser recusado no frontend, comportamento que
  antes ficava por conta do Xano] → O Xano continua sendo a validação
  autoritativa; o frontend só antecipa o erro.
