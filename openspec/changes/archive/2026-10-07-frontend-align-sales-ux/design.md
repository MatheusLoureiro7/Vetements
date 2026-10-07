## Context

Produtos já usa um `rx.dialog` controlado por `show_form`, com
`open_form`/`set_show_form` (fechar descarta o formulário). Clientes e
Produtos usam `ui.section_heading` com ação, `ui.success_message` e um
campo de busca de até 320px. Esta change replica esses padrões em Vendas.

## Goals / Non-Goals

**Goals:**
- Mesma estrutura visual e de interação de Produtos, reaproveitando os
  componentes de `vetements/components/ui.py`.

**Non-Goals:**
- Novo componente genérico de popup compartilhado entre telas (Produtos
  continua como está).
- Busca no Xano.

## Decisions

- **Estado do popup igual ao de Produtos:** `show_form`, `open_form`
  (limpa carrinho, cliente, erros e o aviso de sucesso) e
  `set_show_form(open)` (fechar limpa o carrinho; ignorado enquanto
  `is_submitting`).
- **Busca no cliente, sem nova chamada ao Xano:** o histórico completo
  fica em `history` e um computed var `filtered_history` aplica a função
  pura `filter_sales_by_customer(vendas, termo)`, testável sem o Reflex.
  Alternativa descartada: parâmetro `q` no endpoint de vendas, que não
  existe hoje (exigiria change de backend).
- **`load_error` não é mais limpo dentro de `refresh_options` /
  `refresh_history`:** hoje o segundo apaga o erro do primeiro. A limpeza
  passa a acontecer uma vez no início de `load`.

## Risks / Trade-offs

- [Histórico grande deixa o filtro local lento] → o endpoint já limita a
  50 vendas; filtrar 50 itens é instantâneo.
- [Usuário fecha o popup sem querer e perde o carrinho] → mesmo
  comportamento já aceito no cadastro de produto; o botão Cancelar e o X
  deixam a ação explícita.
