# okf_generator.py
# Converts cleaned/chunked/tagged content into OKF-style .md files:
#   - one concept per file
#   - YAML frontmatter (type, title, tags, etc.)
#   - markdown body

import os
import re
import yaml


def slugify(text):
    text = (text or "untitled").lower().strip()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text)
    return text[:60] or "untitled"


def create_okf_file(output_dir, content_text, metadata, index):
    """
    metadata example:
    {
        "category": "school",           # school | competitive-exam | btech-cse
        "subject": "maths",
        "level": "class-10",
        "chapter": 1,
        "chapter_name": "Real Numbers",
        "topic": "Euclid's Division Lemma",
        "tags": ["class10", "maths", "real-numbers"],
        "content_type": "concept"       # concept | formula | solved-example | practice-question | summary
    }
    """
    os.makedirs(output_dir, exist_ok=True)

    frontmatter = {
        "type": "concept",
        "title": metadata.get("topic", "Untitled"),
        "category": metadata.get("category"),
        "subject": metadata.get("subject"),
        "level": metadata.get("level"),
        "chapter": metadata.get("chapter"),
        "chapter_name": metadata.get("chapter_name"),
        "content_type": metadata.get("content_type", "concept"),
        "tags": metadata.get("tags", []),
    }

    slug = slugify(metadata.get("topic"))
    filename = f"{index:02d}-{slug}.md"
    filepath = os.path.join(output_dir, filename)

    yaml_block = yaml.dump(frontmatter, allow_unicode=True, sort_keys=False)
    content = f"---\n{yaml_block}---\n\n{content_text.strip()}\n"

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

    return filepath
