# storefront Specification

## Purpose
Loja virtual do Vetements voltada ao cliente final, acessível sem login e
separada da área de gestão usada pela equipe da loja.

## Requirements

### Requirement: Página inicial pública da loja
O sistema SHALL exibir, na raiz do site (`/`), a página inicial da loja
virtual para qualquer visitante, sem exigir login, com a marca Vetements,
uma chamada principal e um rodapé. Enquanto o catálogo da loja não estiver
disponível, a página SHALL informar que a coleção estará disponível em
breve.

#### Scenario: Visitante acessa o site
- **WHEN** um visitante sem sessão acessa `/`
- **THEN** vê a página inicial da loja, sem ser redirecionado para o login

#### Scenario: Catálogo ainda indisponível
- **WHEN** um visitante acessa a página inicial da loja nesta fase
- **THEN** vê o aviso de que a coleção estará disponível em breve, sem erros nem listagens vazias

### Requirement: Acesso da equipe a partir da loja
A página inicial da loja SHALL oferecer um link "Área da equipe" que leva à
tela de login da gestão. A loja MUST NOT exibir dados ou atalhos internos da
gestão.

#### Scenario: Funcionário entra pela loja
- **WHEN** um funcionário clica em "Área da equipe" na loja
- **THEN** é levado à tela de login (`/login`)
