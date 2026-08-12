# chat_api.py
# The "missing piece" -- wires the knowledge base (Gemini embeddings + Supabase)
# to Claude, which is what actually talks to the user.
#
# Flow for every user message:
#   1. Embed the query with Gemini (retrieval.py)      -- SAME model as ingestion
#   2. Fetch top matching chunks from Supabase
#   3. Send those chunks + the question to Claude       -- generates the final answer
#   4. Return Claude's answer to the user
#
# pip install fastapi uvicorn --break-system-packages
# Run: uvicorn chat_api:app --reload --port 8000

from typing import Optional, List
from fastapi import FastAPI
from pydantic import BaseModel

from retrieval import search_knowledge
from claude_client import generate_answer

app = FastAPI(title="RAXX AI Chat API")


class ChatRequest(BaseModel):
    query: str
    category: Optional[str] = None   # school | competitive-exam | btech-cse
    level: Optional[str] = None      # class-10, ssc-cgl, upsc, sem-5, etc.
    subject: Optional[str] = None    # maths, physics, dsa, polity, etc.
    top_k: int = 5


class ChatResponse(BaseModel):
    answer: str
    sources: List[str]


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    # Step 1 + 2: retrieval (Gemini embedding -> Supabase search)
    chunks = search_knowledge(
        query=req.query,
        category=req.category,
        level=req.level,
        subject=req.subject,
        top_k=req.top_k,
    )

    # Step 3: generation (Claude writes the answer using retrieved context)
    answer = generate_answer(req.query, chunks)

    return ChatResponse(
        answer=answer,
        sources=[c.get("title", "Untitled") for c in chunks],
    )


@app.get("/health")
def health():
    return {"status": "ok"}
