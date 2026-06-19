from services.feature_engineering import build_features

df = build_features()

print("\nDataset Shape:")
print(df.shape)

print("\nNull Values:\n")

print(
    df[
        [
            "duration_hours",
            "hour",
            "day_of_week",
            "month",
            "is_weekend",
            "zone_density",
            "junction_density",
            "latitude",
            "longitude"
        ]
    ].isnull().sum()
)