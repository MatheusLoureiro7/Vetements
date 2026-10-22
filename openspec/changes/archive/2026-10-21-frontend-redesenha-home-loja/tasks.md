## 1. Estilo e assets

- [x] 1.1 Copiar imagens de banner/lookbook da referência para `assets/loja/` e portar o CSS para `assets/loja/loja.css` (tema claro). Verificar: arquivos presentes.
- [x] 1.2 Carregar a folha da loja e a fonte Schibsted Grotesk em `vetements/vetements.py`/`styles.py`.

## 2. Layout e componentes

- [x] 2.1 Reescrever `store_layout` (anúncio, cabeçalho fixo com busca, rodapé) mantendo o link "Área da equipe".
- [x] 2.2 Reescrever o card de produto (foto quadrada, segunda foto no hover, categoria, nome, preço) e neutralizar o `aviso`.
- [x] 2.3 Ajustar a página de produto ao novo contêiner do layout.

## 3. Home e estado

- [x] 3.1 Home: banner principal, abas + carrossel, segundo banner, newsletter, blocos imagem + texto; estados carregando/erro/sem resultado/coleção em breve dentro da seção.
- [x] 3.2 `CatalogoState`: busca pelo cabeçalho (home ou redireciona com `?q=`), `load` lendo `q`, newsletter com validação local.

## 4. Verificação

- [x] 4.1 `pytest` passa e `reflex compile` sem erros.
- [x] 4.2 Manual: abrir `/` em 1440px e 390px e comparar com a referência; trocar de aba filtra; buscar no cabeçalho filtra; buscar a partir de `/produto/<id>` volta à home filtrada; card leva ao detalhe; "Área da equipe" leva a `/login`.
