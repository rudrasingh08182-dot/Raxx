from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from utils.gemini_helper import ask_raxx_ai
import json
import re

router = APIRouter()


class StudyPlanRequest(BaseModel):
    name: str
    exam: str
    exam_date: str
    subjects: list = Field(default_factory=list)
    daily_hours: int = 6
    study_time_preference: str = "day"
    weak_subjects: list = Field(default_factory=list)
    language: str = "english"
    board: str = "CBSE"
    grade: str = "12"


def _extract_json_object(response_text):
    """
    AI response se valid JSON object safely extract karta hai.

    Handles:
    - Normal JSON
    - ```json ... ```
    - Extra text before/after JSON
    """

    # Safety: response string hona chahiye
    if not isinstance(response_text, str):
        raise json.JSONDecodeError(
            "AI response is not a string",
            str(response_text),
            0,
        )

    text = response_text.strip()

    if not text:
        raise json.JSONDecodeError(
            "Empty AI response",
            text,
            0,
        )

    # Markdown code fences remove
    text = re.sub(
        r"^```(?:json)?\s*",
        "",
        text,
        flags=re.IGNORECASE,
    )

    text = re.sub(
        r"\s*```$",
        "",
        text,
    )

    text = text.strip()

    # Direct JSON
    try:
        parsed = json.loads(text)

        if isinstance(parsed, dict):
            return parsed

    except json.JSONDecodeError:
        pass

    # Extra text ke andar JSON object find karo
    start = text.find("{")
    end = text.rfind("}")

    if start == -1 or end == -1 or end <= start:
        raise json.JSONDecodeError(
            "No JSON object found in AI response",
            text,
            0,
        )

    json_text = text[start:end + 1]

    try:
        parsed = json.loads(json_text)
    except json.JSONDecodeError:
        raise

    if not isinstance(parsed, dict):
        raise json.JSONDecodeError(
            "Study plan JSON must be an object",
            json_text,
            0,
        )

    return parsed


def _validate_study_plan(plan):
    """
    AI generated study plan ka basic structure validate karta hai.
    """

    if not isinstance(plan, dict):
        raise ValueError("Study plan must be a JSON object.")

    required_keys = [
        "overview",
        "total_days",
        "daily_hours",
        "tip",
        "days",
    ]

    for key in required_keys:
        if key not in plan:
            raise ValueError(
                f"Study plan is missing required field: {key}"
            )

    if not isinstance(plan["days"], list):
        raise ValueError("Study plan 'days' must be a list.")

    if len(plan["days"]) != 7:
        raise ValueError(
            f"Study plan must contain exactly 7 days, got {len(plan['days'])}."
        )

    for index, day in enumerate(plan["days"], start=1):

        if not isinstance(day, dict):
            raise ValueError(
                f"Day {index} must be an object."
            )

        if "tasks" not in day:
            raise ValueError(
                f"Day {index} is missing tasks."
            )

        if not isinstance(day["tasks"], list):
            raise ValueError(
                f"Day {index} tasks must be a list."
            )

    return True


@router.post("/generate")
def generate_study_plan(req: StudyPlanRequest):

    try:
        # ---------------------------------------------------------
        # 1. Prepare subjects
        # ---------------------------------------------------------

        subjects = ", ".join(
            str(subject).strip()
            for subject in req.subjects
            if str(subject).strip()
        )

        weak = ", ".join(
            str(subject).strip()
            for subject in req.weak_subjects
            if str(subject).strip()
        )

        if not subjects:
            subjects = "All selected subjects"

        if not weak:
            weak = "None"

        # ---------------------------------------------------------
        # 2. Time preference
        # ---------------------------------------------------------

        time_pref_instruction = {
            "day": (
                "Student studies best during the DAY. "
                "Put difficult and new-topic blocks mainly between "
                "6 AM and 6 PM. Keep late evening lighter for revision "
                "and practice."
            ),

            "night": (
                "Student studies best at NIGHT. "
                "Put difficult and new-topic blocks mainly between "
                "6 PM and 1 AM. Keep morning and afternoon lighter "
                "for revision, practice, or rest."
            ),

            "flexible": (
                "Student has no strong time preference. "
                "Spread difficult topics naturally across the day "
                "and include revision throughout the day."
            ),
        }.get(
            str(req.study_time_preference).lower().strip(),
            (
                "Student has no strong time preference. "
                "Spread difficult topics naturally across the day."
            ),
        )

        # ---------------------------------------------------------
        # 3. Language
        # ---------------------------------------------------------

        language_instruction = {
            "english": "Generate the study plan in English.",
            "en": "Generate the study plan in English.",
            "hindi": "Generate the study plan in Hindi.",
            "hi": "Generate the study plan in Hindi.",
            "hinglish": (
                "Generate the study plan in natural Hinglish "
                "(Hindi written using English/Roman script)."
            ),
        }.get(
            str(req.language).lower().strip(),
            f"Generate the study plan in {req.language}.",
        )

        # ---------------------------------------------------------
        # 4. AI prompt
        # ---------------------------------------------------------

        question = f"""
You are an expert study planner for Indian competitive exams.

Student Name: {req.name}
Target Exam: {req.exam}
Exam Date: {req.exam_date}
Subjects: {subjects}
Weak Subjects: {weak}
Daily Study Hours: {req.daily_hours}
Preferred Study Time: {req.study_time_preference}

TIME PREFERENCE:
{time_pref_instruction}

LANGUAGE:
{language_instruction}

Create a detailed 7-day study plan.

VERY IMPORTANT:
Return ONLY ONE valid JSON object.

Do NOT return:
- Markdown
- ```json
- ``` 
- Explanation outside JSON
- Any text before JSON
- Any text after JSON

The JSON MUST follow this exact structure:

{{
  "overview": "2-3 line overview of the plan",
  "total_days": 7,
  "daily_hours": {req.daily_hours},
  "tip": "One important study tip for this exam",
  "days": [
    {{
      "day": 1,
      "date_label": "Day 1",
      "focus": "Main focus topic for the day",
      "tasks": [
        {{
          "time": "6:00 AM - 8:00 AM",
          "subject": "Physics",
          "topic": "Kinematics revision",
          "type": "study",
          "duration": "2 hours"
        }},
        {{
          "time": "8:00 AM - 8:15 AM",
          "subject": "Break",
          "topic": "Short break",
          "type": "break",
          "duration": "15 mins"
        }},
        {{
          "time": "8:15 AM - 10:15 AM",
          "subject": "Chemistry",
          "topic": "Organic reactions practice",
          "type": "practice",
          "duration": "2 hours"
        }}
      ],
      "revision": "What to revise today",
      "motivation": "Short motivational message for the day"
    }}
  ]
}}

CRITICAL RULES:

1. Generate exactly 7 days.

2. Every day MUST contain a tasks array.

3. Study-task durations, excluding breaks, MUST total EXACTLY
   {req.daily_hours} hours every day.

4. Break durations do NOT count toward study hours.

5. Add a 10-15 minute break after approximately every
   2 hours of continuous study.

6. Weak subjects ({weak}) should receive proportionally more
   study time.

7. Include revision every day.

8. Follow this time preference exactly:

{time_pref_instruction}

9. Topics must be relevant to {req.exam}.

10. Use the selected subjects:
    {subjects}

11. The final response MUST be valid JSON.

12. Return ONLY the JSON object.
"""

        # ---------------------------------------------------------
        # 5. AI call
        # ---------------------------------------------------------

        result = ask_raxx_ai(
            question=question,
            feature="studyplan",
            language=req.language,
            board=req.board,
            grade=req.grade,
        )

        # ---------------------------------------------------------
        # 6. Validate helper response
        # ---------------------------------------------------------

        print(
            f"[STUDYPLAN] AI result type: {type(result)}",
            flush=True,
        )

        if not isinstance(result, dict):
            print(
                f"[STUDYPLAN] Invalid helper result: {result}",
                flush=True,
            )

            raise HTTPException(
                status_code=500,
                detail="AI helper returned an invalid response."
            )

        if not result.get("success", False):

            error_message = result.get(
                "error",
                "Study plan generation failed."
            )

            print(
                f"[STUDYPLAN AI ERROR] {error_message}",
                flush=True,
            )

            raise HTTPException(
                status_code=500,
                detail=str(error_message),
            )

        # ---------------------------------------------------------
        # 7. Get AI answer safely
        # ---------------------------------------------------------

        response_text = result.get("answer", "")

        if response_text is None:
            response_text = ""

        if not isinstance(response_text, str):
            response_text = str(response_text)

        response_text = response_text.strip()

        print(
            f"[STUDYPLAN] Response length: {len(response_text)}",
            flush=True,
        )

        print(
            f"[STUDYPLAN] AI response:\n{response_text}",
            flush=True,
        )

        if not response_text:
            raise HTTPException(
                status_code=500,
                detail="AI returned an empty study plan."
            )

        # ---------------------------------------------------------
        # 8. Extract JSON
        # ---------------------------------------------------------

        try:
            plan = _extract_json_object(response_text)

        except json.JSONDecodeError as e:

            print(
                f"[STUDYPLAN JSON ERROR] {str(e)}",
                flush=True,
            )

            raise HTTPException(
                status_code=500,
                detail=(
                    "AI returned invalid study plan JSON. "
                    "Please try again."
                ),
            )

        # ---------------------------------------------------------
        # 9. Validate JSON structure
        # ---------------------------------------------------------

        try:
            _validate_study_plan(plan)

        except ValueError as e:

            print(
                f"[STUDYPLAN VALIDATION ERROR] {str(e)}",
                flush=True,
            )

            raise HTTPException(
                status_code=500,
                detail=str(e),
            )

        # ---------------------------------------------------------
        # 10. Success response
        # ---------------------------------------------------------

        return {
            "status": "success",
            "exam": req.exam,
            "exam_date": req.exam_date,
            "plan": plan,
            "cache_read": bool(result.get("cache_read", False)),
            "tokens_used": result.get("tokens_used", 0),
        }

    # -------------------------------------------------------------
    # FastAPI errors
    # -------------------------------------------------------------

    except HTTPException:
        raise

    # -------------------------------------------------------------
    # Unexpected errors
    # -------------------------------------------------------------

    except Exception as e:

        print(
            f"[STUDYPLAN ERROR] {type(e).__name__}: {str(e)}",
            flush=True,
        )

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )