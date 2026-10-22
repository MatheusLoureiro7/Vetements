## 1. Tokens

- [x] 1.1 Adicionar em `vetements/styles.py` os tokens `SIDEBAR_BG`, `SIDEBAR_TEXT`, `SIDEBAR_TEXT_STRONG`, `SIDEBAR_MUTED`, `SIDEBAR_LINE`, `SIDEBAR_HOVER`, `SIDEBAR_ACTIVE_BG`, `SIDEBAR_ACCENT` e `CONTENT_MAX_WIDTH` (1120px); verificar com `.venv/bin/python -c "from vetements import styles; print(styles.CONTENT_MAX_WIDTH)"` imprimindo `1120px`

## 2. Sidebar

- [x] 2.1 Em `vetements/components/shell.py`, reestilizar `sidebar()` e `_nav_link()`: fundo escuro, bloco de marca (monograma "V" + "VETEMENTS"), divisor, rótulo "MENU", itens com ícone de 18px e altura de ~40px, item ativo (fundo translúcido, barra lateral, texto branco em negrito) e hover; preservar o comportamento de painel deslizante abaixo de 768px; verificar com `.venv/bin/reflex compile --dry` sem erros
- [x] 2.2 Adicionar o rodapé da sidebar ancorado embaixo (`margin_top="auto"`), com divisor, avatar com iniciais, nome, papel e botão "Sair" com ícone, ligado a `AuthState.logout`; verificar com `.venv/bin/reflex compile --dry` e conferindo no navegador que o rodapé fica colado embaixo da janela

## 3. Topbar e container

- [x] 3.1 Em `topbar()`, remover avatar, nome, papel e "Sair" e deixar só o botão de menu e a marca, visível apenas abaixo de 768px (`display: none` por padrão); verificar com `reflex compile --dry` e no navegador que em largura desktop não há faixa branca no topo
- [x] 3.2 Em `shell()`, aplicar `max_width=CONTENT_MAX_WIDTH` e `margin_x="auto"` ao box de conteúdo; verificar no navegador, numa janela mais larga que 1120px + sidebar, que o conteúdo fica centralizado e limitado, e que em janela menor ele continua ocupando o espaço disponível

## 4. Verificação manual

- [x] 4.1 Em largura desktop, navegar pelas 5 rotas (Dashboard, Produtos, Estoque, Vendas, Clientes) e verificar que o item ativo fica destacado em cada uma, que o hover reage nos demais, que "Sair" encerra a sessão e leva ao login, e que o contraste do rótulo "MENU" e do papel é legível — verificado via `reflex run --env prod --single-port --backend-port 8010` com login real: item ativo destacado corretamente em Dashboard/Produtos/Estoque/Vendas/Clientes, "Sair" encerrou a sessão e voltou ao `/login`
- [x] 4.2 Em largura estreita (< 768px), verificar que a topbar mostra só o botão de menu e a marca, que o botão abre a sidebar com o rodapé do usuário visível, que clicar no fundo escurecido ou num item a fecha, e que a tela de login não mudou
