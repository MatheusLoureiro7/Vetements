# xano-api-client Specification

## Purpose
Define como o frontend se comunica com a API do Xano para tolerar oscilações
de internet sem duplicar operações de escrita.

## Requirements

### Requirement: Reutilização de conexão com o Xano
O frontend SHALL reutilizar conexões HTTP já abertas com a instância do Xano
entre requisições sucessivas, em vez de abrir uma conexão nova a cada
chamada.

#### Scenario: Chamadas sucessivas reaproveitam a conexão
- **WHEN** o frontend faz várias requisições ao Xano em sequência (ex.: carregamento do dashboard)
- **THEN** todas as requisições são enviadas pelo mesmo cliente HTTP compartilhado, que mantém as conexões abertas (keep-alive)

### Requirement: Nova tentativa automática em leituras
Requisições de leitura (GET) ao Xano SHALL ser repetidas automaticamente,
até o total de 3 tentativas, quando falharem por erro de rede/timeout ou
quando o Xano responder com status 429, 502, 503 ou 504. Entre as
tentativas, o frontend MUST aguardar um intervalo crescente
(aproximadamente 0,5s e depois 1s).

#### Scenario: Falha momentânea de rede seguida de sucesso
- **WHEN** a primeira tentativa de um GET falha por erro de rede e a segunda responde 200
- **THEN** o frontend retorna os dados da segunda tentativa sem exibir erro

#### Scenario: Erro transitório do servidor seguido de sucesso
- **WHEN** um GET recebe 503 na primeira tentativa e 200 na seguinte
- **THEN** o frontend retorna os dados da resposta 200

#### Scenario: Falhas persistentes esgotam as tentativas
- **WHEN** as 3 tentativas de um GET falham por erro de rede
- **THEN** o frontend gera um erro de comunicação (sem código de status), como já ocorre hoje

#### Scenario: Erro de cliente não é repetido
- **WHEN** um GET recebe 401, 403, 404 ou outro 4xx diferente de 429
- **THEN** o frontend não repete a requisição e gera o erro com a mensagem retornada pelo Xano

### Requirement: Escritas nunca são duplicadas
Requisições de escrita (POST) ao Xano MUST NOT ser repetidas quando houver
qualquer possibilidade de o servidor já tê-las recebido. Uma escrita SHALL
ser repetida (até 3 tentativas no total) somente quando a falha ocorreu ao
estabelecer a conexão, antes do envio da requisição.

#### Scenario: Falha ao conectar em uma escrita
- **WHEN** um POST falha porque não foi possível conectar ao Xano e a tentativa seguinte é bem-sucedida
- **THEN** o frontend retorna o resultado da tentativa bem-sucedida

#### Scenario: Timeout de leitura em uma escrita
- **WHEN** um POST é enviado mas a resposta não chega a tempo (timeout de leitura)
- **THEN** o frontend não repete a requisição e gera um erro de comunicação

#### Scenario: Erro transitório do servidor em uma escrita
- **WHEN** um POST recebe 502, 503 ou 504
- **THEN** o frontend não repete a requisição e gera o erro correspondente

### Requirement: Timeouts separados de conexão e de resposta
O frontend SHALL usar um tempo-limite curto para estabelecer a conexão com o
Xano (cerca de 5s) e um tempo-limite maior para aguardar a resposta (cerca
de 15s).

#### Scenario: Servidor inacessível
- **WHEN** não é possível estabelecer conexão com o Xano
- **THEN** cada tentativa desiste após cerca de 5s, em vez de aguardar o tempo-limite de leitura
