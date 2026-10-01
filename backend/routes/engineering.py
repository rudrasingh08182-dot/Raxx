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

from supabase import create_client
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_KEY"),
)

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
    user_id: str
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
    exclude: Optional[List[str]] = []

class EvaluateCodeData(BaseModel):
    company: str
    question: str
    language: str
    code: str

class CodeHintData(BaseModel):
    company: str
    question: str
    language: str = ""
    code: str = ""
    hint_level: int = 1

class SyllabusData(BaseModel):
    branch: str

class TopicNotesData(BaseModel):
    topic: str
    branch: str

class ResumeChatData(BaseModel):
    message: str
    resume_data: dict

# ═══════════════════════════════════════
# TEMPLATE STYLE PROFILES — AI content in profiles ke hisaab se dhalta hai,
# taaki har template ke layout mein content sahi se fit baithe
# ═══════════════════════════════════════

  # ═══════════════════════════════════════
# QUALITY REFERENCE EXAMPLES — used as few-shot style guidance so the AI
# writes rich, substantial content instead of generic one-liners. These are
# NEVER copied verbatim — they teach tone, depth and structure only.
# ═══════════════════════════════════════

PROFESSIONAL_SUMMARY_EXAMPLES = """
1. "Motivated Computer Science undergraduate with hands-on experience building and deploying full-stack applications end-to-end, from backend architecture to production release. Combines strong fundamentals in Python and web technologies with a track record of shipping real, working products."
2. "Aspiring AI/ML engineer with practical exposure to data analysis, model building and deployment pipelines. Has independently designed and built a RAG-based application integrating vector databases and LLM APIs, translating theoretical ML concepts into a functioning production system."
3. "Detail-oriented final-year Computer Science student specializing in web development, with demonstrated ability to design responsive, user-focused interfaces and integrate them with scalable backend services. Comfortable working across the full stack from database schema to UI."
4. "Data-driven Computer Science student with strong analytical foundations in Python, Pandas and visualization libraries. Has applied statistical and machine learning techniques to real datasets, with a growing portfolio of projects demonstrating end-to-end data pipeline design."
5. "Electronics and Communication Engineering student with a strong grasp of embedded systems and signal processing fundamentals, paired with self-taught software development skills. Bridges hardware-level understanding with practical programming ability."
6. "Computer Science undergraduate with a systems-first mindset, focused on writing clean, maintainable code and understanding how software scales in production. Has built and deployed multiple applications independently, handling everything from architecture decisions to live debugging."
7. "Emerging cybersecurity enthusiast with foundational knowledge of network security, cryptography and secure coding practices, complemented by practical programming experience. Actively builds projects that combine software engineering fundamentals with a security-conscious mindset."
8. "Mechanical Engineering student with a growing interest in automation and computational tools, applying programming skills to solve engineering problems traditionally handled manually. Combines core engineering fundamentals with practical software ability."
"""

CAREER_OBJECTIVE_EXAMPLES = """
1. "Computer Science student seeking to apply strong programming fundamentals and hands-on project experience to a software engineering role where I can contribute to building scalable, real-world applications from day one."
2. "AI Engineering aspirant who has taken projects from concept to live deployment, combining strong Python and ML fundamentals with real-world execution. Seeking to bring this blend of technical depth and product-building experience to a role developing AI-powered systems at scale."
3. "Motivated to secure a full-stack development role where I can leverage my experience building and shipping complete applications to deliver reliable, user-focused software in a fast-paced engineering team."
4. "Seeking a data analyst or data science role to apply strong foundations in statistical analysis, Python and visualization tools toward solving real business problems with data-driven insights."
5. "Aiming to contribute to a backend/systems engineering team by applying strong fundamentals in data structures, algorithms and scalable application design, gained through independent full-stack project development."
6. "Looking to join an early-career software development program where I can grow my engineering skills while contributing meaningfully to production codebases, backed by hands-on experience shipping a live application."
7. "Seeking an opportunity in cloud or DevOps engineering to apply foundational AWS knowledge and automation mindset toward building reliable, well-architected infrastructure."
8. "Aspiring machine learning engineer aiming to apply practical experience in building RAG pipelines, vector search and LLM integration toward developing production-grade AI systems."
9. "Seeking a software engineering internship/role where I can apply my hands-on experience building and deploying full-stack applications, while continuing to deepen my skills in scalable system design."
"""


