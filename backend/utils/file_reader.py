# backend/utils/file_reader.py
# Doubt-solver mein attach hui image/PDF se text nikalta hai, taaki wo
# normal RAG + text-model pipeline mein question ke saath ja sake.

import os
import io
import re
import base64
from openai import OpenAI

# Groq pe vision-capable model. Exact ID Groq console (console.groq.com/docs/vision)
# se confirm kar lena; alag ho to Render mein GROQ_VISION_MODEL env var set kar do.
VISION_MODEL = os.getenv("GROQ_VISION_MODEL", "qwen/qwen3.6-27b")
MAX_PDF_CHARS = 12000


def _vision_client():
    return OpenAI(
        api_key=os.getenv("GROQ_API_KEY"),
        base_url=os.getenv("GROQ_BASE_URL", "https://api.groq.com/openai/v1"),
        timeout=45,
        max_retries=1,
    )


def _clean_b64(file_base64):
    # Agar frontend ne "data:...;base64," prefix ke saath bheja ho to hata do
    if file_base64 and file_base64.startswith("data:") and "," in file_base64:
        return file_base64.split(",", 1)[1]
    return file_base64


def read_image(file_base64, mime_type):
    data_uri = f"data:{mime_type};base64,{_clean_b64(file_base64)}"

    prompt = (
        "This image is from a student's study material (textbook page, "
        "question paper or handwritten notes). Transcribe ALL text, questions, "
        "numbers and options exactly as written. Write mathematical formulas "
        "in LaTeX inside $...$. If there is a diagram/figure/graph, describe it "
        "briefly in square brackets. Do NOT solve or explain anything. "
        "Output only the transcription."
    )

    response = _vision_client().chat.completions.create(
        model=VISION_MODEL,
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": prompt},
                {"type": "image_url", "image_url": {"url": data_uri}},
            ],
        }],
        temperature=0.1,
        max_completion_tokens=3000,
    )

    text = ""
    if response.choices:
        text = response.choices[0].message.content or ""

    text = re.sub(r"<think>.*?</think>", "", text, flags=re.DOTALL | re.IGNORECASE)
    return text.strip()


def read_pdf(file_base64):
    from pypdf import PdfReader

    raw = base64.b64decode(_clean_b64(file_base64))
    reader = PdfReader(io.BytesIO(raw))

    parts = []
    total = 0
    for i, page in enumerate(reader.pages, start=1):
        page_text = (page.extract_text() or "").strip()
        if page_text:
            parts.append(f"[Page {i}]\n{page_text}")
            total += len(page_text)
        if total >= MAX_PDF_CHARS:
            break

    return "\n\n".join(parts)[:MAX_PDF_CHARS]


def extract_file_content(file_base64, mime_type):
    """Returns (text, error_message). Success par error None hota hai."""
    mime = (mime_type or "").lower()
    try:
        if mime.startswith("image/"):
            text = read_image(file_base64, mime)
            if not text:
                return "", "Image se text read nahi ho paya. Clear photo ya screenshot dobara upload karo."
            return text, None

        if mime == "application/pdf":
            text = read_pdf(file_base64)
            if not text.strip():
                return "", ("Is PDF mein selectable text nahi mila (shayad scanned PDF hai). "
                            "Abhi scanned PDF read nahi ho sakta. Page ka screenshot image ke roop mein upload karo.")
            return text, None

        return "", "Abhi sirf image (JPG/PNG) aur text-wala PDF supported hai."

    except Exception as e:
        print(f"[file_reader] failed: {type(e).__name__}: {e}", flush=True)
        return "", "File process karte waqt error aaya. Dobara try karo ya chhoti file upload karo."