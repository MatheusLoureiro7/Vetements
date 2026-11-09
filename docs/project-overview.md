# Project Overview — Vetements (ERP de Moda)

## 1. Visão geral

Vetements é um sistema para uma loja de roupas, dividido em duas partes:

- **Parte 1 — Gestão (ERP)**, de uso **interno**: a equipe da loja cadastra
  produtos, controla estoque, registra vendas e mantém um cadastro de
  clientes. Fica sob o endereço `/gestao` e exige login.
- **Parte 2 — Loja virtual**, pública: vitrine voltada ao consumidor final,
  na raiz do site (`/`), com catálogo, carrinho, conta de cliente (com
  confirmação de e-mail e recuperação de senha), finalização do pedido com
  pagamento simulado e acompanhamento do status do pedido.

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

- **Administrador**: cadastra produtos, categorias e usuários da equipe;
  ajusta estoque; acompanha vendas e avança o status dos pedidos da loja.
- **Vendedor**: consulta produtos/estoque, registra vendas e avança o
  status dos pedidos da loja.
- **Cliente**: não acessa a gestão. Pode ser só um cadastro associado às
  vendas de balcão ou ter conta na loja virtual (e-mail e senha), com a
  qual faz pedidos e acompanha o status deles.
- **Visitante da loja**: acessa a loja virtual sem login.

## 5. Escopo

### Dentro do escopo (MVP)

- Cadastro de produtos e categorias (tipos de roupa).
- Cadastro de variações de produto (tamanho, cor) com controle de estoque.
- Registro de vendas (pedidos internos) com um ou mais itens.
- Cadastro de clientes.
- Cadastro de usuários com papéis (administrador, vendedor) e login.

### Parte 2 — Loja virtual

- Estrutura e página inicial pública da loja (feito).
- Vitrine com produtos reais, filtros e busca, página de produto e
  carrinho salvo no navegador (feito).
- Conta de cliente, finalização do pedido (vira venda de origem "loja
  virtual", com baixa de estoque) e "Meus pedidos" (feito).
- Pagamento **simulado** no checkout: Pix, cartão ou boleto fictícios,
  sem cobrança real; o pedido é criado já pago e o cartão de final 0000
  simula recusa. Só os 4 últimos dígitos do cartão chegam ao backend
  (feito).
- Códigos de 6 dígitos por e-mail (enviados pelo Xano via Brevo):
  confirmação do e-mail na criação da conta — o pedido só é aceito com o
  e-mail confirmado — e recuperação de senha (feito).
- Status do pedido depois do pagamento: **pago → enviado → entregue**. A
  equipe avança na tela de Vendas, um passo por vez; o cliente vê o status
  e as datas em "Minha conta" (feito).
- O catálogo da loja (nomes, preços, descrições, fotos e categorias) fica
  como está: decisão do usuário em 2026-11-09. Não há edição de catálogo,
  envio de fotos nem desativação de produtos/categorias no escopo.

### Fora do escopo (por enquanto)

- Integração com meios de pagamento reais (operadoras, gateways). O
  pagamento da loja é apenas simulado, para demonstração.
- Endereço de entrega, frete, rastreio e cancelamento/estorno de pedidos.
- Emissão de nota fiscal.
- Controle financeiro (contas a pagar/receber, fluxo de caixa).
- Múltiplas lojas/filiais.
- Relatórios avançados e dashboards analíticos.

Essas funcionalidades fora do escopo poderão ser propostas como novas
*changes* em etapas futuras do projeto, se o grupo decidir evoluir o sistema.

## 6. Principais funcionalidades

- **Produtos**: cadastrar, editar e listar produtos e suas variações
  (tamanho/cor), organizados por categoria.
- **Estoque**: visualizar a quantidade disponível de cada variação e,
  para administradores, ajustá-la (entrada, saída ou contagem), com
  registro de quem ajustou.
- **Vendas**: registrar uma venda com um ou mais itens, associá-la
  opcionalmente a um cliente e dar baixa automática no estoque. Os pedidos
  da loja aparecem no mesmo histórico, com o status do pedido e o botão
  para avançá-lo.
- **Clientes**: cadastrar e consultar clientes.
- **Usuários e acesso**: autenticação de funcionários e controle de
  permissões por papel (administrador / vendedor).

## 7. Requisitos e restrições importantes

- Uma venda não pode reduzir o estoque de uma variação para um valor
  negativo.
- Toda venda de balcão deve registrar quem a realizou (usuário logado);
  pedidos da loja registram o cliente e nenhum usuário da equipe.
- O status de um pedido da loja só avança um passo por vez (pago →
  enviado → entregue), nunca volta.
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
- Loja e gestão rodam no mesmo app Reflex: a loja em `vetements/loja/`
  (rotas públicas na raiz) e a gestão em `vetements/pages`, `state` e
  `components` (rotas sob `/gestao`). Os caminhos ficam em
  `vetements/routes.py`.
- Regras de negócio e de autorização (o que cada papel pode fazer) devem ser
  aplicadas no backend (Xano), nunca apenas no frontend.
- E-mails transacionais (códigos de confirmação e de recuperação de senha)
  são enviados pelo Xano pela API do Brevo. A chave e o remetente ficam em
  variáveis de ambiente do Xano (`BREVO_API_KEY`, `BREVO_SENDER_EMAIL`),
  nunca no repositório; a conta do Brevo só aceita os IPs de saída do Xano
  liberados na lista de IPs autorizados.

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
  expostas ou armazenadas em texto puro. Os códigos enviados por e-mail
  também são guardados só como hash, valem 15 minutos e aceitam até 5
  tentativas.
- Ações sensíveis da equipe (criação de usuário, ajuste de estoque, avanço
  de status) ficam registradas no histórico de eventos.
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
