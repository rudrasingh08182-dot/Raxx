# add_structured_syllabus.py
# Handles TWO different syllabus document shapes automatically:
#
#   MODE A - "Flat" (JEE Mains/Advanced, NEET style):
#     One subject per PDF, topics under repeated "UNIT 1:", "UNIT 2:" (or
#     "UNIT I:", "UNIT II:") headers.
#
#   MODE B - "Multi-subject university" (AKTU/university syllabus PDFs):
#     ONE PDF contains SEVERAL subjects (e.g. Data Structure, Computer
#     Organization, Discrete Structures...), each with its own "Course
#     Outcome" block followed by a "DETAILED SYLLABUS" table where units
#     are labelled with bare Roman numerals (I, II, III, IV, V).
#
# The script auto-detects which mode a document is in. In BOTH modes, the
# same guarantee applies:
#
#   -> For every subject found, the COMPLETE raw text for that subject is
#      ALWAYS saved as one untouched "full-syllabus" file first, before any
#      splitting happens. This is the safety net: even if unit-level
#      splitting misses something or a unit boundary is misdetected, the
#      complete content still exists and is retrievable as a whole. A
#      query for "the full syllabus" should always be answered from this
#      file, never reconstructed from unit-level chunks.
#
#   -> Unit-level chunks are ADDITIONAL, for granular retrieval, not a
#      replacement for the guarantee file.
#
# Run it with:  python add_structured_syllabus.py

import os
import re

from pdf_classifier import is_text_based, extract_text_pdf
from ocr_extractor import extract_text_ocr
from ai_chunker import clean_and_tag_piece
from okf_generator import create_okf_file, slugify
from course_catalog import CATALOG, list_categories, get_category_config


# ----------------------------------------------------
# MENU
# ----------------------------------------------------

def choose_from_list(prompt, options):
    print(f"\n{prompt}")
    for i, opt in enumerate(options, 1):
        print(f"  {i}. {opt}")
    while True:
        choice = input("Enter number: ").strip()
        if choice.isdigit() and 1 <= int(choice) <= len(options):
            return options[int(choice) - 1]
        print("Invalid choice, try again.")


def run_interactive_menu():
    category_keys = list_categories()
    category_labels = [CATALOG[k]["label"] for k in category_keys]
    chosen_label = choose_from_list("Select category:", category_labels)
    category = category_keys[category_labels.index(chosen_label)]

    config = get_category_config(category)

    branch = None
    default_subject = None
    if category == "btech-cse":
        branch = choose_from_list("Select B.Tech branch:", config["branches"])
        default_subject = input(
            "\nEnter a default subject/course label for this PDF "
            "(e.g. 'Semester 3-4 Core Subjects') -- used only if the PDF "
            "doesn't clearly separate subjects itself: "
        ).strip() or "General"
    else:
        default_subject = choose_from_list("Select subject:", config["subjects"])

    level = choose_from_list("Select level:", config["levels"])

    paper = input(
        "\nEnter paper/exam label (e.g. 'JEE Main Paper 1', "
        "'AKTU B.Tech 2nd Year'), or press Enter to skip: "
    ).strip()

    pdf_path = input("\nEnter path to the syllabus PDF: ").strip()
    while not os.path.isfile(pdf_path):
        print(f"'{pdf_path}' is not a valid file.")
        pdf_path = input("Enter path again: ").strip()

    return {
        "category": category,
        "default_subject": default_subject,
        "level": level,
        "branch": branch,
        "paper": paper,
        "pdf_path": pdf_path,
    }


# ----------------------------------------------------
# MODE DETECTION
# ----------------------------------------------------

COURSE_OUTCOME_PATTERN = re.compile(r"Course\s+Outcome", re.IGNORECASE)
FLAT_UNIT_PATTERN = re.compile(
    r"UNIT[\s\-]*([0-9]+|[IVXLCDM]+)\s*[:\.\-]",
    re.IGNORECASE,
)


def detect_mode(full_text):
    if len(COURSE_OUTCOME_PATTERN.findall(full_text)) >= 1:
        return "multi-subject"
    if len(FLAT_UNIT_PATTERN.findall(full_text)) >= 2:
        return "flat"
    return "none"


# ----------------------------------------------------
# MODE A: FLAT UNIT SPLITTING (JEE/NEET style)
# ----------------------------------------------------

FLAT_UNIT_BLOCK_PATTERN = re.compile(
    r"(UNIT[\s\-]*(?:[0-9]+|[IVXLCDM]+)\s*[:\.\-].*?)(?=UNIT[\s\-]*(?:[0-9]+|[IVXLCDM]+)\s*[:\.\-]|\Z)",
    re.IGNORECASE | re.DOTALL,
)
FLAT_UNIT_TITLE_PATTERN = re.compile(
    r"UNIT[\s\-]*([0-9]+|[IVXLCDM]+)\s*[:\.\-]?\s*(.*)", re.IGNORECASE
)


def split_flat_units(full_text):
    """Returns list of (unit_label, unit_title, unit_text)."""
    blocks = FLAT_UNIT_BLOCK_PATTERN.findall(full_text)
    units = []
    for block in blocks:
        block = block.strip()
        if not block:
            continue
        m = FLAT_UNIT_TITLE_PATTERN.match(block)
        if m:
            label = m.group(1)
            title = m.group(2).strip().split("\n")[0][:100] or f"Unit {label}"
        else:
            label = str(len(units) + 1)
            title = f"Unit {label}"
        units.append((label, title, block))
    return units


# ----------------------------------------------------
# MODE B: MULTI-SUBJECT UNIVERSITY SPLITTING (AKTU style)
# ----------------------------------------------------

# PRIMARY subject anchor: AKTU-style subject headers reliably appear right
# before a "credit structure" line like "3L:0T:0P 3 Credits" or
# "0L:1T:2P 1 Credit" -- e.g. "PROGRAMMING FOR PROBLEM SOLVING 3L:0T:0P 3
# Credits". This is far more reliable than "Course Outcome" text, which can
# appear out of order in PDFs with jumbled multi-column extraction.
CREDIT_LINE_PATTERN = re.compile(
    r"\d\s*[A-Za-z]?\s*:\s*\d\s*[A-Za-z]?\s*:\s*\d\s*[A-Za-z]?\s+\d+\s*Credits?",
    re.IGNORECASE,
)
# Course-code-only lines (e.g. "KCS-101T") shouldn't be picked as the subject
# name -- they precede the real title line.
COURSE_CODE_LINE = re.compile(r"^[A-Z]{2,5}[\s\-]*\d{2,4}[A-Z]?$")
# Page-header/footer boilerplate that sometimes leaks into the subject name
# (e.g. "Curriculum & Evaluation Scheme (I & II semester) Page 21").
NOISE_PREFIX_PATTERN = re.compile(
    r"^.*?(?:Curriculum\s*&?\s*Evaluation\s*Scheme.*?Pa\s*ge\s*\d+)\s*",
    re.IGNORECASE,
)

# Fallback anchor if no credit-line pattern exists in the document at all.
SUBJECT_HEADER_PATTERN = re.compile(
    r"\n\s*([A-Z][A-Za-z0-9 ,&\-/]{2,70}?)\s*\n\s*Course\s+Outcome",
    re.IGNORECASE,
)

ROMAN_UNIT_ROW_PATTERN = re.compile(
    r"(?:^|\n)\s*(I{1,3}|IV|VI{0,3}|IX|X)\s+(?=[A-Z])(.*?)"
    r"(?=\n\s*(?:I{1,3}|IV|VI{0,3}|IX|X)\s+[A-Z]|\n\s*Text\s*books|\Z)",
    re.DOTALL,
)


def _find_credit_line_anchors(full_text):
    """Finds (position, subject_name) pairs anchored on credit-structure
    lines. Looks a bit backward from each match to pull the actual subject
    title, skipping course-code-only lines."""
    anchors = []
    for m in CREDIT_LINE_PATTERN.finditer(full_text):
        window_start = max(0, m.start() - 250)
        window = full_text[window_start:m.start()]
        lines = [l.strip() for l in window.split("\n") if l.strip()]
        candidate_lines = [l for l in lines if not COURSE_CODE_LINE.match(l)]
        if not candidate_lines:
            continue
        title_lines = candidate_lines[-2:]  # title sometimes wraps 2 lines
        subject_name = " ".join(title_lines).strip()
        subject_name = NOISE_PREFIX_PATTERN.sub("", subject_name).strip()
        if len(subject_name) < 3:
            continue
        first_title_line = title_lines[0]
        pos = full_text.rfind(first_title_line, 0, m.start())
        anchors.append((pos if pos != -1 else window_start, subject_name))
    return anchors


def split_subject_blocks(full_text):
    """
    Splits a multi-subject document into (subject_name, subject_text)
    blocks. Tries the credit-line anchor first (most reliable); falls back
    to 'Course Outcome' anchor; falls back to one whole-document block if
    neither is found. Regardless of which path is taken, the FULL text of
    every resulting block is preserved (nothing between anchors is dropped).
    """
    anchors = _find_credit_line_anchors(full_text)
    if not anchors:
        matches = list(SUBJECT_HEADER_PATTERN.finditer(full_text))
        anchors = [(m.start(), m.group(1).strip()) for m in matches]

    if not anchors:
        return [("General", full_text)]

    anchors.sort(key=lambda a: a[0])
    # Merge anchors that are basically the same subject appearing twice in a
    # row with no real content between them (rare, but can happen).
    blocks = []
    for i, (pos, name) in enumerate(anchors):
        end = anchors[i + 1][0] if i + 1 < len(anchors) else len(full_text)
        block_text = full_text[pos:end].strip()
        if len(block_text) < 30:
            continue
        blocks.append((name, block_text))

    # Anything before the first anchor (e.g. a semester summary table) isn't
    # lost -- it just doesn't get its own subject block. If you need that
    # preserved too, run add_syllabus.py on the same PDF once as a catch-all.
    return blocks if blocks else [("General", full_text)]


def split_roman_units(subject_text):
    """
    Within a subject's 'DETAILED SYLLABUS' table, splits rows labelled with
    bare Roman numerals (I, II, III, IV, V...) into (unit_label, unit_text).
    Returns [] if no such table is found -- caller keeps the full subject
    block intact regardless (guarantee file already covers it).
    """
    detail_match = re.search(r"DETAILED\s+SYLLABUS.*", subject_text, re.IGNORECASE | re.DOTALL)
    search_area = detail_match.group(0) if detail_match else subject_text

    rows = ROMAN_UNIT_ROW_PATTERN.findall(search_area)
    units = []
    for label, content in rows:
        content = content.strip()
        if len(content) < 15:  # skip accidental short/false matches
            continue
        units.append((label, content))
    return units


# ----------------------------------------------------
# SAVE HELPERS
# ----------------------------------------------------

def save_full_guarantee_file(text, category, subject, level, branch, paper,
                              output_root, extra_tag=""):
    base_tags = [category, subject.lower().replace(" ", "-"), level, "syllabus"]
    if branch:
        base_tags.append(branch.lower())
    if paper:
        base_tags.append(paper.lower().replace(" ", "-"))
    if extra_tag:
        base_tags.append(extra_tag)

    subject_slug = slugify(f"{subject}-{paper}" if paper else subject)
    output_dir = os.path.join(output_root, category, level, subject_slug, "syllabus")

    meta = {
        "category": category,
        "subject": subject,
        "level": level,
        "chapter": 0,
        "chapter_name": f"{subject} Full Syllabus" + (f" ({paper})" if paper else ""),
        "content_type": "full-syllabus",
        "tags": base_tags,
        "topic": f"Complete {subject} Syllabus" + (f" - {paper}" if paper else ""),
    }
    if branch:
        meta["branch"] = branch
    if paper:
        meta["paper"] = paper

    path = create_okf_file(output_dir, text.strip(), meta, 0)
    return path, output_dir, base_tags


