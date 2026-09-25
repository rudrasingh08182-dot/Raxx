import os
import re
import hashlib
from typing import Optional

from openai import OpenAI
from supabase import create_client

from utils.rag_retrieval import search_knowledge


# ============================================================
# SUPABASE
# ============================================================

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

supabase = None

if SUPABASE_URL and SUPABASE_SERVICE_KEY:
    try:
        supabase = create_client(
            SUPABASE_URL,
            SUPABASE_SERVICE_KEY
        )
    except Exception:
        supabase = None


# ============================================================
# CACHE CONFIG
# ============================================================

CACHEABLE_FEATURES = {
    "doubt",
    "notes",
}


# ============================================================
# GROQ CONFIG
# ============================================================

MODEL_NAME = "openai/gpt-oss-120b"


def get_groq_client():
    return OpenAI(
        api_key=os.getenv("GROQ_API_KEY"),
        base_url=os.getenv(
            "GROQ_BASE_URL",
            "https://api.groq.com/openai/v1"
        ),
        timeout=35,
        max_retries=1,
    )


# ============================================================
# FEATURE CONFIG
# ============================================================

FAST_FEATURES = {
    "mocktest",
    "career",
    "studyplan",
}

LIGHT_REASONING_FEATURES = {
    "doubt",
    "notes",
    "syllabus",
}

RAG_FEATURES = {
    "doubt",
    "notes",
    "syllabus",
}


# ============================================================
# SYSTEM PROMPT
# ============================================================

RAXX_SYSTEM_PROMPT = """
You are RAXX AI, an educational AI assistant for Indian students.

Your job is to provide accurate, clear, useful and student-friendly
educational answers.

GENERAL RULES:
- Be accurate and do not invent facts.
- Explain concepts clearly according to the student's level.
- Use simple language when possible.
- Answer directly without unnecessary filler.
- Use examples when they help understanding.
- For educational questions, prioritize correctness over creativity.
- If reference material from the RAXX database is provided, use it
  as the primary source for information stored in the database.
- Do not claim that information exists in the database if it is not
  present in the provided reference material.
- If the requested database information is not available in the
  reference material, clearly say that it was not found.

LANGUAGE:
- Follow the explicit language instruction provided in the user prompt.
- If Hindi/Hinglish is requested, answer naturally in Hindi/Hinglish.
- If English is requested, answer in English.
- Do not unnecessarily switch languages.

STYLE:
- Be friendly and educational.
- Avoid excessive repetition.
- Use headings, bullets and numbered steps when useful.
- For formulas, code and structured information, use proper formatting.

DATABASE GROUNDING:
When REFERENCE MATERIAL FROM RAXX DATABASE is provided:
- Ground the answer in that material.
- Do not override database-specific information with assumptions.
- If the material is insufficient, say so instead of fabricating missing data.
"""


# ============================================================
# JSON REPAIR
# ============================================================

def _repair_malformed_json(text: str) -> str:
    if not text:
        return text

    text = text.strip()

    # Remove markdown code fences if model wrapped JSON in them
    text = re.sub(
        r"^```(?:json)?\s*",
        "",
        text,
        flags=re.IGNORECASE
    )

    text = re.sub(
        r"\s*```$",
        "",
        text
    )

    return text.strip()


# ============================================================
# CACHE HELPERS
# ============================================================

def _make_cache_key(
    question: str,
    feature: str,
    board: Optional[str] = None,
    grade: Optional[str] = None,
    subject: Optional[str] = None,
    language: str = "en",
) -> str:

    raw = "|".join(
        [
            str(question or "").strip().lower(),
            str(feature or "").strip().lower(),
            str(board or "").strip().lower(),
            str(grade or "").strip().lower(),
            str(subject or "").strip().lower(),
            str(language or "en").strip().lower(),
        ]
    )

    return hashlib.sha256(
        raw.encode("utf-8")
    ).hexdigest()


