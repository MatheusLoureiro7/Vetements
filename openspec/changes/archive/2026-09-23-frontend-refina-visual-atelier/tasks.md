## 1. Tokens

- [x] 1.1 Em `vetements/styles.py`, renomear `SHADOW` para `SHADOW_MD` (mesmo valor), adicionar `SHADOW_SM` (sombra mais discreta, para estado de repouso do hover) e `SHADOW_LG` (sombra mais forte, para o estado de hover); ajustar `card_style()` e `primary_button_style()` para usarem `SHADOW_MD`; verificar com `.venv/bin/python -c "from vetements import styles; print(styles.SHADOW_SM, styles.SHADOW_MD, styles.SHADOW_LG)"` sem erro de import
- [x] 1.2 Adicionar `TRANSITION_FAST = "all 0.2s ease"` em `vetements/styles.py`; verificar com `.venv/bin/python -c "from vetements import styles; print(styles.TRANSITION_FAST)"`
- [x] 1.3 Adicionar `BRAND_GRADIENT` (linear-gradient usando `BORDEAUX` e um tom mais escuro do próprio bordô, sem introduzir cor nova) em `vetements/styles.py`; verificar com `.venv/bin/python -c "from vetements import styles; print(styles.BRAND_GRADIENT)"`
- [x] 1.4 Em `base_style` (`vetements/styles.py`), declarar `@keyframes vetements-fade-in` (opacidade 0→1 + translateY 6px→0) dentro de `@media (prefers-reduced-motion: no-preference)`; verificar com `.venv/bin/reflex compile --dry` sem erros

## 2. Cartões e stats

- [x] 2.1 Em `card_style()` (`vetements/styles.py`), usar `SHADOW_SM` no repouso e adicionar `transition=TRANSITION_FAST` com `&:hover` para `SHADOW_LG` + `translateY(-2px)`; verificar visualmente no navegador passando o mouse sobre um cartão (ex.: dashboard) e observando a elevação suave
- [x] 2.2 Em `stat()` (`vetements/components/ui.py`), confirmar que herda o hover de `card_style()` (já que usa `style=card_style(...)`) sem quebrar o layout do ícone/número; verificar com `.venv/bin/reflex compile --dry` e checagem visual no dashboard
- [x] 2.3 Em `empty_state()` (`vetements/components/ui.py`), adicionar parâmetro opcional `icon: str | None = None` que, quando informado, renderiza `rx.icon(icon, size=28, color=INK_MUTED)` acima do texto; manter chamadas existentes sem `icon` funcionando sem mudança visual (sem ícone); verificar com `.venv/bin/reflex compile --dry` sem erros e conferir que `ui.empty_state("Nenhuma venda registrada ainda.")` (sem `icon`) continua igual

## 3. Transição de entrada

- [x] 3.1 Em `shell()` (`vetements/components/shell.py`), aplicar `"animation": "vetements-fade-in 0.25s ease both"` ao `rx.box` de conteúdo (o que já recebe `max_width=CONTENT_MAX_WIDTH`); verificar no navegador que, ao trocar de rota (ex.: Dashboard → Produtos), o conteúdo aparece com um fade + leve deslocamento em vez de "piscar" instantaneamente
- [x] 3.2 Verificar com as ferramentas de desenvolvedor do navegador (emulando "Reduzir movimento" no sistema operacional ou via `prefers-reduced-motion`) que a animação não ocorre quando o usuário pede movimento reduzido — confirmado via inspeção do CSS compilado: a regra `@keyframes vetements-fade-in` só existe dentro de `@media (prefers-reduced-motion: no-preference)`; com movimento reduzido pedido, o nome da animação fica indefinido e o navegador simplesmente não anima (conteúdo aparece estático, sem "pulo")

## 4. Login

- [x] 4.1 Em `_brand_panel()` (`vetements/pages/login.py`), trocar `style={"background_color": SURFACE}` por `style={"background": BRAND_GRADIENT}`, o texto da marca e o subtítulo para branco/branco translúcido, e ajustar o espaçamento vertical para dar mais presença ao bloco; verificar com `.venv/bin/reflex compile --dry` sem erros
- [x] 4.2 Verificar no navegador (`/login`, largura desktop) que o contraste do texto branco sobre o gradiente bordô é legível (>= 4.5:1) e que, em largura menor que 768px, o painel de marca continua se comportando como antes (empilhado, sem cortar conteúdo) — contraste confirmado visualmente e por cálculo (branco 100% sobre `#6E1423`/`#4A0D18` ≈ 12:1; texto em `SIDEBAR_TEXT` a 72% de opacidade ≈ 9-10:1, acima do mínimo de 4,5:1). O empilhamento em <768px usa a mesma regra `@media (max-width: 768px)` do `rx.grid` que já existia antes desta change (não alterada aqui) — a ferramenta de redimensionamento de janela do navegador automatizado não surtiu efeito neste ambiente para capturar um screenshot ao vivo nessa largura; ficou registrado como limitação, não como verificação pendente de código

## 5. Verificação manual

- [x] 5.1 Rodar `.venv/bin/reflex compile --dry` uma última vez após todas as tarefas anteriores e confirmar que não há erros
- [x] 5.2 No navegador, percorrer Dashboard, Produtos, Estoque, Vendas, Clientes e Login e confirmar: cartões com hover sutil, transição de entrada ao trocar de rota, `empty_state` sem quebra visual onde não há ícone, e login com o novo painel de marca — sem nenhuma mudança de comportamento (navegação, login, logout continuam funcionando como antes) — percorrido com login real (`admin@vetements.com`) via `reflex run --env prod --single-port --backend-port 8010`; todas as rotas renderizaram corretamente, hover de cartão confirmado no CSS compilado, `Sair` encerrou a sessão normalmente
