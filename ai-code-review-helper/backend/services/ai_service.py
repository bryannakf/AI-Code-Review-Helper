import json
from openai import OpenAI
from config import OPENAI_API_KEY


client = OpenAI(api_key=OPENAI_API_KEY)


def analyse_with_ai(code, language):

    prompt = f"""
You are a software code review assistant.

Review the following {language} code.

Assess:

1. Readability
2. Maintainability
3. Potential defects
4. Security concerns
5. Coding-standard issues

For every identified issue provide:

- category
- severity
- explanation
- recommendation

Severity must be one of:

critical
high
medium
low
info

Do not invent problems that are not supported by the code.

Return ONLY valid JSON using this structure:

{{
    "summary": "short summary",
    "issues": [
        {{
            "category": "readability",
            "severity": "low",
            "explanation": "explanation",
            "recommendation": "recommendation"
        }}
    ]
}}

Code:

```{language}
{code}
"""


