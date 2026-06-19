import pandas as pd

df = pd.read_csv("data/events.csv")

print("="*50)
print("SHAPE")
print(df.shape)

print("="*50)
print("COLUMNS")
print(df.columns.tolist())

print("="*50)
print("MISSING VALUES")
print(df.isnull().sum())

print("="*50)
print("EVENT TYPES")
print(df["event_type"].value_counts())

print("="*50)
print("EVENT CAUSES")
print(df["event_cause"].value_counts())