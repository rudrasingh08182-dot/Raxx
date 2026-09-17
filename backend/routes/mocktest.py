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

BATCH_SIZE = 5  # 5 questions reliably kaam karta hai; isse zyada mangwane pe
                # NVIDIA/Nemotron ka response beech mein hi cut ho raha tha


def _build_mocktest_prompt(exam, subject, topic, num_questions, difficulty, language, start_id):
    return f"""Generate {num_questions} multiple choice questions for Indian students.

Exam: {exam}
Subject: {subject}
Topic: {topic if topic else "Mixed topics"}
Difficulty: {difficulty}
Language: {language}

IMPORTANT: Return ONLY a valid JSON array. No extra text before or after.
Each question must follow this exact format:
[
  {{
    "id": {start_id},
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

Make questions exam-relevant, factually accurate, and at {difficulty} difficulty level.
IDs must start at {start_id} and increase by 1 for each question.
Return ONLY the JSON array, nothing else."""


def _parse_questions(response_text: str):
    response_text = response_text.strip()
    match = re.search(r'\[.*\]', response_text, re.DOTALL)
    if not match:
        raise json.JSONDecodeError("No JSON array found in response", response_text, 0)
    return json.loads(match.group(0))


@router.post("/generate")
def generate_test(req: MockTestRequest):
    try:
        all_questions = []
        total_tokens = 0
        remaining = req.num_questions
        next_id = 1

        # Bade requests (15-20 questions) ek hi API call mein NVIDIA ke liye
        # slow/unreliable ho rahe the — response beech mein hi truncate ho
        # raha tha. Isliye chhote batches (max 5) mein generate karke combine
        # karte hain, jo consistently kaam karta hai.
        while remaining > 0:
            batch_count = min(BATCH_SIZE, remaining)

            question_prompt = _build_mocktest_prompt(
                exam=req.exam,
                subject=req.subject,
                topic=req.topic,
                num_questions=batch_count,
                difficulty=req.difficulty,
                language=req.language,
                start_id=next_id,
            )

            result = ask_raxx_ai(
                question=question_prompt,
                feature="mocktest",
                language=req.language,
                board=req.board,
                grade=req.grade,
            )

            if not result["success"]:
                raise HTTPException(status_code=500, detail=result["error"])

            response_text = result["answer"].strip()

            try:
                batch_questions = _parse_questions(response_text)
            except json.JSONDecodeError:
                print(f"[MOCKTEST PARSE FAIL] Response length: {len(response_text)} chars", flush=True)
                print(f"[MOCKTEST PARSE FAIL] Full response:\n{response_text}", flush=True)
                raise HTTPException(status_code=500, detail="Failed to parse questions. Please try again.")

            # IDs ko batches ke beech continuous rakhne ke liye re-number karo
            for q in batch_questions:
                q["id"] = next_id
                next_id += 1

            all_questions.extend(batch_questions)
            total_tokens += result["tokens_used"]
            remaining -= batch_count

        return {
            "status": "success",
            "exam": req.exam,
            "subject": req.subject,
            "topic": req.topic,
            "difficulty": req.difficulty,
            "total_questions": len(all_questions),
            "questions": all_questions,
            "cache_read": False,
            "tokens_used": total_tokens,
        }

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