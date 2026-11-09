## Why

Dois objetos no Xano não existem no repositório e não são usados:

- o addon `variacoes_publicas_by_produto`, criado em 2026-10-14 e
  substituído pela function `Loja/variacoes_publicas` (o push com `-i`
  não remove documentos);
- o endpoint temporário `diag-brevo` (POST, grupo Catalogo, só admin),
  criado em 2026-11-09 para diagnosticar o bloqueio de IP do Brevo.

Deixá-los no servidor confunde quem lê o workspace e mantém um endpoint
de diagnóstico ligado. O usuário pediu (2026-11-09) a arrumação.

## What Changes

- Remover do Xano o addon `variacoes_publicas_by_produto` e o endpoint
  `diag-brevo`, com um push completo (`--sync --delete`) depois de
  conferir na prévia que só esses dois objetos são apagados.
- Corrigir antes o arquivo do grupo `Loja` (`xano/api/loja/loja.xs`),
  que não tem o `canonical = "v-znCPQU"` existente no servidor: sem ele,
  o push completo poderia trocar o endereço do grupo e derrubar a loja.

## Capabilities

### New Capabilities
<!-- nenhuma -->

### Modified Capabilities
<!-- nenhuma: nenhum comportamento muda (skip_specs) -->

## Impact

- Xano: 1 addon e 1 endpoint apagados; grupo `Loja` e `auth/signup`
  reenviados sem mudança de lógica (diferenças só de formatação e
  descrições, e o `canonical` igual ao do servidor).
- Nenhum dado de tabela é alterado; nenhum dado do catálogo muda.
- Apagar é irreversível pelo CLI: exige confirmação explícita do
  usuário depois da prévia.
