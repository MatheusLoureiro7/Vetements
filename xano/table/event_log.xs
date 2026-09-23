// Tabela de log de eventos do template quick-start (login, signup, etc.).
// Faltava no workspace — log_event.xs e my_events_GET.xs já referenciavam
// esta tabela, causando erro fatal em todo login/signup real.
table event_log {
  auth = false

  schema {
    int id

    timestamp created_at?=now

    int user_id {
      table = "user"
      description = "Usuário que realizou a ação registrada"
    }

    text action filters=trim {
      description = "Ação realizada (ex.: login, signup)"
    }

    json metadata? {
      description = "Dados adicionais relacionados ao evento"
    }
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "btree", field: [{name: "user_id", op: "asc"}]}
    {type: "btree", field: [{name: "created_at", op: "desc"}]}
  ]
  guid = "gD8kOyQkbPQbgb2hJIN8nlLfLBU"
}
