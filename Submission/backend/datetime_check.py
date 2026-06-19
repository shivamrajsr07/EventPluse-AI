import pandas as pd

df = pd.read_csv("data/event_congestion_dataset.csv")

print(df["start_datetime"].head(10))
print()
print(df["end_datetime"].head(10))