TEMPLATE_STYLES = {
    "classic": {
        "label": "Classic",
        "summary_words": "45-60",
        "bullets_per_role": "3-4",
        "bullet_words": "16-24",
    },
    "modern": {
        "label": "Modern",
        "summary_words": "40-55",
        "bullets_per_role": "3-4",
        "bullet_words": "16-24",
    },
    "minimal": {
        "label": "Minimal",
        "summary_words": "30-40",
        "bullets_per_role": "2-3",
        "bullet_words": "12-18",
    },
    "elegant": {
        "label": "Elegant",
        "summary_words": "50-65",
        "bullets_per_role": "3-4",
        "bullet_words": "18-26",
    },
    "technical": {
        "label": "Technical (ATS-Optimized)",
        "summary_words": "35-45",
        "bullets_per_role": "4-5",
        "bullet_words": "14-20",
    },
}


# ═══════════════════════════════════════
# RESUME GENERATOR — Direct Nemotron (PDF generation ke saath)
# ═══════════════════════════════════════

TEMPLATE_BUILDERS = {
    "classic": None,     # neeche set honge, forward-reference issue se bachne ke liye
    "modern": None,
    "minimal": None,
    "elegant": None,
    "technical": None,
}


@router.post("/resume-generate")
async def generate_resume(data: ResumeData):
    try:
        style = TEMPLATE_STYLES.get(data.template, TEMPLATE_STYLES["classic"])

        prompt = f"""
You are an expert ATS resume writer helping an Indian engineering student build a
genuinely strong, one-page resume — not a thin, generic one.

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

REFERENCE EXAMPLES — study these for TONE, DEPTH and STRUCTURE only. Never copy
them verbatim or reuse their specific facts (name, company, exact claims) —
they exist purely to show you what a genuinely strong summary/objective sounds
like, so you write something equally substantial and specific to THIS student.

Professional Summary examples:
{PROFESSIONAL_SUMMARY_EXAMPLES}

Career Objective examples (use this style when the student's data suggests a
clear target role, e.g. from their skills/projects):
{CAREER_OBJECTIVE_EXAMPLES}

CRITICAL — ELABORATION RULES:
- If a project/experience description is short (e.g. one line), EXPAND it into
  multiple substantial bullet points by professionally unpacking what such a
  project would genuinely involve given the stated tech stack — e.g. "built a
  full-stack app with Python, React, Node" becomes separate bullets about the
  backend logic, the frontend integration, and the deployment/outcome.
- Do NOT invent fake metrics, company names, user counts or awards that were
  never mentioned. Elaborate on WHAT WAS BUILT and HOW, using only the tech
  stack and description given — not fabricated business impact numbers.
- The summary must read like the reference examples above: specific to the
  student's actual skills/domain, not a generic "hardworking team player" line.
- Every project listed must get the full number of bullet points specified
  below, even if the original input was just one sentence — this is the
  single most common reason resumes come out looking thin, so treat it as
  a hard requirement, not optional polish.

STYLE CONSTRAINTS for the "{style['label']}" template — follow these exactly
so the content fills a full page without overflowing:
- Summary length: {style['summary_words']} words
- Bullet points per role/project: {style['bullets_per_role']} (mandatory minimum, even for short input)
- Each bullet point length: {style['bullet_words']} words

Return ONLY this JSON (no extra text):
{{
  "summary": "professional summary matching the depth/tone of the reference examples and the word count above",
  "skills": ["skill1", "skill2"],
  "experience": [{{"role": "", "company": "", "duration": "", "points": ["point1", "point2"]}}],
  "projects": [{{"name": "", "tech": "", "points": ["point1", "point2"]}}],
  "achievements": ["achievement1", "achievement2"]
}}
"""
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

        builder = TEMPLATE_BUILDERS.get(data.template, build_classic_resume)
        builder(filepath, data, optimized)

        # Supabase mein save karo — best-effort, fail hone par bhi PDF milna
        # chahiye user ko, isliye ye alag try/except mein hai
        try:
            supabase.table("resumes").insert({
                "user_id": data.user_id,
                "template": data.template,
                "form_data": data.model_dump(),
                "ai_content": optimized,
            }).execute()
        except Exception as save_err:
            print(f"[resume] DB save failed (non-fatal): {save_err}", flush=True)

        return FileResponse(
            path=filepath,
            filename=f"{data.name.replace(' ', '_')}_Resume.pdf",
            media_type="application/pdf"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# SAVED RESUMES — history + template switch bina naye AI call ke
# ═══════════════════════════════════════

@router.get("/resumes/{user_id}")
async def list_resumes(user_id: str):
    try:
        result = supabase.table("resumes") \
            .select("id, template, created_at") \
            .eq("user_id", user_id) \
            .order("created_at", desc=True) \
            .execute()
        return {"success": True, "resumes": result.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class RegenerateResumeData(BaseModel):
    resume_id: str
    new_template: str


@router.post("/resume-regenerate")
async def regenerate_resume(data: RegenerateResumeData):
    """
    Purane AI content ko reuse karke ek naye template mein PDF banata hai —
    koi naya AI call nahi (free + instant). Note: content lengths original
    template ke hisaab se the, isliye bahut alag style wale template mein
    thoda overflow ho sakta hai — best result ke liye /resume-generate ko
    naye template ke saath dobara call karna behtar hai.
    """
    try:
        result = supabase.table("resumes").select("*").eq("id", data.resume_id).single().execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Resume not found")

        record = result.data
        form_data = ResumeData(**record["form_data"])
        optimized = record["ai_content"]

        filename = f"resume_{uuid.uuid4().hex[:8]}.pdf"
        filepath = f"/tmp/{filename}"

        builder = TEMPLATE_BUILDERS.get(data.new_template, build_classic_resume)
        builder(filepath, form_data, optimized)

        return FileResponse(
            path=filepath,
            filename=f"{form_data.name.replace(' ', '_')}_Resume.pdf",
            media_type="application/pdf"
        )
    except HTTPException:
        raise
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

        answer = ask_raxx_ai(
            question=question,
            feature="mocktest",
            language="en",
        )

        if not answer:
            raise HTTPException(status_code=500, detail="AI se empty response mila. Try again!")

        return {
            "success": True,
            "message": answer,
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
        exclude_block = ""
        if data.exclude:
            # Prompt ko bahut lamba hone se bachane ke liye sirf last 25 rakho,
            # har ek 100 chars tak truncate karo
            recent_exclude = data.exclude[-25:]
            trimmed = [q[:100] for q in recent_exclude]
            exclude_block = "\n\nAlready shown (do NOT repeat these or close variants):\n" + \
                "\n".join(f"- {q}" for q in trimmed)

        if data.type == "dsa":
            question = f"""List 8 more frequently asked DSA interview questions at {data.company}.
Make sure these are genuinely different from any already shown.{exclude_block}

Return ONLY a JSON array:
[{{"question": "...", "difficulty": "Easy/Medium/Hard", "topic": "Arrays/Trees/DP etc"}}]"""
        else:
            question = f"""List 8 more frequently asked HR interview questions at {data.company}.
Make sure these are genuinely different from any already shown.{exclude_block}

Return ONLY a JSON array:
[{{"question": "...", "tip": "how to answer this"}}]"""

        answer = ask_raxx_ai(
            question=question,
            feature="mocktest",
            language="en",
        )

        if not answer:
            raise HTTPException(status_code=500, detail="AI se empty response mila. Try again!")

        raw = answer.strip().replace("```json", "").replace("```", "").strip()
        questions = json.loads(raw)

        return {
            "success": True,
            "questions": questions,
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

        answer = ask_raxx_ai(
            question=question,
            feature="notes",
            language="en",
            board=data.branch,
        )

        if not answer:
            raise HTTPException(status_code=500, detail="AI se empty response mila. Try again!")

        raw = answer.strip().replace("```json", "").replace("```", "").strip()
        syllabus = json.loads(raw)

        return {
            "success": True,
            "syllabus": syllabus,
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

        answer = ask_raxx_ai(
            question=question,
            feature="notes",
            language="en",
            board=data.branch,
        )

        if not answer:
            raise HTTPException(status_code=500, detail="AI se empty response mila. Try again!")

        return {
            "success": True,
            "notes": answer,
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

        answer = ask_raxx_ai(
            question=question,
            feature="career",
            language="en",
        )

        if not answer:
            raise HTTPException(status_code=500, detail="AI se empty response mila. Try again!")

        return {
            "success": True,
            "reply": answer,
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# CODE EVALUATION — AI judges correctness + approach (brute-force/optimal)
# Future: Judge0 wiring yahan add hoga actual execution ke liye
# ═══════════════════════════════════════

@router.post("/evaluate-code")
async def evaluate_code(data: EvaluateCodeData):
    try:
        if not data.code.strip():
            raise HTTPException(status_code=400, detail="Code is empty!")

        question = f"""You are a strict but fair technical interviewer at {data.company}, reviewing a candidate's code submission.

Interview Question: {data.question}
Language: {data.language}

Candidate's Code:
````{data.language}
{data.code}
````

Evaluate this code carefully. Check correctness by mentally tracing through
the logic on a few test cases (including edge cases like empty input,
single element, duplicates). Classify the approach honestly.

Respond ONLY in this JSON format, no extra text:
{{
  "correctness": "Correct" | "Wrong" | "Partially Correct",
  "approach": "Brute Force" | "Optimal" | "Suboptimal" | "Unclear",
  "time_complexity": "e.g. O(n)",
  "space_complexity": "e.g. O(1)",
  "bugs_found": ["specific bug 1", "specific bug 2"],
  "explanation": "2-3 lines on what the code does and whether the logic is sound",
  "improvement_suggestions": "specific suggestion to reach optimal approach/complexity, empty string if already optimal",
  "encouragement": "short motivational line in Hindi or English"
}}"""

        answer = ask_raxx_ai(
            question=question,
            feature="mocktest",
            language="en",
        )

        if not answer:
            raise HTTPException(status_code=500, detail="AI se empty response mila. Try again!")

        raw = answer.strip().replace("```json", "").replace("```", "").strip()
        evaluation = json.loads(raw)

        return {
            "success": True,
            "evaluation": evaluation,
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse evaluation. Try again.")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# CODE HINT — progressive hints, kabhi full solution nahi deta
# ═══════════════════════════════════════

@router.post("/code-hint")
async def code_hint(data: CodeHintData):
    try:
        code_block = f"""
Student's current code attempt (may be empty or incomplete):
````{data.language}
{data.code}
```""" if data.code.strip() else "\nStudent hasn't written any code yet."

        question = f"""You are a helpful coding mentor at {data.company}. A student is stuck on
this interview question and wants a HINT — not the full solution.

Interview Question: {data.question}
Language: {data.language}
{code_block}

This is hint request number {data.hint_level} for this question. Give a hint
appropriate to this level — level 1 should nudge toward the right approach or
data structure, higher levels can be more specific about the algorithm steps,
but NEVER write actual code or the full solution, at any level.

Respond ONLY in this JSON format, no extra text:
{{
  "hint": "a short, specific hint (2-4 sentences) that guides their thinking without writing code for them"
}}"""

        answer = ask_raxx_ai(
            question=question,
            feature="mocktest",
            language="en",
        )

        if not answer:
            raise HTTPException(status_code=500, detail="AI se empty response mila. Try again!")

        raw = answer.strip().replace("```json", "").replace("```", "").strip()
        result = json.loads(raw)

        return {
            "success": True,
            "hint": result.get("hint", ""),
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to generate hint. Try again.")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# PDF BUILDERS — Same as before (no AI)
# ----

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


def build_elegant_resume(filepath, data, optimized):
    """Two-column: left sidebar (contact/education/skills), right main content."""
    doc = SimpleDocTemplate(filepath, pagesize=A4,
                            rightMargin=0.5*inch, leftMargin=0.5*inch,
                            topMargin=0.5*inch, bottomMargin=0.5*inch)

    sidebar_title = ParagraphStyle('SBTitle', fontSize=10, fontName='Helvetica-Bold',
                                    textColor=colors.HexColor('#0f172a'), spaceAfter=4, spaceBefore=10)
    sidebar_body = ParagraphStyle('SBBody', fontSize=8.5, fontName='Helvetica',
                                   textColor=colors.HexColor('#334155'), leading=13)
    name_style = ParagraphStyle('Name', fontSize=20, fontName='Helvetica-Bold',
                                 textColor=colors.HexColor('#0f172a'))
    section_style = ParagraphStyle('Section', fontSize=11, fontName='Helvetica-Bold',
                                    textColor=colors.HexColor('#0f172a'), spaceAfter=4, spaceBefore=8)
    body_style = ParagraphStyle('Body', fontSize=9, fontName='Helvetica',
                                 textColor=colors.HexColor('#333333'), leading=14)
    bullet_style = ParagraphStyle('Bullet', fontSize=9, fontName='Helvetica',
                                   textColor=colors.HexColor('#333333'), leading=14, leftIndent=10)

    # Left sidebar content
    sidebar = [Paragraph("CONTACT", sidebar_title),
               Paragraph(data.email, sidebar_body),
               Paragraph(data.phone, sidebar_body)]
    if data.linkedin:
        sidebar.append(Paragraph(data.linkedin, sidebar_body))
    if data.github:
        sidebar.append(Paragraph(data.github, sidebar_body))

    sidebar.append(Paragraph("EDUCATION", sidebar_title))
    sidebar.append(Paragraph(f"<b>{data.education.college}</b>", sidebar_body))
    sidebar.append(Paragraph(f"{data.education.branch}", sidebar_body))
    sidebar.append(Paragraph(f"CGPA: {data.education.cgpa} | {data.education.year}", sidebar_body))

    if optimized.get("skills"):
        sidebar.append(Paragraph("SKILLS", sidebar_title))
        for s in optimized["skills"]:
            sidebar.append(Paragraph(f"• {s}", sidebar_body))

    # Right main content
    main = [Paragraph(data.name.upper(), name_style), Spacer(1, 10)]
    if optimized.get("summary"):
        main.append(Paragraph("SUMMARY", section_style))
        main.append(Paragraph(optimized["summary"], body_style))

    if optimized.get("experience"):
        main.append(Paragraph("EXPERIENCE", section_style))
        for exp in optimized["experience"]:
            main.append(Paragraph(f"<b>{exp['role']}</b> — {exp['company']} ({exp['duration']})", body_style))
            for point in exp.get("points", []):
                main.append(Paragraph(f"• {point}", bullet_style))
            main.append(Spacer(1, 6))

    if optimized.get("projects"):
        main.append(Paragraph("PROJECTS", section_style))
        for proj in optimized["projects"]:
            main.append(Paragraph(f"<b>{proj['name']}</b> | {proj['tech']}", body_style))
            for point in proj.get("points", []):
                main.append(Paragraph(f"• {point}", bullet_style))
            main.append(Spacer(1, 6))

    if optimized.get("achievements"):
        main.append(Paragraph("ACHIEVEMENTS", section_style))
        for ach in optimized["achievements"]:
            main.append(Paragraph(f"• {ach}", bullet_style))

    layout = Table([[sidebar, main]], colWidths=[2.1*inch, 5.0*inch])
    layout.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, 0), colors.HexColor('#f1f5f9')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (0, 0), 12),
        ('RIGHTPADDING', (0, 0), (0, 0), 12),
        ('TOPPADDING', (0, 0), (0, 0), 14),
        ('LEFTPADDING', (1, 0), (1, 0), 16),
    ]))

    doc.build([layout])


def build_technical_resume(filepath, data, optimized):
    """Single-column, high-density, pure black/white — maximum ATS parsing safety."""
    doc = SimpleDocTemplate(filepath, pagesize=A4,
                            rightMargin=0.6*inch, leftMargin=0.6*inch,
                            topMargin=0.5*inch, bottomMargin=0.5*inch)
    story = []

    name_style = ParagraphStyle('Name', fontSize=18, fontName='Helvetica-Bold', textColor=colors.black)
    contact_style = ParagraphStyle('Contact', fontSize=9, fontName='Helvetica', textColor=colors.HexColor('#333333'))
    section_style = ParagraphStyle('Section', fontSize=10, fontName='Helvetica-Bold',
                                    textColor=colors.black, spaceAfter=3, spaceBefore=8)
    body_style = ParagraphStyle('Body', fontSize=8.5, fontName='Helvetica',
                                 textColor=colors.black, leading=12.5)
    bullet_style = ParagraphStyle('Bullet', fontSize=8.5, fontName='Helvetica',
                                   textColor=colors.black, leading=12.5, leftIndent=10)

    story.append(Paragraph(data.name, name_style))
    contact = f"{data.email} | {data.phone}"
    if data.linkedin: contact += f" | {data.linkedin}"
    if data.github: contact += f" | {data.github}"
    story.append(Paragraph(contact, contact_style))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.black))

    if optimized.get("summary"):
        story.append(Paragraph("SUMMARY", section_style))
        story.append(Paragraph(optimized["summary"], body_style))

    story.append(Paragraph("EDUCATION", section_style))
    story.append(Paragraph(f"{data.education.college} — {data.education.branch} — CGPA {data.education.cgpa} — {data.education.year}", body_style))

    if optimized.get("skills"):
        story.append(Paragraph("TECHNICAL SKILLS", section_style))
        story.append(Paragraph(" | ".join(optimized["skills"]), body_style))

    if optimized.get("experience"):
        story.append(Paragraph("EXPERIENCE", section_style))
        for exp in optimized["experience"]:
            story.append(Paragraph(f"{exp['role']} | {exp['company']} | {exp['duration']}", body_style))
            for point in exp.get("points", []):
                story.append(Paragraph(f"- {point}", bullet_style))
            story.append(Spacer(1, 4))

    if optimized.get("projects"):
        story.append(Paragraph("PROJECTS", section_style))
        for proj in optimized["projects"]:
            story.append(Paragraph(f"{proj['name']} | {proj['tech']}", body_style))
            for point in proj.get("points", []):
                story.append(Paragraph(f"- {point}", bullet_style))
            story.append(Spacer(1, 4))

    if optimized.get("achievements"):
        story.append(Paragraph("ACHIEVEMENTS", section_style))
        for ach in optimized["achievements"]:
            story.append(Paragraph(f"- {ach}", bullet_style))

    doc.build(story)


# Dispatch dict ab actual functions se fill karo (functions upar define ho chuke)
TEMPLATE_BUILDERS.update({
    "classic": build_classic_resume,
    "modern": build_modern_resume,
    "minimal": build_minimal_resume,
    "elegant": build_elegant_resume,
    "technical": build_technical_resume,
})