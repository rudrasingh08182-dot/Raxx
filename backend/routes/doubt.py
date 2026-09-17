from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from utils.gemini_helper import ask_raxx_ai, ask_raxx_ai_stream

router = APIRouter()

class HistoryTurn(BaseModel):
    question: str = ""
    answer: str = ""

class DoubtRequest(BaseModel):
    question: str
    subject: str = ""
    language: str = "hindi"
    student_id: str = ""
    board: str = "CBSE"
    grade: str = "12"
    history: list[HistoryTurn] = []

@router.post("/ask")
def solve_doubt(doubt: DoubtRequest):
    try:
        question = doubt.question
        if doubt.subject:
            question = f"Subject: {doubt.subject}\n\nDoubt: {doubt.question}"

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
            "grounded": result.get("grounded", False),
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

    history_dicts = [{"question": h.question, "answer": h.answer} for h in doubt.history]

    def event_generator():
        for chunk in ask_raxx_ai_stream(
            question=question,
            feature="doubt",
            language=doubt.language,
            board=doubt.board,
            grade=doubt.grade,
            subject=doubt.subject,
            history=history_dicts,
        ):
            yield chunk

    return StreamingResponse(
        event_generator(),
        media_type="text/plain",
        headers={
            "X-Accel-Buffering": "no",   # Render/Nginx proxy buffering off
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )