import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from schemas import EventRequest

from services.predictor import predict_closure
from services.recommender import recommend_resources
from services.impact import calculate_impact
from services.explanation import generate_explanation

from services.analytics_service import get_event_stats
from services.zone_risk import zone_risk


app = FastAPI(
    title="EventPulse AI",
    description="Event Driven Traffic Intelligence Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://eventpulse-ai.vercel.app",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def home():

    return {
        "message": "EventPulse AI Running",
        "status": "healthy"
    }


@app.post("/predict")
def predict(request: EventRequest):

    result = predict_closure(
        event_cause=request.event_cause,
        duration_hours=request.duration_hours,
        hour=request.hour,
        day_of_week=request.day_of_week,
        month=request.month,
        is_weekend=request.is_weekend,
        zone_density=request.zone_density,
        junction_density=request.junction_density,
        latitude=request.latitude,
        longitude=request.longitude
    )

    impact = calculate_impact(
        result["closure_probability"],
        request.duration_hours,
        request.zone_density
    )

    recommendation = recommend_resources(
        request.event_cause,
        result["closure_probability"]
    )

    explanation = generate_explanation(
        request.event_cause,
        result["closure_probability"],
        impact["risk"]
    )

    return {
        "prediction": result,
        "impact": impact,
        "resources": recommendation,
        "explanation": explanation
    }


@app.get("/simulate")
def simulate():

    result = predict_closure(
        event_cause="vip_movement",
        duration_hours=8,
        hour=18,
        day_of_week=5,
        month=7,
        is_weekend=1,
        zone_density=69,
        junction_density=13,
        latitude=13.02,
        longitude=77.62
    )

    impact = calculate_impact(
        result["closure_probability"],
        8,
        69
    )

    recommendation = recommend_resources(
        "vip_movement",
        result["closure_probability"]
    )

    explanation = generate_explanation(
        "vip_movement",
        result["closure_probability"],
        impact["risk"]
    )

    return {
        "scenario": "VIP Movement Simulation",
        "prediction": result,
        "impact": impact,
        "resources": recommendation,
        "explanation": explanation
    }


@app.get("/analytics")
def analytics():

    return {
        "event_statistics": get_event_stats()
    }


@app.get("/zone-risk")
def zone_rank():

    return {
        "zones": zone_risk()
    }
