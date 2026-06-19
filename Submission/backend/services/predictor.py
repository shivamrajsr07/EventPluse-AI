import joblib
import pandas as pd
from fastapi import HTTPException

from utils.paths import model_path

model = None
encoder = None


def load_artifacts():
    global model, encoder

    if model is None:
        model = joblib.load(
            model_path("xgb_closure_model.pkl")
        )

    if encoder is None:
        encoder = joblib.load(
            model_path("event_encoder.pkl")
        )

    return model, encoder


def predict_closure(
    event_cause,
    duration_hours,
    hour,
    day_of_week,
    month,
    is_weekend,
    zone_density,
    junction_density,
    latitude,
    longitude
):

    loaded_model, loaded_encoder = load_artifacts()

    try:
        event_encoded = loaded_encoder.transform(
            [event_cause]
        )[0]
    except ValueError as exc:
        allowed_events = loaded_encoder.classes_.tolist()
        raise HTTPException(
            status_code=422,
            detail={
                "message": "Unsupported event_cause",
                "allowed_event_causes": allowed_events
            }
        ) from exc

    data = pd.DataFrame([
        {
            "event_cause_encoded": event_encoded,
            "duration_hours": duration_hours,
            "hour": hour,
            "day_of_week": day_of_week,
            "month": month,
            "is_weekend": is_weekend,
            "zone_density": zone_density,
            "junction_density": junction_density,
            "latitude": latitude,
            "longitude": longitude
        }
    ])

    probability = loaded_model.predict_proba(
        data
    )[0][1]

    prediction = int(
        probability >= 0.5
    )

    return {
        "closure_probability":
            round(float(probability), 4),
        "prediction":
            prediction
    }
