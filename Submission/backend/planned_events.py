import pandas as pd

df = pd.read_csv("data/events.csv")

planned = df[df["event_type"] == "planned"]

print("\nPLANNED EVENTS ONLY\n")
print(planned["event_cause"].value_counts())