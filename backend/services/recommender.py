def recommend_resources(
    event_cause,
    closure_probability
):

    police = 5
    barricades = 4
    diversions = 1

    if closure_probability > 0.80:

        police = 30
        barricades = 25
        diversions = 4

    elif closure_probability > 0.60:

        police = 20
        barricades = 15
        diversions = 3

    elif closure_probability > 0.40:

        police = 10
        barricades = 8
        diversions = 2

    if event_cause == "vip_movement":
        police += 15

    elif event_cause == "public_event":
        police += 8

    elif event_cause == "procession":
        barricades += 5

    elif event_cause == "protest":
        police += 10

    return {
        "police": police,
        "barricades": barricades,
        "diversions": diversions
    }