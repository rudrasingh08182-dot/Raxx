from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from utils.gemini_helper import ask_raxx_ai, ask_raxx_ai_stream
from utils.file_reader import extract_file_content

router = APIRouter()


class HistoryTurn(BaseModel):
    question: str = ""
    answer: str = ""


class DoubtRequest(BaseModel):
    question: str = ""
    subject: str = ""
    language: str = "hindi"
    student_id: str = ""
    board: str = "CBSE"
    grade: str = "12"
    history: list[HistoryTurn] = []
    file_base64: Optional[str] = None
    file_mime: Optional[str] = None
    file_name: Optional[str] = None


def _prepare_question(doubt: DoubtRequest):
    """Returns (final_question, error). File ho to uska text nikaal ke question mein jodta hai."""
    file_text = ""
    if doubt.file_base64:
        file_text, err = extract_file_content(doubt.file_base64, doubt.file_mime or "")
        if err:
            return None, err

    parts = []
    if doubt.subject:
        parts.append(f"Subject: {doubt.subject}")

    typed = (doubt.question or "").strip()
    parts.append(f"Doubt: {typed}" if typed else "Doubt: Explain/solve the question(s) in the attached file.")

    # File content question ke BAAD rakha hai, taaki RAG search query
    # (jo shuru ke characters se banti hai) mein student ka doubt pehle aaye
    if file_text:
        label = doubt.file_name or "attached file"
        parts.append(f"ATTACHED FILE CONTENT ({label}):\n{file_text}")

    return "\n\n".join(parts), None


@router.post("/ask")
def solve_doubt(doubt: DoubtRequest):
    try:
        question, err = _prepare_question(doubt)
        if err:
            raise HTTPException(status_code=400, detail=err)

        answer = ask_raxx_ai(
            question=question,
            feature="doubt",
            language=doubt.language,
            board=doubt.board,
            grade=doubt.grade,
            subject=doubt.subject,
        )

        if not answer:
            raise HTTPException(status_code=500, detail="AI se empty response mila. Try again!")

        return {
            "status": "success",
            "question": doubt.question,
            "answer": answer,
            "subject": doubt.subject,
            "language": doubt.language,
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/ask-stream")
def solve_doubt_stream(doubt: DoubtRequest):
    history_dicts = [{"question": h.question, "answer": h.answer} for h in doubt.history]

    def event_generator():
        question, err = _prepare_question(doubt)
        if err:
            yield f"⚠️ {err}"
            return

        try:
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
        except Exception as e:
            print(f"[doubt/ask-stream] failed: {type(e).__name__}: {e}", flush=True)
            yield "\n\n⚠️ RAXX AI abhi thoda busy hai. Please thodi der baad dobara try karo."

    return StreamingResponse(
        event_generator(),
        media_type="text/plain",
        headers={
            "X-Accel-Buffering": "no",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )