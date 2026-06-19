import pandas as pd

df = pd.read_csv("data/event_congestion_dataset.csv")

print(
    pd.crosstab(
        df["event_cause"],
        df["requires_road_closure"]
    )
)