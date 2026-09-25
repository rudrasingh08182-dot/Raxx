# backend/utils/gemini_helper.py

import os
import re
import hashlib
from typing import Optional

from openai import OpenAI

from supabase import create_client
from utils.rag_retrieval import search_knowledge


# ============================================================
# SUPABASE CACHE
# ============================================================

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_ROLE_KEY"),
)


# ============================================================
# CACHE CONFIG
# ============================================================

CACHEABLE_FEATURES = {
    "doubt",
    "notes",
}


# ============================================================
# GROQ CLIENT
# ============================================================

def get_groq_client():
    """
    Groq OpenAI-compatible client.
    """

    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        raise RuntimeError(
            "GROQ_API_KEY is not configured in environment variables."
        )

    return OpenAI(
        base_url=os.getenv(
            "GROQ_BASE_URL",
            "https://api.groq.com/openai/v1",
        ),
        api_key=api_key,
        timeout=35.0,
        max_retries=1,
    )


# ============================================================
# MODEL
# ============================================================

MODEL_NAME = "openai/gpt-oss-120b"


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


# ============================================================
# RAG CONFIG
# ============================================================

# Features where database knowledge retrieval is useful.
RAG_FEATURES = {
    "doubt",
    "notes",
    "syllabus",
}


# ============================================================
# SYSTEM PROMPT
# ============================================================

RAXX_SYSTEM_PROMPT = """
You are RAXX AI, an Indian educational AI assistant.

You help students with:
* School subjects
* Engineering
* NEET
* UPSC
* SSC
* Railway
* Banking
* Coding
* Career guidance
* Study planning

Language:
* Understand English, Hindi and Hinglish.
* Reply naturally in the student's language.
* If the student uses Hinglish, prefer clear Hinglish.

PERSONALITY:
* Friendly
* Clear
* Encouraging
* Accurate
* Student-focused
* Never unnecessarily verbose

ACCURACY:
* Do not invent facts.
* Do not fabricate chapters, syllabus topics, books, exam patterns,
  formulas or references.
* If you are uncertain, clearly say so.
* Prefer information supplied in REFERENCE MATERIAL when it is relevant.

EDUCATIONAL STYLE:
* Explain concepts step-by-step.
* Use examples when useful.
* Use formulas where appropriate.
* For numerical problems, show the calculation clearly.
* Keep explanations understandable for the student's level.

FORMATTING:
* Use Markdown when useful.
* Use headings for long answers.
* Use bullet points for lists.
* Use numbered steps for procedures.
* Use LaTeX for mathematical formulas when appropriate.

DATABASE GROUNDING:

When REFERENCE MATERIAL is provided:

1. Treat it as the source of truth for information stored in
   the RAXX AI knowledge base.

2. This especially applies to questions about:
   - RAXX syllabus
   - Chapters
   - Topics
   - Curriculum
   - Stored books
   - Stored study material
   - Knowledge-base content
   - Board-specific content

3. Do not replace database content with your own assumed syllabus.

4. Do not invent missing chapters or topics.

5. If the requested information is not present in the
   REFERENCE MATERIAL, clearly say that it was not found
   in the available RAXX knowledge base.

6. Do not claim that something is stored in the database unless
   it is actually present in the provided REFERENCE MATERIAL.

IMPORTANT:
The database retrieval is more authoritative than your general
knowledge when the student asks about RAXX's stored educational content.
"""


# ============================================================
# JSON REPAIR
# ============================================================

def _repair_malformed_json(text: str) -> str:
    """
    Attempts to clean common malformed JSON responses.
    """

    if not text:
        return text

    text = text.strip()

    # Remove markdown code fences
    text = re.sub(r"^```json\s*", "", text, flags=re.IGNORECASE)
    text = re.sub(r"^```\s*", "", text)
    text = re.sub(r"\s*```$", "", text)

    return text.strip()


# ============================================================
# CACHE KEY
# ============================================================

def _make_cache_key(
    feature: str,
    question: str,
    board: Optional[str] = None,
    grade: Optional[str] = None,
    subject: Optional[str] = None,
) -> str:

    raw = "|".join(
        [
            feature or "",
            question or "",
            board or "",
            str(grade or ""),
            subject or "",
        ]
    )

    return hashlib.sha256(
        raw.encode("utf-8")
    ).hexdigest()