def _get_cached_answer(cache_key: str):
    if not supabase:
        return None

    try:
        response = (
            supabase
            .table("ai_response_cache")
            .select("response")
            .eq("cache_key", cache_key)
            .limit(1)
            .execute()
        )

        if response.data:
            return response.data[0].get("response")

    except Exception:
        pass

    return None


def _save_cached_answer(
    cache_key: str,
    response_text: str
):
    if not supabase or not response_text:
        return

    try:
        (
            supabase
            .table("ai_response_cache")
            .upsert(
                {
                    "cache_key": cache_key,
                    "response": response_text,
                }
            )
            .execute()
        )

    except Exception:
        pass


# ============================================================
# RAG CONTEXT
# ============================================================

def _build_rag_context(
    question: str,
    board: Optional[str],
    grade: Optional[str],
    subject: str = "",
    top_k: int = 6,
) -> str:

    try:
        level = None

        if grade:
            grade_text = str(grade).strip().lower()

            match = re.search(
                r"(\d+)",
                grade_text
            )

            if match:
                level = f"class-{match.group(1)}"

        results = search_knowledge(
            query=question,
            category="school",
            level=level,
            subject=subject.lower().strip()
            if subject
            else None,
            top_k=top_k,
        )

        if not results:
            return ""

        references = []

        for index, item in enumerate(results, start=1):
            title = (
                item.get("title")
                or item.get("name")
                or f"Reference {index}"
            )

            content = (
                item.get("content")
                or item.get("text")
                or ""
            )

            if not content:
                continue

            references.append(
                f"[Reference {index}]\n"
                f"Title: {title}\n"
                f"{content}"
            )

        if not references:
            return ""

        return (
            "REFERENCE MATERIAL FROM RAXX DATABASE:\n\n"
            + "\n\n".join(references)
        )

    except Exception:
        return ""


# ============================================================
# MESSAGE BUILDER
# ============================================================

def _build_messages(
    full_prompt: str,
    history=None,
):

    messages = [
        {
            "role": "system",
            "content": RAXX_SYSTEM_PROMPT,
        }
    ]

    if history:
        recent_history = history[-2:]

        for item in recent_history:
            if not isinstance(item, dict):
                continue

            question = str(
                item.get("question", "")
            ).strip()

            answer = str(
                item.get("answer", "")
            ).strip()

            if question and answer:
                messages.append(
                    {
                        "role": "user",
                        "content": question[:800],
                    }
                )

                messages.append(
                    {
                        "role": "assistant",
                        "content": answer[:800],
                    }
                )

    messages.append(
        {
            "role": "user",
            "content": full_prompt,
        }
    )

    return messages


# ============================================================
# FEATURE INSTRUCTIONS
# ============================================================

def _get_feature_instruction(feature: str) -> str:

    instructions = {

        "doubt": """
Explain the student's doubt clearly.
Break difficult concepts into simple steps.
If the question requires calculation, show the relevant steps.
""",

        "notes": """
Create concise and useful study notes.
Use headings, bullets and important points.
Keep the notes easy to revise.
""",

        "syllabus": """
Provide the syllabus information requested by the student.
Use the RAXX database reference material when available.
Do not invent chapters or topics that are not present in the
provided database material.
""",

        "mocktest": """
Generate a useful educational mock test.
Keep questions appropriate to the requested level and subject.
""",

        "studyplan": """
Create a practical study plan based on the student's request.
Keep it realistic and easy to follow.
""",

        "career": """
Provide educational career guidance based on the information
available in the question.
Clearly distinguish general information from assumptions.
""",

        "code_review": """
Review the provided code carefully.
Identify actual problems and explain the required fixes clearly.
""",

        "scholarship": """
Provide accurate scholarship-related information based on the
available information.
Do not invent eligibility requirements or deadlines.
""",

        "predictor": """
Analyze the provided information carefully.
Do not present uncertain predictions as guaranteed facts.
""",
    }

    return instructions.get(
        feature,
        "Answer the student's request clearly and accurately."
    )


# ============================================================
# RAG DECISION
# ============================================================