def save_unit_file(unit_label, unit_title_or_hint, unit_text, unit_index, total_units,
                    category, subject, level, branch, paper, output_dir, base_tags):
    result = clean_and_tag_piece(unit_text, unit_label)

    meta = {
        "category": category,
        "subject": subject,
        "level": level,
        "chapter": unit_index,
        "chapter_name": f"Unit {unit_label}: {unit_title_or_hint}"[:150],
        "content_type": "syllabus-unit",
        "topic": result["title"] or f"Unit {unit_label}",
        "tags": list(set(base_tags + result.get("tags", []) + [f"unit-{unit_label}"])),
        "unit_number": unit_label,
        "total_units": total_units,
    }
    if branch:
        meta["branch"] = branch
    if paper:
        meta["paper"] = paper

    return create_okf_file(output_dir, result["content"], meta, unit_index)


# ----------------------------------------------------
# MAIN INGEST
# ----------------------------------------------------

def run_structured_ingest(selection, output_root="knowledge-base"):
    category = selection["category"]
    default_subject = selection["default_subject"]
    level = selection["level"]
    branch = selection["branch"]
    paper = selection["paper"]
    pdf_path = selection["pdf_path"]

    print(f"\nStep 1: Checking PDF type for {pdf_path}")
    text_based = is_text_based(pdf_path)

    print(f"Step 2: Extracting text (text_based={text_based})")
    pages = extract_text_pdf(pdf_path) if text_based else extract_text_ocr(pdf_path)
    full_text = "\n".join(p["text"] for p in pages)

    if not full_text.strip():
        print("WARNING: No text extracted. Check the PDF / OCR setup.")
        return

    mode = detect_mode(full_text)
    print(f"Step 3: Detected format -> {mode.upper()}")

    if mode == "multi-subject":
        subject_blocks = split_subject_blocks(full_text)
        print(f"Found {len(subject_blocks)} subject(s) in this document.")

        for subject_name, subject_text in subject_blocks:
            subject = subject_name or default_subject
            print(f"\n--- Subject: {subject} ---")

            full_path, output_dir, base_tags = save_full_guarantee_file(
                subject_text, category, subject, level, branch, paper, output_root
            )
            print(f"  Saved COMPLETE subject syllabus (guaranteed) -> {full_path}")

            units = split_roman_units(subject_text)
            if not units:
                print("  No unit table detected -- full-subject file above still has everything.")
                continue

            print(f"  Found {len(units)} unit(s). Cleaning + saving each...")
            for idx, (label, content) in enumerate(units, start=1):
                # Use a short snippet of the actual content as the title hint
                # instead of a generic "Unit X" string, so chapter_name
                # doesn't end up duplicated (e.g. "Unit I: Unit I").
                content_hint = content.strip().split("\n")[0][:70]
                path = save_unit_file(
                    label, content_hint, content, idx, len(units),
                    category, subject, level, branch, paper, output_dir, base_tags
                )
                print(f"    [{idx}/{len(units)}] Unit {label} -> {path}")

    elif mode == "flat":
        subject = default_subject
        full_path, output_dir, base_tags = save_full_guarantee_file(
            full_text, category, subject, level, branch, paper, output_root
        )
        print(f"Saved COMPLETE syllabus (guaranteed) -> {full_path}")

        units = split_flat_units(full_text)
        if not units:
            print("No UNIT markers found -- full-syllabus file above still has everything.")
            return

        print(f"Found {len(units)} units. Cleaning + saving each...")
        for idx, (label, title, content) in enumerate(units, start=1):
            path = save_unit_file(
                label, title, content, idx, len(units),
                category, subject, level, branch, paper, output_dir, base_tags
            )
            print(f"  [{idx}/{len(units)}] Unit {label}: {title} -> {path}")

    else:
        # No recognizable structure at all -- still guarantee the content is saved.
        subject = default_subject
        full_path, _, _ = save_full_guarantee_file(
            full_text, category, subject, level, branch, paper, output_root
        )
        print(f"No UNIT or Course Outcome structure detected. "
              f"Saved as a single complete file -> {full_path}")

    print("\nDone. Next: run 'python embed_and_upload.py' to push these into Supabase.")


if __name__ == "__main__":
    selection = run_interactive_menu()
    run_structured_ingest(selection)