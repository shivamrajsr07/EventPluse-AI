from services.feature_engineering import build_features

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

from xgboost import XGBClassifier

import joblib


df = build_features()

encoder = LabelEncoder()

df["event_cause_encoded"] = encoder.fit_transform(
    df["event_cause"]
)

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

y = df["requires_road_closure"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

model = XGBClassifier(
    n_estimators=300,
    max_depth=6,
    learning_rate=0.05,
    random_state=42
)

model.fit(X_train, y_train)

y_pred = model.predict(X_test)

print("\nAccuracy:")
print(accuracy_score(y_test, y_pred))

print("\nClassification Report:")
print(classification_report(y_test, y_pred))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

joblib.dump(
    model,
    "model/xgb_closure_model.pkl"
)

print("\nXGBoost Model Saved")