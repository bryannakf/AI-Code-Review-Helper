from config import MAX_CODE_LENGTH, SUPPORTED_LANGUAGES


def validate_request(data):

    if not isinstance(data, dict):
        return False, "Invalid request."

    code = data.get("code")
    language = data.get("language")
    consent = data.get("consent")

    if not code or not isinstance(code, str):
        return False, "Code cannot be empty."

    if len(code) > MAX_CODE_LENGTH:
        return False, "Code exceeds the maximum permitted length."

    if language not in SUPPORTED_LANGUAGES:
        return False, f"Unsupported language: {language}"

    if consent is not True:
        return False, "You must confirm that the code contains no confidential or personal information."

    return True, None