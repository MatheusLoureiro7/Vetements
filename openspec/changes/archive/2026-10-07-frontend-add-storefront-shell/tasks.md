## 1. Rotas

- [x] 1.1 Criar `vetements/routes.py` com as constantes de rota da loja, do login e da gestão (`/gestao/...`); verificar importando o módulo sem erro
- [x] 1.2 Usar as constantes em `vetements/vetements.py` (gestão sob `/gestao`), na navegação de `vetements/components/shell.py` e nos redirecionamentos de `vetements/state/auth.py` (login → `/gestao`); verificar com `reflex compile --dry` e com `grep` sem rotas literais restantes nesses arquivos

## 2. Estrutura da loja

- [x] 2.1 Criar o pacote `vetements/loja/` (`pages/`, `components/`, `state/`) com `components/layout.py` (cabeçalho com a marca e link "Área da equipe", rodapé) e `pages/home.py` (chamada principal + aviso de coleção em breve); registrar a home em `/` sem `on_load` de autenticação; verificar com `reflex compile --dry`

## 3. Documentação

- [x] 3.1 Atualizar `docs/project-overview.md` (loja virtual como parte 2, rotas `/` e `/gestao`) e o contexto em `openspec/config.yaml`; verificar relendo as seções de escopo

## 4. Verificação

- [x] 4.1 Rodar `pytest` completo e `reflex compile --dry` sem erros
- [x] 4.2 Com o app rodando, sem login: `/` mostra a loja e `/gestao` redireciona para `/login`; verificar no navegador
- [x] 4.3 Teste manual com login: entrar como administrador e como vendedor, conferir que ambos vão para `/gestao` e que todos os itens da sidebar abrem as telas certas
