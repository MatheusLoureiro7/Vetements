"""Formatação de moeda/data compartilhada entre States."""

from datetime import datetime


def format_currency(value: float) -> str:
    texto = f"{value:,.2f}"
    texto = texto.replace(",", "_").replace(".", ",").replace("_", ".")
    return f"R$ {texto}"


def format_datetime(iso: str) -> str:
    dt = datetime.fromisoformat(iso)
    return dt.strftime("%d/%m/%Y %H:%M")
