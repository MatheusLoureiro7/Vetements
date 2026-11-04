## Context

O estoque vive no campo `estoque` de `variacao_produto` (com
`filters=min:0`). Hoje ele só é escrito por `produtos/{id}/variacoes`
(valor inicial) e pelas vendas (`venda` POST e `loja/pedidos` POST),
que fazem checagem + baixa dentro do mesmo endpoint. A autorização por
papel segue o padrão dos endpoints do grupo Catalogo: `auth = "user"`,
`db.get "user"` com `$auth.id` e `precondition` em
`role == "administrador"`. A tabela `event_log` (user_id, action,
metadata json) já existe e é usada pelo login/signup.

## Goals / Non-Goals

**Goals:**
- Um único endpoint de ajuste, com o mesmo padrão de autorização e de
  mensagens de erro dos endpoints de Catalogo.
- Trilha mínima de auditoria sem criar tabela nova.

**Non-Goals:**
- Endpoint para listar o histórico de ajustes (fica para quando houver
  tela que precise).
- Tornar a operação atômica contra ajustes/vendas simultâneos.

## Decisions

1. **Ajuste relativo (delta), não valor absoluto.**
   `POST variacoes/{variacao_id}/ajustes` recebe `int quantidade`
   (≠ 0) e `text motivo?`. Entrada de mercadoria é naturalmente um
   delta ("chegaram 10"), e um delta não sobrescreve uma venda feita
   entre a leitura da tela e o envio, como faria "definir estoque = N".
   Para correção por contagem, a tela calcula o delta (contado − atual)
   e mostra ao usuário antes de enviar.
   *Alternativa*: aceitar `modo` = entrada | definir. Rejeitada para
   manter um caminho só no backend; pode ser adicionada depois sem
   quebrar o contrato.

2. **Rota no grupo Catalogo, como sub-recurso da variação.** Segue o
   estilo de `produtos/{produto_id}/variacoes` e
   `produtos/{produto_id}/publicacao`; o `xano_client` já conhece o
   grupo.

3. **Ordem no stack**: carregar usuário → precondition de papel
   (`accessdenied`) → precondition `quantidade != 0` (`inputerror`) →
   `db.get variacao_produto` → precondition existe (`inputerror`, mesmo
   padrão de "Produto informado não existe.") → calcular
   `novo = estoque + quantidade` → precondition `novo >= 0`
   (`inputerror` "Estoque insuficiente: há N unidade(s) disponível(is).")
   → `db.edit` + `db.add event_log` dentro de um `db.transaction`
   (como em `venda_POST`), para o ajuste nunca ficar sem registro.
   Toda validação vem antes de
   qualquer escrita, então um ajuste rejeitado não altera nada nem
   gera log.

4. **Auditoria em `event_log`** com `action = "ajuste_estoque"` e
   `metadata = {variacao_id, sku, estoque_anterior, estoque_novo,
   quantidade, motivo}`. Reaproveita a tabela existente (regra do
   AGENTS.md) e já tem índice por `user_id` e `created_at`.

5. **Resposta** = variação atualizada (mesmos campos de `variacoes`
   GET para uma linha), para a tela atualizar a linha sem recarregar
   tudo.

## Risks / Trade-offs

- [Ajuste e venda da mesma variação no mesmo instante podem ler o
  mesmo estoque antes de qualquer escrita] → Mesmo risco residual já
  documentado na spec `inventory` para vendas; aceito para o volume
  deste ERP. O `filters=min:0` da tabela é a última barreira contra
  valor negativo.
- [Motivo livre pode conter texto longo] → `filters=trim|max:200`.

## Migration Plan

Endpoint novo, sem alteração de tabela: `xano workspace push
--dry-run` só com o arquivo novo, mostrar o preview ao usuário,
aplicar após confirmação. Rollback = remover o endpoint (nada mais
depende dele até a change de frontend).
