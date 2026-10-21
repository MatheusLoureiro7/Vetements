## 1. Endpoints

- [x] 1.1 Criar `xano/api/catalogo/produtos_imagens_POST.xs` e `xano/api/catalogo/produtos_publicacao_POST.xs` (somente administrador, 404 para produto inexistente). Verificar com `xano workspace push --dry-run` incluindo só os 2 arquivos: 2 CREATE, sem alterações em outros objetos.
- [x] 1.2 Após confirmação do usuário, aplicar o push e fazer um pull de verificação para conferir que o servidor manteve as expressões.

## 2. Verificação

- [x] 2.1 Com login de administrador: enviar uma foto a um produto de teste e conferir em `GET loja/produtos/{id}` que a URL pública aparece; publicar/despublicar e conferir que o produto entra/sai do catálogo público e que o detalhe dá 404 quando despublicado. Feito pelo script de seed (`backend-seed-storefront-catalog`) e por chamadas avulsas. Feito: fotos com URL pública no produto 8; despublicar → detalhe 404; publicar → 200; produto inexistente → 404.
- [x] 2.2 Sem token ou com token de vendedor, os dois endpoints respondem erro (401/403). Verificar com `curl` sem token (401) e, se houver usuário vendedor de teste, com o token dele.
