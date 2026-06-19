from services.feature_engineering import build_features

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

from sklearn.preprocessing import LabelEncoder

import joblib


# Load data
df = build_features()

print("Dataset Shape:", df.shape)

# Encode event cause
encoder = LabelEncoder()

df["event_cause_encoded"] = encoder.fit_transform(
    df["event_cause"]
)

# Features
X = df[
    [
        "event_cause_encoded",
        "duration_hours",
        "hour",
        "day_of_week",
        "month",
        "is_weekend",
        "zone_density",
        "junction_density",
        "latitude",
        "longitude"
    ]
]

# Target
y = df["requires_road_closure"]

# Train Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("Training Size:", X_train.shape)
print("Testing Size:", X_test.shape)

# Model
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=8,
    random_state=42
)

# Train
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Results
print("\nAccuracy:")
print(accuracy_score(y_test, y_pred))

print("\nClassification Report:")
print(classification_report(y_test, y_pred))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Save Model
joblib.dump(
    model,
    "model/closure_model.pkl"
)

joblib.dump(
    encoder,
    "model/event_encoder.pkl"
)

print("\nModel Saved Successfully")