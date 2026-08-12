# run_pipeline.py
# Master script: run this for ONE chapter PDF at a time.
# Edit the chapter_metadata block at the bottom before each run.

from pdf_classifier import is_text_based, extract_text_pdf
from ocr_extractor import extract_text_ocr
from ai_chunker import process_chapter_with_ai


def run_full_pipeline(pdf_path, chapter_metadata, output_root="knowledge-base"):
    print(f"Step 1: Checking PDF type for {pdf_path}")
    text_based = is_text_based(pdf_path)

    print(f"Step 2: Extracting text (text_based={text_based})")
    if text_based:
        pages = extract_text_pdf(pdf_path)
    else:
        pages = extract_text_ocr(pdf_path)

    full_text = "\n".join(p["text"] for p in pages)

    if not full_text.strip():
        print("WARNING: No text extracted. Check the PDF / OCR setup.")
        return

    print("Step 3: AI cleaning + chunking + tagging (Gemini)")
    created_files = process_chapter_with_ai(full_text, chapter_metadata, output_root)

    print(f"Step 4: Done. {len(created_files)} .md files created in '{output_root}'.")
    print("Next: run 'python embed_and_upload.py' to push these into Supabase.")


if __name__ == "__main__":

    run_full_pipeline(
        pdf_path=r"books\class 11th\Bio\chap 19 CHEMICAL COORDINATION AND INTEGRATION.pdf",
        chapter_metadata={
            "category": "school",          # school | competitive-exam | btech-cse
            "subject": "Biology",
            "level": "class-11",
            "chapter": 19,
            
            "chapter_name":  "CHEMICAL COORDINATION AND INTEGRATION",
            "tags": ["class12", "Biology","CHEMICAL COORDINATION AND INTEGRATION"],
        },
    )
