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
@router.post("/run")
async def run_code(req: RunCodeRequest):
    try:
        language_id = LANGUAGE_IDS.get(req.language.lower())
        if not language_id:
            raise HTTPException(status_code=400, detail="Unsupported language!")

        encoded_code = base64.b64encode(req.code.encode()).decode()
        encoded_stdin = base64.b64encode(req.stdin.encode()).decode() if req.stdin else ""

        headers = {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": os.getenv("JUDGE0_API_KEY"),
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }

        payload = {
            "language_id": language_id,
            "source_code": encoded_code,
            "stdin": encoded_stdin,
            "cpu_time_limit": 5,
            "memory_limit": 256000,
        }

        async with httpx.AsyncClient() as client_http:
            submit_res = await client_http.post(
                "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true",
                json=payload,
                headers=headers,
                timeout=30
            )
            result = submit_res.json()

        output = ""
        error = ""

        if result.get("stdout"):
            output = base64.b64decode(result["stdout"]).decode()
        if result.get("stderr"):
            error = base64.b64decode(result["stderr"]).decode()
        if result.get("compile_output"):
            error = base64.b64decode(result["compile_output"]).decode()

        status = result.get("status", {}).get("description", "Unknown")

        return {
            "status": "success",
            "output": output,
            "error": error,
            "execution_status": status,
            "time": result.get("time", ""),
            "memory": result.get("memory", ""),
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