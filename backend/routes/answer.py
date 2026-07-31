from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.gemini_helper import ask_raxx_ai
import anthropic
import os
import json

router = APIRouter()

# Image evaluation ke liye direct client zaroori hai (vision feature)
client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

class AnswerImageRequest(BaseModel):
    user_id: str
    image_base64: str
    media_type: str
    question: str
    exam_type: str
    subject: str
    word_limit: int
    marks: int

class QuestionRequest(BaseModel):
    exam_type: str
    subject: str

# ── Image Evaluation — Direct Claude (Vision) — Caching possible nahi ──
@router.post("/answer/evaluate-image")
async def evaluate_answer_image(req: AnswerImageRequest):
    try:
        message = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1500,
            messages=[{
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": req.media_type,
                            "data": req.image_base64,
                        }
                    },
                    {
                        "type": "text",
                        "text": f"""You are an expert examiner for {req.exam_type} examination.

Question: {req.question}
Subject: {req.subject}
Word Limit: {req.word_limit} words
Total Marks: {req.marks}

This image contains a student's handwritten answer. Please:
1. Read the handwritten answer carefully
2. Evaluate it as a strict but fair examiner

Respond in JSON format only:
{{
    "score": <number out of {req.marks}>,
    "rating": "<Excellent|Good|Average|Poor>",
    "handwriting_readable": <true|false>,
    "word_count": <estimated word count>,
    "structure_score": <score out of 10>,
    "content_score": <score out of 10>,
    "language_score": <score out of 10>,
    "what_was_good": "<what student did well>",
    "what_was_missing": "<key points missing>",
    "ideal_answer_points": "<key points that should be in answer>",
    "tips": "<specific tips to improve this answer>",
    "encouragement": "<motivational message in Hindi or English>"
}}"""
                    }
                ]
            }]
        )

        text = message.content[0].text
        text = text.replace("```json", "").replace("```", "").strip()
        result = json.loads(text)

        return {"success": True, "evaluation": result}

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse evaluation. Try again.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── Questions Generate — gemini_helper se (caching automatic!) ──
@router.post("/answer/questions")
async def get_questions(req: QuestionRequest):
    try:
        question = f"""Generate 5 descriptive questions for {req.exam_type} exam, subject: {req.subject}.
Respond in JSON only:
{{
    "questions": [
        {{
            "question": "<question text>",
            "word_limit": <150|200|250>,
            "marks": <5|10|15>,
            "topic": "<topic name>"
        }}
    ]
}}"""

        # gemini_helper se call karo — caching automatic!
        result = ask_raxx_ai(
            question=question,
            feature="mocktest",
            language="english",
            board=req.exam_type,
        )

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        text = result["answer"].replace("```json", "").replace("```", "").strip()
        data = json.loads(text)

        return {
            "success": True,
            "questions": data["questions"],
            "cache_read": result["cache_read"],
            "tokens_used": result["tokens_used"],
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse questions. Try again.")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))