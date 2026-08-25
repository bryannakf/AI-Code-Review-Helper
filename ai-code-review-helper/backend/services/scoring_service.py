def calculate_score(static_results, ai_results):

    readability = 100
    maintainability = 100
    style = 100
    bugs = 100

    # Static-analysis penalties

    for issue in static_results:

        severity = issue.get("severity", "").lower()

        if severity in ["error", "fatal"]:
            penalty = 15

        elif severity in ["warning", "convention"]:
            penalty = 5

        else:
            penalty = 2

        style -= penalty

    # AI penalties

    for issue in ai_results.get("issues", []):

        category = issue.get("category", "").lower()
        severity = issue.get("severity", "").lower()

        if severity == "critical":
            penalty = 20

        elif severity == "high":
            penalty = 15

        elif severity == "medium":
            penalty = 8

        elif severity == "low":
            penalty = 3

        else:
            penalty = 1

        if category == "readability":
            readability -= penalty

        elif category == "maintainability":
            maintainability -= penalty

        elif category in ["bug", "potential defect", "security"]:
            bugs -= penalty

        else:
            style -= penalty

    readability = max(0, min(100, readability))
    maintainability = max(0, min(100, maintainability))
    style = max(0, min(100, style))
    bugs = max(0, min(100, bugs))

    overall = (
        readability * 0.25 +
        maintainability * 0.25 +
        style * 0.25 +
        bugs * 0.25
    )

    return {
        "overall": round(overall),
        "readability": readability,
        "maintainability": maintainability,
        "style_compliance": style,
        "potential_bugs": bugs
    }