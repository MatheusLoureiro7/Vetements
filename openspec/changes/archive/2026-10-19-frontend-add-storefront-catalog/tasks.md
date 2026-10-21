## 1. Cliente da API pública

- [x] 1.1 Adicionar em `vetements/xano_client.py` o alias `XANO_GROUP_LOJA` (padrão `v-znCPQU`) e as funções `list_public_categories()`, `list_public_products(categoria_id=None, q="")` e `get_public_product(produto_id)`, sem token. Verificar com testes em `tests/test_xano_client.py` (URL e parâmetros corretos, filtros vazios não enviados, nenhum header `Authorization`, 404 vira `XanoAPIError` com `status_code == 404`).

## 2. Conversão para dados de exibição

- [x] 2.1 Criar em `vetements/loja/state/` as dataclasses de exibição (produto e variação) e as funções puras que convertem a resposta da API: preço com `format_currency`, URLs das imagens (`url`, ou instância + `path`; `null` → lista vazia) e variações só com tamanho, cor e disponível. Verificar com testes novos (`tests/test_loja_catalogo.py`) cobrindo produto sem imagem, com imagem só com `path`, variação esgotada e descrição vazia.

## 3. Vitrine (home)

- [x] 3.1 Criar `CatalogoState(rx.State)` com carregamento de produtos e categorias, filtros (categoria e busca enviada por Enter/botão), "Limpar filtros", flags `carregando`/`erro` e a distinção entre catálogo vazio e filtro sem resultado. Verificar com testes do state (mockando o `xano_client`): sem filtro e lista vazia → coleção em breve; com filtro e lista vazia → nenhuma peça encontrada; `XanoAPIError` → erro.
- [x] 3.2 Criar o card de produto em `vetements/loja/components/` (foto 3:4 ou marcador neutro, nome, categoria, preço, link para o detalhe) e reescrever `home_page` com hero compacto, barra de filtros, grid responsivo e os estados carregando / coleção em breve / nenhuma peça encontrada / erro com "Tentar novamente". Registrar `on_load=CatalogoState.load` em `vetements/vetements.py`. Verificar com `reflex compile` sem erros.

## 4. Página de detalhe

- [x] 4.1 Adicionar `LOJA_PRODUTO = "/produto/[produto_id]"` e o helper `produto_href(id)` em `vetements/routes.py`; criar `ProdutoState(rx.State)` que lê o parâmetro da rota, trata id não numérico e 404 como não encontrado e demais erros como erro, e guarda a imagem selecionada. Verificar com testes do state (id inválido, 404, erro de rede, sucesso).
- [x] 4.2 Criar a página de detalhe (galeria com miniaturas, nome, categoria, preço, descrição, chips de variação com "Esgotado", link "Voltar à vitrine", estados não encontrado e erro) e registrá-la com `on_load=ProdutoState.load`. Verificar com `reflex compile` sem erros.

## 5. Verificação

- [x] 5.1 Rodar `pytest` e confirmar que todos os testes (antigos e novos) passam. Feito: 84 testes passando.
- [x] 5.2 Com o app rodando contra o Xano real: `/` lista o produto 1 com preço "R$ 49,90"; filtro "Camisetas" mantém o produto; busca "basica" o encontra; busca "xyznada" mostra "Nenhuma peça encontrada" e "Limpar filtros" restaura a lista; clicar no card abre `/produto/1` com as 4 variações e M/Branca marcada "Esgotado"; `/produto/2` (não publicado) e `/produto/abc` mostram "Produto não encontrado". Feito no navegador (`reflex run --env prod`): todos os itens conferidos, inclusive abrindo `/produto/1` direto pela URL.
- [x] 5.3 Cadastrar pelo painel do Xano uma foto no produto 1 e confirmar que ela aparece no card e no detalhe; sem foto, conferir o marcador neutro (sem imagem quebrada). Feito com as fotos enviadas pelo seed em vez do painel; "Camiseta Basica Algodao" (sem foto) mostra o marcador neutro.
- [x] 5.4 Simular falha de rede (ex.: `XANO_INSTANCE_URL` inválida) e confirmar a mensagem de erro com "Tentar novamente" na vitrine e no detalhe; confirmar que `/login` e as telas de `/gestao` continuam funcionando. Parcial: com `XANO_INSTANCE_URL=https://invalido.localhost`, vitrine e detalhe mostram a mensagem de erro com "Tentar novamente" (sem "Coleção em breve" nem "Produto não encontrado"); `/login` carrega. Após login, dashboard, Produtos e Estoque de `/gestao` carregam normalmente.
