from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.gemini_helper import ask_raxx_ai
import json

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

@router.post("/generate")
def generate_study_plan(req: StudyPlanRequest):
    try:
        weak = ", ".join(req.weak_subjects) if req.weak_subjects else "None"
        subjects = ", ".join(req.subjects)

        time_pref_instruction = {
            "day": "Student studies best during the DAY. Put toughest/new-topic blocks in the morning and afternoon (6 AM - 6 PM window). Keep evening slots light — revision, practice, or wind-down only.",
            "night": "Student studies best at NIGHT. Put toughest/new-topic blocks in the evening and night (6 PM - 1 AM window). Morning/afternoon slots should stay light — revision, practice, or rest, since the student prefers to start slow.",
            "flexible": "Student has no strong time preference. Spread tough topics across morning and evening naturally, with revision distributed through the day.",
        }.get(req.study_time_preference, "Student has no strong time preference. Spread tough topics across morning and evening naturally.")

        question = f"""You are an expert study planner for Indian competitive exams.

Student Name: {req.name}
Target Exam: {req.exam}
Exam Date: {req.exam_date}
Subjects: {subjects}
Weak Subjects: {weak}
Daily Study Hours: {req.daily_hours} hours
Preferred Study Time: {req.study_time_preference} — {time_pref_instruction}

Create a detailed 7-day study plan. Return ONLY valid JSON, no extra text.

{{
  "overview": "2-3 line motivational overview of the plan",
  "total_days": 7,
  "daily_hours": {req.daily_hours},
  "tip": "One important study tip for this exam",
  "days": [
    {{
      "day": 1,
      "date_label": "Day 1 — Monday",
      "focus": "Main focus topic for the day",
      "tasks": [
        {{ "time": "6:00 AM - 8:00 AM", "subject": "Physics", "topic": "Kinematics revision", "type": "study", "duration": "2 hours" }},
        {{ "time": "8:00 AM - 8:15 AM", "subject": "Break", "topic": "Short break", "type": "break", "duration": "15 mins" }},
        {{ "time": "8:15 AM - 10:15 AM", "subject": "Chemistry", "topic": "Organic reactions practice", "type": "practice", "duration": "2 hours" }}
      ],
      "revision": "What to revise today",
      "motivation": "Short motivational quote for the day"
    }}
  ]
}}

CRITICAL RULES — follow these exactly, no exceptions:
1. The tasks array's "duration" fields, when SUMMED TOGETHER (excluding breaks), MUST add up to EXACTLY {req.daily_hours} hours — every single day, including Day 7. Not less, not more.
2. This applies even to lighter/revision-focused days — break the {req.daily_hours} hours into multiple smaller blocks across different subjects/topics instead of one single block.
3. Weak subjects ({weak}) should get proportionally more of the {req.daily_hours} hours than non-weak subjects.
4. Add a 10-15 min break after every ~2 hours of continuous study (breaks don't count toward the {req.daily_hours} total).
5. Time-of-day scheduling — IMPORTANT: {time_pref_instruction}
6. Include revision time daily.
7. Return ONLY the JSON object — no markdown, no explanation."""

        # gemini_helper se call karo — caching automatic!
        result = ask_raxx_ai(
            question=question,
            feature="studyplan",
            language=req.language,
            board=req.board,
            grade=req.grade,
        )

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        # JSON parse karo
        response_text = result["answer"].strip()

        # Markdown remove karo agar ho
        if response_text.startswith("```"):
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"):
                response_text = response_text[4:]

        plan = json.loads(response_text)

        return {
            "status": "success",
            "exam": req.exam,
            "exam_date": req.exam_date,
            "plan": plan,
            "cache_read": result["cache_read"],
            "tokens_used": result["tokens_used"],
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse study plan. Please try again.")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))