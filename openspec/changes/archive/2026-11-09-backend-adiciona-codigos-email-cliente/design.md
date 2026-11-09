## Context

`cliente` é a tabela de autenticação da loja (`auth = true`, senha
opcional). `loja/conta/cadastro` cria a conta e já devolve token. O
envio embutido do Xano (`util.send_email` com chave do Xano) só entrega
ao administrador da instância; o Brevo envia para qualquer endereço com
um remetente verificado, pela API `POST https://api.brevo.com/v3/smtp/email`
(cabeçalho `api-key`, resposta 201).

## Goals / Non-Goals

**Goals:** um único mecanismo de código (gerar, guardar, enviar,
verificar) usado pelos dois fluxos; nenhum segredo no repositório.

**Non-Goals:** fila/reenvio automático de e-mail, template visual
elaborado, recuperação de senha da equipe.

## Decisions

1. **Campos na `cliente`** (um código ativo por vez):
   `email_confirmado` (bool, padrão `true` — assim as contas antigas
   ficam confirmadas; o cadastro grava `false` explicitamente),
   `codigo_hash` (texto), `codigo_tipo` (enum `confirmacao` | `senha`),
   `codigo_expira_em`, `codigo_enviado_em` (timestamps) e
   `codigo_tentativas` (int). Tabela separada seria mais flexível, mas
   um código por cliente basta e evita limpeza de registros.

2. **Código**: `security.random_number` de 100000 a 999999, guardado
   como `sha256` do código concatenado ao id do cliente. 6 dígitos são
   fáceis de digitar; o limite de 5 tentativas e a validade de 15 min
   compensam o espaço pequeno. Nenhuma saída de endpoint inclui os
   campos `codigo_*` (outputs explícitos).

3. **Function `Loja/enviar_codigo`** (input: `cliente_id`, `tipo`):
   checa o intervalo de 60 s, gera e grava o código (zera tentativas),
   monta o e-mail em HTML simples (assunto e texto por tipo) e chama o
   Brevo via `api.request` com `$env.BREVO_API_KEY` e
   `$env.BREVO_SENDER_EMAIL`. Devolve `true`/`false` conforme o status
   201, sem expor a resposta do Brevo.

4. **Verificação** numa function `Loja/verificar_codigo` (input:
   `cliente_id`, `tipo`, `codigo`): falha se não há código do tipo, se
   venceu ou se tentativas ≥ 5; código errado incrementa tentativas.
   Sucesso limpa os campos `codigo_*`. Mensagens: "Código inválido ou
   vencido. Peça um novo código." e "Muitas tentativas. Peça um novo
   código."

5. **Cadastro não falha se o e-mail falhar**: a conta é criada e a
   resposta indica `codigo_enviado: false`; o cliente usa "reenviar
   código". Evita perder o cadastro por instabilidade do Brevo.

6. **Esqueci a senha sem enumeração**: resposta fixa ("Se houver uma
   conta com este e-mail, enviamos um código.") em todos os casos,
   inclusive quando o intervalo de 60 s bloqueia o envio.

7. **Redefinir senha**: valida a regra da senha **antes** de verificar o
   código (senha fraca não consome tentativa), usando a ordem correta do
   `regex_matches` (padrão à esquerda). Sucesso troca a senha, marca
   `email_confirmado = true` e devolve token (24 h, como o login).

## Risks / Trade-offs

- [Variáveis de ambiente ausentes ou chave inválida] → o envio devolve
  `false`; cadastro segue e o reenvio mostra "Não foi possível enviar o
  código agora". A verificação inclui um envio real.
- [Plano grátis do Brevo: 300 e-mails/dia] → suficiente para o projeto.
- [Remetente Gmail verificado pode cair em spam] → avisar na tela para
  olhar a caixa de spam.
- [Corrida entre dois pedidos de código] → o último grava por cima; o
  código anterior deixa de valer, que é o comportamento esperado.

## Migration Plan

O usuário cria `BREVO_API_KEY` e `BREVO_SENDER_EMAIL` no painel do Xano
antes do envio. Dry-run com a tabela, as 2 functions e os 7 endpoints;
preview; push após confirmação; pull de verificação. Rollback:
reverter os endpoints (os campos novos são opcionais).
