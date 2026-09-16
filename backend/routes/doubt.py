from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from utils.gemini_helper import ask_raxx_ai, ask_raxx_ai_stream
from utils.gemini_helper import ask_raxx_ai

router = APIRouter()

class DoubtRequest(BaseModel):
    question: str
    subject: str = ""
    language: str = "hindi"
    student_id: str = ""
    board: str = "CBSE"
    grade: str = "12"

@router.post("/ask")
def solve_doubt(doubt: DoubtRequest):
    try:
        # Subject context add karo question mein
        question = doubt.question
        if doubt.subject:
            question = f"Subject: {doubt.subject}\n\nDoubt: {doubt.question}"

        # gemini_helper se call karo — ab RAG-aware (doubt feature ke liye) + caching
        result = ask_raxx_ai(
            question=question,
            feature="doubt",
            language=doubt.language,
            board=doubt.board,
            grade=doubt.grade,
            subject=doubt.subject,
        )

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        return {
            "status": "success",
            "question": doubt.question,
            "answer": result["answer"],
            "subject": doubt.subject,
            "language": doubt.language,
            "grounded": result.get("grounded", False),  # true = answer used your knowledge base
            "cache_read": result["cache_read"],
            "tokens_used": result["tokens_used"],
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/ask-stream")
def solve_doubt_stream(doubt: DoubtRequest):
    question = doubt.question
    if doubt.subject:
        question = f"Subject: {doubt.subject}\n\nDoubt: {doubt.question}"

    def event_generator():
        for chunk in ask_raxx_ai_stream(
            question=question,
            feature="doubt",
            language=doubt.language,
            board=doubt.board,
            grade=doubt.grade,
            subject=doubt.subject,
        ):
            yield chunk

    return StreamingResponse(event_generator(), media_type="text/plain")
    