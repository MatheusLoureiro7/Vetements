## Context

`InventoryState` herda de `AuthState` (que expõe `is_admin`) e guarda
as linhas cruas do Xano em `_raw`, convertidas em `VariacaoView` por
`refresh()`. O padrão de popup já existe em Produtos e Vendas
(`rx.dialog` controlado por `show_form`, `form_error`, flag
`is_submitting_*`, `ui.field` com erro por campo, `ui.success_message`).
Esta versão do Reflex não gera setters automáticos (precisa de
`set_<var>` explícitos) e usa dataclasses em vez de `rx.Base`.

## Goals / Non-Goals

**Goals:**
- Reaproveitar o padrão de popup de Produtos/Vendas, sem componente
  novo em `ui.py` a menos que seja reaproveitável.
- Concentrar o cálculo do ajuste numa função pura testável.

**Non-Goals:**
- Recarregar a lista inteira após cada ajuste.
- Esconder a tela de Estoque de vendedores (continua só leitura).

## Decisions

1. **Função pura `calcular_ajuste(tipo, valor_texto, estoque_atual)`**
   em `state/inventory.py`, retornando `(ajuste, erro)`: converte o
   texto, valida conforme o tipo e devolve o delta (Entrada `+q`, Saída
   `−q`, Contagem `contado − atual`). Usada tanto pela prévia (var
   computada `estoque_apos_ajuste`) quanto pelo envio — uma regra só,
   coberta por testes unitários sem precisar de Reflex rodando.
   *Alternativa*: validar dentro do handler. Rejeitada por não ser
   testável isoladamente e duplicar a lógica da prévia.

2. **Atualização local da linha**: a resposta do backend traz a
   variação atualizada; o handler substitui o item correspondente em
   `_raw` e chama `refresh()` (mantém busca e destaque de estoque
   baixo). Evita outra chamada `variacoes` GET, importante com o limite
   de requisições do plano gratuito do Xano.

3. **Botão "Ajustar" condicionado a `is_admin`** com `rx.cond`; a
   coluna de ação só aparece para administradores (cabeçalho e
   células). A autorização de fato está no backend.

4. **Tipo escolhido com `rx.segmented_control`** (Entrada / Saída /
   Contagem); trocar o tipo limpa o erro do campo. O rótulo do campo
   muda conforme o tipo ("Quantidade" ou "Total contado").

5. **Aviso de sucesso** reaproveita `ui.success_message` acima da
   tabela, como nas outras telas; mensagem "Ajuste registrado: <SKU>
   agora tem N unidade(s)."

## Risks / Trade-offs

- [Estoque exibido pode estar desatualizado se houve venda depois de
  abrir a tela] → Entrada/Saída são deltas, então continuam corretas;
  na Contagem o delta é calculado sobre o valor exibido, e o backend
  recusa se ficar negativo. A prévia deixa claro o valor de partida.
- [Escrita nunca é repetida automaticamente pelo `xano_client`] →
  Comportamento desejado (spec `xano-api-client`): em falha de rede o
  usuário vê o erro e decide se tenta de novo.
