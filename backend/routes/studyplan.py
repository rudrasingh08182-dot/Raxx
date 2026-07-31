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
    weak_subjects: list = []
    language: str = "english"
    board: str = "CBSE"
    grade: str = "12"

@router.post("/generate")
def generate_study_plan(req: StudyPlanRequest):
    try:
        weak = ", ".join(req.weak_subjects) if req.weak_subjects else "None"
        subjects = ", ".join(req.subjects)

        question = f"""You are an expert study planner for Indian competitive exams.

Student Name: {req.name}
Target Exam: {req.exam}
Exam Date: {req.exam_date}
Subjects: {subjects}
Weak Subjects: {weak}
Daily Study Hours: {req.daily_hours} hours

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
        {{
          "time": "6:00 AM - 8:00 AM",
          "subject": "Subject name",
          "topic": "Topic to study",
          "type": "study",
          "duration": "2 hours"
        }}
      ],
      "revision": "What to revise today",
      "motivation": "Short motivational quote for the day"
    }}
  ]
}}

Make sure:
- Weak subjects get more time
- Include breaks (every 2 hours)
- Include revision time daily
- Morning = tough subjects, Evening = revision
- Return ONLY the JSON object"""

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