import pandas as pd

from utils.paths import data_path


def zone_risk():

    df = pd.read_csv(
        data_path("event_congestion_dataset.csv")
    )

    return (
        df["zone"]
        .value_counts()
        .head(10)
        .to_dict()
    )
