# interview_retrieval.py
# Query-time retrieval for the interview_questions table — same pattern as
# rag_retrieval.py, but for mock-interview question generation.
#
# NOTE: No hard company/role DB filter here on purpose. Uploaded guides don't
# always map 1:1 onto the frontend's company/role picklists (e.g. a "General"
# AI Engineer guide covers Google/Microsoft/Meta all at once, and role names
# can differ slightly like "AI Engineer" vs "AI/ML Engineer"). Semantic
# similarity handles relevance instead of exact string matching.

import os
import requests
from supabase import create_client

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_KEY") or os.getenv("SUPABASE_ANON_KEY"),
)

GEMINI_EMBED_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent"
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
EMBED_DIMENSIONS = 768


def get_query_embedding(text: str):
    try:
        resp = requests.post(
            f"{GEMINI_EMBED_URL}?key={GEMINI_API_KEY}",
            json={
                "model": "models/gemini-embedding-001",
                "content": {"parts": [{"text": text}]},
                "taskType": "RETRIEVAL_QUERY",
                "outputDimensionality": EMBED_DIMENSIONS,
            },
            timeout=10,
        )
        resp.raise_for_status()
        return resp.json()["embedding"]["values"]
    except Exception as e:
        print(f"[interview_retrieval] Embedding failed: {e}", flush=True)
        return None


def search_interview_questions(company: str, role: str, top_k: int = 8):
    query_text = f"{role} interview questions at {company}"
    embedding = get_query_embedding(query_text)
    if not embedding:
        return []

    try:
        result = supabase.rpc("match_interview_questions", {
            "query_embedding": embedding,
            "match_count": top_k,
        }).execute()
        return result.data or []
    except Exception as e:
        print(f"[interview_retrieval] Search failed: {e}", flush=True)
        return []