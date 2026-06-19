from pydantic import BaseModel, Field


class EventRequest(BaseModel):

    event_cause: str = Field(
        min_length=1,
        examples=["vip_movement"]
    )

    duration_hours: float = Field(
        ge=0.25,
        le=24
    )

    hour: int = Field(
        ge=0,
        le=23
    )

    day_of_week: int = Field(
        ge=0,
        le=6
    )

    month: int = Field(
        ge=1,
        le=12
    )

    is_weekend: int = Field(
        ge=0,
        le=1
    )

    zone_density: int = Field(
        ge=0
    )

    junction_density: int = Field(
        ge=0
    )

    latitude: float = Field(
        ge=-90,
        le=90
    )

    longitude: float = Field(
        ge=-180,
        le=180
    )
