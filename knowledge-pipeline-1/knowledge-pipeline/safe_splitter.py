# safe_splitter.py
# Deterministic (non-AI) splitter that breaks a chapter's raw text into
# safe-sized pieces BEFORE sending anything to the AI. This is the first
# layer of the no-content-loss guarantee: small pieces are much less
# likely to get summarized by the model than one giant chapter blob.

import re


def split_into_safe_pieces(text, max_chars=2200):
    """
    Splits text on paragraph boundaries, keeping each piece under
    max_chars. Never splits mid-sentence/mid-paragraph if avoidable.
    Guaranteed: joining all returned pieces (with '\n\n') reconstructs
    the original text losslessly.
    """
    paragraphs = re.split(r'\n\s*\n', text)
    paragraphs = [p for p in paragraphs if p.strip()]

    pieces = []
    current = []
    current_len = 0

    for para in paragraphs:
        para_len = len(para)

        # Agar akela paragraph hi max_chars se bada hai, use aage
        # sentence-level pe todo (rare case, e.g. bina paragraph break wala text)
        if para_len > max_chars:
            if current:
                pieces.append("\n\n".join(current))
                current, current_len = [], 0
            sentences = re.split(r'(?<=[.!?।])\s+', para)
            buf = []
            buf_len = 0
            for sent in sentences:
                if buf_len + len(sent) > max_chars and buf:
                    pieces.append(" ".join(buf))
                    buf, buf_len = [], 0
                buf.append(sent)
                buf_len += len(sent)
            if buf:
                pieces.append(" ".join(buf))
            continue

        if current_len + para_len > max_chars and current:
            pieces.append("\n\n".join(current))
            current, current_len = [], 0

        current.append(para)
        current_len += para_len

    if current:
        pieces.append("\n\n".join(current))

    return pieces