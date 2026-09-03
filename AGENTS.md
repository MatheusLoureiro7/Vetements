# AGENTS.md

Este arquivo contém instruções operacionais para agentes de IA que trabalham
no projeto **Vetements** (ERP básico de moda). Para entender o que é o
projeto e o domínio, consulte primeiro:

- `docs/project-overview.md` — o que é o projeto.
- `docs/domain-model.md` — conceitos do domínio e relacionamentos.
- `openspec/config.yaml` — contexto e regras usadas pelos workflows do
  OpenSpec.

## Documentação

Antes de realizar alterações significativas, consultar os documentos de
contexto do projeto (`docs/project-overview.md` e `docs/domain-model.md`).

## Arquitetura

- Respeitar a arquitetura definida: **Reflex** (Python) para a aplicação e
  **Xano** para banco de dados, APIs e autenticação.
- Não introduzir tecnologias alternativas (outro framework de frontend,
  outro backend, outro banco de dados) sem justificativa e sem discutir com
  o grupo.
- O frontend (Reflex) consome a API do Xano; não implementar acesso direto a
  banco de dados a partir do frontend.

## Código

- Reutilizar código e estruturas já existentes (ex.: tabela `user` já
  definida no Xano) quando apropriado, em vez de recriá-las.
- Evitar duplicação de lógica entre telas/módulos.
- Não modificar funcionalidades não relacionadas à mudança atual sem
  justificativa.

## Segurança

- Regras de autorização (o que administrador e vendedor podem fazer) devem
  ser aplicadas no backend (Xano), nunca apenas na interface do Reflex.
- Nunca expor senhas ou dados sensíveis em respostas de API ou em logs.

## Desenvolvimento

- Mudanças devem utilizar o OpenSpec, seguindo o ciclo Explore → Propose →
  Review → Apply → Archive.
- Priorizar mudanças pequenas e verificáveis em vez de mudanças grandes que
  misturam vários módulos.

## Testes

- Mudanças funcionais devem possuir uma estratégia de verificação simples
  (ex.: passos manuais de teste ou testes automatizados), descrita no
  `tasks.md` da change correspondente.
