<!-- reflex managed begin (do not edit inside this block; add custom content outside the markers) -->
# Agents

This project uses the **Reflex agent skills** — up-to-date knowledge for building full-stack Python web apps with [Reflex](https://reflex.dev). Install them first, then use them as described below.

## Installing the Skills

Before working on this project, make sure the Reflex skills are available to you.

### Claude Code

If the skills are not already available, install them yourself by running these shell commands:

```bash
claude plugin marketplace add reflex-dev/agent-skills
claude plugin install reflex@reflex-agent-skills
```

Newly installed plugins load on the next session. After installing, tell the user to restart the session so the skills auto-load; until then, read the skill files directly from `~/.claude/plugins/` when you need them.

### Other agents (Cursor, OpenCode, Codex, Pi)

```
npx skills add reflex-dev/agent-skills
```

Or clone https://github.com/reflex-dev/agent-skills and copy the `skills/` folders into your agent's skill directory (see the repo README for paths).

### Verifying

Before writing or editing any Reflex code, confirm these three skills are available: `reflex-docs`, `setup-python-env`, and `reflex-process-management`. If they are not, STOP and run the install step above — do not proceed without them.

## Using the Skills

### Reflex documentation

For anything about Reflex APIs — components, state management, events, styling, database, routing, authentication — use the **reflex-docs** skill rather than relying on memory. It carries current, version-accurate docs.

### Initializing a new Reflex project

When starting a new Reflex project or setting up a development environment, you **must** follow the **setup-python-env** skill before doing anything else.

Do not skip any steps. Do not assume a virtual environment or Reflex is already available — always verify first by following the skill's instructions in order.

After the environment is ready and Reflex is installed, run:

```bash
reflex init
```

Then proceed with the user's request.

### Managing a Reflex process

When you need to compile, run, reload, or debug a Reflex application, follow the **reflex-process-management** skill for the correct sequence and error investigation steps.
<!-- reflex managed end -->

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