def _should_use_rag(
    feature: str,
    question: str
) -> bool:

    if feature in RAG_FEATURES:
        return True

    knowledge_keywords = {
        "syllabus",
        "chapter",
        "topic",
        "curriculum",
        "book",
        "database",
        "db",
        "stored",
        "knowledge base",
    }

    question_lower = question.lower()

    return any(
        keyword in question_lower
        for keyword in knowledge_keywords
    )


# ============================================================
# REASONING CONFIG
# ============================================================

def _get_reasoning_config(feature: str):

    if feature in FAST_FEATURES:
        return {
            "reasoning_effort": "low",
            "include_reasoning": False,
            "max_completion_tokens": 14000,
        }

    return {
        "reasoning_effort": "low",
        "include_reasoning": False,
        "max_completion_tokens": 4000,
    }


# ============================================================
# THINKING CLEANUP
# ============================================================

def _strip_thinking(text: str) -> str:

    if not text:
        return ""

    text = re.sub(
        r"<think>.*?</think>",
        "",
        text,
        flags=re.DOTALL | re.IGNORECASE,
    )

    text = re.sub(
        r"<analysis>.*?</analysis>",
        "",
        text,
        flags=re.DOTALL | re.IGNORECASE,
    )

    return text.strip()


# ============================================================
# NORMAL AI RESPONSE
# ============================================================

def ask_raxx_ai(
    question: str,
    feature: str = "doubt",
    board: Optional[str] = None,
    grade: Optional[str] = None,
    subject: str = "",
    history=None,
    language: str = "en",
):

    question = (question or "").strip()
    feature = (feature or "doubt").strip().lower()

    # --------------------------------------------------------
    # CACHE
    # --------------------------------------------------------

    cache_key = None

    if feature in CACHEABLE_FEATURES:
        cache_key = _make_cache_key(
            question=question,
            feature=feature,
            board=board,
            grade=grade,
            subject=subject,
            language=language,
        )

        cached = _get_cached_answer(cache_key)

        if cached:
            return cached

    # --------------------------------------------------------
    # FEATURE INSTRUCTION
    # --------------------------------------------------------

    feature_instruction = _get_feature_instruction(
        feature
    )

    # --------------------------------------------------------
    # LANGUAGE INSTRUCTION
    # --------------------------------------------------------

    language_instruction = {
        "hi": "Answer in Hindi/Hinglish as appropriate for the student.",
        "en": "Answer in English.",
    }.get(
        (language or "en").lower(),
        "Answer in the same language used by the student."
    )

    # --------------------------------------------------------
    # RAG
    # --------------------------------------------------------

    rag_context = ""

    if _should_use_rag(
        feature,
        question
    ):
        rag_context = _build_rag_context(
            question,
            board,
            grade,
            subject,
            top_k=8 if feature == "syllabus" else 6,
        )

    # --------------------------------------------------------
    # FINAL PROMPT
    # --------------------------------------------------------

    full_prompt = (
        f"{feature_instruction}\n\n"
        f"{language_instruction}\n\n"
        f"{rag_context}\n\n"
        f"Student Question: {question}"
    )

    messages = _build_messages(
        full_prompt,
        history,
    )

    # --------------------------------------------------------
    # GROQ
    # --------------------------------------------------------

    reasoning_config = _get_reasoning_config(
        feature
    )

    client = get_groq_client()

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=messages,
        reasoning_effort=reasoning_config[
            "reasoning_effort"
        ],
        include_reasoning=reasoning_config[
            "include_reasoning"
        ],
        max_completion_tokens=reasoning_config[
            "max_completion_tokens"
        ],
        temperature=0.2,
        frequency_penalty=0.4,
    )

    answer = ""

    if response.choices:
        answer = (
            response
            .choices[0]
            .message
            .content
            or ""
        )

    answer = _strip_thinking(answer)

    # --------------------------------------------------------
    # STRUCTURED RESPONSE CLEANUP
    # --------------------------------------------------------

    structured_features = {
        "mocktest",
        "predictor",
    }

    if feature in structured_features:
        answer = _repair_malformed_json(
            answer
        )

    # --------------------------------------------------------
    # CACHE SAVE
    # --------------------------------------------------------

    if (
        cache_key
        and answer
        and feature in CACHEABLE_FEATURES
    ):
        _save_cached_answer(
            cache_key,
            answer,
        )

    return answer


