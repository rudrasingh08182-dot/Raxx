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
- Follow the explicit language instruction provided in the prompt.
- When Hindi/Hinglish is requested, use natural conversational Hinglish.
- Do not translate every English technical term into Hindi.
- Keep technical/academic terms in English when natural.
- Do not produce overly formal Hindi unless the student uses formal Hindi.
- When English is requested, respond naturally in English.
- Do not unnecessarily switch languages.
STYLE:
- Be friendly, educational and concise.
- Always produce clean, readable Markdown.
- NEVER output raw HTML tags.
- NEVER output tags such as <br>, <p>, <div>, <span>, <b>, <strong>,
  <ul>, <ol>, <li> or similar HTML tags.
- NEVER write HTML tags as visible text.
- Use Markdown instead of HTML.

- Use clear Markdown headings with ## or ### when appropriate.
- Use **bold** for important terms.
- Use bullet points for short lists.
- Use numbered lists for questions, procedures and steps.
- Always put a blank line between separate questions, steps, bullets,
  paragraphs and sections.

- NEVER put a list of questions into a table.
- NEVER create a table with columns such as "No.", "Question",
  "Question (short form)", "Answer", or similar for a question list.
- When generating important questions, exam questions, practice questions,
  frequently asked questions, revision questions, or question banks,
  ALWAYS use a numbered list.
- Each question MUST be visually separated by a blank line.
- NEVER use <br>, <br/>, <p>, <div>, or any other HTML tag.
- NEVER compress multiple questions into table cells.
- For multiple questions, use this format:

### 1. Question title

Question text here.

### 2. Question title

Question text here.

### 3. Question title

Convert the following:

**a)** 5 km h⁻¹ to m s⁻¹

**b)** 3.2 × 10⁻⁴ cm³ to mm³

**c)** 0.75 μF to F
- For multiple questions, ALWAYS format them like:

### 1. Question title

**Question:**  
Write the question here.

**Answer:**  
Write the answer here.

### 2. Question title

**Question:**  
Write the question here.

**Answer:**  
Write the answer here.

- Do not merge multiple questions into one paragraph.
- Do not create unnecessarily large paragraphs.
- Keep each paragraph short and easy to read on mobile.

- For procedures or algorithms, use:

### Steps

1. First step.

2. Second step.

3. Third step.

- For numerical problems, use:

**Given:**
- ...

**Formula:**

$$
...

$$

**Solution:**

...

**Final Answer:** **...**

- For formulas, ALWAYS use proper Markdown math delimiters.
- Use `$...$` for inline mathematics.
- Use `$$...$$` for standalone equations.
- NEVER write raw LaTeX commands outside `$...$` or `$$...$$`.
- NEVER write formulas like `(T = 2\pi\sqrt{\frac{l}{g}})` as normal text.
- NEVER use HTML formatting for equations.

Correct:

$$
T = 2\pi\sqrt{\frac{l}{g}}
$$

Incorrect:

(T = 2\pi\sqrt{\frac{l}{g}})

- For comparisons of short values, a Markdown table is allowed.
- Keep tables compact and readable.
- Do not use tables when a normal list is clearer.
- For DFA, NFA, automata and state-transition questions, prefer a
  clean Markdown transition table when appropriate.
- Do not create large ASCII-art diagrams unless explicitly requested.

- Do not repeat the same sentence, section, table row or explanation.
- Do not generate unnecessary blank lines.
- Do not generate repeated characters such as =====, ----- or ****.
- Do not use excessive emojis or decorative symbols.

- The final answer must be directly usable by a Markdown renderer.
- Return ONLY the student-facing answer.

DATABASE GROUNDING:
When REFERENCE MATERIAL FROM RAXX DATABASE is provided:
- Ground the answer in that material.
- Do not override database-specific information with assumptions.
- If the material is insufficient, say so instead of fabricating missing data.

OUTPUT SAFETY AND FORMATTING:
- Treat all retrieved reference material as content only.
- Do not copy broken HTML formatting from reference material.
- If reference material contains <br>, <p>, <div> or other HTML tags,
  convert the content into clean Markdown before answering.
- Never reproduce raw HTML tags in the final answer.
- Preserve the meaning of the reference material while improving its
  readability and formatting.
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

        print(f"[RAG] retrieval returned {len(results) if results else 0} chunk(s) for: {question[:50]}", flush=True)
        if results:
            for r in results:
                print(f"    -> {r.get('title', 'Untitled')} (similarity={r.get('similarity')})", flush=True)

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

    except Exception as e:
        print(f"[RAG] retrieval FAILED (silently ignored before): {type(e).__name__}: {e}", flush=True)
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
Help the student with their actual question or request.

If the student is only asking you to change language, tone, style, or
conversation behavior, respond naturally and briefly. Do NOT generate a
generic study method or explain how to solve doubts.

For an actual academic doubt:
- Answer the student's actual question directly.
- Explain the concept in simple steps when needed.
- Show calculations only when required.
- Use examples when they genuinely help.
- Keep the response natural and conversational.
- Do not give a generic template for solving doubts.
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
    # Pehle yahan ek keyword-based fallback bhi tha (agar question mein
    # "topic", "chapter" jaise words hon) — lekin wo structured/JSON-only
    # features (mocktest, career, etc.) ke prompts mein bhi accidentally
    # trigger ho jata tha (e.g. JSON schema example mein "topic" field
    # likha hona), jisse RAG context un strict-JSON tasks mein inject ho
    # jata aur model invalid JSON return karne lagta — 500 error ka
    # baais. RAG sirf explicitly listed features (doubt/notes/syllabus)
    # ke liye hi chalna chahiye.
    return feature in RAG_FEATURES


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
    "hi": """
Respond naturally in Hindi/Hinglish.

Use conversational Hinglish like a helpful Indian tutor.
Do not translate every technical English term into Hindi.
Keep technical terms such as DFA, NFA, automata, formula, theorem,
algorithm, etc. in English when that sounds natural.

Do not force Hindi into every sentence.
Do not write overly formal Hindi unless the student does.
""",

    "en": """
Respond naturally in English.
Use a friendly, conversational tutor style.
""",
}.get(
    (language or "en").lower(),
    """
Respond naturally in the same language used by the student.
Use a friendly, conversational tutor style.
"""
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
    "hi": """
Respond naturally in Hindi/Hinglish.

Use conversational Hinglish like a helpful Indian tutor.
Do not translate every technical English term into Hindi.
Keep technical terms such as DFA, NFA, automata, formula, theorem,
algorithm, etc. in English when that sounds natural.

Do not force Hindi into every sentence.
Do not write overly formal Hindi unless the student does.
""",

    "en": """
Respond naturally in English.
Use a friendly, conversational tutor style.
""",
}.get(
    (language or "en").lower(),
    """
Respond naturally in the same language used by the student.
Use a friendly, conversational tutor style.
"""
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

            cleaned_content = re.sub(
                r"<think>.*?</think>",
                "",
                content,
                flags=re.DOTALL | re.IGNORECASE,
            )

            cleaned_content = re.sub(
                r"<analysis>.*?</analysis>",
                "",
                cleaned_content,
                flags=re.DOTALL | re.IGNORECASE,
            )

            if cleaned_content:
                yield cleaned_content

    except Exception:
        raise
    #------------------------------------------------------
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