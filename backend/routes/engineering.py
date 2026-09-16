# backend/routes/engineering.py
# RAXX AI — Engineering Hub
# Resume Generator + Mock Interview + Company Questions + Syllabus + Notes

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional
from utils.gemini_helper import ask_raxx_ai
from openai import OpenAI
import os
import json
import uuid
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER

router = APIRouter()

# Direct client — sirf resume generate ke liye (PDF generation ke saath)
client = OpenAI(
    base_url=os.getenv("NVIDIA_BASE_URL", "https://integrate.api.nvidia.com/v1"),
    api_key=os.getenv("NVIDIA_API_KEY"),
)
MODEL_NAME = "nvidia/nemotron-3.5-lightning-30b-a3b"

# ═══════════════════════════════════════
# MODELS
# ═══════════════════════════════════════

class Education(BaseModel):
    college: str
    branch: str
    cgpa: str
    year: str

class Experience(BaseModel):
    company: str
    role: str
    duration: str
    description: str

class Project(BaseModel):
    name: str
    description: str
    tech: str

class ResumeData(BaseModel):
    template: str
    name: str
    email: str
    phone: str
    linkedin: Optional[str] = ""
    github: Optional[str] = ""
    education: Education
    skills: str
    experience: Optional[List[Experience]] = []
    projects: Optional[List[Project]] = []
    achievements: Optional[str] = ""

class InterviewData(BaseModel):
    company: str
    role: str
    previous_answer: Optional[str] = ""
    question_number: int = 1

class CompanyQuestionsData(BaseModel):
    company: str
    type: str

class SyllabusData(BaseModel):
    branch: str

class TopicNotesData(BaseModel):
    topic: str
    branch: str

class ResumeChatData(BaseModel):
    message: str
    resume_data: dict

# ═══════════════════════════════════════
# RESUME GENERATOR — Direct Nemotron (PDF generation ke saath)
# ═══════════════════════════════════════

