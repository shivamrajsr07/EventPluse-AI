from services.feature_engineering import build_features

df = build_features()

print(df.shape)

print()

print(df[
[
"event_cause",
"duration_hours",
"hour",
"day_of_week",
"month",
"is_weekend",
"zone_density",
"junction_density"
]
].head())