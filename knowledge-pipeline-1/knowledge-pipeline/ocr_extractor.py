# ocr_extractor.py
# OCR-based text extraction for scanned PDFs
#
# System dependencies (Ubuntu/Debian):
#   sudo apt install tesseract-ocr tesseract-ocr-hin poppler-utils
#
# Python dependencies:
#   pip install pytesseract pdf2image --break-system-packages

import pytesseract
from pdf2image import convert_from_path


def extract_text_ocr(pdf_path, lang="eng+hin", dpi=300):
    """OCR-based extraction for scanned PDFs. Supports English + Hindi by default."""
    images = convert_from_path(pdf_path, dpi=dpi)
    full_text = []
    for i, image in enumerate(images):
        text = pytesseract.image_to_string(image, lang=lang)
        full_text.append({"page": i + 1, "text": text})
        print(f"OCR done: page {i + 1}/{len(images)}")
    return full_text


def process_pdf(pdf_path, is_text_based_flag):
    """Router: decides extraction method automatically based on classifier result."""
    if is_text_based_flag:
        from pdf_classifier import extract_text_pdf
        return extract_text_pdf(pdf_path)
    else:
        return extract_text_ocr(pdf_path)
