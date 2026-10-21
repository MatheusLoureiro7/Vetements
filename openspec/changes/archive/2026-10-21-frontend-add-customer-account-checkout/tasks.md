## 1. Código

- [x] 1.1 `xano_client`: `customer_signup`, `customer_login`, `get_customer`, `create_order`, `list_orders` + testes.
- [x] 1.2 `ContaState` (cookie próprio, entrar, cadastrar, sair, minha conta, finalizar pedido) + testes das funções puras.
- [x] 1.3 Páginas `/conta/entrar` e `/conta`; botão de finalizar no carrinho; ícone de conta no cabeçalho.
- [x] 1.4 Gestão: rótulo "loja virtual" em Vendas e responsável "Loja virtual" no dashboard + teste.

## 2. Verificação

- [x] 2.1 `pytest` e `reflex compile` sem erros. Feito: 120 testes passando; compilação ok.
- [x] 2.2 No navegador, sem gravar dados: `/conta` sem login leva a `/conta/entrar?proximo=%2Fconta`; carrinho sem login mostra "Entrar para finalizar" e leva a entrar com `proximo=/carrinho`; login com senha errada mostra "E-mail ou senha inválidos."; cadastro com senha fraca mostra a regra da senha. Feito em 2026-10-21: os quatro comportamentos confirmados no Chrome.
- [x] 2.3 Delegado ao usuário (grava dados reais, por isso não foi feito automaticamente): criar conta, finalizar um pedido, ver a confirmação e o pedido em "Meus pedidos", conferir a baixa de estoque e o pedido em Vendas da gestão como "(loja virtual)"; usar o token de cliente na gestão não funciona.
