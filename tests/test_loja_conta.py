"""Conta do cliente e pedidos da loja (change
`frontend-cria-conta-cliente-checkout`): conversão da resposta da API,
itens enviados no pedido e destino depois do login."""

from vetements.loja.state.conta import destino_seguro, href_entrar, itens_para_pedido, pedido_da_api

PEDIDO_API = {
    "id": 12,
    "created_at": 1792540800000,
    "total": 438.0,
    "itens": [
        {"variacao_id": 3, "produto_id": 1, "nome": "T-shirt", "tamanho": "M", "cor": "Preto",
         "quantidade": 2, "preco_unitario": 219.0},
    ],
}


def test_pedido_da_api():
    pedido = pedido_da_api(PEDIDO_API)
    assert pedido.id == 12
    assert pedido.total_label == "R$ 438,00"
    assert pedido.itens[0].detalhe == "M · Preto"
    assert pedido.itens[0].total_label == "R$ 438,00"


def test_pedido_envia_so_variacao_e_quantidade():
    carrinho = [{"variacao_id": 3, "produto_id": 1, "nome": "T-shirt", "preco": 1.0, "quantidade": 2}]
    assert itens_para_pedido(carrinho) == [{"variacao_id": 3, "quantidade": 2}]


def test_destino_depois_do_login_so_aceita_caminho_interno():
    assert destino_seguro("/carrinho") == "/carrinho"
    assert destino_seguro("https://outro.site") == "/conta"
    assert destino_seguro("//outro.site") == "/conta"
    assert destino_seguro("") == "/conta"


def test_href_entrar_guarda_o_destino():
    assert href_entrar("/carrinho") == "/conta/entrar?proximo=%2Fcarrinho"
    assert href_entrar() == "/conta/entrar"


# --- Gestão: pedidos da loja na tela de Vendas -----------------------------

from vetements.state.sales import rotulo_cliente  # noqa: E402


def test_rotulo_do_cliente_marca_pedidos_da_loja():
    clientes = {5: "Ana"}
    assert rotulo_cliente({"cliente_id": 5, "origem": "loja_virtual"}, clientes) == "Ana (loja virtual)"
    assert rotulo_cliente({"cliente_id": 5, "origem": "balcao"}, clientes) == "Ana"
    assert rotulo_cliente({"cliente_id": None}, clientes) == "Balcão"
    # Vendas antigas, sem origem gravada, continuam como balcão.
    assert rotulo_cliente({"cliente_id": 5}, clientes) == "Ana"
