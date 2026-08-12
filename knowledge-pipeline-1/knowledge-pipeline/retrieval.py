# retrieval.py
# Given a user question, embeds it with the SAME model used during ingestion
# (Gemini text-embedding-004) and fetches the most relevant chunks from Supabase.
#
# IMPORTANT: This step always uses Gemini embeddings, never Claude -- because the
# stored vectors in Supabase were created with Gemini's embedding model. Mixing
# embedding models breaks similarity search (different vector spaces).

from embed_and_upload import get_embedding, supabase


def search_knowledge(query, category=None, level=None, subject=None, top_k=5):
    """
    Returns the top_k most relevant knowledge chunks for a user query.
    Optional filters narrow the search (e.g. only class-10 maths).
    """
    query_embedding = get_embedding(query)

    rpc_params = {
        "query_embedding": query_embedding,
        "match_count": top_k,
    }
    if category:
        rpc_params["filter_category"] = category
    if level:
        rpc_params["filter_level"] = level
    if subject:
        rpc_params["filter_subject"] = subject

    result = supabase.rpc("match_knowledge_chunks", rpc_params).execute()
    return result.data or []


if __name__ == "__main__":
    # Quick manual test
    results = search_knowledge("Euclid's division lemma kya hai?", subject="maths", level="class-10")
    for r in results:
        print(f"[{r['similarity']:.3f}] {r['title']}")