# ============================================================
# STREAMING AI RESPONSE
# ============================================================

def ask_raxx_ai_stream(
    question: str,
    feature: str = "doubt",
    board: Optional[str] = None,
    grade: Optional[str] = None,
    subject: str = "",
    history=None,
    language: str = "en",
):

    question = (question or "").strip()
    feature = (feature or "doubt").strip().lower()

    # --------------------------------------------------------
    # CACHE
    # --------------------------------------------------------

    cache_key = None

    if feature in CACHEABLE_FEATURES:
        cache_key = _make_cache_key(
            question=question,
            feature=feature,
            board=board,
            grade=grade,
            subject=subject,
            language=language,
        )

        cached = _get_cached_answer(cache_key)

        if cached:
            yield cached
            return

    # --------------------------------------------------------
    # FEATURE INSTRUCTION
    # --------------------------------------------------------

    feature_instruction = _get_feature_instruction(
        feature
    )

    # --------------------------------------------------------
    # LANGUAGE INSTRUCTION
    # --------------------------------------------------------

    language_instruction = {
        "hi": "Answer in Hindi/Hinglish as appropriate for the student.",
        "en": "Answer in English.",
    }.get(
        (language or "en").lower(),
        "Answer in the same language used by the student."
    )

    # --------------------------------------------------------
    # RAG
    # --------------------------------------------------------

    rag_context = ""

    if _should_use_rag(
        feature,
        question
    ):
        rag_context = _build_rag_context(
            question,
            board,
            grade,
            subject,
            top_k=8 if feature == "syllabus" else 6,
        )

    # --------------------------------------------------------
    # FINAL PROMPT
    # --------------------------------------------------------

    full_prompt = (
        f"{feature_instruction}\n\n"
        f"{language_instruction}\n\n"
        f"{rag_context}\n\n"
        f"Student Question: {question}"
    )

    messages = _build_messages(
        full_prompt,
        history,
    )

    # --------------------------------------------------------
    # GROQ
    # --------------------------------------------------------

    reasoning_config = _get_reasoning_config(
        feature
    )

    client = get_groq_client()

    stream = client.chat.completions.create(
        model=MODEL_NAME,
        messages=messages,
        reasoning_effort=reasoning_config[
            "reasoning_effort"
        ],
        include_reasoning=reasoning_config[
            "include_reasoning"
        ],
        max_completion_tokens=reasoning_config[
            "max_completion_tokens"
        ],
        temperature=0.2,
        frequency_penalty=0.4,
        stream=True,
    )

    # --------------------------------------------------------
    # STREAM RESPONSE
    # --------------------------------------------------------

    final_answer = ""

    try:
        for chunk in stream:

            if not chunk.choices:
                continue

            delta = chunk.choices[0].delta

            content = getattr(
                delta,
                "content",
                None
            )

            if not content:
                continue

            final_answer += content

            cleaned_content = _strip_thinking(
                content
            )

            if cleaned_content:
                yield cleaned_content

    except Exception:
        raise

    # --------------------------------------------------------
    # FINAL CLEANUP
    # --------------------------------------------------------

    final_answer = _strip_thinking(
        final_answer
    )

    structured_features = {
        "mocktest",
        "predictor",
    }

    # FIX:
    # Old:
    # if structured_features:
    #
    # Correct:
    if feature in structured_features:
        final_answer = _repair_malformed_json(
            final_answer
        )

    # --------------------------------------------------------
    # CACHE SAVE
    # --------------------------------------------------------

    if (
        cache_key
        and final_answer
        and feature in CACHEABLE_FEATURES
    ):
        _save_cached_answer(
            cache_key,
            final_answer,
        )