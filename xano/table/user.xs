// Stores user information and allows the user to authenticate  against
table user {
  auth = true

  schema {
    int id
    timestamp created_at?=now
    text name filters=trim
    email? email filters=trim|lower
    password? password filters=min:8|minAlpha:1|minDigit:1
  
    // Papel do usuário no Vetements: administrador ou vendedor.
    enum role? {
      values = ["administrador", "vendedor"]
    }
  
    object password_reset? {
      schema {
        password token?
        timestamp? expiration?
        bool used?
      }
    }
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "btree", field: [{name: "created_at", op: "desc"}]}
    {type: "btree|unique", field: [{name: "email", op: "asc"}]}
  ]

  tags = ["xano:quick-start"]
  guid = "dWyOvaQCMgnFVhQc-lvIKLhPiZI"
  items = [
    {
      id            : 1
      created_at    : 1788996035781
      name          : "Teste QA"
      email         : "teste-qa@vetements.local"
      password      : "373055e4bb7668b0.c18cf259907ef059ad27837c179e7804cb8ef32b16c43d041ffbda4b3e3ad726"
      role          : "administrador"
      password_reset: {used: false, token: "", expiration: null}
    }
  ]
}