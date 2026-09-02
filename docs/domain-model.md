Quais são os principais conceitos e relacionamentos?

conceitual e estrutural

ara cada entidade ou conceito importante, procure registrar:

Nome

Descrição

Responsabilidade

Principais atributos conceituais

Relacionamentos

Regras estruturais importantes

Por exemplo:

\#\# Livro

Representa uma obra disponível no acervo.

\#\#\# Principais informações

\- título;

\- autor;

\- ISBN;

\- categoria.

\#\#\# Relacionamentos

Um livro pode possuir vários exemplares.

Um exemplar pertence a um único livro.

---

# 12\. Modelo conceitual ≠ banco de dados

Não é necessário determinar inicialmente:

CREATE TABLE ...

nem necessariamente:

livros

id INTEGER PRIMARY KEY

...

O modelo conceitual deve permitir que o agente compreenda o domínio antes de decidir todos os detalhes físicos.

Entretanto, se o projeto já possui decisões importantes sobre persistência, elas podem ser registradas em nível apropriado.