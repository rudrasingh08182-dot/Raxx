from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from utils.gemini_helper import ask_raxx_ai
import json
import re as _re

router = APIRouter()


def _repair_malformed_json(text: str) -> str:
    """
    Fixes a known AI formatting slip where a string-array item gets written
    as a key:value pair instead of one plain string, e.g.:
        "Step 4 - First job": "Junior Developer role",
    gets turned back into:
        "Step 4 - First job: Junior Developer role",
    Only touches pairs whose "key" is NOT one of our known real JSON keys,
    so actual object fields (title, emoji, description, etc.) are untouched.
    """
    known_keys = {
        "careers", "title", "emoji", "description", "why_suits", "key_exams",
        "top_colleges", "salary_range", "growth", "roadmap",
    }
    pattern = _re.compile(r'"([^"]+)":\s*"([^"]*)"(?=\s*[,\]\n])')

    def merge_safe(match):
        key, value = match.group(1), match.group(2)
        if key in known_keys:
            return match.group(0)
        return f'"{key}: {value}"'

    return pattern.sub(merge_safe, text)

class CareerRequest(BaseModel):
    student_name: str
    board: str
    class_level: str
    marks: dict
    interests: List[str]
    language: str = "English"

@router.post("/suggest")
async def suggest_careers(data: CareerRequest):
    import re
    import sys

    question = f"""You are an expert Indian career counselor. A student needs career guidance.

Student Profile:
- Name: {data.student_name}
- Board: {data.board}
- Class: {data.class_level}
- Subject Marks: {json.dumps(data.marks)}
- Interests: {', '.join(data.interests)}
- Language preference: {data.language}

Based on this profile, suggest exactly 4 career paths that are realistic and well-suited.

Respond ONLY in this exact JSON format, no extra text. Use DOUBLE QUOTES only for
every key and every string value — never single quotes. Every field named as an
array (key_exams, top_colleges, roadmap) must always be a JSON array, even with
one item:
{{
  "careers": [
    {{
      "title": "Career Title",
      "emoji": "relevant emoji",
      "description": "2-3 line description of this career",
      "why_suits": "Why this suits THIS specific student based on their marks and interests",
      "key_exams": ["Exam 1", "Exam 2", "Exam 3"],
      "top_colleges": ["College 1", "College 2", "College 3"],
      "salary_range": "Rs.X - Rs.Y LPA (starting)",
      "growth": "High / Medium / Very High",
      "roadmap": [
        "Step 1 - Right now: what to start doing immediately (e.g. specific skill/course)",
        "Step 2 - After Class 12: which exam/admission path to follow",
        "Step 3 - During graduation: what to build/practice/intern in",
        "Step 4 - First job: what role to target first",
        "Step 5 - 5 years goal: what senior position/milestone to aim for"
      ]
    }}
  ]
}}

CRITICAL — roadmap formatting rule:
Every roadmap item is ONE plain string only, formatted exactly as
"Step X - phase: detail text here" — the colon is just a character INSIDE
the string, not a JSON key-value pair. NEVER write a roadmap item as
"Step X - phase": "detail text" (that is invalid — it turns a string array
item into a broken key:value pair). This rule applies to every single step,
including Step 4 and Step 5 — do not change format partway through the array."""

    last_error = "Unknown error"
    for attempt in range(2):
        raw = ""
        try:
            result = ask_raxx_ai(
                question=question,
                feature="career",
                language=data.language,
                board=data.board,
                grade=data.class_level,
            )

            if not result["success"]:
                raise RuntimeError(result["error"])

            raw = result["answer"].strip()
            match = re.search(r'\{.*\}', raw, re.DOTALL)
            if not match:
                raise json.JSONDecodeError("No JSON object found in response", raw, 0)

            json_text = match.group(0)
            json_text = _repair_malformed_json(json_text)
            try:
                data_result = json.loads(json_text)
            except json.JSONDecodeError:
                # Model ne kabhi-kabhi single quotes ya thoda loose JSON de
                # deta hai — json5 usko bhi parse kar leta hai
                import json5
                data_result = json5.loads(json_text)

            return {
                "success": True,
                "data": data_result,
                "cache_read": result["cache_read"],
                "tokens_used": result["tokens_used"],
            }

        except Exception as e:
            last_error = str(e)
            print(f"[career/suggest] Attempt {attempt + 1} failed: {type(e).__name__}: {e}", file=sys.stderr)
            if raw:
                print(f"Raw AI response was:\n{raw!r}", file=sys.stderr)
            sys.stderr.flush()

    raise HTTPException(status_code=500, detail=f"AI response parse error after retries: {last_error}")