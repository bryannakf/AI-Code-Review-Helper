import subprocess
import tempfile
import os


def analyse_python(code):

    with tempfile.NamedTemporaryFile(
        mode="w",
        suffix=".py",
        delete=False,
        encoding="utf-8"
    ) as file:

        file.write(code)
        file_path = file.name

    try:

        result = subprocess.run(
            [
                "pylint",
                file_path,
                "--output-format=json"
            ],
            capture_output=True,
            text=True,
            timeout=10
        )

        import json

        try:
            findings = json.loads(result.stdout)
        except json.JSONDecodeError:
            findings = []

        results = []

        for finding in findings:

            results.append({
                "tool": "Pylint",
                "severity": finding.get("type"),
                "line": finding.get("line"),
                "message": finding.get("message"),
                "code": finding.get("message-id")
            })

        return results

    finally:

        if os.path.exists(file_path):
            os.remove(file_path)


def analyse_javascript(code):

    # Initial implementation.
    # ESLint integration can be added here.

    return []


def analyse_java(code):

    # Initial implementation.
    # Java-specific static analysis can be added later.

    return []


def analyse_code(code, language):

    if language == "python":
        return analyse_python(code)

    if language == "javascript":
        return analyse_javascript(code)

    if language == "java":
        return analyse_java(code)

    return []