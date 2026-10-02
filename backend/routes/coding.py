from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.gemini_helper import ask_raxx_ai
import os
import httpx
import base64

router = APIRouter()

LANGUAGE_IDS = {
    "python": 71,
    "javascript": 63,
    "java": 62,
    "c": 50,
    "cpp": 54,
}

class RunCodeRequest(BaseModel):
    code: str
    language: str
    stdin: str = ""

class AITutorRequest(BaseModel):
    question: str
    language: str = ""
    code: str = ""

class CodeReviewRequest(BaseModel):
    code: str
    language: str

# ── Code Runner — Judge0 API (AI nahi, unchanged) ──
# Piston API (emkc.org) — bilkul free, koi API key/signup nahi chahiye.
# Judge0 jaisa 2-step submit+poll nahi, ek hi call mein result mil jata hai.
PISTON_LANGUAGE_MAP = {
    "python": {"language": "python", "version": "3.10.0"},
    "javascript": {"language": "javascript", "version": "18.15.0"},
    "java": {"language": "java", "version": "15.0.2"},
    "c": {"language": "c", "version": "10.2.0"},
    "cpp": {"language": "cpp", "version": "10.2.0"},
}

@router.post("/run")
async def run_code(req: RunCodeRequest):
    try:
        lang_config = PISTON_LANGUAGE_MAP.get(req.language.lower())
        if not lang_config:
            raise HTTPException(status_code=400, detail="Unsupported language!")

        payload = {
            "language": lang_config["language"],
            "version": lang_config["version"],
            "files": [{"content": req.code}],
            "stdin": req.stdin or "",
        }

        async with httpx.AsyncClient() as client_http:
            res = await client_http.post(
                "https://emkc.org/api/v2/piston/execute",
                json=payload,
                timeout=30
            )
            result = res.json()

        run_result = result.get("run", {})
        compile_result = result.get("compile", {})

        output = run_result.get("stdout", "")
        error = run_result.get("stderr", "") or compile_result.get("stderr", "")
        exit_code = run_result.get("code", 0)

        return {
            "status": "success",
            "output": output,
            "error": error,
            "execution_status": "Accepted" if exit_code == 0 and not error else "Runtime Error",
            "time": "",
            "memory": "",
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── AI Tutor — gemini_helper se ──
@router.post("/ai-tutor")
async def ai_tutor(req: AITutorRequest):
    try:
        # Question build karo
        question = req.question
        if req.code:
            question = f"Language: {req.language}\n\nCode:\n```\n{req.code}\n```\n\nQuestion: {req.question}"

        # gemini_helper se call karo — ab ye seedha string return karta hai
        answer = ask_raxx_ai(
            question=question,
            feature="code_review",
            language="en",
        )

        if not answer:
            raise HTTPException(status_code=500, detail="AI se empty response mila. Try again!")

        return {
            "status": "success",
            "explanation": answer,
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── Code Review — gemini_helper se ──
@router.post("/review")
async def review_code(req: CodeReviewRequest):
    try:
        question = f"""Review this {req.language} code and provide:
1. Code Quality Score (out of 10)
2. What the code does
3. Bugs or errors found
4. Suggestions to improve
5. Better version of the code if needed

Code:
```{req.language}
{req.code}
```"""

        # gemini_helper se call karo — ab ye seedha string return karta hai
        answer = ask_raxx_ai(
            question=question,
            feature="code_review",
            language="en",
        )

        if not answer:
            raise HTTPException(status_code=500, detail="AI se empty response mila. Try again!")

        return {
            "status": "success",
            "review": answer,
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))