@router.post("/resume-generate")
async def generate_resume(data: ResumeData):
    try:
        prompt = f"""
You are an expert ATS resume writer. Optimize this student's resume data and return ONLY a JSON object.

Student Data:
- Name: {data.name}
- Email: {data.email}
- Phone: {data.phone}
- LinkedIn: {data.linkedin}
- GitHub: {data.github}
- Education: {data.education.college}, {data.education.branch}, CGPA: {data.education.cgpa}, Year: {data.education.year}
- Skills: {data.skills}
- Experience: {[f"{e.role} at {e.company} ({e.duration}): {e.description}" for e in data.experience]}
- Projects: {[f"{p.name} - {p.description} | Tech: {p.tech}" for p in data.projects]}
- Achievements: {data.achievements}

Return ONLY this JSON (no extra text):
{{
  "summary": "2-3 line professional ATS summary",
  "skills": ["skill1", "skill2"],
  "experience": [{{"role": "", "company": "", "duration": "", "points": ["point1", "point2"]}}],
  "projects": [{{"name": "", "tech": "", "points": ["point1", "point2"]}}],
  "achievements": ["achievement1", "achievement2"]
}}
"""
        # Resume ke liye direct client (PDF bhi generate karna hai saath mein)
        response = client.chat.completions.create(
            model=MODEL_NAME,
            max_tokens=1500,
            temperature=0.3,
            frequency_penalty=0.3,
            extra_body={"chat_template_kwargs": {"enable_thinking": False}},
            messages=[{"role": "user", "content": prompt}]
        )

        raw = response.choices[0].message.content.strip()
        raw = raw.replace("```json", "").replace("```", "").strip()
        optimized = json.loads(raw)

        filename = f"resume_{uuid.uuid4().hex[:8]}.pdf"
        filepath = f"/tmp/{filename}"

        if data.template == "modern":
            build_modern_resume(filepath, data, optimized)
        elif data.template == "minimal":
            build_minimal_resume(filepath, data, optimized)
        else:
            build_classic_resume(filepath, data, optimized)

        return FileResponse(
            path=filepath,
            filename=f"{data.name.replace(' ', '_')}_Resume.pdf",
            media_type="application/pdf"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# MOCK INTERVIEW — gemini_helper se
# ═══════════════════════════════════════

@router.post("/mock-interview")
async def mock_interview(data: InterviewData):
    try:
        if data.question_number == 1:
            question = f"""You are a senior interviewer at {data.company}.
Start a mock interview for a {data.role} position.
Ask the first interview question only. Keep it professional and realistic.
Just ask the question, nothing else."""
        else:
            question = f"""You are a senior interviewer at {data.company} interviewing for {data.role}.
The candidate's previous answer was: "{data.previous_answer}"

First give brief feedback on their answer (1-2 lines), then ask the next interview question.
Question number: {data.question_number}"""

        result = ask_raxx_ai(
            question=question,
            feature="mocktest",
            language="english",
        )

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        return {
            "success": True,
            "message": result["answer"],
            "cache_read": result["cache_read"],
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# COMPANY QUESTIONS — gemini_helper se
# ═══════════════════════════════════════

@router.post("/company-questions")
async def company_questions(data: CompanyQuestionsData):
    try:
        if data.type == "dsa":
            question = f"""List 8 most asked DSA interview questions at {data.company}.
Return ONLY a JSON array:
[{{"question": "...", "difficulty": "Easy/Medium/Hard", "topic": "Arrays/Trees/DP etc"}}]"""
        else:
            question = f"""List 8 most asked HR interview questions at {data.company}.
Return ONLY a JSON array:
[{{"question": "...", "tip": "how to answer this"}}]"""

        result = ask_raxx_ai(
            question=question,
            feature="mocktest",
            language="english",
        )

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        raw = result["answer"].strip().replace("```json", "").replace("```", "").strip()
        questions = json.loads(raw)

        return {
            "success": True,
            "questions": questions,
            "cache_read": result["cache_read"],
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse questions. Try again.")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# BRANCH SYLLABUS — gemini_helper se
# ═══════════════════════════════════════

@router.post("/branch-syllabus")
async def branch_syllabus(data: SyllabusData):
    try:
        question = f"""Generate semester-wise syllabus for {data.branch} engineering in India.
Return ONLY a JSON object:
{{
  "sem1": ["topic1", "topic2"],
  "sem2": ["topic1", "topic2"],
  "sem3": ["topic1", "topic2"],
  "sem4": ["topic1", "topic2"],
  "sem5": ["topic1", "topic2"],
  "sem6": ["topic1", "topic2"],
  "sem7": ["topic1", "topic2"],
  "sem8": ["topic1", "topic2"]
}}"""

        result = ask_raxx_ai(
            question=question,
            feature="notes",
            language="english",
            board=data.branch,
        )

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        raw = result["answer"].strip().replace("```json", "").replace("```", "").strip()
        syllabus = json.loads(raw)

        return {
            "success": True,
            "syllabus": syllabus,
            "cache_read": result["cache_read"],
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse syllabus. Try again.")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# TOPIC NOTES — gemini_helper se
# ═══════════════════════════════════════

@router.post("/topic-notes")
async def topic_notes(data: TopicNotesData):
    try:
        question = f"""Generate comprehensive study notes for "{data.topic}" for {data.branch} engineering students in India.
Include: definition, key concepts, important formulas, examples, exam tips.
Format it nicely with clear sections."""

        result = ask_raxx_ai(
            question=question,
            feature="notes",
            language="english",
            board=data.branch,
        )

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        return {
            "success": True,
            "notes": result["answer"],
            "cache_read": result["cache_read"],
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# RESUME CHAT — gemini_helper se
# ═══════════════════════════════════════

@router.post("/resume-chat")
async def resume_chat(data: ResumeChatData):
    try:
        question = f"""You are an expert resume consultant helping a student improve their resume.

Current Resume Data:
{data.resume_data}

Student's question/request: {data.message}

Give specific, actionable advice. If they ask to rewrite something, give the improved version directly.
Keep response concise and helpful."""

        result = ask_raxx_ai(
            question=question,
            feature="career",
            language="english",
        )

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        return {
            "success": True,
            "reply": result["answer"],
            "cache_read": result["cache_read"],
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# PDF BUILDERS — Same as before (no AI)
# ═══════════════════════════════════════

def build_classic_resume(filepath, data, optimized):
    doc = SimpleDocTemplate(filepath, pagesize=A4,
                            rightMargin=0.6*inch, leftMargin=0.6*inch,
                            topMargin=0.6*inch, bottomMargin=0.6*inch)
    story = []
    name_style = ParagraphStyle('Name', fontSize=22, fontName='Helvetica-Bold',
                                 textColor=colors.HexColor('#1a1a2e'), alignment=TA_CENTER)
    contact_style = ParagraphStyle('Contact', fontSize=9, fontName='Helvetica',
                                    textColor=colors.HexColor('#444444'), alignment=TA_CENTER)
    section_style = ParagraphStyle('Section', fontSize=11, fontName='Helvetica-Bold',
                                    textColor=colors.HexColor('#1a1a2e'), spaceAfter=4)
    body_style = ParagraphStyle('Body', fontSize=9, fontName='Helvetica',
                                 textColor=colors.HexColor('#333333'), leading=14)
    bullet_style = ParagraphStyle('Bullet', fontSize=9, fontName='Helvetica',
                                   textColor=colors.HexColor('#333333'), leading=14, leftIndent=12)

    story.append(Paragraph(data.name.upper(), name_style))
    story.append(Spacer(1, 4))

    contact = f"{data.email} | {data.phone}"
    if data.linkedin: contact += f" | {data.linkedin}"
    if data.github: contact += f" | {data.github}"
    story.append(Paragraph(contact, contact_style))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#1a1a2e')))
    story.append(Spacer(1, 8))

    if optimized.get("summary"):
        story.append(Paragraph("PROFESSIONAL SUMMARY", section_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cccccc')))
        story.append(Spacer(1, 4))
        story.append(Paragraph(optimized["summary"], body_style))
        story.append(Spacer(1, 10))

    story.append(Paragraph("EDUCATION", section_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cccccc')))
    story.append(Spacer(1, 4))
    story.append(Paragraph(f"<b>{data.education.college}</b>", body_style))
    story.append(Paragraph(f"{data.education.branch} | CGPA: {data.education.cgpa} | {data.education.year}", body_style))
    story.append(Spacer(1, 10))

    if optimized.get("skills"):
        story.append(Paragraph("TECHNICAL SKILLS", section_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cccccc')))
        story.append(Spacer(1, 4))
        story.append(Paragraph(", ".join(optimized["skills"]), body_style))
        story.append(Spacer(1, 10))

    if optimized.get("experience"):
        story.append(Paragraph("EXPERIENCE", section_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cccccc')))
        story.append(Spacer(1, 4))
        for exp in optimized["experience"]:
            story.append(Paragraph(f"<b>{exp['role']}</b> — {exp['company']} ({exp['duration']})", body_style))
            for point in exp.get("points", []):
                story.append(Paragraph(f"• {point}", bullet_style))
            story.append(Spacer(1, 6))

    if optimized.get("projects"):
        story.append(Paragraph("PROJECTS", section_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cccccc')))
        story.append(Spacer(1, 4))
        for proj in optimized["projects"]:
            story.append(Paragraph(f"<b>{proj['name']}</b> | {proj['tech']}", body_style))
            for point in proj.get("points", []):
                story.append(Paragraph(f"• {point}", bullet_style))
            story.append(Spacer(1, 6))

    if optimized.get("achievements"):
        story.append(Paragraph("ACHIEVEMENTS & CERTIFICATIONS", section_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cccccc')))
        story.append(Spacer(1, 4))
        for ach in optimized["achievements"]:
            story.append(Paragraph(f"• {ach}", bullet_style))

    doc.build(story)


def build_modern_resume(filepath, data, optimized):
    doc = SimpleDocTemplate(filepath, pagesize=A4,
                            rightMargin=0.6*inch, leftMargin=0.6*inch,
                            topMargin=0, bottomMargin=0.6*inch)
    story = []

    name_style = ParagraphStyle('Name', fontSize=24, fontName='Helvetica-Bold',
                                 textColor=colors.white, alignment=TA_LEFT)
    contact_style = ParagraphStyle('Contact', fontSize=9, fontName='Helvetica',
                                    textColor=colors.HexColor('#e0e0e0'), alignment=TA_LEFT)
    section_style = ParagraphStyle('Section', fontSize=11, fontName='Helvetica-Bold',
                                    textColor=colors.HexColor('#6366f1'), spaceAfter=4)
    body_style = ParagraphStyle('Body', fontSize=9, fontName='Helvetica',
                                 textColor=colors.HexColor('#333333'), leading=14)
    bullet_style = ParagraphStyle('Bullet', fontSize=9, fontName='Helvetica',
                                   textColor=colors.HexColor('#333333'), leading=14, leftIndent=12)

    header_data = [
        [Paragraph(data.name.upper(), name_style)],
        [Paragraph(f"{data.email} | {data.phone} | {data.linkedin or ''} | {data.github or ''}", contact_style)]
    ]
    header_table = Table(header_data, colWidths=[7.27*inch])
    header_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#6366f1')),
        ('PADDING', (0, 0), (-1, -1), 16),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 16))

    if optimized.get("summary"):
        story.append(Paragraph("ABOUT ME", section_style))
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#6366f1')))
        story.append(Spacer(1, 4))
        story.append(Paragraph(optimized["summary"], body_style))
        story.append(Spacer(1, 10))

    story.append(Paragraph("EDUCATION", section_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#6366f1')))
    story.append(Spacer(1, 4))
    story.append(Paragraph(f"<b>{data.education.college}</b>", body_style))
    story.append(Paragraph(f"{data.education.branch} | CGPA: {data.education.cgpa} | {data.education.year}", body_style))
    story.append(Spacer(1, 10))

    if optimized.get("skills"):
        story.append(Paragraph("SKILLS", section_style))
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#6366f1')))
        story.append(Spacer(1, 4))
        story.append(Paragraph(", ".join(optimized["skills"]), body_style))
        story.append(Spacer(1, 10))

    if optimized.get("experience"):
        story.append(Paragraph("EXPERIENCE", section_style))
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#6366f1')))
        story.append(Spacer(1, 4))
        for exp in optimized["experience"]:
            story.append(Paragraph(f"<b>{exp['role']}</b> — {exp['company']} ({exp['duration']})", body_style))
            for point in exp.get("points", []):
                story.append(Paragraph(f"• {point}", bullet_style))
            story.append(Spacer(1, 6))

    if optimized.get("projects"):
        story.append(Paragraph("PROJECTS", section_style))
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#6366f1')))
        story.append(Spacer(1, 4))
        for proj in optimized["projects"]:
            story.append(Paragraph(f"<b>{proj['name']}</b> | {proj['tech']}", body_style))
            for point in proj.get("points", []):
                story.append(Paragraph(f"• {point}", bullet_style))
            story.append(Spacer(1, 6))

    if optimized.get("achievements"):
        story.append(Paragraph("ACHIEVEMENTS", section_style))
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#6366f1')))
        story.append(Spacer(1, 4))
        for ach in optimized["achievements"]:
            story.append(Paragraph(f"• {ach}", bullet_style))

    doc.build(story)


def build_minimal_resume(filepath, data, optimized):
    doc = SimpleDocTemplate(filepath, pagesize=A4,
                            rightMargin=0.7*inch, leftMargin=0.7*inch,
                            topMargin=0.7*inch, bottomMargin=0.7*inch)
    story = []

    name_style = ParagraphStyle('Name', fontSize=20, fontName='Helvetica-Bold',
                                 textColor=colors.black, alignment=TA_LEFT)
    contact_style = ParagraphStyle('Contact', fontSize=8, fontName='Helvetica',
                                    textColor=colors.HexColor('#666666'))
    section_style = ParagraphStyle('Section', fontSize=10, fontName='Helvetica-Bold',
                                    textColor=colors.black, spaceAfter=2)
    body_style = ParagraphStyle('Body', fontSize=9, fontName='Helvetica',
                                 textColor=colors.HexColor('#222222'), leading=13)
    bullet_style = ParagraphStyle('Bullet', fontSize=9, fontName='Helvetica',
                                   textColor=colors.HexColor('#222222'), leading=13, leftIndent=10)

    story.append(Paragraph(data.name, name_style))
    story.append(Spacer(1, 3))
    contact = f"{data.email}  •  {data.phone}"
    if data.linkedin: contact += f"  •  {data.linkedin}"
    if data.github: contact += f"  •  {data.github}"
    story.append(Paragraph(contact, contact_style))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.black))
    story.append(Spacer(1, 8))

    if optimized.get("summary"):
        story.append(Paragraph("Summary", section_style))
        story.append(Spacer(1, 3))
        story.append(Paragraph(optimized["summary"], body_style))
        story.append(Spacer(1, 8))

    story.append(Paragraph("Education", section_style))
    story.append(Spacer(1, 3))
    story.append(Paragraph(f"{data.education.college} — {data.education.branch}", body_style))
    story.append(Paragraph(f"CGPA: {data.education.cgpa} | {data.education.year}", body_style))
    story.append(Spacer(1, 8))

    if optimized.get("skills"):
        story.append(Paragraph("Skills", section_style))
        story.append(Spacer(1, 3))
        story.append(Paragraph(", ".join(optimized["skills"]), body_style))
        story.append(Spacer(1, 8))

    if optimized.get("experience"):
        story.append(Paragraph("Experience", section_style))
        story.append(Spacer(1, 3))
        for exp in optimized["experience"]:
            story.append(Paragraph(f"{exp['role']} — {exp['company']} ({exp['duration']})", body_style))
            for point in exp.get("points", []):
                story.append(Paragraph(f"• {point}", bullet_style))
            story.append(Spacer(1, 5))

    if optimized.get("projects"):
        story.append(Paragraph("Projects", section_style))
        story.append(Spacer(1, 3))
        for proj in optimized["projects"]:
            story.append(Paragraph(f"{proj['name']} | {proj['tech']}", body_style))
            for point in proj.get("points", []):
                story.append(Paragraph(f"• {point}", bullet_style))
            story.append(Spacer(1, 5))

    if optimized.get("achievements"):
        story.append(Paragraph("Achievements", section_style))
        story.append(Spacer(1, 3))
        for ach in optimized["achievements"]:
            story.append(Paragraph(f"• {ach}", bullet_style))

    doc.build(story)