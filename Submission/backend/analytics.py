import pandas as pd

df = pd.read_csv(
    "data/event_congestion_dataset.csv"
)

print(df["event_cause"].value_counts())