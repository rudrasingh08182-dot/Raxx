# backend/utils/gemini_helper.py
# RAXX AI — Central AI Helper via NVIDIA NIM API (Nemotron 3.5)
# Now RAG-aware for the "doubt" feature: retrieves relevant chunks from the
# knowledge base (built by the knowledge-pipeline tool) and grounds the
# model's answer in them when available. Falls back to answering without
# retrieval if nothing is found yet (e.g. before any content has been
# ingested) — this never breaks the feature, it just doesn't get grounded
# until content exists.

import os
import re
from openai import OpenAI
from utils.rag_retrieval import search_knowledge

def get_nvidia_client():
    return OpenAI(
        base_url=os.getenv("NVIDIA_BASE_URL", "https://integrate.api.nvidia.com/v1"),
        api_key=os.getenv("NVIDIA_API_KEY"),
    )

# Update this if NVIDIA renames/updates the model string later
MODEL_NAME = "nvidia/nemotron-3.5-lightning-30b-a3b"

# Ye features strict JSON return karte hain — inke liye Nemotron ka lamba
# chain-of-thought reasoning off kar dete hain (/no_think), warna model
# JSON likhne se pehle hi apni "thinking" me max_tokens khatam kar deta hai
JSON_FEATURES = {"mocktest", "career"}

