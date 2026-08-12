# backend/utils/rag_retrieval.py
# Live query-time retrieval: embeds the student's question and fetches the
# most relevant chunks from the knowledge_chunks table (built offline by the
# knowledge-pipeline tool).
#
# IMPORTANT: uses a plain REST call to Gemini's embedding endpoint instead of
# the google-generativeai SDK. The SDK pulls in grpc/protobuf/google-api-core,
# which previously broke the Render build (dependency conflicts) — this REST
# call needs only `requests`, already in requirements.txt. No new heavy deps.
#
# Model: gemini-embedding-001 (text-embedding-004 was shut down by Google on
# Jan 14, 2026). output_dimensionality is set to 768 to match the Supabase
# schema (VECTOR(768)) and must be IDENTICAL to whatever the offline ingestion
# pipeline used when embedding the stored chunks — otherwise similarity search
# breaks (different vector spaces).

import os
import requests

GEMINI_EMBED_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent"
EMBED_DIMENSIONS = 768  # must match the dimension used during ingestion + the Supabase column

_supabase = None


def _get_supabase():
    global _supabase
    if _supabase is None:
        from supabase import create_client
        _supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_ANON_KEY"))
    return _supabase


def get_query_embedding(text: str):
    """Embeds a single piece of text via Gemini's REST API. Returns a list of floats, or None on failure."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None

    try:
        response = requests.post(
            GEMINI_EMBED_URL,
            params={"key": api_key},
            json={
                "content": {"parts": [{"text": text}]},
                "outputDimensionality": EMBED_DIMENSIONS,
                "taskType": "RETRIEVAL_QUERY",
            },
            timeout=10,
        )
        response.raise_for_status()
        return response.json()["embedding"]["values"]
    except Exception as e:
        print(f"RAG embedding error: {e}")
        return None


def search_knowledge(query: str, category: str = None, level: str = None,
                      subject: str = None, top_k: int = 5):
    """
    Returns the top_k most relevant knowledge chunks for a query, or an empty
    list if retrieval fails / nothing found / GEMINI_API_KEY not set yet.
    Never raises — callers can safely fall back to answering without context.
    """
    embedding = get_query_embedding(query)
    if embedding is None:
        return []

    try:
        rpc_params = {"query_embedding": embedding, "match_count": top_k}
        if category:
            rpc_params["filter_category"] = category
        if level:
            rpc_params["filter_level"] = level
        if subject:
            rpc_params["filter_subject"] = subject

        result = _get_supabase().rpc("match_knowledge_chunks", rpc_params).execute()
        return result.data or []
    except Exception as e:
        print(f"RAG search error: {e}")
        return []