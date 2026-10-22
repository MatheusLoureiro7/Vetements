## Context

Os endpoints da gestão criam categorias, produtos e variações. A
primeira versão deste seed usava a Metadata API do Xano, mas o upload
de arquivos por ela é bloqueado no plano gratuito ("Please upgrade your
Xano instance"); por isso foram criados endpoints de administrador para
foto e publicação (`backend-adiciona-foto-publicacao-produto`), que usam o
storage do Xano dentro de um endpoint (permitido no plano gratuito).

## Decisions

- **Só a API do app**: o seed passa pelas mesmas regras de negócio e
  de autorização (administrador) que a gestão; não precisa do token da
  CLI nem acessa tabelas diretamente.
- **Credenciais por variável de ambiente** (`XANO_EMAIL`,
  `XANO_SENHA`, de uma conta de administrador): o script nunca imprime
  nem salva a senha ou o token de sessão.
- **Publicar por último**: cada produto só é publicado depois de ter
  variações e fotos; se algo falhar no meio, ele fica fora da loja e é
  listado no fim como incompleto.
- **Snapshot JSON** gerado uma vez a partir do `catalog.ts` do clone,
  versionado para o seed ser reproduzível e testável; fotos (5,3 MB)
  ficam no clone, passado por `--clone-dir`.
- **Mapeamentos**: categoria pela aba do clone (Camiseta → Camisetas,
  Camisa → Camisas, Jaqueta → Jaquetas, Calça → Calças, Bermuda →
  Bermudas, Boné → Bonés, Bolsa → Bolsas); cor pelas palavras finais do
  nome (BLACK → Preto, OFF-WHITE → Off-white, "BLACK & GREEN" → "Preto e
  verde"; sem cor reconhecida → "Única"); produto sem tamanhos (bonés,
  bolsas) ganha a variação "Único"; disponível → estoque 10, esgotado →
  0; SKU = handle do produto + tamanho, em maiúsculas (único).
  Descrição = texto alternativo da primeira foto do clone.
- **Idempotência por nome**: categoria/produto já existente com o mesmo
  nome é pulado (e suas fotos não são reenviadas).

## Risks / Trade-offs

- [Falha no meio da carga deixa parte dos produtos criada] → rodar de
  novo continua de onde parou (idempotência por nome); um produto criado
  sem todas as variações é reportado no fim.
- [Limite de taxa do plano gratuito (~500 requisições no total)] →
  requisições sequenciais, esperando e repetindo em 429; a carga
  completa leva alguns minutos.
