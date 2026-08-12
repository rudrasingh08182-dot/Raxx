# embed_and_upload.py
# Reads generated OKF .md files, generates Gemini embeddings, uploads to Supabase.
# Skips files that are already uploaded (based on source_file), so re-running
# this after adding new chapters only uploads what's new — no duplicates.
#
# API key rotation matches ai_chunker.py exactly:
# - First key must be named GEMINI_API_KEY (no suffix)
# - Extra keys are GEMINI_API_KEY_2, GEMINI_API_KEY_3, ...
# - On a 429/quota error, automatically rotates to the next key.
#
# pip install google-genai supabase python-frontmatter --break-system-packages

import os
import time
import glob
import frontmatter

from google import genai
from google.genai import types
from dotenv import load_dotenv
from supabase import create_client


# ----------------------------------------------------
# ENVIRONMENT / GEMINI CONFIG (identical pattern to ai_chunker.py)
# ----------------------------------------------------

load_dotenv()

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

supabase = create_client(
    os.environ.get("SUPABASE_URL", ""),
    os.environ.get("SUPABASE_SERVICE_KEY", ""),
)


def _is_quota_error(exception):
    msg = str(exception).lower()
    return "429" in msg or "quota" in msg or "resource_exhausted" in msg


def _switch_to_next_key():
    """Rotates to the next available API key. Returns True if a new key was set."""
    global _current_key_index, client
    if _current_key_index + 1 < len(_API_KEYS):
        _current_key_index += 1
        client = genai.Client(api_key=_API_KEYS[_current_key_index])
        print(f" Quota exhausted on key #{_current_key_index}. "
              f"Switched to key #{_current_key_index + 1}.")
        return True
    return False


# ----------------------------------------------------
# EMBEDDING (with rotation)
# ----------------------------------------------------

def get_embedding(text, max_retries=3):
    attempt = 0
    while attempt < max_retries:
        try:
            result = client.models.embed_content(
                model="models/gemini-embedding-001",
                contents=text,
                config=types.EmbedContentConfig(
                    task_type="retrieval_document",
                    output_dimensionality=768,
                ),
            )
            return result.embeddings[0].values

        except Exception as e:
            print(f" Embedding attempt {attempt + 1} failed: {e}")

            if _is_quota_error(e):
                if _switch_to_next_key():
                    # Don't count key-switches against max_retries -- retry
                    # immediately on the new key.
                    continue
                else:
                    raise RuntimeError("All available API keys are exhausted for today.") from e

            attempt += 1
            if attempt < max_retries:
                time.sleep(3)

    raise RuntimeError(f"Embedding failed after {max_retries} attempts")


# ----------------------------------------------------
# UPLOAD LOGIC
# ----------------------------------------------------

def upload_md_file(filepath):
    post = frontmatter.load(filepath)
    content = post.content
    meta = post.metadata

    embedding = get_embedding(content)

    supabase.table("knowledge_chunks").insert(
        {
            "content": content,
            "embedding": embedding,
            "category": meta.get("category"),
            "subject": meta.get("subject"),
            "level": meta.get("level"),
            "chapter": meta.get("chapter"),
            "chapter_name": meta.get("chapter_name"),
            "content_type": meta.get("content_type"),
            "tags": meta.get("tags", []),
            "title": meta.get("title"),
            "source_file": filepath,
        }
    ).execute()


def get_already_uploaded_files():
    """Returns a set of source_file paths that are already in the database.
    Paginated because Supabase caps a single select() at 1000 rows by default —
    without pagination, anything beyond the first 1000 uploaded rows would look
    'missing' and get re-uploaded as a duplicate every time this runs."""
    already = set()
    page_size = 1000
    offset = 0
    try:
        while True:
            result = supabase.table("knowledge_chunks") \
                .select("source_file") \
                .range(offset, offset + page_size - 1) \
                .execute()
            rows = result.data
            if not rows:
                break
            already.update(row["source_file"] for row in rows)
            if len(rows) < page_size:
                break
            offset += page_size
        return already
    except Exception as e:
        print(f"Warning: could not fetch existing uploads ({e}) — proceeding without skip-check")
        return set()


def bulk_upload(root_dir="knowledge-base"):
    md_files = glob.glob(f"{root_dir}/**/*.md", recursive=True)
    already_uploaded = get_already_uploaded_files()

    new_files = [f for f in md_files if f not in already_uploaded]
    skipped = len(md_files) - len(new_files)

    print(f"Found {len(md_files)} total files — {skipped} already uploaded, {len(new_files)} new to upload")

    for idx, filepath in enumerate(new_files, 1):
        try:
            upload_md_file(filepath)
            print(f"[{idx}/{len(new_files)}] Uploaded: {filepath} (using key #{_current_key_index + 1})")
        except Exception as e:
            print(f"FAILED: {filepath} -- {e}")
        time.sleep(1) # gentle pacing to avoid rate limits


if __name__ == "__main__":
    bulk_upload()