# ============================================================
# CACHE GET
# ============================================================

def _get_cached_response(cache_key: str):

    try:
        result = (
            supabase
            .table("ai_response_cache")
            .select("response")
            .eq("cache_key", cache_key)
            .limit(1)
            .execute()
        )

        if result.data:
            return result.data[0].get("response")

    except Exception:
        # Cache failure should never break AI generation.
        pass

    return None


# ============================================================
# CACHE SET
# ============================================================

def _set_cached_response(
    cache_key: str,
    response: str,
):

    try:
        (
            supabase
            .table("ai_response_cache")
            .upsert(
                {
                    "cache_key": cache_key,
                    "response": response,
                }
            )
            .execute()
        )

    except Exception:
        # Cache failure should never break AI generation.
        pass


# ============================================================
# RAG RETRIEVAL
# ============================================================

def _build_rag_context(
    question: str,
    board: Optional[str],
    grade: Optional[str],
    subject: str = "",
    top_k: int = 6,
) -> str:
    """
    Retrieve relevant knowledge from Supabase pgvector.

    The generation model does NOT directly query the database.
    This function retrieves relevant chunks and injects them
    into the model context.
    """

    try:

        level = None

        if grade:
            grade_str = str(grade).strip()

            if grade_str.isdigit():
                level = f"class-{grade_str}"
            else:
                level = grade_str.lower()

        results = search_knowledge(
            query=question,
            category="school",
            level=level,
            subject=subject.lower().strip() if subject else None,
            top_k=top_k,
        )

        if not results:
            return ""

        formatted_chunks = []

        for item in results:

            title = (
                item.get("title")
                or item.get("name")
                or "Knowledge Chunk"
            )

            content = (
                item.get("content")
                or item.get("text")
                or ""
            )

            if not content:
                continue

            formatted_chunks.append(
                f"[{title}]\n{content}"
            )

        if not formatted_chunks:
            return ""

        return (
            "\n\n"
            "==============================\n"
            "REFERENCE MATERIAL FROM RAXX DATABASE\n"
            "==============================\n\n"
            + "\n\n---\n\n".join(formatted_chunks)
            + "\n\n"
            "==============================\n"
            "END REFERENCE MATERIAL\n"
            "==============================\n"
        )

    except Exception as e:

        print(
            f"[RAG] Retrieval failed: {e}"
        )

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

    # Keep only recent conversation context.
    if history:

        recent_history = history[-2:]

        for item in recent_history:

            if not isinstance(item, dict):
                continue

            user_message = (
                item.get("question")
                or item.get("user")
                or item.get("content")
            )

            assistant_message = (
                item.get("answer")
                or item.get("assistant")
                or item.get("response")
            )

            if user_message:

                messages.append(
                    {
                        "role": "user",
                        "content": str(user_message)[:800],
                    }
                )

            if assistant_message:

                messages.append(
                    {
                        "role": "assistant",
                        "content": str(assistant_message)[:800],
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
# FEATURE PROMPTS
# ============================================================

def _get_feature_instruction(
    feature: str,
) -> str:

    feature = (feature or "doubt").lower()

    if feature == "doubt":

        return """
Answer the student's doubt accurately.

If REFERENCE MATERIAL is available and relevant,
use it as the primary source for RAXX-specific content.

Explain the answer step-by-step when useful.
"""

    if feature == "notes":

        return """
Create clear and useful study notes.

If REFERENCE MATERIAL is provided, use it as the
primary source for the requested RAXX knowledge.

Do not add invented chapters or topics.
"""

    if feature == "syllabus":

        return """
The student is asking about syllabus/curriculum information.

IMPORTANT:
If REFERENCE MATERIAL is available, answer from that material.

The student may specifically be asking:
"What syllabus is stored in the RAXX database?"

In that case:
* Return the information actually present in REFERENCE MATERIAL.
* Organize it clearly.
* Mention class, subject, board or chapter information
  when those details are available.
* Do not substitute a generic syllabus from your own knowledge.
* Do not invent missing chapters.
* If the relevant syllabus is not found in REFERENCE MATERIAL,
  say that it was not found in the available RAXX knowledge base.
"""

    if feature == "mocktest":

        return """
Generate a useful educational mock test based on the student's request.

Return valid JSON if the application expects JSON output.

Do not invent database-specific syllabus information
unless it is provided in REFERENCE MATERIAL.
"""

    if feature == "studyplan":

        return """
Create a practical study plan based on the student's request.

Keep it realistic and student-friendly.
"""

    if feature == "career":

        return """
Provide clear educational and career guidance.

Separate factual information from suggestions.
Do not present uncertain information as fact.
"""

    if feature == "code_review":

        return """
Review the supplied code carefully.

Identify:
* Bugs
* Logic issues
* Security problems
* Performance concerns
* Maintainability issues

Give practical fixes.
"""

    if feature == "scholarship":

        return """
Provide factual scholarship-related guidance.

Do not invent eligibility requirements,
deadlines or scholarship details.
"""

    if feature == "predictor":

        return """
Provide a careful prediction/analysis based only on
the information supplied by the student.

Clearly distinguish estimates from facts.
"""

    return """
Answer the student's question clearly and accurately.
"""


# ============================================================
# RAG DECISION
# ============================================================

def _should_use_rag(
    feature: str,
    question: str,
) -> bool:
    """
    Decide whether this request should retrieve knowledge
    from the RAXX database.
    """

    feature = (feature or "").lower()

    if feature in RAG_FEATURES:
        return True

    # Knowledge-base / syllabus style questions can still
    # benefit from retrieval even if another feature name
    # reaches this function.
    knowledge_keywords = [
        "syllabus",
        "chapter",
        "chapters",
        "topic",
        "topics",
        "curriculum",
        "book",
        "books",
        "database",
        "db",
        "stored",
        "knowledge base",
        "knowledgebase",
    ]

    question_lower = (question or "").lower()

    return any(
        keyword in question_lower
        for keyword in knowledge_keywords
    )


# ============================================================
# REASONING CONFIG
# ============================================================

def _get_reasoning_config(
    feature: str,
):

    feature = (feature or "").lower()

    # Fast generation for structured/simple features.
    if feature in FAST_FEATURES:

        return {
            "reasoning_effort": "low",
            "include_reasoning": False,
            "max_completion_tokens": 14000,
        }

    # Light reasoning for educational answers.
    return {
        "reasoning_effort": "low",
        "include_reasoning": False,
        "max_completion_tokens": 4000,
    }


# ============================================================
# THINK TAG CLEANUP
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

    return text.strip()


# ============================================================
# MAIN NON-STREAMING FUNCTION
# ============================================================

def ask_raxx_ai(
    question: str,
    feature: str = "doubt",
    board: Optional[str] = None,
    grade: Optional[str] = None,
    subject: str = "",
    history=None,
):

    question = (question or "").strip()
    feature = (feature or "doubt").lower()

    if not question:
        return "Please provide a question."


    # --------------------------------------------------------
    # CACHE
    # --------------------------------------------------------

    cache_key = None

    if (
        feature in CACHEABLE_FEATURES
        and not history
    ):

        cache_key = _make_cache_key(
            feature=feature,
            question=question,
            board=board,
            grade=grade,
            subject=subject,
        )

        cached = _get_cached_response(
            cache_key
        )

        if cached:
            return cached


    # --------------------------------------------------------
    # FEATURE INSTRUCTION
    # --------------------------------------------------------

    feature_instruction = _get_feature_instruction(
        feature
    )


    # --------------------------------------------------------
    # RAG
    # --------------------------------------------------------

    rag_context = ""

    if _should_use_rag(
        feature=feature,
        question=question,
    ):

        rag_context = _build_rag_context(
            question=question,
            board=board,
            grade=grade,
            subject=subject,
            top_k=8 if feature == "syllabus" else 6,
        )


    # --------------------------------------------------------
    # FINAL PROMPT
    # --------------------------------------------------------

    full_prompt = (
        f"{feature_instruction}\n\n"
        f"{rag_context}\n\n"
        f"Student Question: {question}"
    )


    # --------------------------------------------------------
    # MESSAGES
    # --------------------------------------------------------

    messages = _build_messages(
        full_prompt=full_prompt,
        history=history,
    )


    # --------------------------------------------------------
    # MODEL CONFIG
    # --------------------------------------------------------

    reasoning_config = _get_reasoning_config(
        feature
    )


    # --------------------------------------------------------
    # PENALTIES
    # --------------------------------------------------------

    # Keep JSON/structured features deterministic.
    structured_features = {
        "mocktest",
        "studyplan",
        "predictor",
    }

    frequency_penalty = (
        0.0
        if feature in structured_features
        else 0.4
    )


    # --------------------------------------------------------
    # GROQ CLIENT
    # --------------------------------------------------------

    client = get_groq_client()


    # --------------------------------------------------------
    # GENERATION
    # --------------------------------------------------------

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

        frequency_penalty=frequency_penalty,
    )


    # --------------------------------------------------------
    # RESPONSE
    # --------------------------------------------------------

    answer = response.choices[0].message.content or ""

    answer = _strip_thinking(answer)


    # --------------------------------------------------------
    # JSON CLEANUP
    # --------------------------------------------------------

    if feature in structured_features:

        answer = _repair_malformed_json(
            answer
        )


    # --------------------------------------------------------
    # CACHE SAVE
    # --------------------------------------------------------

    if cache_key and answer:

        _set_cached_response(
            cache_key=cache_key,
            response=answer,
        )


    return answer


# ============================================================
# STREAMING FUNCTION
# ============================================================

def ask_raxx_ai_stream(
    question: str,
    feature: str = "doubt",
    board: Optional[str] = None,
    grade: Optional[str] = None,
    subject: str = "",
    history=None,
):

    question = (question or "").strip()
    feature = (feature or "doubt").lower()

    if not question:
        yield "Please provide a question."
        return
# --------------------------------------------------------
    # CACHE
    # --------------------------------------------------------

    cache_key = None

    if (
        feature in CACHEABLE_FEATURES
        and not history
    ):

        cache_key = _make_cache_key(
            feature=feature,
            question=question,
            board=board,
            grade=grade,
            subject=subject,
        )

        cached = _get_cached_response(
            cache_key
        )

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
    # RAG
    # --------------------------------------------------------

    rag_context = ""

    if _should_use_rag(
        feature=feature,
        question=question,
    ):

        rag_context = _build_rag_context(
            question=question,
            board=board,
            grade=grade,
            subject=subject,
            top_k=8 if feature == "syllabus" else 6,
        )


    # --------------------------------------------------------
    # FINAL PROMPT
    # --------------------------------------------------------

    full_prompt = (
        f"{feature_instruction}\n\n"
        f"{rag_context}\n\n"
        f"Student Question: {question}"
    )


    # --------------------------------------------------------
    # MESSAGES
    # --------------------------------------------------------

    messages = _build_messages(
        full_prompt=full_prompt,
        history=history,
    )


    # --------------------------------------------------------
    # MODEL CONFIG
    # --------------------------------------------------------

    reasoning_config = _get_reasoning_config(
        feature
    )


    structured_features = {
        "mocktest",
        "studyplan",
        "predictor",
    }

    frequency_penalty = (
        0.0
        if feature in structured_features
        else 0.4
    )


    # --------------------------------------------------------
    # GROQ CLIENT
    # --------------------------------------------------------

    client = get_groq_client()


    # --------------------------------------------------------
    # STREAM
    # --------------------------------------------------------

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

        frequency_penalty=frequency_penalty,

        stream=True,
    )


    # --------------------------------------------------------
    # COLLECT RESPONSE FOR CACHE
    # --------------------------------------------------------

    collected = []


    # --------------------------------------------------------
    # STREAM CHUNKS
    # --------------------------------------------------------

    for chunk in stream:

        try:
            delta = chunk.choices[0].delta

            content = getattr(
                delta,
                "content",
                None,
            )

            if not content:
                continue

            content = _strip_thinking(
                content
            )

            if not content:
                continue

            collected.append(content)

            yield content

        except Exception:
            continue


    # --------------------------------------------------------
    # CACHE COMPLETE RESPONSE
    # --------------------------------------------------------

    final_answer = "".join(
        collected
    ).strip()


    if structured_features:

        final_answer = _repair_malformed_json(
            final_answer
        )


    if cache_key and final_answer:

        _set_cached_response(
            cache_key=cache_key,
            response=final_answer,
        )

    