def generate_explanation(
    event_cause,
    closure_probability,
    risk
):

    if closure_probability >= 0.8:

        return (
            f"{event_cause} is expected to create "
            f"significant traffic disruption. "
            f"Road closure probability is high. "
            f"Deploy traffic personnel and diversion routes."
        )

    elif closure_probability >= 0.5:

        return (
            f"{event_cause} may create moderate traffic impact. "
            f"Prepare barricades and traffic monitoring."
        )

    else:

        return (
            f"{event_cause} is expected to have limited impact. "
            f"Regular monitoring should be sufficient."
        )