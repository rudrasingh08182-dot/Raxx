from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.gemini_helper import ask_raxx_ai
import json

router = APIRouter()

class ScholarshipRequest(BaseModel):
    name: str
    class_level: str
    course: str
    category: str
    state: str
    income: int
    marks: float
    gender: str
    religion: str = "any"

@router.post("/scholarship/find")
async def find_scholarships(req: ScholarshipRequest):
    try:
        question = f"""Student Profile:
- Name: {req.name}
- Class/Level: {req.class_level}
- Course: {req.course}
- Category: {req.category}
- State: {req.state}
- Annual Family Income: Rs.{req.income}
- Marks/Percentage: {req.marks}%
- Gender: {req.gender}
- Religion: {req.religion}

Find 10 real Indian scholarships this student is eligible for.
Include:
- Central govt schemes (NSP, PM schemes)
- State govt scholarships for {req.state}
- Ministry specific scholarships
- Merit based scholarships if marks are good
- Category specific (SC/ST/OBC/Minority/General)
- Gender specific if applicable

For each scholarship provide REAL and ACCURATE information only.
Official apply links must be real working URLs.

Respond in JSON only — no extra text:
{{
    "scholarships": [
        {{
            "name": "<exact scholarship name>",
            "provider": "<ministry or state govt name>",
            "amount": "<exact amount per year>",
            "eligibility": "<why this student is eligible>",
            "deadline": "<approximate deadline month year>",
            "documents_needed": ["<doc1>", "<doc2>", "<doc3>"],
            "apply_link": "<official URL>",
            "difficulty": "<Easy|Medium|Competitive>",
            "category_type": "<Central|State|Merit|Category>"
        }}
    ],
    "total_found": <number>,
    "total_potential_amount": "<total amount student can get if gets all>",
    "priority_scholarship": "<name of best scholarship to apply first>",
    "ai_tip": "<personalized advice for this student in simple Hindi/English>"
}}"""

        # gemini_helper se call karo — caching automatic!
        result = ask_raxx_ai(
            question=question,
            feature="scholarship",
            language="english",
            board=req.class_level,
        )

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        # JSON parse karo
        text = result["answer"].replace("```json", "").replace("```", "").strip()
        data = json.loads(text)

        return {
            "success": True,
            "scholarships": data["scholarships"],
            "total_found": data["total_found"],
            "total_potential_amount": data["total_potential_amount"],
            "priority_scholarship": data["priority_scholarship"],
            "ai_tip": data["ai_tip"],
            "cache_read": result["cache_read"],
            "tokens_used": result["tokens_used"],
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse scholarships. Please try again.")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))