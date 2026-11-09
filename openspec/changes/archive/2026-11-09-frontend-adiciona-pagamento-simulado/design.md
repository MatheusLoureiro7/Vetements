## Context

Hoje `ContaState.finalizar_pedido` (no carrinho) lê o carrinho
(`CarrinhoState`, LocalStorage), chama `xano_client.create_order` e
redireciona para `/conta?pedido=<id>`. Estados da loja não herdam
`AuthState`. Rotas ficam só em `vetements/routes.py`. Visual da loja:
classes `lj-*` em `assets/loja/loja.css`.

## Goals / Non-Goals

**Goals:** página de pagamento coerente com o visual da loja; regras
de validação de cartão em funções puras testáveis; mover a criação do
pedido do carrinho para o pagamento sem duplicar lógica.

**Non-Goals:** QR code real (será ilustrativo), máscara de input
sofisticada, endereço/frete.

## Decisions

1. **Rota `/pagamento`** (`LOJA_PAGAMENTO`) com `on_load` que redireciona
   para entrar (com `proximo=/pagamento`) sem token, e para o carrinho
   se ele estiver vazio. Reaproveita `href_entrar`/`destino_seguro`.

2. **`finalizar_pedido` vira `confirmar_pagamento`** num novo
   `PagamentoState` (`vetements/loja/state/pagamento.py`), que lê o
   token do `ContaState` e os itens do `CarrinhoState` via
   `get_state`. O botão do carrinho passa a só navegar para
   `/pagamento` (ou para entrar). Mantém o tratamento atual de erros
   (401 → sair e entrar de novo; erro de rede → "confira em Minha
   conta antes de tentar de novo").

3. **Validação pura** em `pagamento.py`:
   `validar_cartao(numero, nome, validade, cvv, hoje) -> dict[campo, erro]`
   (só dígitos após remover espaços; 13–19 dígitos; `MM/AA` com mês
   1–12 e não vencida em relação a `hoje`; CVV 3–4 dígitos; nome não
   vazio) e `dados_pagamento(forma, numero, parcelas) -> dict` que monta
   o corpo enviado (`cartao_final` = últimos 4 dígitos). `hoje` é
   parâmetro para testar sem depender do relógio.

4. **Pix e boleto fictícios**: código copia-e-cola e linha digitável
   gerados de forma determinística a partir do total (texto fixo +
   valor), só para exibição; QR code é um ícone/ilustração com a
   legenda "QR code ilustrativo". Nada disso é enviado ao backend.

5. **Dados do cartão não persistem**: ficam em vars do estado só
   enquanto a página está aberta e são limpos ao confirmar, ao trocar
   a forma de pagamento e ao sair da página. Nunca vão para
   LocalStorage nem para logs.

6. **Minha conta**: `PedidoLoja` ganha `pagamento_label` montado por
   função pura (`"Pix"`, `"Boleto"`, `"Cartão 3x · final 4242"`,
   `"Pagamento não informado"`). Confirmação mostra "Pagamento
   aprovado" junto ao número do pedido.

## Risks / Trade-offs

- [Pedidos de teste gravam dados reais] → usar a conta
  `cliente.teste@vetements.local`, 1 unidade por pedido, e devolver o
  estoque no fim com o ajuste de estoque.
- [Cliques simulados da extensão do Chrome podem não chegar às páginas
  Reflex] → testar disparando eventos por JavaScript, como na change de
  ajuste de estoque.
