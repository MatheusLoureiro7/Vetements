## Context

`ContaState` guarda o token de cliente num cookie e trata entrar,
cadastrar e "Minha conta"; formulários de conta são não controlados
(lidos no envio). `PagamentoState.load_pagamento` já redireciona sem
login/carrinho vazio. Destinos de retorno usam `href_entrar(proximo)` e
`destino_seguro`.

## Goals / Non-Goals

**Goals:** reaproveitar o visual e os helpers de conta; saber se a
conta está confirmada sem chamadas extras a cada página.

**Non-Goals:** contador regressivo de reenvio em tempo real (a mensagem
do backend basta), máscara de código.

## Decisions

1. **`email_confirmado` no `ContaState`**: preenchido no cadastro
   (resposta do backend), no login e em `load_conta`
   (`loja/conta` GET). Login de conta antiga devolve só token e
   cliente, então o estado consulta `loja/conta` logo após o login
   para saber a situação — uma chamada a mais apenas no login.

2. **Rotas** `LOJA_CONFIRMAR = "/conta/confirmar"` e
   `LOJA_RECUPERAR = "/conta/recuperar"`, ambas aceitando `proximo`
   (filtrado por `destino_seguro`).

3. **Estado próprio** `CodigosState` em `vetements/loja/state/codigos.py`
   para as duas páginas (mensagens, passo da recuperação, e-mail do
   passo 1, `enviando`), lendo o token via `get_state(ContaState)`.
   Mantém `ContaState` focado em sessão e pedidos.

4. **Cadastro → confirmação**: `cadastrar` redireciona para
   `/conta/confirmar?proximo=<destino>`; se o backend indicar
   `codigo_enviado: false`, a página já abre com a mensagem para usar
   "Reenviar código".

5. **Pagamento**: `load_pagamento` consulta o `ContaState`; conta não
   confirmada → `/conta/confirmar?proximo=/pagamento`. O backend recusa
   de qualquer forma, então a tela é conveniência.

6. **Redefinir senha** grava o token devolvido no cookie de cliente
   (mesmo caminho de `_entrar_com`) e vai para "Minha conta".

## Risks / Trade-offs

- [Código só chega num e-mail real] → a verificação no navegador usa um
  e-mail indicado pelo usuário, que lê o código e informa.
- [Cliques simulados da extensão podem não chegar à página] → usar
  eventos disparados por JavaScript, como nas changes anteriores.
