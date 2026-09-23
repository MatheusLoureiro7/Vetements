"""Formatação de moeda/data compartilhada entre States."""

from datetime import datetime


def format_currency(value: float) -> str:
    texto = f"{value:,.2f}"
    texto = texto.replace(",", "_").replace(".", ",").replace("_", ".")
    return f"R$ {texto}"


def format_datetime(value: str | int | float) -> str:
    """Aceita tanto uma string ISO 8601 (usada pelos dados mockados) quanto
    um timestamp em milissegundos desde epoch (formato retornado pelo
    campo `timestamp` do Xano)."""
    if isinstance(value, (int, float)):
        dt = datetime.fromtimestamp(value / 1000)
    else:
        dt = datetime.fromisoformat(value)
    return dt.strftime("%d/%m/%Y %H:%M")