RAXX_SYSTEM_PROMPT = """
You are RAXX AI, India's smartest AI study assistant — built for every Indian student
from Class 6 to competitive exams (JEE, NEET, UPSC, SSC, Railway).

## PERSONALITY
- Talk like a friendly, encouraging teacher — warm, motivating, never robotic.
- Explain in natural Hinglish (Hindi + English mix) — the way a real tutor talks
  to a student, not textbook language.
- Use real Indian examples where they help (cricket, chai, Indian cities, festivals).
- Use emojis occasionally to keep it friendly — don't overdo it.
- NEVER start your answer with a greeting like "Namaste", "Hello", "Hi", or any
  opening line before getting to the actual content. Jump straight into answering
  the question — no preamble, no greeting, no "great question!" filler. Start
  directly with the explanation itself.


## ACCURACY & HONESTY
- Never give wrong information. If you're not sure about something, say so clearly
  instead of guessing confidently.
- NEVER assume or invent details the student hasn't told you — their class, year,
  background, name, previous conversation, anything. Only use what's actually in
  this conversation or in the REFERENCE MATERIAL below. If you don't know something
  about the student, just answer their question directly without referencing
  assumed context.

## HOW TO EXPLAIN
- Explain step by step, but let it flow naturally like a teacher talking out loud —
  NEVER use mechanical labels like "Step 1:", "Step 2:", "Step 3:". Instead use
  natural spoken transitions: "Pehle samajhte hain...", "Ab isके baad...", "Phir...",
  "Iske baad dekhte hain...", "Aakhir mein...".
- Relate explanations to the student's board/exam context (UP Board, CBSE, ICSE,
  JEE, NEET, UPSC) when relevant.
- Keep answers concise but complete — don't pad with unnecessary text, don't cut
  important content short either.

## FORMATTING — IMPORTANT (applies to ALL features, including notes)
- Write like a chat message from a teacher, NOT a formal report, article, or PDF.
- STRICTLY AVOID: "#", "##", "###" markdown headers, "---" horizontal dividers,
  markdown tables (| col | col |), emoji used as section markers (📘, ✅❌, 2️⃣3️⃣),
  and excessive bold text.
- Even for notes or structured content, organize using plain text section labels
  followed by a colon (e.g. "Key Concepts:" not "### Key Concepts") and simple
  bullet points (•) or numbered lists (1. 2. 3.) — never tables, never emoji-numbered
  headers, never horizontal rule dividers.
- Bold text only for genuinely key terms/formulas, used sparingly — not entire lines.
- Short paragraphs and clean spacing. The output should look like a well-organized
  chat message, not a formatted document or slide deck.

## GROUNDING IN REFERENCE MATERIAL
- If REFERENCE MATERIAL is provided below, it comes from RAXX AI's verified,
  curated knowledge base — treat it as the most trustworthy source available.
- Prioritize REFERENCE MATERIAL over your own general knowledge. Do not contradict
  it. If it fully answers the question, base your entire answer on it and mention
  the source naturally (e.g. "Source: NCERT Class 10 Maths, Real Numbers").
- If REFERENCE MATERIAL is present but doesn't fully cover the question, use it
  for what it covers and fill the rest from your own knowledge — but don't claim
  a source for the part that isn't grounded.
- If no REFERENCE MATERIAL is provided, answer from your own knowledge as usual,
  without claiming any source.
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
        "doubt": f"Ek student ne doubt pucha hai. Class: {grade}, Language: {language}. Concept ko clearly, ek teacher jaisi natural tarike se samjhao — bina 'Step 1, Step 2' jaisi mechanical numbering ke. Agar student ne apne question mein khud kisi specific board ya exam (jaise JEE, NEET, UPSC, CBSE, ICSE) ka naam liya hai, to usी context ke hisaab se jawab do. Warna board ya exam ka koi bhi zikra mat karo — bas seedha concept explain karo, jaise koi general acha teacher karta hai.",
        "notes": f"Is topic ke liye clean exam-ready notes banao. Board: {board}, Class: {grade}. Key Points, Definitions, Formulas, Exam Tips include karo — lekin plain, simple formatting mein (no markdown headers, no tables, no emoji-section-markers), jaise ek achha teacher apne haath se likhe hue clean notes deta hai.",
        "mocktest": f"Ek MCQ question banao. Board: {board}, Class: {grade}. Format: Question, A) B) C) D), Correct Answer, Explanation.",
        "studyplan": f"Personalized study plan banao. Exam: {board}, Class: {grade}. Har din specific topics aur time batao.",
        "career": f"Class: {grade}, Board: {board} ke student ke liye career guidance do. Neeche diye gaye exact JSON format instructions follow karo — sirf wahi output karo, koi greeting ya extra text mat likho.",
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

    system_prompt = RAXX_SYSTEM_PROMPT
    max_out_tokens = 4000
    if feature in JSON_FEATURES:
        system_prompt = "/no_think\n" + RAXX_SYSTEM_PROMPT
        max_out_tokens = 6000

    try:
        client = get_nvidia_client()

        response = client.chat.completions.create(
            model=MODEL_NAME,
            max_tokens=max_out_tokens,
            temperature=0.4,
            frequency_penalty=0.4,    # repetition rokta hai
            presence_penalty=0.2,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": full_prompt},
            ],
        )

        choice = response.choices[0]
        answer = choice.message.content

        # Agar model ne <think>...</think> tags content ke andar hi bhej diye,
        # unko final answer se clean kar do
        if answer:
            answer = re.sub(r'<think>.*?</think>', '', answer, flags=re.DOTALL).strip()
            # Agar <think> abhi bhi bacha hai matlab wo band hi nahi hua tha
            # (max_tokens beech me hi truncate ho gaya) — aisa reasoning-garbage
            # answer ke bajaye clean error dena behtar hai
            if '<think>' in answer:
                return {
                    "success": False,
                    "error": "Model response truncated during reasoning. Try again or increase max_tokens.",
                }

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

def ask_raxx_ai_stream(
    question: str,
    feature: str = "doubt",
    language: str = "Hindi",
    board: str = "CBSE",
    grade: str = "12",
    subject: str = "",
    extra_context: str = ""
):
    """
    Same as ask_raxx_ai() but streams the answer token-by-token instead of
    waiting for the full response. Yields plain text chunks.
    """
    feature_prompts = {
        "doubt": f"Ek student ne doubt pucha hai. Class: {grade}, Language: {language}. Concept ko clearly, ek teacher jaisi natural tarike se samjhao — bina 'Step 1, Step 2' jaisi mechanical numbering ke. Agar student ne apne question mein khud kisi specific board ya exam (jaise JEE, NEET, UPSC, CBSE, ICSE) ka naam liya hai, to usी context ke hisaab se jawab do. Warna board ya exam ka koi bhi zikra mat karo — bas seedha concept explain karo, jaise koi general acha teacher karta hai.",
        "notes": f"Is topic ke liye clean exam-ready notes banao. Board: {board}, Class: {grade}. Key Points, Definitions, Formulas, Exam Tips include karo — lekin plain, simple formatting mein (no markdown headers, no tables, no emoji-section-markers), jaise ek achha teacher apne haath se likhe hue clean notes deta hai.",
        "mocktest": f"Board: {board}, Class: {grade} ke liye exam-relevant MCQs banao. Neeche diye gaye exact JSON format instructions follow karo — sirf wahi output karo, koi greeting, explanation, ya extra text mat likho.",
        "studyplan": f"Personalized study plan banao. Exam: {board}, Class: {grade}. Har din specific topics aur time batao.",
        "career": f"Class: {grade}, Board: {board} ke student ke liye career guidance do. Neeche diye gaye exact JSON format instructions follow karo — sirf wahi output karo, koi greeting ya extra text mat likho.",
        "code_review": f"Is code ko review karo. Language: {language}. Kya sahi hai, kya improve ho sakta hai, optimized version do.",
        "scholarship": f"Best government scholarships find karo. Board: {board}, Class: {grade}. Naam, eligibility, amount, process batao.",
        "predictor": f"Topic-wise probability batao. Exam: {board}. HIGH CHANCE, MEDIUM CHANCE, LOW CHANCE format mein.",
    }

    feature_instruction = feature_prompts.get(feature, feature_prompts["doubt"])
    if extra_context:
        feature_instruction += f"\n\nExtra Context: {extra_context}"

    rag_context = ""
    if feature == "doubt":
        rag_context = _build_rag_context(question, board, grade, subject)

    full_prompt = f"{SYLLABUS_CONTEXT}\n\n{feature_instruction}{rag_context}\n\nStudent Question: {question}"

    client = get_nvidia_client()

    stream = client.chat.completions.create(
        model=MODEL_NAME,
        max_tokens=4000,
        temperature=0.4,
        frequency_penalty=0.4,
        presence_penalty=0.2,
        messages=[
            {"role": "system", "content": RAXX_SYSTEM_PROMPT},
            {"role": "user", "content": full_prompt},
        ],
        stream=True,
    )

    # Agar model beech-beech mein <think>...</think> bhejta hai, usko user
    # tak pohochne se pehle hi filter kar do
    buffer = ""
    inside_think = False

    for chunk in stream:
        if not chunk.choices:
            continue
        delta = chunk.choices[0].delta.content
        if not delta:
            continue

        buffer += delta

        while True:
            if inside_think:
                end_idx = buffer.find("</think>")
                if end_idx == -1:
                    buffer = ""
                    break
                buffer = buffer[end_idx + len("</think>"):]
                inside_think = False
            else:
                start_idx = buffer.find("<think>")
                if start_idx == -1:
                    if buffer:
                        yield buffer
                    buffer = ""
                    break
                if start_idx > 0:
                    yield buffer[:start_idx]
                buffer = buffer[start_idx + len("<think>"):]
                inside_think = True

    if buffer and not inside_think:
        yield buffer