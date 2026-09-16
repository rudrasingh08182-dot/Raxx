# backend/utils/gemini_helper.py
# RAXX AI — Central AI Helper via NVIDIA NIM API (Nemotron 3.5)
# Now RAG-aware for the "doubt" feature: retrieves relevant chunks from the
# knowledge base (built by the knowledge-pipeline tool) and grounds the
# model's answer in them when available. Falls back to answering without
# retrieval if nothing is found yet (e.g. before any content has been
# ingested) — this never breaks the feature, it just doesn't get grounded
# until content exists.

import os
from openai import OpenAI
from utils.rag_retrieval import search_knowledge

def get_nvidia_client():
    return OpenAI(
        base_url=os.getenv("NVIDIA_BASE_URL", "https://integrate.api.nvidia.com/v1"),
        api_key=os.getenv("NVIDIA_API_KEY"),
    )

# Update this if NVIDIA renames/updates the model string later
MODEL_NAME = "nvidia/nemotron-3.5-lightning-30b-a3b"

RAXX_SYSTEM_PROMPT = """
You are RAXX AI, India's smartest AI study assistant built for every Indian student.

Your Rules:
- Always explain in simple Hindi + English (Hinglish is perfectly OK)
- Use real Indian examples (cricket, chai, Indian cities, festivals)
- Always give step by step explanation
- Be encouraging, friendly and motivating
- Relate everything to Indian board exams (UP Board, CBSE, ICSE, JEE, NEET, UPSC)
- Keep answers concise but complete
- Use emojis occasionally to make it friendly
- Never give wrong information — if unsure, say so
- If reference material is provided below (marked REFERENCE MATERIAL), base your
  answer on it and mention the source (e.g. "Source: NCERT Class 10 Maths, Real Numbers").
  If the reference material doesn't cover the question, answer from your own
  knowledge as usual, without claiming a source.
- IMPORTANT: When REFERENCE MATERIAL is present, prioritize it over your own
  training knowledge. Do not contradict or ignore it. If it fully answers the
  question, base your entire answer on it.
- If the student's message is just a casual greeting or small talk (not an
  academic question), reply warmly and briefly, then ask what topic they
  need help with. Don't force step-by-step academic structure on it.
"""

SYLLABUS_CONTEXT = """
BOARDS COVERED: UP Board, CBSE, ICSE, MP Board, Bihar Board, Rajasthan Board, Maharashtra Board

CLASS 10 SCIENCE: Chemical Reactions, Acids Bases Salts, Metals Non-metals,
Carbon Compounds, Life Processes, Control and Coordination, Heredity Evolution,
Light Reflection Refraction, Human Eye, Electricity, Magnetic Effects, Energy Sources

CLASS 10 MATHEMATICS: Real Numbers, Polynomials, Linear Equations, Quadratic Equations,
Arithmetic Progressions, Triangles, Coordinate Geometry, Trigonometry,
Surface Areas Volumes, Statistics, Probability

CLASS 12 PHYSICS: Electrostatics, Current Electricity, Magnetic Effects,
Electromagnetic Induction, Optics, Modern Physics, Semiconductor Electronics

CLASS 12 CHEMISTRY: Solid State, Solutions, Electrochemistry, Chemical Kinetics,
Surface Chemistry, p-block, d-block Elements, Coordination Compounds, Biomolecules

CLASS 12 MATHEMATICS: Relations Functions, Inverse Trigonometry, Matrices,
Determinants, Continuity Differentiability, Integrals, Differential Equations,
Vectors, 3D Geometry, Linear Programming, Probability

CLASS 12 BIOLOGY: Reproduction, Genetics Evolution, Biology Human Welfare,
Biotechnology, Ecology Environment

ENGINEERING: CSE, ECE, MECHANICAL, CIVIL, ELECTRICAL
MEDICAL: MBBS, NEET UG, NEET PG
GOVERNMENT EXAMS: UPSC, SSC, Railway, Banking
CODING: C, C++, Python, Java, JavaScript
"""


