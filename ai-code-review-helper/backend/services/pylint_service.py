import subprocess
import tempfile
import os
import json


def run_pylint(code):

    temp_path = None

    try:
        with tempfile.NamedTemporaryFile(
            mode="w",
            suffix=".py",
            delete=False,
            encoding="utf-8"
        ) as file:

            file.write(code)
            temp_path = file.name

        result = subprocess.run(
            [
                "pylint",
                temp_path,
                "--output-format=json"
            ],
            capture_output=True,
            text=True,
            timeout=10
        )

        try:
            findings = json.loads(result.stdout)
        except json.JSONDecodeError:
            findings = []

        results = []

        for finding in findings:

            results.append({
                "tool": "Pylint",
                "severity": finding.get("type", "unknown"),
                "line": finding.get("line"),
                "column": finding.get("column"),
                "message": finding.get("message"),
                "code": finding.get("message-id")
            })

        return results

    except subprocess.TimeoutExpired:

        return [{
            "tool": "Pylint",
            "severity": "error",
            "message": "Static analysis timed out."
        }]

    except Exception as error:

        return [{
            "tool": "Pylint",
            "severity": "error",
            "message": str(error)
        }]

    finally:

        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)