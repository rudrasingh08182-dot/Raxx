# chunker.py
# Fallback token/heading-based chunker.
# Used only if ai_chunker.py fails or Gemini API is unavailable --
# normally ai_chunker.py is preferred since it also cleans + tags.

import re

try:
    import tiktoken
    enc = tiktoken.get_encoding("cl100k_base")
except ImportError:
    enc = None


def split_by_headings(text):
    """Detect numbered/titled sections e.g. '1.1 Euclid's Division Lemma'"""
    pattern = r'\n(?=\d+\.\d*\s+[A-Z])'
    sections = re.split(pattern, text)
    return [s.strip() for s in sections if len(s.strip()) > 30]


def token_chunk(text, max_tokens=600, overlap=50):
    """Fallback: sliding-window token chunking (word-based if tiktoken missing)."""
    if enc:
        tokens = enc.encode(text)
        chunks = []
        start = 0
        while start < len(tokens):
            end = start + max_tokens
            chunk_tokens = tokens[start:end]
            chunks.append(enc.decode(chunk_tokens))
            start = end - overlap
        return chunks
    else:
        words = text.split()
        chunks = []
        start = 0
        while start < len(words):
            end = start + max_tokens
            chunks.append(" ".join(words[start:end]))
            start = end - overlap
        return chunks


def smart_chunk(text):
    sections = split_by_headings(text)
    if len(sections) <= 1:
        return token_chunk(text)
    final_chunks = []
    for sec in sections:
        token_len = len(enc.encode(sec)) if enc else len(sec.split())
        if token_len > 800:
            final_chunks.extend(token_chunk(sec))
        else:
            final_chunks.append(sec)
    return final_chunks