def _build_rag_context(question: str, board: str, grade: str, subject: str = ""):
    """
    Tries to retrieve relevant knowledge-base chunks for a school-level doubt.
    Returns a formatted context string, or "" if nothing relevant was found
    (e.g. content not ingested for this topic yet, or GEMINI_API_KEY not set).
    """
    level = None
    if grade and str(grade).strip().isdigit():
        level = f"class-{grade}"

    chunks = search_knowledge(
        query=question,
        category="school",
        level=level,
        subject=subject.lower() if subject else None,
        top_k=4,
    )

    if not chunks:
        return ""

    parts = []
    for c in chunks:
        title = c.get("title", "Untitled")
        content = c.get("content", "")
        parts.append(f"[{title}]\n{content}")

    return "\n\n---\n\nREFERENCE MATERIAL (from RAXX AI's verified knowledge base):\n\n" + "\n\n---\n\n".join(parts)


def ask_raxx_ai(
    question: str,
    feature: str = "doubt",
    language: str = "Hindi",
    board: str = "CBSE",
    grade: str = "12",
    subject: str = "",
    extra_context: str = ""
) -> dict:

    feature_prompts = {
        "doubt": f"Ek student ne doubt pucha hai. Board: {board}, Class: {grade}, Language: {language}. Step by step explain karo.",
        "notes": f"Is topic ke liye clean exam-ready notes banao. Board: {board}, Class: {grade}. Key Points, Definitions, Formulas, Exam Tips include karo.",
        "mocktest": f"Ek MCQ question banao. Board: {board}, Class: {grade}. Format: Question, A) B) C) D), Correct Answer, Explanation.",
        "studyplan": f"Personalized study plan banao. Exam: {board}, Class: {grade}. Har din specific topics aur time batao.",
        "career": f"Best career options suggest karo. Class: {grade}, Board: {board}. Required exams, colleges, salary, future scope batao.",
        "code_review": f"Is code ko review karo. Language: {language}. Kya sahi hai, kya improve ho sakta hai, optimized version do.",
        "scholarship": f"Best government scholarships find karo. Board: {board}, Class: {grade}. Naam, eligibility, amount, process batao.",
        "predictor": f"Topic-wise probability batao. Exam: {board}. HIGH CHANCE, MEDIUM CHANCE, LOW CHANCE format mein.",
    }

    feature_instruction = feature_prompts.get(feature, feature_prompts["doubt"])

    if extra_context:
        feature_instruction += f"\n\nExtra Context: {extra_context}"

    # RAG: only wired for "doubt" right now. Other features still work exactly
    # as before — extend this to more features once more content is ingested.
    rag_context = ""
    if feature == "doubt":
        rag_context = _build_rag_context(question, board, grade, subject)

    full_prompt = f"{SYLLABUS_CONTEXT}\n\n{feature_instruction}{rag_context}\n\nStudent Question: {question}"

    try:
        client = get_nvidia_client()

        response = client.chat.completions.create(
            model=MODEL_NAME,
            max_tokens=1500,
            # Low temperature keeps answers closer to the RAG reference
            # material instead of drifting toward the model's own knowledge.
            temperature=0.3,
            messages=[
                {
                    "role": "system",
                    "content": RAXX_SYSTEM_PROMPT,
                },
                {
                    "role": "user",
                    "content": full_prompt,
                },
            ],
        )

        choice = response.choices[0]
        answer = choice.message.content

        # Some Nemotron variants return separate "reasoning_content" (chain of
        # thought). We deliberately drop it here — students should only see
        # the final answer, never the model's internal reasoning trace.
        # If you ever need it for debugging, it's at:
        #   getattr(choice.message, "reasoning_content", None)

        usage = response.usage
        return {
            "success": True,
            "answer": answer,
            "tokens_used": usage.total_tokens if usage else 0,
            # NVIDIA NIM doesn't expose prompt-cache stats like Anthropic did,
            # so these stay at 0. Safe to remove downstream if unused.
            "cache_created": 0,
            "cache_read": 0,
            "grounded": bool(rag_context),
        }

    except Exception as e:
        return {
            "success": False,
            "error": f"AI Error: {str(e)}",
        }