from flask import Flask, request
from flask_cors import CORS

from config import SUPPORTED_LANGUAGES
from utils.validation import validate_request

from services.pylint_service import run_pylint
from services.eslint_service import run_eslint
from services.ai_service import analyse_with_ai
from services.scoring_service import calculate_score

import time


app = Flask(__name__)

CORS(app)


@app.get("/api/health")
def health():

    return {
        "status": "ok",
        "message": "AI Code Review Helper is running."
    }


@app.post("/api/review")
def review_code():

    start_time = time.perf_counter()

    data = request.get_json(silent=True)

    valid, error = validate_request(data)

    if not valid:

        return {
            "error": error
        }, 400

    code = data["code"]
    language = data["language"]

    static_results = []

    # Run appropriate static analyser

    if language == "python":

        static_results = run_pylint(code)

    elif language == "javascript":

        static_results = run_eslint(code)

    # AI analysis

    ai_results = analyse_with_ai(
        code,
        language
    )

    # Calculate score

    score = calculate_score(
        static_results,
        ai_results
    )

    end_time = time.perf_counter()

    analysis_time = round(
        end_time - start_time,
        2
    )

    return {

        "language": language,

        "score": score,

        "static_analysis": static_results,

        "ai_feedback": ai_results,

        "analysis_time": analysis_time

    }


if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000
    )