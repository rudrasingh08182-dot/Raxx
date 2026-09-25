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
    as a key:value pair instead of one plain string.

    Example:
        "Step 4 - First job": "Junior Developer role"

    becomes:
        "Step 4 - First job: Junior Developer role"
    """

    known_keys = {
        "careers",
        "title",
        "emoji",
        "description",
        "why_suits",
        "key_exams",
        "top_colleges",
        "salary_range",
        "growth",
        "roadmap",
    }

    pattern = _re.compile(
        r'"([^"]+)":\s*"([^"]*)"(?=\s*[,\]\n])'
    )

    def merge_safe(match):
        key = match.group(1)
        value = match.group(2)

        if key in known_keys:
            return match.group(0)

        return f'"{key}: {value}"'

    return pattern.sub(merge_safe, text)


def _extract_json_object(text: str):
    """
    AI response se JSON object safely extract karta hai.

    Handles:
    - normal JSON
    - ```json ... ```
    - extra text before/after JSON
    """

    text = text.strip()

    # Markdown code fence remove
    text = _re.sub(
        r"^```(?:json)?\s*",
        "",
        text,
        flags=_re.IGNORECASE,
    )

    text = _re.sub(
        r"\s*```$",
        "",
        text,
    )

    text = text.strip()

    # Direct JSON
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # JSON object extract
    start = text.find("{")
    end = text.rfind("}")

    if start == -1 or end == -1 or end <= start:
        raise json.JSONDecodeError(
            "No JSON object found in response",
            text,
            0,
        )

    json_text = text[start:end + 1]

    # Known AI formatting repair
    json_text = _repair_malformed_json(json_text)

    # Normal JSON first
    try:
        return json.loads(json_text)
    except json.JSONDecodeError:
        pass

    # Fallback for slightly loose JSON
    try:
        import json5
        return json5.loads(json_text)
    except Exception:
        raise json.JSONDecodeError(
            "Invalid JSON returned by AI",
            json_text,
            0,
        )


class CareerRequest(BaseModel):
    student_name: str
    board: str
    class_level: str
    marks: dict
    interests: List[str]
    language: str = "English"


@router.post("/suggest")
async def suggest_careers(data: CareerRequest):

    question = f"""
You are an expert Indian career counselor. A student needs career guidance.

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

Every roadmap item is ONE plain string only, formatted exactly as:

"Step X - phase: detail text here"

The colon is just a character INSIDE the string, not a JSON key-value pair.

NEVER write a roadmap item as:

"Step X - phase": "detail"

That is invalid.

This rule applies to every single roadmap item, including Step 4 and Step 5.
Do not change format partway through the array.

Return ONLY the JSON object.
"""

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

            # =========================================================
            # IMPORTANT:
            # ask_raxx_ai() kabhi dict aur kabhi direct string return
            # kar sakta hai. Dono formats safely handle karo.
            # =========================================================

            if isinstance(result, str):

                # Direct AI answer
                raw = result.strip()

                cache_read = False
                tokens_used = 0

                if not raw:
                    raise RuntimeError(
                        "AI returned an empty response."
                    )

            elif isinstance(result, dict):

                # Normal helper response
                if not result.get("success", False):

                    raise RuntimeError(
                        result.get(
                            "error",
                            "AI generation failed."
                        )
                    )

                raw = str(
                    result.get("answer", "")
                ).strip()

                cache_read = result.get(
                    "cache_read",
                    False,
                )

                tokens_used = result.get(
                    "tokens_used",
                    0,
                )

                if not raw:
                    raise RuntimeError(
                        "AI returned an empty answer."
                    )

            else:

                raise RuntimeError(
                    f"Invalid AI response type: {type(result).__name__}"
                )

            # Debug log
            print(
                f"[CAREER] AI response length: {len(raw)}",
                flush=True,
            )

            print(
                f"[CAREER] AI response:\n{raw}",
                flush=True,
            )

            # =========================================================
            # JSON PARSE
            # =========================================================

            data_result = _extract_json_object(raw)

            # =========================================================
            # BASIC VALIDATION
            # =========================================================

            if not isinstance(data_result, dict):
                raise RuntimeError(
                    "AI response must be a JSON object."
                )

            if "careers" not in data_result:
                raise RuntimeError(
                    "AI response is missing 'careers'."
                )

            if not isinstance(
                data_result["careers"],
                list,
            ):
                raise RuntimeError(
                    "'careers' must be a JSON array."
                )

            if len(data_result["careers"]) != 4:
                raise RuntimeError(
                    f"Expected exactly 4 careers, got {len(data_result['careers'])}."
                )

            # =========================================================
            # SUCCESS
            # =========================================================

            return {
                "success": True,
                "data": data_result,
                "cache_read": cache_read,
                "tokens_used": tokens_used,
            }

        except Exception as e:

            last_error = str(e)

            print(
                f"[career/suggest] Attempt {attempt + 1} failed: "
                f"{type(e).__name__}: {e}",
                flush=True,
            )

            if raw:
                print(
                    f"[career/suggest] Raw AI response:\n{raw}",
                    flush=True,
                )

            # Second attempt ke pehle loop continue hoga

    # =============================================================
    # BOTH ATTEMPTS FAILED
    # =============================================================

    raise HTTPException(
        status_code=500,
        detail=(
            "AI response parse error after retries: "
            f"{last_error}"
        ),
    )