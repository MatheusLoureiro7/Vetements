## Context

O catálogo vive no Xano (`xano/table/produto.xs`, `variacao_produto.xs`,
`categoria.xs`) e é exposto só pelo grupo `Catalogo`, com `auth = "user"`.
Mudanças são feitas em XanoScript em `xano/` e aplicadas com
`xano workspace push` (dry-run mostrado ao usuário antes do push real),
como na change `backend-integra-xano`.

## Goals / Non-Goals

**Goals:**
- API pública só de leitura, isolada em um grupo próprio.
- Nenhuma alteração de comportamento nos endpoints internos.

**Non-Goals:**
- Endpoints de escrita para fotos/publicação (próxima change, junto com a
  tela da gestão). Cache/CDN, paginação.

## Decisions

- **Grupo de API separado `Loja`** em vez de liberar `auth` nos endpoints
  de `Catalogo`: os internos continuam devolvendo estoque e SKU para a
  equipe; o público tem formato próprio e enxuto. Também deixa explícito,
  pela URL base, o que é público.
- **`imagens` como lista de `image` no próprio `produto`** (não uma tabela
  `produto_imagem`): a vitrine só precisa das fotos em ordem; tabela
  separada só valeria com metadados por foto (cor, ordem editável).
- **`publicado` com padrão falso** e registros existentes migrados para
  falso: publicar é decisão explícita da equipe.
- **Variações via function `Loja/variacoes_publicas`**, chamada com
  `function.run` pelos dois endpoints, que devolve só `id`, `tamanho`,
  `cor` e `disponivel` (`estoque|greater_than:0`). O estoque numérico e o
  SKU nunca saem do backend. (Revisado na aplicação: o plano original era
  um addon, mas o `eval` de um `db.query` só aceita filtros de consulta,
  que não têm comparação — `estoque > 0` falhava com `Invalid entry`, e
  o erro era engolido quando o addon vinha anexado via `addon = [...]`,
  fazendo o campo `variacoes` simplesmente sumir da resposta. Como o
  stack de um addon só aceita `db.query`, a comparação foi movida para o
  stack de uma function.)
- **Push só dos arquivos novos/alterados** (`-i`), para não reenviar os
  documentos existentes, que diferem do servidor apenas em formatação.

## Risks / Trade-offs

- [Endpoints públicos podem ser chamados em excesso] → só leitura e sem
  dados sensíveis; limitação de taxa fica para quando houver tráfego real.
- [Nenhum produto aparece até alguém publicar pelo painel do Xano] →
  esperado nesta fase; a change de frontend da gestão traz o controle.
- [Sintaxe de `image[]`/`eval` com comparação não confirmada na
  documentação] → o `--dry-run` do push valida a sintaxe e o teste com
  `curl` valida o formato da resposta antes de arquivar.
