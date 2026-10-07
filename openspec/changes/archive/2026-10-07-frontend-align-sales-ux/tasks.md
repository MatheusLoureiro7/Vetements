## 1. Estado

- [x] 1.1 Em `vetements/state/sales.py`, adicionar `show_form`, `open_form`, `set_show_form` (fechar limpa carrinho/cliente/erros; ignorado durante `is_submitting`) e fechar o popup ao confirmar com sucesso; verificar com `reflex compile --dry`
- [x] 1.2 Adicionar `search`, `set_search`, a função pura `filter_sales_by_customer` e o computed var `filtered_history`; mover a limpeza de `load_error` para o início de `load`; verificar com os testes da tarefa 3.1

## 2. Tela

- [x] 2.1 Reescrever `vetements/pages/sales.py`: `section_heading("Vendas")` com "+ Nova venda", `load_error`, `ui.success_message`, campo "Buscar por cliente...", histórico usando `filtered_history` com estado vazio "Nenhuma venda encontrada.", e o formulário de venda dentro de um `rx.dialog` com Cancelar/X e Confirmar; verificar com `reflex compile --dry`

## 3. Testes e verificação

- [x] 3.1 Criar `tests/test_sales_state.py` cobrindo `filter_sales_by_customer`: termo vazio retorna tudo, parte do nome sem diferenciar maiúsculas, "balcão" encontra vendas avulsas, termo sem correspondência retorna lista vazia; verificar com `pytest` completo passando
- [x] 3.2 Teste manual: abrir Vendas, buscar por cliente, abrir "+ Nova venda", adicionar item e cancelar (carrinho some ao reabrir), registrar uma venda e conferir que o popup fecha, o aviso aparece e a venda entra no histórico
