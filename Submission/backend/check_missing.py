import pandas as pd

df = pd.read_csv("data/events.csv")

print("\nMissing Values:\n")
print(df.isnull().sum())