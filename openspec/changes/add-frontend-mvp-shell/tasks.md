## 1. Setup do projeto Reflex

- [ ] 1.1 Rodar `reflex init` na raiz criando `rxconfig.py` e o pacote `vetements/` e verificar que `reflex run` sobe o app padrão sem erro
- [ ] 1.2 Configurar fontes Fraunces e IBM Plex Sans (Google Fonts) no app e verificar que aparecem carregadas no dev tools do navegador
- [ ] 1.3 Criar `vetements/styles.py` com os tokens de cor/tipografia do sistema "Atelier" e verificar que são importáveis sem erro (`python -c "from vetements import styles"`)

## 2. Componentes visuais compartilhados

- [ ] 2.1 Criar `components/ui.py` com tabela hairline (sem sombra/card) e verificar visualmente em uma página de teste
- [ ] 2.2 Criar componente de indicador de estoque baixo (tick lateral bordô) e verificar visualmente com um dado de exemplo acima/abaixo do limite
- [ ] 2.3 Criar componente de bloco de estatística ("número grande + rótulo", separado por hairline vertical) e verificar visualmente com dados de exemplo
- [ ] 2.4 Criar `components/shell.py` (sidebar fixa + topbar com nome/papel do usuário e logout) e verificar que renderiza com itens de navegação mockados

## 3. Dados mockados

- [ ] 3.1 Criar `state/mock_data.py` com dataclasses para Usuário, Cliente, Categoria, Produto, VariaçãoProduto, Venda, ItemVenda, seguindo `docs/domain-model.md`
- [ ] 3.2 Popular dados-semente: ao menos 2 usuários (1 administrador, 1 vendedor), 3 categorias, 6 produtos com 2+ variações cada, 3 clientes, 2 vendas de exemplo
- [ ] 3.3 Implementar funções de acesso (`list_products`, `create_product`, `list_variants`, `decrement_stock`, `list_sales`, `create_sale`, `list_customers`, `create_customer`, `authenticate`) e verificar cada uma com um teste unitário simples (`pytest`)

## 4. Autenticação e shell (capability `auth`)

- [ ] 4.1 Implementar `state/auth.py` (`AuthState`: `is_authenticated`, `role`, `current_user`, `login()`, `logout()`) usando `authenticate()` de `mock_data.py`
- [ ] 4.2 Implementar `pages/login.py` com formulário e mensagem de erro para credencial inválida, e verificar manualmente: login válido de administrador e de vendedor funcionam; credencial inválida exibe "E-mail ou senha inválidos" (specs `auth`: Login com credenciais válidas/inválidas)
- [ ] 4.3 Adicionar verificação `on_load` nas páginas protegidas redirecionando para `/login` quando `is_authenticated` for falso, e verificar manualmente acessando uma rota protegida sem sessão (spec `auth`: Acesso exige autenticação)
- [ ] 4.4 Adicionar `computed var` de permissão por papel (ex. `can_edit_products`) em `AuthState` e usar no shell para esconder itens administrativos do vendedor, verificando manualmente com os dois papéis (spec `auth`: Ações administrativas restritas por papel)
- [ ] 4.5 Implementar logout no shell e verificar manualmente que encerra a sessão e redireciona ao login (spec `auth`: Encerramento de sessão)
- [ ] 4.6 Verificar manualmente que recarregar a página mantém a sessão autenticada e o papel (spec `auth`: Sessão sobrevive a recarregar a página)

## 5. Dashboard (capability `dashboard`)

- [ ] 5.1 Implementar `state/dashboard.py` agregando contagem de produtos, variações com estoque baixo, total vendido no mês e número de clientes a partir de `mock_data.py`
- [ ] 5.2 Implementar `pages/dashboard.py` usando o bloco de estatística e a lista de vendas recentes (mais recente primeiro), e verificar manualmente os números batem com os dados-semente (specs `dashboard`)

## 6. Produtos & Categorias (capability `product-catalog`)

- [ ] 6.1 Implementar `state/products.py` com listagem, busca por nome, criação de produto (com categoria obrigatória) e adição de variação (tamanho/cor/SKU/estoque inicial)
- [ ] 6.2 Implementar `pages/products.py` com tabela hairline, busca e (para administrador) formulário de novo produto/variação, verificando manualmente cada cenário de `specs/product-catalog/spec.md`
- [ ] 6.3 Verificar manualmente que vendedor não vê as ações de criar/editar produto ou categoria (spec `auth`: Ações administrativas restritas por papel, aplicado a esta tela)

## 7. Estoque (capability `inventory`)

- [ ] 7.1 Implementar `state/inventory.py` com listagem de variações e constante `LOW_STOCK_THRESHOLD`
- [ ] 7.2 Implementar `pages/inventory.py` com tabela hairline e indicador de estoque baixo, verificando manualmente os cenários de `specs/inventory/spec.md`

## 8. Vendas (capability `sales`)

- [ ] 8.1 Implementar `state/sales.py`: seleção de cliente opcional, adição/remoção de itens com validação de quantidade contra o estoque disponível, cálculo de total, confirmação de venda com baixa de estoque via `decrement_stock`
- [ ] 8.2 Implementar `pages/sales.py` (formulário de nova venda + lista de vendas registradas), verificando manualmente cada cenário de `specs/sales/spec.md`, incluindo bloqueio de quantidade acima do estoque e bloqueio de venda sem item
- [ ] 8.3 Escrever teste unitário (`pytest`) para a regra "estoque nunca fica negativo" após múltiplas baixas simuladas e verificar que passa
- [ ] 8.4 Escrever teste unitário (`pytest`) para o cálculo do valor total da venda a partir dos itens e verificar que passa

## 9. Clientes (capability `customers`)

- [ ] 9.1 Implementar `state/customers.py` com listagem, busca por nome e cadastro (nome + ao menos um contato obrigatório)
- [ ] 9.2 Implementar `pages/customers.py`, verificando manualmente os cenários de `specs/customers/spec.md`

## 10. Verificação final

- [ ] 10.1 Rodar `reflex run` e navegar por todas as seis telas com sessão de administrador, conferindo visualmente o sistema "Atelier" (cores, tipografia, hairlines, ausência de cards com sombra)
- [ ] 10.2 Repetir a navegação completa com sessão de vendedor, conferindo que as restrições de papel se aplicam em todas as telas
- [ ] 10.3 Rodar a suíte `pytest` completa e confirmar que todos os testes unitários de `mock_data`/`sales` passam
