## Why

Com o backend aceitando pagamento simulado (change
`backend-adiciona-pagamento-simulado`), a loja precisa da tela de
pagamento entre o carrinho e a confirmação, para a compra ficar
completa na demonstração — sem cobrança real.

## What Changes

- Nova página **Pagamento** (`/pagamento`), só para cliente logado e
  com carrinho não vazio: resumo dos itens e do total e escolha entre
  **Pix**, **Cartão** e **Boleto**, todos simulados.
  - Pix: QR code ilustrativo e código "copia e cola" fictício.
  - Cartão: número, nome, validade (MM/AA), CVV e parcelas (1 a 6x sem
    juros), validados na tela; só os 4 últimos dígitos vão ao backend.
  - Boleto: linha digitável fictícia.
  - Aviso fixo: "Pagamento simulado — nenhum valor é cobrado." e dica
    de que o cartão com final 0000 simula recusa.
- No carrinho, "Finalizar pedido" passa a levar à página de pagamento
  (a criação do pedido sai do carrinho e vai para "Confirmar
  pagamento").
- Pagamento aprovado: carrinho esvaziado e confirmação em "Minha
  conta" com "Pagamento aprovado". Recusado ou com erro: continua na
  página com a mensagem e o carrinho intacto.
- "Minha conta" mostra a forma de pagamento de cada pedido.
- `docs/project-overview.md`: registra o pagamento simulado e
  esclarece que integração real com meios de pagamento segue fora do
  escopo.

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
- `storefront`: nova página de pagamento simulado; "Finalizar pedido
  pelo carrinho" passa a passar pelo pagamento; "Minha conta" mostra o
  pagamento de cada pedido.

## Impact

- `vetements/routes.py` (rota `/pagamento`), `vetements/xano_client.py`
  (`create_order` com dados de pagamento), `vetements/loja/state/`
  (estado da página de pagamento e de conta), `vetements/loja/pages/`
  (nova página, carrinho e conta), `vetements/vetements.py` (registro
  da página), testes.
- Depende da change de backend já aplicada.
- Fora do escopo: endereço/frete, cancelamento, status de entrega.
