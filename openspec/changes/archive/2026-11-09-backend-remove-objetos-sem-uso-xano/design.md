## Context

O CLI do Xano não apaga um objeto isolado; só `push --sync --delete`
remove do servidor o que não existe no repositório. A prévia
(`--dry-run`) de 2026-11-09 listou exatamente os dois objetos-alvo como
DELETE, mais 2 UPDATE: grupo `Loja` (falta o `canonical` no arquivo
local) e `auth/signup` (só descrições/formatação).

## Goals / Non-Goals

**Goals:** servidor igual ao repositório, sem objetos sem uso.

**Non-Goals:** mudar lógica de endpoints; mexer em dados.

## Decisions

- **Adicionar `canonical = "v-znCPQU"` ao `loja.xs`** antes do push: o
  frontend chama a API por esse código (`XANO_GROUP_LOJA`); os outros
  grupos já têm o `canonical` no repositório.
- **Push completo com `--sync --delete`** só se a nova prévia mostrar
  apenas os 2 DELETE esperados e nenhum UPDATE com mudança de lógica.
  Se aparecer qualquer outro DELETE, parar.
- **Sem `--records`/`--truncate`**: nenhum dado de tabela é enviado.

## Risks / Trade-offs

- [Push completo reenvia todos os objetos] → risco de sobrescrever algo
  alterado direto no painel. Mitigação: o pull de 2026-11-09 foi
  comparado e só `Loja` e `auth/signup` diferem, ambos sem mudança de
  lógica; nova prévia logo antes de aplicar.
