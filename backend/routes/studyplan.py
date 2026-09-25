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
    study_time_preference: str = "day"  # "day" | "night" | "flexible"
    weak_subjects: list = []
    language: str = "english"
    board: str = "CBSE"
    grade: str = "12"


def _extract_json_object(response_text: str):
    """
    Model response se actual JSON object safely extract karta hai.
    ```json ... ``` aur extra text dono handle karega.
    """

    text = response_text.strip()

    # Markdown code fence remove karo
    text = re.sub(r"^```(?:json)?\s*", "", text, flags=re.IGNORECASE)
    text = re.sub(r"\s*```$", "", text)

    text = text.strip()

    # Pehle direct JSON try karo
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # Agar extra text hai to first { se last } tak JSON nikalo
    start = text.find("{")
    end = text.rfind("}")

    if start == -1 or end == -1 or end <= start:
        raise json.JSONDecodeError(
            "No valid JSON object found",
            text,
            0,
        )

    json_text = text[start:end + 1]

    return json.loads(json_text)


@router.post("/generate")
def generate_study_plan(req: StudyPlanRequest):

    try:
        weak = ", ".join(req.weak_subjects) if req.weak_subjects else "None"
        subjects = ", ".join(req.subjects)

        time_pref_instruction = {
            "day": (
                "Student studies best during the DAY. "
                "Put toughest/new-topic blocks in the morning and afternoon "
                "(6 AM - 6 PM window). Keep evening slots light — revision, "
                "practice, or wind-down only."
            ),
            "night": (
                "Student studies best at NIGHT. "
                "Put toughest/new-topic blocks in the evening and night "
                "(6 PM - 1 AM window). Morning/afternoon slots should stay "
                "light — revision, practice, or rest."
            ),
            "flexible": (
                "Student has no strong time preference. "
                "Spread tough topics across morning and evening naturally, "
                "with revision distributed through the day."
            ),
        }.get(
            req.study_time_preference,
            "Student has no strong time preference. "
            "Spread tough topics naturally across the day."
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

IMPORTANT:
Return ONLY one valid JSON object.
Do NOT use markdown.
Do NOT use ```json.
Do NOT add any explanation before or after the JSON.

The JSON MUST follow exactly this structure:

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
2. Every day must contain tasks.
3. Study-task durations, excluding breaks, must total EXACTLY {req.daily_hours} hours.
4. Break durations do NOT count toward daily study hours.
5. Add a 10-15 minute break after approximately every 2 hours of continuous study.
6. Weak subjects ({weak}) should receive proportionally more study time.
7. Include revision every day.
8. Follow this time preference exactly:

{time_pref_instruction}

9. Keep questions/topics relevant to {req.exam}.
10. Return ONLY the JSON object.
"""

        # AI call
        result = ask_raxx_ai(
            question=question,
            feature="studyplan",
            language=req.language,
            board=req.board,
            grade=req.grade,
        )

        if not result["success"]:
            raise HTTPException(
                status_code=500,
                detail=result["error"]
            )

        response_text = result["answer"].strip()

        # Debug logs — Render me exact response dekhne ke liye
        print(
            f"[STUDYPLAN] Response length: {len(response_text)}",
            flush=True
        )

        print(
            f"[STUDYPLAN] AI response:\n{response_text}",
            flush=True
        )

        # JSON safely extract karo
        try:
            plan = _extract_json_object(response_text)

        except json.JSONDecodeError as e:
            print(
                f"[STUDYPLAN JSON ERROR] {str(e)}",
                flush=True
            )

            raise HTTPException(
                status_code=500,
                detail="AI returned invalid study plan JSON. Please try again."
            )

        # Basic validation
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

        return {
            "status": "success",
            "exam": req.exam,
            "exam_date": req.exam_date,
            "plan": plan,
            "cache_read": result["cache_read"],
            "tokens_used": result["tokens_used"],
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