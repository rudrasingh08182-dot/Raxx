from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.gemini_helper import ask_raxx_ai
import json
import re

router = APIRouter()


class StudyPlanRequest(BaseModel):
    name: str
    exam: str
    exam_date: str
    subjects: list
    daily_hours: int = 6
    study_time_preference: str = "day"
    weak_subjects: list = []
    language: str = "english"
    board: str = "CBSE"
    grade: str = "12"


def _extract_json_object(response_text: str):
    text = response_text.strip()

    # Remove ```json ... ```
    text = re.sub(
        r"^```(?:json)?\s*",
        "",
        text,
        flags=re.IGNORECASE
    )

    text = re.sub(
        r"\s*```$",
        "",
        text
    )

    text = text.strip()

    # Direct JSON
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # JSON embedded inside extra text
    start = text.find("{")
    end = text.rfind("}")

    if start == -1 or end == -1 or end <= start:
        raise json.JSONDecodeError(
            "No valid JSON object found",
            text,
            0
        )

    return json.loads(text[start:end + 1])


@router.post("/generate")
def generate_study_plan(req: StudyPlanRequest):

    try:
        weak = (
            ", ".join(req.weak_subjects)
            if req.weak_subjects
            else "None"
        )

        subjects = ", ".join(req.subjects)

        time_pref_instruction = {
            "day": (
                "Student studies best during the DAY. "
                "Put difficult/new topics mainly between 6 AM and 6 PM. "
                "Keep evening work lighter."
            ),

            "night": (
                "Student studies best at NIGHT. "
                "Put difficult/new topics mainly between 6 PM and 1 AM. "
                "Keep morning and afternoon work lighter."
            ),

            "flexible": (
                "Student has no strong time preference. "
                "Spread difficult topics naturally across the day."
            ),
        }.get(
            req.study_time_preference,
            "Student has no strong time preference. "
            "Spread difficult topics naturally across the day."
        )

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
Answer in {req.language}.

Create a detailed 7-day study plan.

RETURN ONLY VALID JSON.

Do NOT use markdown.
Do NOT use ```json.
Do NOT add any explanation before or after the JSON.

The JSON MUST follow this structure:

{{
  "overview": "2-3 line overview of the plan",
  "total_days": 7,
  "daily_hours": {req.daily_hours},
  "tip": "One important study tip for this exam",
  "days": [
    {{
      "day": 1,
      "date_label": "Day 1",
      "focus": "Main focus topic",
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
        }}
      ],
      "revision": "What to revise today",
      "motivation": "Short motivational message"
    }}
  ]
}}

RULES:

1. Generate exactly 7 days.
2. Every day must contain tasks.
3. Study-task durations excluding breaks MUST total exactly {req.daily_hours} hours every day.
4. Break durations do NOT count toward study hours.
5. Add 10-15 minute breaks after approximately every 2 hours.
6. Weak subjects ({weak}) should receive proportionally more time.
7. Include revision every day.
8. Follow the time preference exactly.
9. Keep topics relevant to {req.exam}.
10. Return ONLY the JSON object.
"""

        # -----------------------------------------
        # AI CALL
        # -----------------------------------------

        result = ask_raxx_ai(
            question=question,
            feature="studyplan",
            language=req.language,
            board=req.board,
            grade=req.grade,
        )

        print(
            f"[STUDYPLAN] AI result type: {type(result)}",
            flush=True
        )

        # -----------------------------------------
        # IMPORTANT:
        # ask_raxx_ai can return either:
        #
        # 1. dict:
        #    {"success": True, "answer": "..."}
        #
        # OR
        #
        # 2. raw string:
        #    "{ ...JSON... }"
        #
        # Handle BOTH.
        # -----------------------------------------

        cache_read = False
        tokens_used = 0

        if isinstance(result, dict):

            if not result.get("success", False):
                error_message = result.get(
                    "error",
                    "AI generation failed."
                )

                raise HTTPException(
                    status_code=500,
                    detail=error_message
                )

            response_text = str(
                result.get("answer", "")
            ).strip()

            cache_read = result.get(
                "cache_read",
                False
            )

            tokens_used = result.get(
                "tokens_used",
                0
            )

        elif isinstance(result, str):

            # Current helper raw-string response
            response_text = result.strip()

        else:

            print(
                f"[STUDYPLAN] Unexpected helper result: {result}",
                flush=True
            )

            raise HTTPException(
                status_code=500,
                detail="AI helper returned an unsupported response."
            )

        # -----------------------------------------
        # EMPTY RESPONSE CHECK
        # -----------------------------------------

        if not response_text:

            raise HTTPException(
                status_code=500,
                detail="AI returned an empty study plan."
            )

        print(
            f"[STUDYPLAN] Response length: {len(response_text)}",
            flush=True
        )

        print(
            f"[STUDYPLAN] AI response:\n{response_text}",
            flush=True
        )

        # -----------------------------------------
        # PARSE JSON
        # -----------------------------------------

        try:

            plan = _extract_json_object(
                response_text
            )

        except json.JSONDecodeError as e:

            print(
                f"[STUDYPLAN JSON ERROR] {str(e)}",
                flush=True
            )

            raise HTTPException(
                status_code=500,
                detail="AI returned invalid study plan JSON. Please try again."
            )

        # -----------------------------------------
        # BASIC VALIDATION
        # -----------------------------------------

        if not isinstance(plan, dict):

            raise HTTPException(
                status_code=500,
                detail="Study plan must be a JSON object."
            )

        if "days" not in plan:

            raise HTTPException(
                status_code=500,
                detail="Study plan response is missing days."
            )

        if not isinstance(plan["days"], list):

            raise HTTPException(
                status_code=500,
                detail="Study plan days must be a list."
            )

        if len(plan["days"]) != 7:

            raise HTTPException(
                status_code=500,
                detail=(
                    f"AI returned {len(plan['days'])} days "
                    "instead of exactly 7."
                )
            )

        # -----------------------------------------
        # SUCCESS
        # -----------------------------------------

        return {
            "status": "success",
            "exam": req.exam,
            "exam_date": req.exam_date,
            "plan": plan,
            "cache_read": cache_read,
            "tokens_used": tokens_used,
        }

    except HTTPException:
        raise

    except Exception as e:

        print(
            f"[STUDYPLAN ERROR] {str(e)}",
            flush=True
        )

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )