# claude_client.py
# Wraps calls to the Claude API. This is the ONLY model that talks to the user --
# Gemini never generates the final answer, it's only used for embeddings/retrieval.
#
# pip install anthropic --break-system-packages

import os
from anthropic import Anthropic

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY", ""))

SYSTEM_PROMPT = """Tum RAXX AI ho, ek study assistant jo Indian students ko
Class 10-12, competitive exams (SSC, UPSC), aur B.Tech CSE ke topics mein
madad karta hai.

Neeche diya gaya CONTEXT student ki knowledge base se retrieve kiya gaya hai.
Apna jawab SIRF is context ke aadhar par do. Agar context mein answer nahi
milta, to saaf keh do ki ye information knowledge base mein available nahi
hai -- kabhi facts mat banao (hallucinate mat karo).

Jawab clear, simple Hinglish mein do, jaisa ek achha tutor deta hai."""


def generate_answer(user_query, retrieved_chunks, model="claude-sonnet-5", max_tokens=1024):
    """
    retrieved_chunks: list of dicts from retrieval.search_knowledge()
                       each with at least a 'content' and 'title' key
    """
    if retrieved_chunks:
        context_text = "\n\n---\n\n".join(
            f"[{c.get('title', 'Untitled')}]\n{c.get('content', '')}"
            for c in retrieved_chunks
        )
    else:
        context_text = "(No relevant content found in knowledge base.)"

    user_message = f"""CONTEXT:
{context_text}

STUDENT'S QUESTION:
{user_query}"""

    response = client.messages.create(
        model=model,
        max_tokens=max_tokens,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_message}],
    )

    return response.content[0].text
