# backend/routes/mockinterview.py
# RAXX AI — Mock Interview System
# AI powered interview with company + role specific questions

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from supabase import create_client
from utils.gemini_helper import ask_raxx_ai
from utils.interview_retrieval import search_interview_questions
import os, json

router = APIRouter(prefix='/api/interview', tags=['mock-interview'])

supabase = create_client(
    os.getenv('SUPABASE_URL'),
    os.getenv('SUPABASE_ANON_KEY')
)

# ═══════════════════════════════════════
# COMPANIES & ROLES
# ═══════════════════════════════════════

COMPANIES = [
    "Google", "Microsoft", "Amazon", "Meta", "Apple",
    "Flipkart", "Zomato", "Swiggy", "Razorpay", "CRED",
    "TCS", "Infosys", "Wipro", "HCL", "Cognizant",
    "Capgemini", "Accenture"
]

ROLES = [
    "Software Engineer",
    "Frontend Engineer",
    "Backend Engineer",
    "Full Stack Engineer",
    "Data Analyst",
    "Data Engineer",
    "Data Scientist",
    "AI/ML Engineer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Cybersecurity Engineer",
    "Mobile Developer (Android/iOS)",
    "Product Manager",
    "QA Engineer",
    "System Design Engineer"
]

# ═══════════════════════════════════════
# MODELS
# ═══════════════════════════════════════

class StartInterview(BaseModel):
    student_id: str
    company: str
    role: str
    difficulty: str = "medium"

class SubmitAnswer(BaseModel):
    student_id: str
    session_id: str
    question: str
    answer: str
    company: str
    role: str
    question_number: int

class SaveSession(BaseModel):
    student_id: str
    company: str
    role: str
    total_questions: int
    score: int
    feedback: str

# ═══════════════════════════════════════
# ROUTE 1 — Get companies and roles list
# ═══════════════════════════════════════

@router.get('/options')
async def get_options():
    return {
        'companies': COMPANIES,
        'roles': ROLES
    }

# ═══════════════════════════════════════
# ROUTE 2 — Start interview session
# ═══════════════════════════════════════

@router.post('/start')
async def start_interview(data: StartInterview):
    try:
        difficulty_map = {
            "easy": "entry level fresher",
            "medium": "1-2 years experience",
            "hard": "3-5 years senior level"
        }

        # Uploaded interview-question bank se relevant reference questions
        # laao — pure semantic match, koi exact company/role filter nahi
        # (guides ke labels frontend ke dropdown se hubahu match nahi karte).
        # Poori tarah try/except mein — is feature ka fail hona poore
        # interview-start ko crash nahi karna chahiye, bas plain AI
        # questions ban jayenge bina reference ke.
        reference_block = ""
        try:
            retrieved = search_interview_questions(data.company, data.role, top_k=8)
            valid_rows = [r for r in retrieved if isinstance(r, dict) and r.get("question")]

            if len(valid_rows) < len(retrieved):
                print(f"[mockinterview] Skipped {len(retrieved) - len(valid_rows)} malformed retrieval row(s)", flush=True)

            if valid_rows:
                formatted = "\n\n".join(
                    f"Q: {r['question']}\nModel Answer Reference: {(r.get('model_answer') or '')[:500]}"
                    for r in valid_rows
                )
                reference_block = f"""

REFERENCE QUESTION BANK (real curated interview questions — use these as
inspiration/basis for at least 2-3 of the 5 questions you generate, adapted
to fit {data.company}/{data.role} naturally. Don't copy verbatim if it
doesn't fit the role, but prefer these over inventing generic ones):

{formatted}"""
        except Exception as e:
            print(f"[mockinterview] Retrieval augmentation failed (non-fatal): {e}", flush=True)
            reference_block = ""

        question = f"""You are an expert technical interviewer at {data.company}.
You are interviewing a candidate for the role of {data.role}.
Difficulty level: {difficulty_map.get(data.difficulty, 'medium')} position.
{reference_block}

Generate exactly 5 interview questions for this candidate. Mix of:
- Technical questions specific to {data.role}
- {data.company} culture and values based question
- Problem solving / scenario based question
- One HR/behavioral question

Return ONLY a JSON array with this exact format, no other text:
[
  {{
    "id": 1,
    "type": "technical",
    "question": "question text here",
    "hint": "what a good answer should cover",
    "difficulty": "easy/medium/hard"
  }},
  ...5 questions total
]"""

        # gemini_helper se call karo — caching automatic!
        result = ask_raxx_ai(
            question=question,
            feature="mocktest",
            language="english",
        )

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        raw = result["answer"].strip()

        # Clean JSON
        if "```json" in raw:
            raw = raw.split("```json")[1].split("```")[0].strip()
        elif "```" in raw:
            raw = raw.split("```")[1].split("```")[0].strip()

        questions = json.loads(raw)

        return {
            'success': True,
            'company': data.company,
            'role': data.role,
            'difficulty': data.difficulty,
            'total_questions': len(questions),
            'questions': questions,
            'cache_read': result["cache_read"],
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to generate questions. Try again!")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# ROUTE 3 — Evaluate student answer
# ═══════════════════════════════════════

@router.post('/evaluate')
async def evaluate_answer(data: SubmitAnswer):
    try:
        question = f"""You are a senior interviewer at {data.company} evaluating a {data.role} candidate.

Interview Question: {data.question}

Candidate's Answer: {data.answer}

Evaluate this answer and return ONLY a JSON object in this exact format, no other text:
{{
  "score": <number 0-10>,
  "rating": "<Excellent/Good/Average/Poor>",
  "what_was_good": "<what the candidate did well>",
  "what_was_missing": "<what was missing or could be improved>",
  "ideal_answer_points": "<key points a perfect answer should have covered>",
  "follow_up_question": "<one follow up question based on their answer>",
  "encouragement": "<one line motivational feedback in Hindi or English>"
}}"""

        # gemini_helper se call karo — caching automatic!
        result = ask_raxx_ai(
            question=question,
            feature="mocktest",
            language="english",
        )

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        raw = result["answer"].strip()

        if "```json" in raw:
            raw = raw.split("```json")[1].split("```")[0].strip()
        elif "```" in raw:
            raw = raw.split("```")[1].split("```")[0].strip()

        evaluation = json.loads(raw)

        return {
            'success': True,
            'question_number': data.question_number,
            'evaluation': evaluation,
            'cache_read': result["cache_read"],
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Evaluation failed. Try again!")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# ROUTE 4 — Generate final report
# ═══════════════════════════════════════

@router.post('/report')
async def generate_report(data: SaveSession):
    try:
        question = f"""You are a career coach reviewing a mock interview performance.

Candidate interviewed for: {data.role} at {data.company}
Total Questions: {data.total_questions}
Overall Score: {data.score}/10
Interview Summary: {data.feedback}

Generate a detailed final report. Return ONLY JSON in this exact format:
{{
  "overall_rating": "<Excellent/Good/Average/Needs Work>",
  "hire_recommendation": "<Strong Hire/Hire/Maybe/Not Yet>",
  "top_strengths": ["strength1", "strength2", "strength3"],
  "areas_to_improve": ["area1", "area2", "area3"],
  "study_topics": ["topic1", "topic2", "topic3"],
  "next_steps": "<what to do in next 2 weeks to improve>",
  "motivational_message": "<encouraging message in Hindi/English mix>"
}}"""

        # gemini_helper se call karo — caching automatic!
        result = ask_raxx_ai(
            question=question,
            feature="mocktest",
            language="english",
        )

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        raw = result["answer"].strip()

        if "```json" in raw:
            raw = raw.split("```json")[1].split("```")[0].strip()
        elif "```" in raw:
            raw = raw.split("```")[1].split("```")[0].strip()

        report = json.loads(raw)

        # Supabase mein save karo
        supabase.table('mock_tests').insert({
            'student_id': data.student_id,
            'exam_type': f'Mock Interview - {data.role} at {data.company}',
            'score': data.score,
            'total': 10,
            'answers_json': json.dumps({
                'company': data.company,
                'role': data.role,
                'report': report
            })
        }).execute()

        return {
            'success': True,
            'score': data.score,
            'report': report,
            'cache_read': result["cache_read"],
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Report generation failed!")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# ROUTE 5 — Get interview history
# (AI nahi — Supabase se direct fetch)
# ═══════════════════════════════════════

@router.get('/history/{student_id}')
async def get_history(student_id: str):
    try:
        result = supabase.table('mock_tests')\
            .select('*')\
            .eq('student_id', student_id)\
            .like('exam_type', 'Mock Interview%')\
            .order('created_at', desc=True)\
            .limit(10)\
            .execute()

        return {
            'success': True,
            'history': result.data,
            'total': len(result.data)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))