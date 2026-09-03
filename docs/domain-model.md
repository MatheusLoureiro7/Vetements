# Domain Model — Vetements (ERP de Moda)

Este documento descreve os conceitos fundamentais do domínio do Vetements e
como eles se relacionam. Ele representa conceitos, não o modelo físico do
banco de dados.

## Visão geral dos conceitos

```
Usuário
   │
   └── Venda ──── Cliente (opcional)
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

Um usuário pode registrar várias vendas.
Uma venda é registrada por exatamente um usuário.

### Regras estruturais importantes

- Apenas administradores podem cadastrar produtos, categorias e usuários.
- Vendedores podem registrar vendas e consultar produtos/estoque.

---

## Cliente

Representa a pessoa para quem uma venda pode ser realizada.

### Principais informações

- nome;
- telefone e/ou e-mail de contato.

### Relacionamentos

Um cliente pode estar associado a várias vendas.
Uma venda pode existir sem cliente associado (venda avulsa/balcão).

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
- Toda baixa de estoque deve estar associada a um item de venda.

---

## Venda

Representa o registro de uma venda realizada na loja.

### Principais informações

- data/hora da venda;
- usuário responsável pelo registro;
- cliente associado (opcional);
- valor total.

### Relacionamentos

Uma venda é registrada por um usuário.
Uma venda pode estar associada a um cliente.
Uma venda possui um ou mais itens de venda.

### Regras estruturais importantes

- Uma venda deve conter ao menos um item.
- O valor total da venda é derivado da soma dos seus itens.

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
