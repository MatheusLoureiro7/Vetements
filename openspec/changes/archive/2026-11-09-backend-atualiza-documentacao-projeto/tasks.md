## 1. Documentos

- [x] 1.1 Atualizar `docs/project-overview.md` (loja, gestão, papéis,
  decisão do catálogo, Brevo).
- [x] 1.2 Atualizar `docs/domain-model.md` (Venda, Cliente, estoque,
  Histórico de eventos, diagrama).

## 2. Verificação

- [x] 2.1 Conferir cada afirmação contra o código/specs atuais
  (`openspec/specs/`, `xano/table/*.xs`); nada descrito que não exista.

Resultado (2026-11-09): os dois documentos foram atualizados e cada
afirmação foi conferida contra `xano/table/*.xs`, os endpoints e
`openspec/specs/`. Na conferência apareceu um problema que já existia: o
evento de login (`auth/login`, herdado do modelo do Xano) grava no
`event_log` o registro do usuário com o hash da senha. Ficou registrado
como problema conhecido no `domain-model.md`, para uma change de backend
futura, e não foi corrigido aqui (fora do escopo, que é só documentação).
