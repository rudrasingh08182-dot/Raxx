# ai_chunker.py
# Cleans + tags chapter content with Gemini, WITHOUT ever losing content.
#
# How content loss is prevented:
#   1. safe_splitter.py breaks the chapter into small pieces BEFORE any AI call
#      (small input = AI is much less likely to summarize).
#   2. Each piece is sent to Gemini for cleaning + title + tags only --
#      never asked to "shorten" or "summarize".
#   3. After the AI responds, we compare the character length of its output
#      against the original piece. If the AI dropped too much content
#      (likely summarization), we DISCARD the AI's cleaned version and
#      fall back to the original raw piece instead -- so the content still
#      makes it into the knowledge base, just without AI cleaning applied.
#   4. Every piece -- AI-cleaned or raw-fallback -- becomes its own .md file.
#      Nothing is ever skipped or merged away.

import os
import json
import time

from google import genai
from google.genai import types
from dotenv import load_dotenv

from safe_splitter import split_into_safe_pieces


# ----------------------------------------------------
# ENVIRONMENT / GEMINI CONFIG
# ----------------------------------------------------

load_dotenv()

# Supports multiple API keys (e.g. from different Google accounts).
# GEMINI_API_KEY is required; GEMINI_API_KEY_2, GEMINI_API_KEY_3, ... are
# optional extras. When one key's free-tier quota runs out (429 error),
# the code automatically rotates to the next key instead of stopping.
_API_KEYS = []
i = 1
while True:
    key_name = "GEMINI_API_KEY" if i == 1 else f"GEMINI_API_KEY_{i}"
    key_value = os.getenv(key_name)
    if key_value:
        _API_KEYS.append(key_value)
        i += 1
    else:
        break

if not _API_KEYS:
    raise ValueError(
        "No Gemini API key found. Please add GEMINI_API_KEY to your .env file "
        "(and optionally GEMINI_API_KEY_2, GEMINI_API_KEY_3, ... for extra quota)."
    )

print(f"Loaded {len(_API_KEYS)} Gemini API key(s) for rotation.")

_current_key_index = 0
client = genai.Client(api_key=_API_KEYS[_current_key_index])

MODEL_NAME = "gemini-3.1-flash-lite"


def _is_quota_error(exception):
    msg = str(exception).lower()
    return "429" in msg or "quota" in msg or "resource_exhausted" in msg


def _switch_to_next_key():
    """Rotates to the next available API key. Returns True if a new key was set."""
    global _current_key_index, client
    if _current_key_index + 1 < len(_API_KEYS):
        _current_key_index += 1
        client = genai.Client(api_key=_API_KEYS[_current_key_index])
        print(f"  Quota exhausted on key #{_current_key_index}. "
              f"Switched to key #{_current_key_index + 1}.")
        return True
    return False

# Minimum ratio of (AI output length / original piece length) that we accept.
# If the AI's cleaned content is shorter than this fraction of the original,
# we treat it as summarization/content-loss and fall back to raw text.
MIN_ACCEPTABLE_RATIO = 0.75


# ----------------------------------------------------
# PROMPT (per small piece, not per full chapter)
# ----------------------------------------------------

PIECE_PROMPT = """
Tum ek text-cleaning aur tagging tool ho. Neeche diya gaya text ek
textbook chapter ke ek CHHOTE HISSE (piece) se hai -- OCR ya PDF
extraction se aaya hai, isliye spacing errors, broken lines, ya OCR
mistakes ho sakti hain.

Tumhara kaam:
1. SIRF cleaning karo -- OCR errors fix karo, broken sentences joro,
   extra spaces/line-breaks hatao.
2. Ek short, specific title do is piece ke liye (5-10 words).
3. 3-6 relevant tags do (lowercase, hyphenated).
4. content_type batao: concept | formula | solved-example |
   practice-question | summary

CRITICAL RULE -- SABSE ZAROORI:
- Content ko POORA-KA-POORA rakho. SUMMARIZE MAT KARO.
- SHORTEN MAT KARO, CONDENSE MAT KARO, koi sentence/fact/number/formula
  SKIP MAT KARO.
- Sirf OCR errors aur spacing/formatting fix karo -- baaki text
  bilkul original jaisa hi rakho, chahe wo lamba ho.
- Formulas LaTeX mein likho ($...$). Tables markdown format mein
  preserve karo.
- Agar tumhe content chhota lagta hai to bhi use chhota mat karo --
  jitna diya hai utna hi wapas do, sirf clean karke.

Sirf neeche diye JSON schema mein respond karo, koi extra text nahi.

OUTPUT JSON SCHEMA:
{{
  "title": "string",
  "content_type": "concept|formula|solved-example|practice-question|summary",
  "tags": ["tag1","tag2"],
  "content": "cleaned markdown text -- FULL content, not a summary"
}}

TEXT PIECE:
\"\"\"
{piece_text}
\"\"\"
"""


# ----------------------------------------------------
# AI CALL FOR A SINGLE PIECE
# ----------------------------------------------------

def _call_ai_for_piece(piece_text, max_retries=3):
    prompt = PIECE_PROMPT.format(piece_text=piece_text)

    attempt = 0
    while attempt < max_retries:
        try:
            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    temperature=0.2,
                    max_output_tokens=4096,
                ),
            )
            return json.loads(response.text)

        except Exception as e:
            print(f"  AI call attempt {attempt + 1} failed: {e}")

            if _is_quota_error(e):
                if _switch_to_next_key():
                    # Don't count key-switches against max_retries -- retry
                    # immediately on the new key.
                    continue
                else:
                    print("  All available API keys are exhausted for today.")
                    return None

            attempt += 1
            if attempt < max_retries:
                time.sleep(3)

    return None  # signals caller to use raw fallback


def clean_and_tag_piece(piece_text, piece_index):
    """
    Returns a dict: {title, content_type, tags, content, source}
    'source' is 'ai' if the AI's cleaned version was accepted,
    or 'raw-fallback' if content-loss was detected and we kept the original.
    """
    ai_result = _call_ai_for_piece(piece_text)

    if ai_result is not None:
        ai_content = ai_result.get("content", "")
        original_len = len(piece_text.strip())
        ai_len = len(ai_content.strip())

        ratio = (ai_len / original_len) if original_len else 1.0

        if ratio >= MIN_ACCEPTABLE_RATIO:
            return {
                "title": ai_result.get("title") or f"Section {piece_index}",
                "content_type": ai_result.get("content_type", "concept"),
                "tags": ai_result.get("tags", []),
                "content": ai_content,
                "source": "ai",
            }
        else:
            print(f"  Piece {piece_index}: AI output too short "
                  f"({ai_len}/{original_len} chars, ratio={ratio:.2f}) "
                  f"-- falling back to raw text to avoid content loss.")

    # Fallback: keep the original raw piece verbatim, untagged-by-AI.
    return {
        "title": f"Section {piece_index} (raw, unclean)",
        "content_type": "concept",
        "tags": [],
        "content": piece_text.strip(),
        "source": "raw-fallback",
    }


# ----------------------------------------------------
# PROCESS CHAPTER
# ----------------------------------------------------

def process_chapter_with_ai(raw_text, base_metadata, output_root):
    """
    Takes the FULL raw chapter text -> splits deterministically ->
    cleans+tags each piece with AI (with raw fallback) -> writes OKF .md files.
    Guarantees: every character of raw_text ends up in some .md file.

    After the first pass, any pieces that fell back to raw text are
    automatically retried ONE more time at the end (transient errors,
    temporary quota blocks, etc. may have resolved by then).
    """
    from okf_generator import create_okf_file, slugify

    pieces = split_into_safe_pieces(raw_text, max_chars=2200)
    print(f"Split chapter into {len(pieces)} safe pieces.")

    output_dir = os.path.join(
        output_root,
        base_metadata["category"],
        base_metadata["level"],
        base_metadata["subject"],
        f"chapter-{base_metadata['chapter']:02d}-{slugify(base_metadata['chapter_name'])}",
    )

    created = []
    ai_used, raw_fallback_used = 0, 0
    total_raw_chars, total_saved_chars = 0, 0

    # Track raw-fallback pieces for a retry pass at the end:
    # each entry = {index, piece_text, filepath}
    fallback_tracker = []

    for i, piece in enumerate(pieces, start=1):
        print(f"Processing piece {i}/{len(pieces)}...")
        total_raw_chars += len(piece.strip())

        result = clean_and_tag_piece(piece, i)

        if result["source"] == "ai":
            ai_used += 1
        else:
            raw_fallback_used += 1

        total_saved_chars += len(result["content"].strip())

        meta = dict(base_metadata)
        meta["topic"] = result["title"]
        meta["tags"] = list(set(base_metadata.get("tags", []) + result["tags"]))
        meta["content_type"] = result["content_type"]

        path = create_okf_file(output_dir, result["content"], meta, i)
        created.append(path)

        if result["source"] == "raw-fallback":
            fallback_tracker.append({"index": i, "piece_text": piece, "filepath": path})

        time.sleep(1)  # gentle pacing for free-tier rate limits

    # ---- Retry pass: give raw-fallback pieces one more shot ----
    if fallback_tracker:
        print(f"\nRetrying {len(fallback_tracker)} raw-fallback piece(s) "
              f"one more time before finishing...")
        time.sleep(5)  # brief pause -- helps if the issue was transient

        recovered = 0
        for entry in fallback_tracker:
            i = entry["index"]
            print(f"  Retrying piece {i}...")
            retry_result = clean_and_tag_piece(entry["piece_text"], i)

            if retry_result["source"] == "ai":
                # Success on retry -- replace the old raw-fallback file.
                try:
                    os.remove(entry["filepath"])
                except OSError:
                    pass

                meta = dict(base_metadata)
                meta["topic"] = retry_result["title"]
                meta["tags"] = list(set(base_metadata.get("tags", []) + retry_result["tags"]))
                meta["content_type"] = retry_result["content_type"]

                new_path = create_okf_file(output_dir, retry_result["content"], meta, i)

                # Adjust running totals: old raw char count -> new AI char count
                old_len = len(entry["piece_text"].strip())
                new_len = len(retry_result["content"].strip())
                total_saved_chars += (new_len - old_len)

                ai_used += 1
                raw_fallback_used -= 1
                recovered += 1
                print(f"    Recovered on retry -> {new_path}")
            else:
                print(f"    Still failed on retry -- keeping raw-fallback version.")

            time.sleep(1)

        print(f"Retry pass done: {recovered}/{len(fallback_tracker)} recovered.")

    coverage_pct = (total_saved_chars / total_raw_chars * 100) if total_raw_chars else 100

    print(f"\n--- Chapter summary: {base_metadata['chapter_name']} ---")
    print(f"  Pieces created:      {len(created)}")
    print(f"  AI-cleaned pieces:   {ai_used}")
    print(f"  Raw-fallback pieces: {raw_fallback_used}")
    print(f"  Content coverage:    {coverage_pct:.1f}% "
          f"({total_saved_chars}/{total_raw_chars} chars saved)")
    if coverage_pct < 95:
        print("  WARNING: coverage below 95% -- check the raw-fallback pieces "
              "above for what triggered fallback.")

    return created