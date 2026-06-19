def calculate_impact(
    closure_probability,
    duration_hours,
    zone_density
):

    score = (
        closure_probability * 60
        +
        min(duration_hours, 12) * 2
        +
        min(zone_density, 100) * 0.2
    )

    score = round(min(score, 100), 2)

    if score >= 80:
        risk = "HIGH"

    elif score >= 50:
        risk = "MEDIUM"

    else:
        risk = "LOW"

    return {
        "impact_score": score,
        "risk": risk
    }