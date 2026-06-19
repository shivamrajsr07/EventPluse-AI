import pandas as pd

df = pd.read_csv("data/events.csv")

target_events = [
    "construction",
    "public_event",
    "procession",
    "vip_movement",
    "protest"
]

event_df = df[df["event_cause"].isin(target_events)]

print(event_df.shape)

event_df.to_csv(
    "data/event_congestion_dataset.csv",
    index=False
)

print("saved")