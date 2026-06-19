import pandas as pd

df = pd.read_csv("data/events.csv")

print("\nDataset Loaded Successfully\n")

print("Shape:")
print(df.shape)

print("\nColumns:")
print(df.columns.tolist())

print("\nFirst 5 Rows:")
print(df.head())