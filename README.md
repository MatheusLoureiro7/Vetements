# Vetements

**Sistema web para uma loja de roupas: vitrine online para os clientes e painel de gestão para a equipe.**

O Vetements junta, em um só aplicativo, duas coisas que normalmente ficam separadas:

- uma **loja virtual**, aberta a qualquer pessoa, onde o cliente escolhe peças, monta o carrinho, paga (de forma simulada) e acompanha o pedido;
- uma **área de gestão** (ERP), de uso interno, onde a equipe cadastra produtos, controla o estoque, registra vendas e mantém o cadastro de clientes.

---

## Sumário

1. [Apresentação](#1-apresentação)
2. [Acesso ao aplicativo](#2-acesso-ao-aplicativo)
3. [Perfis de usuários](#3-perfis-de-usuários)
4. [Funcionalidades](#4-funcionalidades)
5. [Manual de utilização](#5-manual-de-utilização)
6. [Exemplos de utilização](#6-exemplos-de-utilização)
7. [Limitações conhecidas](#7-limitações-conhecidas)
8. [Informações técnicas](#8-informações-técnicas)

---

## 1. Apresentação

### O que é

**Vetements** é um sistema para pequenas lojas de roupas. Ele organiza produtos (com tamanhos e cores), estoque, vendas e clientes em um único lugar e, ao mesmo tempo, oferece uma loja virtual para o público comprar online.

### Qual problema resolve

Lojas pequenas costumam controlar tudo em planilhas ou de cabeça. Isso gera:

- estoque que não bate com a realidade (vende-se o que já acabou);
- falta de histórico confiável de vendas;
- dificuldade para saber o que está disponível;
- vendas de balcão e vendas online em controles separados.

No Vetements, toda venda (de balcão ou da loja virtual) **baixa o estoque automaticamente**, e o sistema **não deixa o estoque ficar negativo**.

### Para quem é

| Público | Para que usa |
| --- | --- |
| **Clientes da loja** | Ver as peças, comprar e acompanhar o pedido |
| **Vendedores** | Registrar vendas, consultar estoque, cuidar dos clientes e dos pedidos |
| **Administradores (donos/gerentes)** | Tudo o que o vendedor faz, mais cadastro de produtos, ajuste de estoque e gestão da equipe |

---

## 2. Acesso ao aplicativo

### Endereços do aplicativo

| Endereço | O que é | Quem acessa |
| --- | --- | --- |
| `/` | Página inicial da loja (vitrine) | Qualquer pessoa |
| `/produto/<número>` | Página de um produto | Qualquer pessoa |
| `/carrinho` | Carrinho de compras | Qualquer pessoa |
| `/conta/entrar` | Entrar ou criar conta de cliente | Qualquer pessoa |
| `/conta` | Minha conta e meus pedidos | Cliente com login |
| `/pagamento` | Pagamento (simulado) | Cliente com login |
| `/login` | Entrada da equipe | Equipe |
| `/gestao` | Painel de gestão (dashboard) | Equipe com login |
| `/gestao/produtos`, `/gestao/estoque`, `/gestao/vendas`, `/gestao/clientes` | Telas de gestão | Equipe com login |
| `/gestao/usuarios` | Equipe (usuários) | Somente administrador |

Na parte de baixo da loja existe o link **"Área da equipe"**, que leva ao `/login`.

### Usuários de demonstração

A loja pode ser usada criando uma conta de cliente (veja o [Manual](#5-manual-de-utilização)). Já a gestão exige um usuário da equipe, que só um administrador cria.

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Administrador | `admin@vetements.com` | `admin123` |
| Vendedor | `vendedor-qa@vetements.local` | `vendedor123` |
| Cliente da loja | `cliente.teste@vetements.local` | `12345678V` |

> Contas criadas apenas para teste.

### Rodando no seu computador

**O que você precisa**

- [Python](https://www.python.org/downloads/) 3.10 ou mais novo
- [Git](https://git-scm.com/downloads)
- Conexão com a internet (os dados ficam em um servidor na nuvem, o Xano, e o Reflex baixa o que precisa na primeira execução)

**Passo a passo (Windows, PowerShell)**

```powershell
git clone https://github.com/MatheusLoureiro7/Vetements.git
cd Vetements
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
reflex run
```

**Passo a passo (macOS ou Linux)**

```bash
git clone https://github.com/MatheusLoureiro7/Vetements.git
cd Vetements
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
reflex run
```

Quando aparecer a mensagem de que o app está rodando, abra no navegador:

**http://localhost:3000**

> A primeira execução demora alguns minutos, porque o Reflex prepara a parte visual do site. As próximas são bem mais rápidas.

**O servidor de dados já está configurado.** O projeto aponta, por padrão, para o servidor do grupo. Só precisa mexer nisso quem quiser usar outra instância do Xano (as variáveis opcionais estão em [Informações técnicas](#8-informações-técnicas)).

**Problemas comuns**

| Mensagem | O que significa | O que fazer |
| --- | --- | --- |
| `rxconfig.py not found` | Você está na pasta errada | Entre na pasta que contém o arquivo `rxconfig.py` (a raiz do projeto) e rode `reflex run` de lá |
| `reflex` não é reconhecido | O ambiente virtual não está ativo | Rode `.venv\Scripts\Activate.ps1` (o terminal deve mostrar `(.venv)`) e, se precisar, `pip install -r requirements.txt` |
| O PowerShell bloqueia o `Activate.ps1` | Política de execução de scripts | Rode `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` e tente de novo |

---

## 3. Perfis de usuários

O sistema tem quatro perfis. Os dois últimos usam a área de gestão.

| Perfil | Como entra | Responsabilidades |
| --- | --- | --- |
| **Visitante** | Não precisa de login | Conhecer a vitrine, buscar e filtrar peças, ver detalhes e montar o carrinho |
| **Cliente** | Conta criada na loja (e-mail e senha) | Tudo do visitante, mais finalizar pedidos e acompanhar o status deles |
| **Vendedor** | Login da equipe | Atendimento e operação do dia a dia |
| **Administrador** | Login da equipe | Operação completa e administração do sistema |

### O que cada perfil da equipe pode fazer

| Ação | Vendedor | Administrador |
| --- | :---: | :---: |
| Ver o dashboard | ✅ | ✅ |
| Consultar produtos e estoque | ✅ | ✅ |
| Registrar vendas (balcão) | ✅ | ✅ |
| Avançar o status de pedidos da loja (pago → enviado → entregue) | ✅ | ✅ |
| Cadastrar e editar clientes | ✅ | ✅ |
| Cadastrar produtos e variações (tamanho/cor) | ❌ | ✅ |
| Ajustar o estoque (entrada, saída, contagem) | ❌ | ✅ |
| Gerenciar a equipe (criar usuários, trocar senha, desativar) | ❌ | ✅ |

As permissões são conferidas **no servidor**, e não só escondidas na tela: mesmo que alguém tente burlar a interface, o servidor recusa a ação.

---

## 4. Funcionalidades

### Loja virtual (pública)

- **Vitrine** com filtro por categoria e busca por nome.
- **Página do produto** com fotos, preço, descrição e escolha de tamanho e cor; variações sem estoque aparecem como *Esgotado*.
- **Carrinho** que continua salvo no navegador mesmo ao recarregar a página (de 1 a 10 unidades por item).
- **Conta de cliente**: criar conta, entrar, **confirmar o e-mail com um código de 6 números** e **recuperar a senha**.
- **Pagamento simulado** com Pix, cartão (de 1 a 6 parcelas) ou boleto. Nenhum valor é cobrado.
- **Minha conta**: lista de pedidos com itens, total, forma de pagamento e status (**Pago → Enviado → Entregue**).

### Gestão (equipe)

- **Login** da equipe, com sessão que continua ao recarregar a página.
- **Dashboard** com quatro números-resumo (produtos cadastrados, variações com estoque baixo, total vendido no mês com a variação em relação ao mês anterior, clientes cadastrados), gráfico de vendas dos últimos 14 dias, gráfico de produtos por categoria e lista das vendas recentes.
- **Produtos**: lista, busca, cadastro de produto e das suas variações (tamanho, cor, SKU e quantidade inicial).
- **Estoque**: lista de todas as variações, busca por produto ou SKU, destaque de **estoque baixo** (menos de 5 unidades) e ajuste de estoque pelo administrador, com registro de quem ajustou.
- **Vendas**: registro de venda com vários itens, cliente opcional (venda de balcão), baixa automática do estoque, histórico com busca por cliente e **atualização do status dos pedidos da loja**.
- **Clientes**: cadastro, edição e busca.
- **Usuários** (administrador): criar membros da equipe, editar, definir nova senha e desativar ou reativar o acesso.

---

## 5. Manual de utilização

O manual está dividido em duas jornadas: **A) quem compra na loja** e **B) a equipe que gerencia a loja**.

---

### Jornada A — Cliente da loja

#### A1. Conhecer a vitrine

1. Abra o endereço do aplicativo (`/`).
2. Use o menu do topo: **Loja** leva à vitrine, **Lookbook** e **Nossa loja** levam às outras seções da página.
3. Na vitrine, escolha uma categoria nas abas (ou **Tudo**) e/ou use o campo **Buscar** no topo.

**Resultado esperado:** a lista de peças muda conforme o filtro. Se nada combinar com o filtro, aparece **"Nenhuma peça encontrada"** com o botão **Limpar filtros**.

<img width="1365" height="632" alt="image" src="https://github.com/user-attachments/assets/05f8dc9e-5385-4cd6-a1cf-92d856c46ae8" />

#### A2. Ver um produto e adicionar ao carrinho

1. Clique em uma peça da vitrine.
2. Em **Tamanhos e cores**, escolha a variação desejada. As esgotadas não podem ser escolhidas.
3. Clique em **Adicionar ao carrinho**.

**Resultado esperado:** aparece a confirmação **"Adicionado ao carrinho"** com um link **Ver carrinho**, e o ícone do carrinho no topo mostra a quantidade de itens. Se você adicionar a mesma variação de novo, a quantidade aumenta em vez de criar outra linha.

<img width="1364" height="549" alt="image" src="https://github.com/user-attachments/assets/2222aecf-268b-425b-a8d0-4d17e746ea04" />

#### A3. Conferir o carrinho

1. Clique no ícone do carrinho no topo.
2. Use **−** e **+** para mudar a quantidade (de 1 a 10) ou **Remover** para tirar o item.
3. Confira o **Subtotal**.

**Resultado esperado:** o subtotal é recalculado a cada mudança. Com o carrinho vazio, aparece "Seu carrinho está vazio" com um link para a vitrine.

<img width="1345" height="526" alt="image" src="https://github.com/user-attachments/assets/cd838c38-c380-4c4b-9bde-9123bcfa5f11" />

#### A4. Criar uma conta ou entrar

Para finalizar um pedido é preciso ter conta.

1. No carrinho, clique em **Entrar para finalizar** (ou no ícone de pessoa no topo).
2. Para uma conta nova, preencha **Criar conta**: nome, e-mail, senha (mínimo de 8 caracteres, com letras e números) e telefone (opcional). Clique em **Criar conta**.
3. Se você já tem conta, preencha **Entrar** com e-mail e senha.

**Resultado esperado:** ao criar a conta, você vai para a confirmação de e-mail (próximo passo). Ao entrar, volta para a página de onde veio (por exemplo, o carrinho, com os mesmos itens). Se errar a senha, aparece **"E-mail ou senha inválidos."**

<img width="1363" height="633" alt="image" src="https://github.com/user-attachments/assets/5133fbc1-e865-49bd-a927-902dd17ce865" />

#### A5. Confirmar o e-mail

O sistema envia um **código de 6 números** para o e-mail informado. Ele vale por **15 minutos**.

1. Abra o e-mail, copie o código (se não encontrar, olhe a caixa de **spam**).
2. Digite o código no campo **Código** e clique em **Confirmar e-mail**.
3. Se o código não chegou ou venceu, clique em **Reenviar código** (há um intervalo mínimo de 60 segundos entre envios).

**Resultado esperado:** o e-mail fica confirmado e você segue para onde estava indo (por exemplo, o pagamento). Depois de 5 códigos errados, o código deixa de valer e é preciso pedir outro. Sem e-mail confirmado **não é possível finalizar pedidos**.

<img width="900" height="629" alt="image" src="https://github.com/user-attachments/assets/98c8571a-07c9-4829-baf8-4894b01c83f4" />

<img width="965" height="417" alt="image" src="https://github.com/user-attachments/assets/0a275166-6696-4c1b-980a-b622f9189b24" />

Se o serviço de e-mail estiver indisponível no momento, basta aguardar e usar **Reenviar código**.

#### A6. Recuperar a senha

1. Na tela **Entrar**, clique em **Esqueci minha senha**.
2. Informe o e-mail da conta e clique em **Enviar código**.
3. Digite o código recebido, escolha a nova senha e clique em **Salvar nova senha**.

**Resultado esperado:** a senha é trocada, você já fica logado e vai para **Minha conta**. A resposta do sistema é a mesma exista ou não conta para o e-mail informado (isso protege a privacidade dos clientes).

#### A7. Finalizar o pedido (pagamento simulado)

1. No carrinho, clique em **Finalizar pedido**.
2. Na tela **Pagamento**, confira o **Resumo do pedido** e escolha a forma de pagamento:
   - **Pix:** aparece um QR code ilustrativo e um código "copia e cola" fictício.
   - **Cartão:** preencha número, nome impresso, validade (MM/AA) e CVV, e escolha de 1 a 6 parcelas.
   - **Boleto:** aparece uma linha digitável fictícia.
3. Clique em **Confirmar pagamento**.

**Resultado esperado:** o pedido é criado já como pago, o estoque é reservado, o carrinho é esvaziado e você vê **"Pagamento aprovado · Pedido nº N registrado!"**.

<img width="1362" height="629" alt="image" src="https://github.com/user-attachments/assets/fda05440-8f6c-4d42-b45b-6e5fbea7d908" />

<img width="1364" height="560" alt="image" src="https://github.com/user-attachments/assets/1f15dd05-fafa-47f5-87e5-9f42ca5d01c2" />


> **Importante:** o pagamento é **só uma simulação**, e nenhum valor é cobrado. Por segurança, o sistema nunca envia o número completo do cartão ao servidor, apenas os 4 últimos dígitos. Para testar um **pagamento recusado**, use um cartão que termine em **0000**: o pedido não é criado e o carrinho continua com os itens.

#### A8. Acompanhar os pedidos

1. Clique no ícone de pessoa no topo para abrir **Minha conta**.
2. Role até **Meus pedidos**.

**Resultado esperado:** cada pedido mostra número, data, total, forma de pagamento (por exemplo, "Cartão 3x · final 4242"), itens e o **status**:

| Status | Quando aparece |
| --- | --- |
| **Pago** | Logo depois do pagamento |
| **Enviado em dd/mm/aaaa** | Quando a equipe marca o pedido como enviado |
| **Entregue em dd/mm/aaaa** | Quando a equipe marca o pedido como entregue |

Se você ainda não comprou nada, aparece "Você ainda não fez pedidos". Para sair da conta, use o botão **Sair**.

<img width="1365" height="631" alt="image" src="https://github.com/user-attachments/assets/1093cd7d-2074-41c3-a003-729ba86a82a5" />

---

### Jornada B — Equipe (gestão)

#### B1. Entrar no sistema

1. Acesse `/login` (ou clique em **Área da equipe** no rodapé da loja).
2. Digite o **e-mail** e a **senha** do seu usuário e clique em **Entrar**.

**Resultado esperado:** você é levado ao **Dashboard** (`/gestao`). O menu lateral mostra as telas disponíveis para o seu perfil, e o botão **Sair** fica na parte de baixo do menu.

| Mensagem | Significa |
| --- | --- |
| "E-mail ou senha inválidos" | Os dados não conferem |
| "Seu acesso foi desativado. Fale com um administrador." | O usuário foi desativado |
| "Não foi possível conectar ao servidor. Tente novamente." | Falha de comunicação |

Quem tenta abrir uma tela de `/gestao` sem estar logado é levado de volta ao login.

<img width="1362" height="629" alt="image" src="https://github.com/user-attachments/assets/d8ff408b-097f-4dfd-bc4a-c23c47be06cd" />

#### B2. Ler o Dashboard

O dashboard é a primeira tela depois do login e resume a loja de relance:

- **Produtos cadastrados**, **Variações com estoque baixo** (menos de 5 unidades), **Vendido no mês** (com seta de alta ou queda em relação ao mês anterior, quando houve vendas no mês passado) e **Clientes cadastrados**.
- Gráfico **Vendas nos últimos 14 dias**.
- Gráfico **Produtos por categoria**.
- Lista de **Vendas recentes** (data, cliente, responsável e total). Pedidos da loja aparecem com o responsável **"Loja virtual"**.

**Resultado esperado:** enquanto os dados carregam, aparece "Carregando dashboard...". Se o servidor não responder, aparece uma mensagem de erro no lugar dos números, e o menu continua funcionando.

<img width="1363" height="630" alt="image" src="https://github.com/user-attachments/assets/20bd1405-66d7-49cf-9750-ccffa2ac9061" />

#### B3. Cadastrar produtos e variações (administrador)

Em **Produtos**:

1. Clique em **+ Novo produto**.
2. Preencha **Nome**, **Categoria**, **Preço base** e **Descrição** (nome, categoria e um preço válido são obrigatórios).
3. Clique em **Salvar produto**.
4. Na linha do produto, clique em **Variações** e preencha **Tamanho**, **Cor**, **SKU** (o código da variação) e **Qtd. inicial**. Clique em **Adicionar**.

**Resultado esperado:** o produto aparece na lista com uma mensagem de sucesso, e a variação passa a existir ligada a ele. Se algum campo estiver errado, o erro aparece junto do campo e a janela continua aberta com o que você digitou. O campo **Buscar por nome...** filtra a lista.

> **Vendedores** veem a lista de produtos, mas **não** veem os botões de cadastro.
>
> **Atenção:** o produto novo nasce **não publicado**, ou seja, **ainda não aparece na vitrine da loja**. Veja a [seção de limitações](#7-limitações-conhecidas).

<img width="1363" height="630" alt="image" src="https://github.com/user-attachments/assets/45539e15-9902-4720-a452-a0472f6ee0ef" />

<img width="1362" height="630" alt="image" src="https://github.com/user-attachments/assets/bba56a0d-96a6-4bec-947d-68f536d8b02e" />

#### B4. Consultar e ajustar o estoque

Em **Estoque**:

1. Veja a lista de variações (produto, tamanho, cor, SKU e quantidade). Use **Buscar por produto ou SKU...** para localizar uma. Linhas com **menos de 5 unidades** ficam destacadas como estoque baixo.
2. *(Administrador)* Clique em **Ajustar** na linha desejada e escolha o tipo:
   - **Entrada:** soma a quantidade informada (chegou mercadoria).
   - **Saída:** subtrai a quantidade informada (perda, avaria).
   - **Contagem:** você informa o total contado e o sistema calcula a diferença.
3. Informe a quantidade e, se quiser, o **Motivo**. O sistema mostra **"Estoque após o ajuste"** antes de salvar.
4. Clique em **Salvar ajuste**.

**Resultado esperado:** a janela fecha, a linha mostra o novo estoque e aparece um aviso de ajuste registrado. O sistema **recusa** saída maior que o estoque (o estoque nunca fica negativo) e registra quem fez cada ajuste.

<img width="1364" height="630" alt="image" src="https://github.com/user-attachments/assets/01b80cab-840b-4500-8253-9c52e79c9e03" />

#### B5. Registrar uma venda de balcão

Em **Vendas**:

1. Clique em **+ Nova venda**.
2. Em **Variação**, escolha a peça, informe a **Quantidade** e clique em **Adicionar**. Repita para cada item. Use **Remover** para tirar um item.
3. Se quiser, escolha o **Cliente**. Sem cliente, a venda é registrada como **"Venda avulsa (balcão)"**.
4. Confira o **Total** e clique em **Confirmar venda**.

**Resultado esperado:** a janela fecha, aparece **"Venda registrada."**, a venda entra no histórico e o estoque de cada item **baixa automaticamente**. Não é possível confirmar uma venda sem itens nem pedir mais unidades do que o estoque disponível. Se algo falhar, a janela continua aberta com os itens preenchidos e a mensagem de erro.

<img width="1363" height="631" alt="image" src="https://github.com/user-attachments/assets/958f6887-7c9f-4d6d-86ce-a59a4567dbd5" />

<img width="1364" height="630" alt="image" src="https://github.com/user-attachments/assets/ce582107-ef70-4996-a8e2-bb4f4f5140e5" />

#### B6. Atualizar o status de pedidos da loja

Pedidos feitos na loja aparecem no histórico de **Vendas** com o cliente identificado como **"Nome (loja virtual)"**. A coluna **Status** mostra **Pago**, **Enviado** ou **Entregue** (vendas de balcão mostram "—").

1. Na linha de um pedido da loja, clique em **Marcar como enviado** (ou **Marcar como entregue**, quando já estiver enviado).
2. Confirme na janela que aparece (não há como desfazer).

**Resultado esperado:** o status muda, aparece o aviso "Pedido #N marcado como enviado." e o cliente passa a ver o novo status em **Minha conta**. O status avança **um passo por vez** e nunca volta.

Para achar uma venda, use **Buscar por cliente...** (vendas de balcão são encontradas pelo termo "Balcão").

#### B7. Cuidar dos clientes

Em **Clientes**:

1. Para cadastrar, clique em **+ Novo cliente**, preencha **Nome** e **Telefone** e/ou **E-mail** (ao menos um contato é obrigatório) e clique em **Salvar cliente**.
2. Para corrigir dados, clique em **Editar** na linha, altere o que precisar e clique em **Salvar alterações**.
3. Use **Buscar por nome...** para filtrar a lista.

**Resultado esperado:** o cliente aparece (ou é atualizado) na lista, com um aviso de sucesso. Se um cliente tem conta na loja e a equipe troca o e-mail dele, o aviso informa que **ele precisará confirmar o novo e-mail** antes do próximo pedido.

<img width="1365" height="629" alt="image" src="https://github.com/user-attachments/assets/008b3c5e-eec4-485c-aa4d-4fe6228e147f" />

#### B8. Gerenciar a equipe (administrador)

Em **Usuários** (esse item só aparece no menu para administradores):

1. Clique em **+ Novo usuário** e preencha nome, e-mail, papel (**Vendedor** ou **Administrador**) e senha (mínimo de 8 caracteres, com letras e números).
2. Nas ações de cada linha, é possível **editar** nome, e-mail e papel, **definir uma nova senha** e **desativar** ou **reativar** o acesso (os dois últimos pedem confirmação).

**Resultado esperado:** a lista mostra cada pessoa com papel, status (**Ativo** ou **Desativado**) e último login (ou "Nunca entrou"). Regras de proteção: você não pode desativar a si mesmo nem tirar o seu próprio papel de administrador, e o sistema sempre precisa de **ao menos um administrador ativo**. Usuário desativado perde o acesso imediatamente, até se estiver logado.

<img width="1365" height="630" alt="image" src="https://github.com/user-attachments/assets/59b549a0-fd56-4857-99da-fa84c5e25a19" />

---

## 6. Exemplos de utilização

### Exemplo 1 — Uma compra completa na loja

1. Um visitante abre a loja, escolhe um boné e clica em **Adicionar ao carrinho**.
2. No carrinho, clica em **Entrar para finalizar** e cria uma conta.
3. Digita o código de 6 números recebido por e-mail.
4. Volta ao carrinho, clica em **Finalizar pedido**, escolhe **Pix** e clica em **Confirmar pagamento**.
5. Vê **"Pagamento aprovado · Pedido nº N registrado!"** e, em **Minha conta**, o pedido com status **Pago**.

### Exemplo 2 — Testar um pagamento recusado

1. Com um item no carrinho, vá em **Finalizar pedido** e escolha **Cartão**.
2. Use qualquer número de cartão de teste que **termine em 0000**, com validade futura e CVV de 3 ou 4 dígitos.
3. Clique em **Confirmar pagamento**.

**Resultado:** aparece a mensagem de pagamento recusado (simulação). Nenhum pedido é criado e o carrinho continua com os itens.

Para um pagamento aprovado com cartão, use outro final, por exemplo `4242 4242 4242 4242`, e escolha de 1 a 6 parcelas.

### Exemplo 3 — O estoque acompanhando a operação

Imagine uma variação com **5 unidades** em estoque:

1. O administrador abre **Estoque**, clica em **Ajustar**, escolhe **Entrada**, informa **10** e vê "Estoque após o ajuste: 15". Ao salvar, a linha passa a mostrar **15**.
2. Depois, na contagem física, encontram só 3 unidades. Ele escolhe **Contagem**, informa **3**, e o sistema registra o ajuste de **−12** (de 15 para 3).
3. Como 3 é menor que 5, a variação passa a aparecer **destacada como estoque baixo** e entra na contagem do dashboard.

### Exemplo 4 — Do pedido da loja à entrega

1. Uma cliente faz um pedido na loja. Na gestão, em **Vendas**, ele aparece como **"Nome (loja virtual)"**, com status **Pago**.
2. Um vendedor clica em **Marcar como enviado** e confirma. O status vira **Enviado**.
3. A cliente abre **Minha conta** e vê **"Enviado em dd/mm/aaaa"**.
4. Quando a mercadoria chega, o vendedor clica em **Marcar como entregue**. O pedido passa a **Entregue**, e a linha deixa de mostrar botão.

### Exemplo 5 — Venda de balcão

1. O vendedor abre **Vendas** e clica em **+ Nova venda**.
2. Adiciona, por exemplo, 2 unidades de uma variação e 1 de outra (qualquer peça com estoque), deixa o cliente como **"Venda avulsa (balcão)"** e confirma.
3. Aparece "Venda registrada.", o total é a soma dos itens e o estoque de cada variação baixa na mesma hora.

### Dados de demonstração

O catálogo da loja (categorias, produtos, variações e fotos) foi carregado com o script `scripts/seed_loja.py`, que lê o arquivo `scripts/seed_data/class_catalog.json`. O script precisa de um login de administrador e pode ser rodado mais de uma vez sem duplicar nada. Para só ver o que ele faria, sem gravar:

```bash
python scripts/seed_loja.py --dry-run
```

---

## 7. Limitações conhecidas

Esta é a visão sincera do estágio atual do projeto.

### Funcionalidades que não existem (ainda)

- **Pagamento real:** o pagamento da loja é apenas uma simulação, sem operadora, gateway ou cobrança.
- **Entrega:** não há endereço de entrega, frete, rastreio nem cancelamento ou estorno de pedidos. Os status "Enviado" e "Entregue" são marcados **manualmente** pela equipe.
- **Nota fiscal e financeiro:** não há emissão de nota, contas a pagar e receber nem fluxo de caixa.
- **Várias lojas:** o sistema atende uma única loja (sem filiais).
- **Relatórios avançados:** o dashboard é um resumo, sem relatórios detalhados nem exportação.

### Limitações da gestão de produtos

- **Publicar um produto na loja não tem tela na gestão.** Todo produto cadastrado pelo painel nasce **não publicado** e só aparece na vitrine depois de ser publicado diretamente no servidor (Xano), junto com as fotos.
- Na tela de **Produtos** é possível cadastrar e consultar produtos e variações, mas **não há edição de produto, envio de fotos, criação de categorias nem desativação** por ali. O catálogo da loja é carregado pelo script de demonstração.
- O catálogo exibido na loja é **material de demonstração**, montado a partir de um site de referência. Não representa uma loja real em operação.

### Limitações de uso

- **Contas de cliente** só são criadas pela própria loja. Clientes cadastrados pela equipe na gestão **não têm senha nem acesso** à loja.
- **Contas da equipe** só são criadas por um administrador (não existe auto-cadastro).
- **Carrinho:** fica salvo no navegador, então não acompanha o cliente entre aparelhos ou navegadores. O limite é de 10 unidades por item.
- **Newsletter:** o formulário da página inicial é apenas visual. Ele valida o e-mail e agradece, mas **não grava** nenhum endereço.

### Limitações técnicas

- **E-mail de códigos:** o envio dos códigos de confirmação e de recuperação de senha depende de um serviço externo de e-mail. Se ele estiver indisponível, aparece "Não foi possível enviar o código agora" e é preciso tentar de novo. Sem o e-mail confirmado, o cliente não finaliza pedidos.
- **Servidor gratuito:** o servidor de dados usa um plano gratuito, que limita a quantidade de requisições. Em momentos de muito uso pode aparecer a mensagem "O servidor está recebendo muitas requisições agora... Aguarde alguns segundos e tente de novo." As leituras são repetidas automaticamente até 3 vezes.
- **Estoque e vendas simultâneas:** o sistema nunca deixa o estoque negativo em vendas uma depois da outra, mas, em teoria, duas vendas da **mesma variação confirmadas no mesmo instante** podem passar juntas pela checagem. Esse risco foi aceito para o volume de uso previsto.
- **Histórico antigo:** registros de eventos anteriores a 11/11/2026 podem conter dados que hoje não seriam gravados. Eles foram mantidos por decisão do grupo.

---

## 8. Informações técnicas

### Tecnologias

| Camada | Tecnologia |
| --- | --- |
| Aplicação (telas) | [Reflex](https://reflex.dev) (Python) |
| Banco de dados, APIs e autenticação | [Xano](https://xano.com) |
| Comunicação com o servidor | `httpx` |
| Envio de e-mails (códigos) | Brevo, chamado pelo Xano |
| Testes | `pytest` |

O Reflex nunca acessa o banco de dados diretamente: ele conversa com a API do Xano, onde ficam também as regras de negócio e de permissão.

### Estrutura do repositório

```text
Vetements/
├── vetements/          Código do aplicativo
│   ├── pages/          Telas da gestão
│   ├── state/          Lógica das telas da gestão
│   ├── loja/           Loja virtual (telas, estado e componentes)
│   ├── xano_client.py  Comunicação com o servidor de dados
│   └── routes.py       Endereços do site
├── xano/               Cópia das tabelas, APIs e funções do backend
├── docs/               Visão geral do projeto e modelo de domínio
├── openspec/           Especificações do comportamento do sistema
├── scripts/            Carga do catálogo de demonstração
├── tests/              Testes automatizados
├── assets/             Imagens e estilos (inclui os prints deste manual)
├── rxconfig.py         Configuração do Reflex
└── requirements.txt    Dependências do projeto
```

### Variáveis de ambiente (opcionais)

O projeto já vem apontando para o servidor do grupo. Só defina estas variáveis para usar outra instância do Xano:

`XANO_INSTANCE_URL`, `XANO_GROUP_AUTHENTICATION`, `XANO_GROUP_CATALOGO`, `XANO_GROUP_CLIENTES`, `XANO_GROUP_VENDAS`, `XANO_GROUP_LOJA`

### Rodando os testes

```bash
pip install -r requirements-dev.txt
pytest
```

### Documentação complementar

- [`docs/project-overview.md`](docs/project-overview.md): visão geral, escopo e decisões do projeto.
- [`docs/domain-model.md`](docs/domain-model.md): conceitos do domínio (usuário, cliente, produto, variação, venda...) e como se relacionam.
- [`openspec/specs/`](openspec/specs/): requisitos detalhados de cada módulo.

---

## Autores

- **Matheus Loureiro**
- **Bruno Onishi**
- **Denis Santana**

Grupo Vetements.
