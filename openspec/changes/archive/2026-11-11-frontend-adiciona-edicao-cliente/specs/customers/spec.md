## ADDED Requirements

### Requirement: Edição de cliente na tela de Clientes
A tela de Clientes SHALL oferecer, em cada linha, a ação "Editar", que
abre um popup com nome, telefone e e-mail do cliente já preenchidos.
Ao salvar, a tela SHALL indicar carregamento e impedir um segundo envio
enquanto o primeiro não termina. Se o backend recusar, a tela SHALL
mostrar a mensagem no popup e manter o que foi digitado. Se aceitar, a
tela SHALL fechar o popup, mostrar um aviso de sucesso e atualizar a
lista; quando o backend indicar que o cliente precisará confirmar o novo
e-mail, o aviso SHALL dizer isso. Fechar o popup sem salvar SHALL
descartar o que foi digitado.

#### Scenario: Editar telefone
- **WHEN** a equipe edita o telefone de um cliente e salva
- **THEN** o popup fecha, aparece "Cliente atualizado." e a lista mostra o novo telefone

#### Scenario: Trocar e-mail de quem tem conta na loja
- **WHEN** a equipe troca o e-mail de um cliente com conta na loja e salva
- **THEN** aparece "Cliente atualizado. Ele precisará confirmar o novo e-mail na loja antes do próximo pedido."

#### Scenario: Backend recusa
- **WHEN** a equipe apaga telefone e e-mail e salva
- **THEN** o popup continua aberto com a mensagem do backend e os campos como foram digitados

#### Scenario: Fechar sem salvar
- **WHEN** a equipe altera campos e fecha o popup sem salvar
- **THEN** nada é enviado e, ao abrir de novo, os campos mostram os dados atuais do cliente
