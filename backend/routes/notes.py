from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from utils.gemini_helper import ask_raxx_ai, ask_raxx_ai_stream
import io
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor

router = APIRouter()

class NotesPdfRequest(BaseModel):
    subject: str
    chapter: str
    notes_type: str = "detailed"
    notes: str

class NotesRequest(BaseModel):
    subject: str
    chapter: str
    exam: str = ""
    notes_type: str = "detailed"
    language: str = "english"
    board: str = "CBSE"
    grade: str = "12"

@router.post("/generate")
def generate_notes(req: NotesRequest):
    try:
        # Notes type ke hisaab se style decide karo
        if req.notes_type == "quick":
            notes_style = "Quick revision sheet banao — sirf key points, bullet format, max 1 page."
        elif req.notes_type == "formula":
            notes_style = "Sirf formula sheet banao — saare important formulas, equations aur key values. No explanations."
        elif req.notes_type == "interview":
            notes_style = "Interview/placement focused notes banao — most asked concepts, definitions, important points."
        else:
            notes_style = "Detailed chapter notes banao — concepts, explanations, examples, diagrams description, PYQ hints."

        # Question build karo
        question = f"""
Subject: {req.subject}
Chapter/Topic: {req.chapter}
Target Exam: {req.exam if req.exam else "General"}
Notes Type: {req.notes_type}
Language: {req.language}

{notes_style}

Structure:
1. Chapter Overview (2-3 lines)
2. Key Concepts (clearly explained)
3. Important Points to Remember
4. Formulas/Dates/Facts (if applicable)
5. Common Mistakes to Avoid
6. Expected Questions from this Chapter
"""

        # gemini_helper se call karo — caching automatic!
        result = ask_raxx_ai(
            question=question,
            feature="notes",
            language=req.language,
            board=req.board,
            grade=req.grade,
        )

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        return {
            "status": "success",
            "subject": req.subject,
            "chapter": req.chapter,
            "notes_type": req.notes_type,
            "language": req.language,
            "notes": result["answer"],
            "cache_read": result["cache_read"],
            "tokens_used": result["tokens_used"],
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def _build_notes_question(req: NotesRequest) -> str:
    if req.notes_type == "quick":
        notes_style = "Quick revision sheet banao — sirf key points, bullet format, max 1 page."
    elif req.notes_type == "formula":
        notes_style = "Sirf formula sheet banao — saare important formulas, equations aur key values. No explanations."
    elif req.notes_type == "interview":
        notes_style = "Interview/placement focused notes banao — most asked concepts, definitions, important points."
    else:
        notes_style = "Detailed chapter notes banao — concepts, explanations, examples, diagrams description, PYQ hints."

    return f"""
Subject: {req.subject}
Chapter/Topic: {req.chapter}
Target Exam: {req.exam if req.exam else "General"}
Notes Type: {req.notes_type}
Language: {req.language}

{notes_style}

Structure:
1. Chapter Overview (2-3 lines)
2. Key Concepts (clearly explained)
3. Important Points to Remember
4. Formulas/Dates/Facts (if applicable)
5. Common Mistakes to Avoid
6. Expected Questions from this Chapter
"""


@router.post("/generate-stream")
def generate_notes_stream(req: NotesRequest):
    question = _build_notes_question(req)

    def event_generator():
        for chunk in ask_raxx_ai_stream(
            question=question,
            feature="notes",
            language=req.language,
            board=req.board,
            grade=req.grade,
        ):
            yield chunk

    return StreamingResponse(
        event_generator(),
        media_type="text/plain",
        headers={
            "X-Accel-Buffering": "no",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )


@router.post("/download-pdf")
def download_notes_pdf(req: NotesPdfRequest):
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer, pagesize=A4,
        topMargin=0.6 * inch, bottomMargin=0.6 * inch,
        leftMargin=0.7 * inch, rightMargin=0.7 * inch,
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle("RaxxTitle", parent=styles["Heading1"], textColor=HexColor("#8B3A2A"), fontSize=18, spaceAfter=4)
    meta_style = ParagraphStyle("RaxxMeta", parent=styles["Normal"], textColor=HexColor("#6B5E52"), fontSize=10, spaceAfter=14)
    body_style = ParagraphStyle("RaxxBody", parent=styles["Normal"], fontSize=11, leading=16, spaceAfter=8)

    story = [
        Paragraph(f"RAXX AI — {req.subject}", title_style),
        Paragraph(f"Chapter: {req.chapter} | Type: {req.notes_type}", meta_style),
    ]

    for para in req.notes.split("\n"):
        para = para.strip()
        if not para:
            story.append(Spacer(1, 6))
            continue
        safe = para.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        story.append(Paragraph(safe, body_style))

    doc.build(story)
    buffer.seek(0)

    filename = f"{req.subject}_{req.chapter}_Notes.pdf".replace(" ", "_")

    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'}
    )