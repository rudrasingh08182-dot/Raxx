from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.gemini_helper import ask_raxx_ai
import json
import re

router = APIRouter()

class MockTestRequest(BaseModel):
    exam: str
    subject: str
    topic: str = ""
    num_questions: int = 10
    difficulty: str = "medium"
    language: str = "english"
    board: str = "CBSE"
    grade: str = "12"

class SubmitTestRequest(BaseModel):
    questions: list
    answers: dict

@router.post("/generate")
def generate_test(req: MockTestRequest):
    try:
        question = f"""Generate {req.num_questions} multiple choice questions for Indian students.

Exam: {req.exam}
Subject: {req.subject}
Topic: {req.topic if req.topic else "Mixed topics"}
Difficulty: {req.difficulty}
Language: {req.language}

IMPORTANT: Return ONLY a valid JSON array. No extra text before or after.
Each question must follow this exact format:
[
  {{
    "id": 1,
    "question": "Question text here?",
    "options": {{
      "A": "Option A text",
      "B": "Option B text",
      "C": "Option C text",
      "D": "Option D text"
    }},
    "correct": "A",
    "explanation": "Brief explanation of why A is correct"
  }}
]

Make questions exam-relevant, factually accurate, and at {req.difficulty} difficulty level.
Return ONLY the JSON array, nothing else."""

        # gemini_helper se call karo — caching automatic!
        result = ask_raxx_ai(
            question=question,
            feature="mocktest",
            language=req.language,
            board=req.board,
            grade=req.grade,
        )

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        # JSON parse karo
        response_text = result["answer"].strip()

        # JSON array nikaalo, chahe model ne aage-peeche kuch bhi extra text likha ho
        match = re.search(r'\[.*\]', response_text, re.DOTALL)
        if not match:
            raise json.JSONDecodeError("No JSON array found in response", response_text, 0)

        questions = json.loads(match.group(0))

        return {
            "status": "success",
            "exam": req.exam,
            "subject": req.subject,
            "topic": req.topic,
            "difficulty": req.difficulty,
            "total_questions": len(questions),
            "questions": questions,
            "cache_read": result["cache_read"],
            "tokens_used": result["tokens_used"],
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse questions. Please try again.")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/submit")
def submit_test(req: SubmitTestRequest):
    try:
        score = 0
        results = []

        for q in req.questions:
            q_id = str(q["id"])
            student_answer = req.answers.get(q_id, "")
            correct_answer = q["correct"]
            is_correct = student_answer == correct_answer

            if is_correct:
                score += 1

            results.append({
                "id": q["id"],
                "question": q["question"],
                "student_answer": student_answer,
                "correct_answer": correct_answer,
                "is_correct": is_correct,
                "explanation": q.get("explanation", "")
            })

        total = len(req.questions)
        percentage = round((score / total) * 100) if total > 0 else 0

        if percentage >= 80:
            grade = "Excellent! 🏆"
            color = "green"
        elif percentage >= 60:
            grade = "Good! 👍"
            color = "blue"
        elif percentage >= 40:
            grade = "Average 📚"
            color = "yellow"
        else:
            grade = "Need More Practice 💪"
            color = "red"

        return {
            "status": "success",
            "score": score,
            "total": total,
            "percentage": percentage,
            "grade": grade,
            "color": color,
            "results": results,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))