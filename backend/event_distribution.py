import pandas as pd

df = pd.read_csv("data/events.csv")

print("\nEVENT TYPE DISTRIBUTION\n")
print(df["event_type"].value_counts())

print("\nEVENT CAUSE DISTRIBUTION\n")
print(df["event_cause"].value_counts())