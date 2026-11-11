# Domain Model — Vetements (ERP de Moda)

Este documento descreve os conceitos fundamentais do domínio do Vetements e
como eles se relacionam. Ele representa conceitos, não o modelo físico do
banco de dados.

## Visão geral dos conceitos

```
Usuário (equipe) ───────────── HistóricoDeEventos
   │
   └── Venda (balcão) ──┐
                        ├── Cliente (opcional no balcão; com conta na loja)
   Venda (loja) ────────┘
          │
          └── ItemVenda ──── VariaçãoProduto
                                    │
                                    └── Produto ──── Categoria
```

---

## Usuário

Representa um funcionário da loja que acessa o sistema.

### Principais informações

- nome;
- e-mail (usado para login);
- senha (autenticação);
- papel: administrador ou vendedor.

### Relacionamentos

Um usuário pode registrar várias vendas de balcão.
Uma venda de balcão é registrada por exatamente um usuário; um pedido da
loja virtual não tem usuário da equipe.

### Regras estruturais importantes

- Apenas administradores podem cadastrar produtos, categorias e usuários e
  ajustar estoque.
- Vendedores podem registrar vendas e consultar produtos/estoque.
- Administradores e vendedores podem avançar o status dos pedidos da loja.

---

## Cliente

Representa a pessoa para quem uma venda pode ser realizada.

### Principais informações

- nome;
- telefone e/ou e-mail de contato;
- na loja virtual: senha (guardada como hash) e se o e-mail já foi
  confirmado;
- código de verificação em andamento (confirmação de e-mail ou
  recuperação de senha), guardado só como hash, com validade e número de
  tentativas.

### Relacionamentos

Um cliente pode estar associado a várias vendas.
Uma venda pode existir sem cliente associado (venda avulsa/balcão).
Todo pedido da loja virtual pertence ao cliente que o fez.

### Regras estruturais importantes

- O mesmo cadastro serve à gestão (cliente de balcão) e à loja (cliente
  com conta). Cliente cadastrado pela equipe na gestão não tem senha.
- Conta nova da loja precisa confirmar o e-mail (código de 6 dígitos)
  antes de fazer pedidos; contas antigas contam como confirmadas.
- Senha, hash e dados do código nunca são devolvidos pela API.

---

## Categoria

Representa um tipo de roupa (ex.: camisetas, calças, vestidos, jaquetas).

### Principais informações

- nome da categoria.

### Relacionamentos

Uma categoria pode conter vários produtos.
Um produto pertence a exatamente uma categoria.

---

## Produto

Representa um modelo de roupa cadastrado no catálogo (ex.: "Camiseta Básica
Algodão").

### Principais informações

- nome;
- descrição;
- categoria;
- preço base.

### Relacionamentos

Um produto pertence a uma categoria.
Um produto pode possuir várias variações (tamanho/cor).

### Regras estruturais importantes

- Um produto não é vendido diretamente; a venda ocorre sempre em nível de
  variação, pois é a variação que possui tamanho, cor e estoque.

---

## VariaçãoProduto

Representa uma combinação específica de tamanho e cor de um produto — é o
item que efetivamente possui estoque e é vendido.

### Principais informações

- tamanho (ex.: P, M, G, GG);
- cor;
- SKU (código identificador da variação);
- quantidade em estoque.

### Relacionamentos

Uma variação pertence a exatamente um produto.
Uma variação pode aparecer em vários itens de venda ao longo do tempo.

### Regras estruturais importantes

- A quantidade em estoque de uma variação não pode ficar negativa.
- O estoque só muda por um item de venda (balcão ou loja) ou por um ajuste
  manual de administrador (entrada, saída ou contagem), que fica
  registrado no histórico de eventos com o estoque anterior, o novo e o
  motivo.

---

## Venda

Representa o registro de uma venda realizada na loja.

Uma venda tem uma **origem**: balcão (registrada pela equipe na gestão)
ou loja virtual (pedido feito pelo cliente).

### Principais informações

- data/hora da venda;
- origem: balcão ou loja virtual;
- usuário responsável pelo registro (só no balcão);
- cliente associado (opcional no balcão; obrigatório na loja);
- valor total;
- na loja: dados do pagamento simulado (forma — Pix, cartão ou boleto —,
  parcelas, 4 últimos dígitos do cartão e data/hora do pagamento);
- na loja: status do pedido (pago, enviado, entregue) e datas de envio e
  de entrega.

### Relacionamentos

Uma venda de balcão é registrada por um usuário.
Uma venda pode estar associada a um cliente.
Uma venda possui um ou mais itens de venda.

### Regras estruturais importantes

- Uma venda deve conter ao menos um item.
- O valor total da venda é derivado da soma dos seus itens.
- Pedido da loja nasce já pago (o pagamento é simulado; cartão de final
  0000 simula recusa e nada é gravado). O número completo, a validade e o
  código de segurança do cartão nunca chegam ao backend.
- O status do pedido avança um passo por vez (pago → enviado → entregue),
  nunca volta; pedido antigo sem status conta como pago. Venda de balcão
  não tem status.

---

## ItemVenda

Representa uma linha dentro de uma venda: uma variação de produto vendida em
determinada quantidade.

### Principais informações

- variação de produto vendida;
- quantidade;
- preço unitário no momento da venda.

### Relacionamentos

Um item de venda pertence a exatamente uma venda.
Um item de venda referencia exatamente uma variação de produto.

### Regras estruturais importantes

- A quantidade vendida não pode exceder o estoque disponível da variação no
  momento da venda.
- O preço unitário é registrado no item (e não apenas lido do produto), para
  preservar o histórico caso o preço mude no futuro.

---

## HistóricoDeEventos

Registro de auditoria das ações da equipe e de autenticação.

### Principais informações

- data/hora;
- usuário da equipe que fez a ação;
- tipo da ação (ex.: criação de usuário, ajuste de estoque, avanço do
  status de um pedido, login);
- detalhes da ação (ex.: estoque anterior e novo, status anterior e novo).

### Relacionamentos

Um usuário pode ter vários eventos registrados.

### Regras estruturais importantes

- Ajuste de estoque e avanço de status gravam o evento junto com a
  alteração: se a alteração for recusada, nenhum evento é criado.
- Os detalhes nunca guardam senhas, hashes nem códigos: os eventos de
  login e de redefinição de senha gravam só id, nome, e-mail e papel do
  usuário (corrigido em 2026-11-11). Registros anteriores a essa data
  podem conter o hash da senha e foram mantidos por decisão do usuário.
