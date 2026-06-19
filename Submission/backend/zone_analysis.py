import pandas as pd

df = pd.read_csv("data/event_congestion_dataset.csv")

print(
    df["zone"].value_counts().head(30)
)