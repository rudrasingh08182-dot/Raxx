# backend/utils/gemini_helper.py
# RAXX AI — Central AI Helper via Amazon Bedrock (Claude Sonnet 4.6)
# backend/utils/gemini_helper.py
# RAXX AI — Central AI Helper via Anthropic API (Claude)

import anthropic
import os

def get_anthropic_client():
    return anthropic.Anthropic(
        api_key=os.getenv("ANTHROPIC_API_KEY"),
    )

# Update this if Anthropic renames/updates the model string later
MODEL_NAME = "claude-sonnet-4-6"

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

def ask_raxx_ai(
    question: str,
    feature: str = "doubt",
    language: str = "Hindi",
    board: str = "CBSE",
    grade: str = "12",
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

    full_prompt = f"{SYLLABUS_CONTEXT}\n\n{feature_instruction}\n\nStudent Question: {question}"

    try:
        client = get_anthropic_client()

        response = client.messages.create(
            model=MODEL_NAME,
            max_tokens=1500,
            system=[
                {
                    "type": "text",
                    "text": RAXX_SYSTEM_PROMPT,
                    # Caches the system prompt so repeated requests are cheaper/faster.
                    # Needs ANTHROPIC_API_KEY to be a direct Anthropic key (not Bedrock).
                    "cache_control": {"type": "ephemeral"},
                }
            ],
            messages=[
                {
                    "role": "user",
                    "content": full_prompt
                }
            ]
        )

        answer = response.content[0].text

        usage = response.usage
        return {
            "success": True,
            "answer": answer,
            "tokens_used": usage.input_tokens + usage.output_tokens,
            "cache_created": getattr(usage, "cache_creation_input_tokens", 0) or 0,
            "cache_read": getattr(usage, "cache_read_input_tokens", 0) or 0,
        }

    except Exception as e:
        return {
            "success": False,
            "error": f"AI Error: {str(e)}",
        }