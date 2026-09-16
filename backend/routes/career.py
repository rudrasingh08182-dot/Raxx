from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from utils.gemini_helper import ask_raxx_ai
import json

router = APIRouter()

class CareerRequest(BaseModel):
    student_name: str
    board: str
    class_level: str
    marks: dict
    interests: List[str]
    language: str = "English"

@router.post("/suggest")
async def suggest_careers(data: CareerRequest):
    try:
        question = f"""You are an expert Indian career counselor. A student needs career guidance.

Student Profile:
- Name: {data.student_name}
- Board: {data.board}
- Class: {data.class_level}
- Subject Marks: {json.dumps(data.marks)}
- Interests: {', '.join(data.interests)}
- Language preference: {data.language}

Based on this profile, suggest exactly 4 career paths that are realistic and well-suited.

Respond ONLY in this exact JSON format, no extra text:
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
        "Step 1 - Right now",
        "Step 2 - After Class 12",
        "Step 3 - During graduation",
        "Step 4 - First job",
        "Step 5 - 5 years goal"
      ]
    }}
  ]
}}"""

        # gemini_helper se call karo — caching automatic!
        result = ask_raxx_ai(
            question=question,
            feature="career",
            language=data.language,
            board=data.board,
            grade=data.class_level,
        )

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        import re
        raw = result["answer"].strip()
        match = re.search(r'\{.*\}', raw, re.DOTALL)
        if not match:
            raise json.JSONDecodeError("No JSON object found in response", raw, 0)
        data_result = json.loads(match.group(0))

        return {
            "success": True,
            "data": data_result,
            "cache_read": result["cache_read"],
            "tokens_used": result["tokens_used"],
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI response parse error. Try again.")
    except HTTPException:
        raise
    except Exception as e:
        import traceback, sys
        traceback.print_exc(file=sys.stderr)
        sys.stderr.flush()
        raise HTTPException(status_code=500, detail=f"{type(e).__name__}: {str(e)}")