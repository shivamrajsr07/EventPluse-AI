from pathlib import Path


BACKEND_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BACKEND_DIR / "data"
MODEL_DIR = BACKEND_DIR / "model"


def data_path(filename):
    return DATA_DIR / filename


def model_path(filename):
    return MODEL_DIR / filename
