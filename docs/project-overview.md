# Project Overview — Vetements (ERP de Moda)

## 1. Visão geral

Vetements é um ERP (sistema de gestão) básico para uma loja de roupas. O sistema
é de uso **interno**: a equipe da loja utiliza o sistema para cadastrar
produtos, controlar estoque, registrar vendas e manter um cadastro de
clientes. Não há, nesta fase, uma vitrine online voltada ao consumidor final —
o cliente compra na loja e é apenas cadastrado/consultado no sistema.

## 2. Problema

Lojas de roupa pequenas frequentemente controlam produtos, estoque e vendas em
planilhas ou de forma manual, o que gera divergências de estoque, falta de
histórico de vendas confiável e dificuldade para saber o que está disponível
para venda. O Vetements resolve isso centralizando produtos, estoque, vendas e
clientes em um único sistema.

## 3. Objetivos

- Permitir o cadastro organizado de produtos (roupas) e suas variações
  (tamanho, cor).
- Manter o controle de quantidade em estoque por variação de produto.
- Registrar vendas de forma simples, com baixa automática de estoque.
- Manter um cadastro básico de clientes.
- Controlar o acesso ao sistema por meio de usuários com papéis distintos
  (administrador e vendedor).

## 4. Público-alvo / usuários

- **Administrador**: cadastra produtos, categorias e usuários; acompanha
  vendas e estoque.
- **Vendedor**: consulta produtos/estoque e registra vendas.
- **Cliente**: não acessa o sistema diretamente; é apenas um cadastro
  associado às vendas.

## 5. Escopo

### Dentro do escopo (MVP)

- Cadastro de produtos e categorias (tipos de roupa).
- Cadastro de variações de produto (tamanho, cor) com controle de estoque.
- Registro de vendas (pedidos internos) com um ou mais itens.
- Cadastro de clientes.
- Cadastro de usuários com papéis (administrador, vendedor) e login.

### Fora do escopo (por enquanto)

- Loja online / vitrine para o cliente final.
- Integração com meios de pagamento.
- Emissão de nota fiscal.
- Controle financeiro (contas a pagar/receber, fluxo de caixa).
- Múltiplas lojas/filiais.
- Relatórios avançados e dashboards analíticos.

Essas funcionalidades fora do escopo poderão ser propostas como novas
*changes* em etapas futuras do projeto, se o grupo decidir evoluir o sistema.

## 6. Principais funcionalidades

- **Produtos**: cadastrar, editar e listar produtos e suas variações
  (tamanho/cor), organizados por categoria.
- **Estoque**: visualizar e atualizar a quantidade disponível de cada
  variação de produto.
- **Vendas**: registrar uma venda com um ou mais itens, associá-la
  opcionalmente a um cliente e dar baixa automática no estoque.
- **Clientes**: cadastrar e consultar clientes.
- **Usuários e acesso**: autenticação de funcionários e controle de
  permissões por papel (administrador / vendedor).

## 7. Requisitos e restrições importantes

- Uma venda não pode reduzir o estoque de uma variação para um valor
  negativo.
- Toda venda deve registrar quem a realizou (usuário logado).
- Apenas administradores podem cadastrar/editar produtos, categorias e
  usuários.
- Vendedores podem registrar vendas e consultar produtos/estoque, mas não
  alterar cadastros de produto.

## 8. Arquitetura tecnológica

- **Frontend/aplicação**: [Reflex](https://reflex.dev) (Python), responsável
  pela interface e pela orquestração das telas do sistema.
- **Backend/dados**: [Xano](https://xano.com), responsável pelo banco de
  dados, pelas APIs (REST) e pela autenticação dos usuários.
- A aplicação Reflex consome a API do Xano para ler e gravar dados; o Reflex
  não acessa banco de dados diretamente.
- Regras de negócio e de autorização (o que cada papel pode fazer) devem ser
  aplicadas no backend (Xano), nunca apenas no frontend.

## 9. Princípios de desenvolvimento

- Desenvolvimento incremental, usando OpenSpec para planejar e revisar cada
  mudança antes de implementá-la.
- Reaproveitar estruturas já existentes (ex.: tabela de usuário já criada no
  Xano) em vez de recriá-las.
- Preferir simplicidade: para o MVP, evitar funcionalidades fora do escopo
  definido na seção 5.

## 10. Segurança e integridade

- Autenticação de usuários e verificação de papel (administrador/vendedor)
  devem ocorrer no backend (Xano), não apenas na interface.
- Senhas de usuários e de clientes (quando existirem) nunca devem ser
  expostas ou armazenadas em texto puro.
- Operações de venda que alteram estoque devem ser tratadas de forma
  consistente, evitando estoque negativo.

## 11. Estratégia de desenvolvimento

O projeto será desenvolvido em changes incrementais via OpenSpec, seguindo o
ciclo Explore → Propose → Review → Apply → Archive. Sugestão de ordem para as
primeiras mudanças, do mais fundamental ao mais dependente:

1. Usuários e autenticação (login, papéis).
2. Produtos, categorias e variações.
3. Estoque (associado às variações de produto).
4. Clientes.
5. Vendas/pedidos (depende de produtos, estoque, clientes e usuários).

Essa ordem pode ser ajustada após o primeiro Explore.

## 12. Fonte de verdade e documentação

- Este documento (`docs/project-overview.md`) descreve o que é o projeto.
- `docs/domain-model.md` descreve os conceitos do domínio e seus
  relacionamentos.
- `AGENTS.md` descreve como o agente de IA deve trabalhar no projeto.
- `openspec/specs/` refletirá, ao longo do tempo, o comportamento consolidado
  do sistema conforme as changes forem arquivadas.
