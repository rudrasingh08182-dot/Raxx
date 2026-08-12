# pdf_classifier.py
# Checks whether a PDF is text-based, and extracts text page-by-page using
# a 3-tier fallback so content is (almost) never lost, while keeping the
# common case fast:
#
#   Tier 1: pypdf            -- fast, works for most normal text pages
#   Tier 2: pdfplumber        -- slower but more robust layout parsing
#   Tier 3: OCR (single page) -- last resort for corrupt/odd pages
#
# Only if ALL THREE fail is a page flagged for manual attention --
# and even then its (empty) slot is clearly marked, never silently dropped.

import concurrent.futures
import pdfplumber

PYPDF_TIMEOUT = 15
PDFPLUMBER_TIMEOUT = 15
OCR_TIMEOUT = 30
OCR_DPI = 200  # lower DPI = faster single-page OCR fallback


def is_text_based(pdf_path, sample_pages=3):
    """Check first N pages -- agar extractable text hai to text-based PDF maana jayega."""
    with pdfplumber.open(pdf_path) as pdf:
        pages_to_check = pdf.pages[:sample_pages]
        total_chars = 0
        for page in pages_to_check:
            text = page.extract_text() or ""
            total_chars += len(text.strip())
        if len(pages_to_check) == 0:
            return False
        return (total_chars / len(pages_to_check)) > 100


def _run_with_timeout(fn, timeout):
    """Runs fn() in a worker thread, raises TimeoutError if it exceeds timeout."""
    with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
        future = executor.submit(fn)
        return future.result(timeout=timeout)


def _try_pypdf_page(reader, page_index):
    page = reader.pages[page_index]
    text = page.extract_text() or ""
    return text


def _try_pdfplumber_page(pdf_path, page_index):
    with pdfplumber.open(pdf_path) as pdf:
        page = pdf.pages[page_index]
        return page.extract_text() or ""


def _try_ocr_page(pdf_path, page_index):
    from pdf2image import convert_from_path
    import pytesseract

    images = convert_from_path(
        pdf_path,
        dpi=OCR_DPI,
        first_page=page_index + 1,
        last_page=page_index + 1,
    )
    if not images:
        return ""
    return pytesseract.image_to_string(images[0], lang="eng+hin")


def extract_text_pdf(pdf_path):
    """
    Extracts text from every page using the 3-tier fallback chain.
    Returns a list of {"page": N, "text": "...", "method": "pypdf|pdfplumber|ocr|FAILED"}.
    Prints progress and a final report so nothing is silently lost.
    """
    from pypdf import PdfReader

    reader = PdfReader(pdf_path)
    total_pages = len(reader.pages)
    print(f"  Extracting {total_pages} pages (tiered: pypdf -> pdfplumber -> OCR)...")

    full_text = []
    method_counts = {"pypdf": 0, "pdfplumber": 0, "ocr": 0, "FAILED": 0}
    failed_pages = []

    for i in range(total_pages):
        text, method = "", None

        # Tier 1: pypdf (fast path)
        try:
            text = _run_with_timeout(lambda: _try_pypdf_page(reader, i), PYPDF_TIMEOUT)
            if text.strip():
                method = "pypdf"
        except Exception:
            pass

        # Tier 2: pdfplumber (slower, more robust)
        if method is None:
            try:
                text = _run_with_timeout(lambda: _try_pdfplumber_page(pdf_path, i), PDFPLUMBER_TIMEOUT)
                if text.strip():
                    method = "pdfplumber"
            except Exception:
                pass

        # Tier 3: OCR this single page (last resort)
        if method is None:
            try:
                text = _run_with_timeout(lambda: _try_ocr_page(pdf_path, i), OCR_TIMEOUT)
                if text.strip():
                    method = "ocr"
            except Exception:
                pass

        if method is None:
            method = "FAILED"
            failed_pages.append(i + 1)

        method_counts[method] += 1
        full_text.append({"page": i + 1, "text": text, "method": method})

        if (i + 1) % 5 == 0 or (i + 1) == total_pages or method in ("pdfplumber", "ocr", "FAILED"):
            print(f"    page {i + 1}/{total_pages} -> {method}")

    print(f"\n  Extraction summary: pypdf={method_counts['pypdf']}, "
          f"pdfplumber={method_counts['pdfplumber']}, ocr={method_counts['ocr']}, "
          f"FAILED={method_counts['FAILED']}")

    if failed_pages:
        print(f"  WARNING: pages {failed_pages} could not be extracted by any method.")
        print("  These need manual attention -- paste/OCR them yourself and add as a "
              "manual OKF .md file (ask me and I'll generate it for you from the page).")
    else:
        print("  All pages extracted successfully -- no content lost.")

    return full_text


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        path = sys.argv[1]
        text_based = is_text_based(path)
        print(f"{path} -> text_based = {text_based}")