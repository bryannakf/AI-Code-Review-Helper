import os
from dotenv import load_dotenv

load_dotenv()

MAX_CODE_LENGTH = 20000

SUPPORTED_LANGUAGES = {
    "python",
    "javascript",
    "java"
}

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")