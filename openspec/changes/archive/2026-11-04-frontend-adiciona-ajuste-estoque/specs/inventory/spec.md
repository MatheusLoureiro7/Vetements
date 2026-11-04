## ADDED Requirements

### Requirement: Ajuste de estoque na tela de Estoque
A tela de Estoque SHALL oferecer a administradores, em cada variação,
uma ação para ajustar o estoque em um popup que mostra produto, SKU e
estoque atual e permite escolher entre três tipos: Entrada (soma a
quantidade informada), Saída (subtrai a quantidade informada) e
Contagem (o usuário informa o total contado e o ajuste é a diferença
em relação ao estoque atual). O popup SHALL aceitar um motivo opcional
e mostrar, antes de salvar, o estoque resultante do ajuste. Usuários
com papel vendedor SHALL NOT ver a ação.

#### Scenario: Administrador dá entrada de mercadoria
- **WHEN** um administrador abre o ajuste de uma variação com estoque
  5, escolhe Entrada, informa 10 e salva
- **THEN** o popup mostra "estoque após o ajuste: 15" antes de salvar,
  e após salvar a linha da variação passa a mostrar 15

#### Scenario: Correção por contagem
- **WHEN** um administrador escolhe Contagem numa variação com estoque
  5 e informa 3 como total contado
- **THEN** o ajuste enviado é de −2 e o estoque da linha passa a ser 3

#### Scenario: Vendedor não vê a ação
- **WHEN** um usuário com papel vendedor acessa a tela de Estoque
- **THEN** vê a listagem sem a ação de ajustar

### Requirement: Validação do ajuste antes de enviar
O popup SHALL impedir o envio, mostrando o erro junto ao campo, quando
a quantidade não for um número inteiro maior que zero (Entrada e
Saída) ou um inteiro maior ou igual a zero (Contagem), quando uma
Saída for maior que o estoque atual, ou quando a Contagem for igual ao
estoque atual (nada a ajustar).

#### Scenario: Saída maior que o estoque
- **WHEN** um administrador escolhe Saída de 8 numa variação com
  estoque 5
- **THEN** o popup mostra um erro informando que há 5 unidades e não
  envia nada ao backend

#### Scenario: Quantidade inválida
- **WHEN** a quantidade está vazia, não é número inteiro ou é zero
  (Entrada/Saída)
- **THEN** o popup mostra o erro no campo e não envia nada

### Requirement: Retorno ao salvar o ajuste
Enquanto o ajuste é enviado, o botão de salvar SHALL indicar
carregamento e ficar desabilitado. Em caso de sucesso, o popup SHALL
fechar, a linha SHALL mostrar o novo estoque (incluindo o destaque de
estoque baixo, se aplicável) e SHALL aparecer um aviso de ajuste
registrado. Em caso de erro do backend ou de comunicação, o popup
SHALL permanecer aberto com os dados preenchidos e mostrar a mensagem
de erro.

#### Scenario: Ajuste salvo
- **WHEN** o backend aceita o ajuste
- **THEN** o popup fecha, a linha mostra o novo estoque e aparece o
  aviso de ajuste registrado

#### Scenario: Backend recusa ou falha
- **WHEN** o backend recusa o ajuste (ex.: estoque mudou por uma venda
  e ficou insuficiente) ou não responde
- **THEN** o popup continua aberto com a mensagem de erro e os campos
  preenchidos, e o botão volta a ficar habilitado
