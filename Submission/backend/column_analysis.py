import pandas as pd

df = pd.read_csv("data/event_congestion_dataset.csv")

important_cols = [
    "event_type",
    "event_cause",
    "requires_road_closure",
    "zone",
    "junction",
    "start_datetime",
    "end_datetime",
    "latitude",
    "longitude"
]

for col in important_cols:
    print("\n" + "="*60)
    print(col)
    print("="*60)

    try:
        print(df[col].value_counts().head(20))
    except:
        print(df[col].head())