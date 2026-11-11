## ADDED Requirements

### Requirement: Mensagem clara para o limite de requisições
Quando o Xano responder que o limite de requisições do plano foi
atingido (HTTP 429), e depois das novas tentativas permitidas, o cliente
SHALL entregar às telas a mensagem "O servidor está recebendo muitas
requisições agora (limite do plano gratuito do Xano). Aguarde alguns
segundos e tente de novo." em vez do texto original do Xano.

#### Scenario: Limite atingido ao carregar uma tela
- **WHEN** o Xano responde 429 a todas as tentativas de uma leitura
- **THEN** o erro entregue à tela traz a mensagem em português e o status 429
