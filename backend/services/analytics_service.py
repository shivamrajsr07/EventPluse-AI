import pandas as pd

from utils.paths import data_path


def get_event_stats():

    df = pd.read_csv(
        data_path("event_congestion_dataset.csv")
    )

    return (
        df["event_cause"]
        .value_counts()
        .to_dict()
    )
