## Decisions

- Manter o endpoint (em vez de apagar) e restringi-lo: `auth = "user"` +
  `precondition` de papel `administrador`, no mesmo padrão de
  `categorias_POST`. O CLI (`push -i`) não remove documentos, e o
  endpoint vira o caminho previsto para uma futura tela de usuários.
- `role` como input opcional limitado a `administrador | vendedor`
  (padrão `vendedor`).
- Sem `security.create_auth_token` e com `output` explícito no `db.add`
  para não devolver o hash da senha.
