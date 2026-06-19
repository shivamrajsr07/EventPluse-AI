import pandas as pd

from utils.paths import data_path


def build_features():

    # Load dataset
    df = pd.read_csv(
        data_path("event_congestion_dataset.csv")
    )

    # -------------------------------
    # Datetime Conversion
    # -------------------------------

    df["start_datetime"] = pd.to_datetime(
        df["start_datetime"],
        format="mixed",
        utc=True,
        errors="coerce"
    )

    df["end_datetime"] = pd.to_datetime(
        df["end_datetime"],
        format="mixed",
        utc=True,
        errors="coerce"
    )

    # Remove rows with invalid start time
    df = df.dropna(
        subset=["start_datetime"]
    )

    # -------------------------------
    # Duration Feature
    # -------------------------------

    df["duration_hours"] = (
        df["end_datetime"]
        - df["start_datetime"]
    ).dt.total_seconds() / 3600

    df["duration_hours"] = (
        df["duration_hours"]
        .fillna(2)
        .clip(lower=0.25)
    )

    # -------------------------------
    # Time Features
    # -------------------------------

    df["hour"] = (
        df["start_datetime"]
        .dt.hour
    )

    df["day_of_week"] = (
        df["start_datetime"]
        .dt.dayofweek
    )

    df["month"] = (
        df["start_datetime"]
        .dt.month
    )

    df["is_weekend"] = (
        df["day_of_week"] >= 5
    ).astype(int)

    # -------------------------------
    # Location Cleanup
    # -------------------------------

    df["zone"] = (
        df["zone"]
        .fillna("Unknown")
        .astype(str)
    )

    df["junction"] = (
        df["junction"]
        .fillna("Unknown")
        .astype(str)
    )

    # -------------------------------
    # Zone Density
    # -------------------------------

    zone_counts = (
        df["zone"]
        .value_counts()
        .to_dict()
    )

    df["zone_density"] = (
        df["zone"]
        .map(zone_counts)
        .fillna(0)
    )

    # -------------------------------
    # Junction Density
    # -------------------------------

    junction_counts = (
        df["junction"]
        .value_counts()
        .to_dict()
    )

    df["junction_density"] = (
        df["junction"]
        .map(junction_counts)
        .fillna(0)
    )

    # -------------------------------
    # Latitude / Longitude Cleanup
    # -------------------------------

    df["latitude"] = pd.to_numeric(
        df["latitude"],
        errors="coerce"
    )

    df["longitude"] = pd.to_numeric(
        df["longitude"],
        errors="coerce"
    )

    df["latitude"] = (
        df["latitude"]
        .fillna(df["latitude"].median())
    )

    df["longitude"] = (
        df["longitude"]
        .fillna(df["longitude"].median())
    )

    # -------------------------------
    # Road Closure Target
    # -------------------------------

    df["requires_road_closure"] = (
        df["requires_road_closure"]
        .astype(int)
    )

    return df
