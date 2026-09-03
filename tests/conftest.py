import pytest

from vetements.state import mock_data


@pytest.fixture(autouse=True)
def reset_mock_data():
    """Garante dados-semente frescos e isolados a cada teste."""
    mock_data.reset()
    yield
    mock_data.reset()
