## 1. Cliente e estado

- [x] 1.1 `xano_client.update_customer(token, cliente_id, nome,
  telefone, email)` → `PATCH clientes/{cliente_id}` (manda os três
  campos; vazio vira `""`).
- [x] 1.2 `state/customers.py`: estado do popup de edição (`edit_id`,
  campos, erro, carregamento) com setters explícitos; abrir preenchido;
  fechar descartando; salvar (gerador com `yield`), com aviso que
  depende de `reconfirmar_email`. Função pura para o texto do aviso.

## 2. Tela

- [x] 2.1 `pages/customers.py`: coluna de ação com "Editar" e popup
  (`rx.dialog`) controlado pelo estado, no padrão do popup de ajuste de
  estoque.

## 3. Verificação

- [x] 3.1 Testes da função do aviso e do cliente; `pytest` completo e
  `reflex compile --dry` sem erros.
- [x] 3.2 No navegador (localhost, login de vendedor de teste): editar o
  telefone de um cliente de balcão e restaurar; sem contato → mensagem
  no popup com os campos mantidos; fechar sem salvar descarta; trocar o
  e-mail da conta de teste da loja → aviso de reconfirmação.

Resultado (2026-11-11): 3.1 — 216 testes (3 novos em
`tests/test_edicao_cliente.py`), compilação com sucesso. 3.2 — logado
como vendedor: coluna "Ações" com "Editar"; popup abre preenchido;
sem contato → "Informe ao menos um contato: telefone ou e-mail." no popup,
campos mantidos; telefone do balcão #1 salvo → popup fecha, "Cliente
atualizado." e linha atualizada; restaurado o telefone original. Bug
achado e corrigido: o "Cancelar" dentro de `rx.dialog.close` com
`disabled` ligado ao estado não fechava o popup (o X fechava); virou um
botão comum que chama `set_show_edit(False)` — depois disso fechar sem
salvar descarta o que foi digitado. Conta de teste #5: troca de e-mail →
"Cliente atualizado. Ele precisará confirmar o novo e-mail na loja antes
do próximo pedido." (ficou `codigo.tela1794232794@example.com`, não
confirmada).
