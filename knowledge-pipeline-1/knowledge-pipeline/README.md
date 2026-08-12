# RAXX AI - Knowledge Pipeline + Chat Wiring

Two connected parts:

1. **Ingestion pipeline** -- PDF chapter -> OKF-style `.md` files -> Gemini embeddings -> Supabase
2. **Chat wiring** -- user question -> Gemini retrieval -> Claude generates the answer

Model split (no conflict, each does one job):

| Task | Model | File |
|---|---|---|
| Embedding content during ingestion | Gemini (`text-embedding-004`) | `embed_and_upload.py` |
| Embedding the user's query at search time | Gemini (`text-embedding-004`) -- MUST match ingestion model | `retrieval.py` |
| Writing the final answer shown to the user | Claude | `claude_client.py` |

## Setup (once)

```bash
pip install -r requirements.txt --break-system-packages
```

System-level (Ubuntu/Debian) OCR dependencies:
```bash
sudo apt install tesseract-ocr tesseract-ocr-hin poppler-utils
```

1. Copy `.env.example` to `.env`, fill in `GEMINI_API_KEY`, `ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`.
2. Run `supabase_schema.sql` in the Supabase SQL editor (creates table + search function).

## Part A -- Ingest a chapter (repeat per chapter)

1. Put the PDF in `books/`.
2. Edit the `chapter_metadata` block at the bottom of `run_pipeline.py` (subject, level, chapter, chapter_name, tags).
3. Run:
   ```bash
   python run_pipeline.py
   ```
   This produces `.md` files in `knowledge-base/`.
4. Upload to Supabase:
   ```bash
   python embed_and_upload.py
   ```

Old PDFs in `books/` do NOT need to be deleted -- only the file path you pass to `run_pipeline.py` gets processed.

## Part B -- Serve answers to users (Claude)

Start the chat API:
```bash
uvicorn chat_api:app --reload --port 8000
```

Test it:
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "Euclid ka division lemma kya hai?", "subject": "maths", "level": "class-10"}'
```

Response:
```json
{
  "answer": "...(Claude's explanation, grounded in the retrieved chunks)...",
  "sources": ["Euclid's Division Lemma", "..."]
}
```

Wire your existing RAXX AI frontend to call this `/chat` endpoint instead of calling Claude directly --
that's what makes the chatbot "grounded" in your knowledge base instead of Claude's general knowledge.

## File-by-file explanation

| File | Kaam karta hai |
|---|---|
| `pdf_classifier.py` | PDF text-based hai ya scanned, check karta hai |
| `ocr_extractor.py` | Scanned PDF se OCR ke through text nikaalta hai |
| `ai_chunker.py` | Gemini API se raw text ko clean + topic-wise chunks + tags mein convert karta hai |
| `chunker.py` | Fallback regex/token-based chunker (agar AI available na ho) |
| `okf_generator.py` | Chunks ko OKF-style `.md` files mein likhta hai (YAML frontmatter + body) |
| `embed_and_upload.py` | `.md` files padhta hai, Gemini embeddings banata hai, Supabase mein upload karta hai |
| `run_pipeline.py` | Ingestion master script -- ek PDF chapter process karta hai |
| `retrieval.py` | User query ko Gemini se embed karke Supabase se relevant chunks fetch karta hai |
| `claude_client.py` | Retrieved chunks + query ko Claude ko bhejta hai, final answer generate karta hai |
| `chat_api.py` | FastAPI server -- retrieval + Claude ko jodta hai, `/chat` endpoint deta hai |
| `supabase_schema.sql` | Supabase table + vector search function (ek baar chalana hai) |

## Content source warning

Sirf public/open sources use karo -- NCERT, official govt exam syllabus/notifications, ya apne khud
ke original notes. Copyrighted coaching material (Lucent, Allen, Aakash, ya kisi bhi private publisher
ki books) scan/OCR karke pipeline mein daalna copyright violation hai, chahe format badal diya jaaye.
Us topic ka fresh explanation Gemini/Claude se khud generate karwao, copyrighted text se extract mat karo.

## Note on scale

Ek run = ek chapter. Agle chapter ke liye `run_pipeline.py` mein metadata badal ke phir se chalao.
Bulk/batch processing (ek saath kai PDFs) ke liye alag manifest-based script chahiye hoga --
abhi ye single-PDF version hai, testing/shuru karne ke liye recommended.
