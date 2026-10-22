## ADDED Requirements

### Requirement: Escolha de variação e adição ao carrinho
A página de detalhe do produto SHALL permitir ao visitante escolher uma
das variações disponíveis (tamanho e cor) e adicioná-la ao carrinho.
Variações esgotadas MUST NOT poder ser escolhidas. Sem variação escolhida,
a adição ao carrinho SHALL ficar indisponível. Após adicionar, a página
SHALL confirmar a adição e oferecer um link para o carrinho.

#### Scenario: Adicionar uma variação disponível
- **WHEN** o visitante escolhe uma variação disponível e usa "Adicionar ao carrinho"
- **THEN** a variação entra no carrinho com quantidade 1 e a página confirma a adição

#### Scenario: Variação esgotada
- **WHEN** o visitante tenta escolher uma variação esgotada
- **THEN** a variação não fica selecionada e não pode ser adicionada ao carrinho

#### Scenario: Mesma variação de novo
- **WHEN** o visitante adiciona uma variação que já está no carrinho
- **THEN** a quantidade daquele item aumenta em 1, sem criar outro item

### Requirement: Carrinho de compras
A loja SHALL manter, sem exigir login, um carrinho no navegador do
visitante, acessível por um ícone no cabeçalho que mostra a quantidade
de itens. A página do carrinho SHALL listar cada item com foto, nome,
tamanho, cor, preço unitário, quantidade e total da linha, permitir
alterar a quantidade entre 1 e 10 e remover o item, e exibir o subtotal.
O carrinho SHALL continuar disponível ao recarregar a página. Com o
carrinho vazio, a página SHALL mostrar um aviso com link para a vitrine.

#### Scenario: Ver o carrinho
- **WHEN** o visitante tem itens no carrinho e abre a página do carrinho
- **THEN** vê cada item com quantidade e total da linha, e o subtotal em reais

#### Scenario: Alterar quantidade
- **WHEN** o visitante aumenta ou diminui a quantidade de um item
- **THEN** a quantidade muda dentro do limite de 1 a 10 e o subtotal é recalculado

#### Scenario: Remover item
- **WHEN** o visitante remove um item
- **THEN** o item sai do carrinho e a contagem do cabeçalho diminui

#### Scenario: Recarregar a página
- **WHEN** o visitante recarrega a loja depois de adicionar itens
- **THEN** o carrinho mantém os mesmos itens

#### Scenario: Carrinho vazio
- **WHEN** o visitante abre o carrinho sem itens
- **THEN** vê o aviso de carrinho vazio e um link para a vitrine
