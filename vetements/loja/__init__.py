"""Loja virtual (parte 2 do Vetements): páginas públicas voltadas ao
cliente final, separadas das telas internas da gestão (`vetements/pages`).

- `pages/`: uma função de página por rota da loja (rotas em `vetements/routes.py`).
- `components/`: layout (cabeçalho/rodapé) e peças reaproveitadas entre páginas.
- `state/`: estados da loja. Nenhum deles herda de `AuthState` — a loja é
  pública e não usa a sessão da equipe.
"""
