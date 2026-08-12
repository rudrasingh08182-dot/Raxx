# course_catalog.py
# Central definition of every course/exam RAXX AI supports.
# Add new exams/branches here ONLY -- batch_pipeline.py reads from this,
# so you never edit pipeline code when adding a new course.

CATALOG = {
    "school": {
        "label": "School (NCERT Class 10-12)",
        "levels": ["class-10", "class-11", "class-12"],
        "subjects": ["Physics", "Chemistry", "Maths", "Biology"],
    },
    "jee-mains": {
        "label": "JEE Mains",
        "levels": ["jee-mains"],
        "subjects": ["Physics", "Chemistry", "Maths"],
    },
    "jee-advanced": {
        "label": "JEE Advanced",
        "levels": ["jee-advanced"],
        "subjects": ["Physics", "Chemistry", "Maths"],
    },
    "neet": {
        "label": "NEET",
        "levels": ["neet"],
        "subjects": ["Physics", "Chemistry", "Biology"],
    },
    "upsc": {
        "label": "UPSC (Civil Services)",
        "levels": ["prelims", "mains"],
        "subjects": [
            "History", "Geography", "Polity", "Economy",
            "Environment", "Science-Tech", "Ethics", "Current-Affairs",
        ],
    },
    "ssc": {
        "label": "SSC (CGL/CHSL etc.)",
        "levels": ["ssc"],
        "subjects": ["Quantitative-Aptitude", "Reasoning", "English", "General-Awareness"],
    },
    "btech-cse": {
        "label": "B.Tech",
        "levels": ["year-1", "year-2", "year-3", "year-4"],
        # subjects here = branches; each branch's actual subjects/topics
        # come from the chapter/folder names themselves.
        "branches": [
            "CSE", "IT", "ECE", "EEE", "Mechanical",
            "Civil", "AI-DS", "Chemical",
        ],
    },
}


def list_categories():
    return list(CATALOG.keys())


def get_category_config(category):
    if category not in CATALOG:
        raise ValueError(f"Unknown category '{category}'. Valid options: {list_categories()}")
    return CATALOG[category]