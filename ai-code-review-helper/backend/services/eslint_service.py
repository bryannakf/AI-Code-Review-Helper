import subprocess
import tempfile
import os
import json


def run_eslint(code):

    temp_path = None

    try:

        with tempfile.NamedTemporaryFile(
            mode="w",
            suffix=".js",
            delete=False,
            encoding="utf-8"
        ) as file:

            file.write(code)
            temp_path = file.name

        result = subprocess.run(
            [
                "npx",
                "eslint",
                temp_path,
                "-f",
                "json"
            ],
            capture_output=True,
            text=True,
            timeout=10
        )

        try:
            output = json.loads(result.stdout)
        except json.JSONDecodeError:
            output = []

        findings = []

        for file_result in output:

            for message in file_result.get("messages", []):

                findings.append({
                    "tool": "ESLint",
                    "severity": (
                        "error"
                        if message.get("severity") == 2
                        else "warning"
                    ),
                    "line": message.get("line"),
                    "column": message.get("column"),
                    "message": message.get("message"),
                    "code": message.get("ruleId")
                })

        return findings

    except subprocess.TimeoutExpired:

        return [{
            "tool": "ESLint",
            "severity": "error",
            "message": "Static analysis timed out."
        }]

    except Exception as error:

        return [{
            "tool": "ESLint",
            "severity": "error",
            "message": str(error)
        }]

    finally:

        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)