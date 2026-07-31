from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from supabase import create_client
from anthropic import Anthropic
import os
import json
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_ANON_KEY")
)

class SaveScoreRequest(BaseModel):
    student_id: str
    game_name: str
    score: int
    time_taken: int = 0
    difficulty: str = "medium"

class GenerateQuizRequest(BaseModel):
    subject: str = "General Knowledge"
    difficulty: str = "medium"
    num_questions: int = 10

@router.post("/save-score")
def save_score(req: SaveScoreRequest):
    try:
        print(f"Saving score: {req}")
        result = supabase.table("game_scores").insert({
            "student_id": req.student_id,
            "game_name": req.game_name,
            "score": req.score,
            "time_taken": req.time_taken,
            "difficulty": req.difficulty,
        }).execute()

        existing = supabase.table("player_rewards").select("*").eq(
            "student_id", req.student_id
        ).execute()

        coins_earned = req.score * 2

        if existing.data:
            current = existing.data[0]
            supabase.table("player_rewards").update({
                "coins": current["coins"] + coins_earned,
                "total_games": current["total_games"] + 1,
            }).eq("student_id", req.student_id).execute()
        else:
            supabase.table("player_rewards").insert({
                "student_id": req.student_id,
                "coins": coins_earned,
                "total_games": 1,
                "current_streak": 1,
                "badges": []
            }).execute()

        return {
            "status": "success",
            "coins_earned": coins_earned,
        }

    except Exception as e:
        print(f"EXACT ERROR: {e}")  # ← yeh add karo
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/generate-quiz")
def generate_quiz(req: GenerateQuizRequest):
    try:
        prompt = f"""Generate {req.num_questions} quiz questions for a fun educational game.

Subject: {req.subject}
Difficulty: {req.difficulty}

Return ONLY a valid JSON array like this:
[
  {{
    "id": 1,
    "question": "Question here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "explanation": "Brief explanation"
  }}
]

"correct" is the index (0-3) of the correct option.
Make questions fun, educational and exam relevant.
Return ONLY the JSON array, nothing else."""

        message = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=2048,
            messages=[{"role": "user", "content": prompt}]
        )

        response_text = message.content[0].text.strip()

        if response_text.startswith("```"):
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"):
                response_text = response_text[4:]

        questions = json.loads(response_text)

        return {
            "status": "success",
            "questions": questions
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/leaderboard/{game_name}")
def get_leaderboard(game_name: str):
    try:
        result = supabase.table("game_scores").select("*").eq(
            "game_name", game_name
        ).order("score", desc=True).limit(10).execute()

        return {
            "status": "success",
            "leaderboard": result.data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/rewards/{student_id}")
def get_rewards(student_id: str):
    try:
        result = supabase.table("player_rewards").select("*").eq(
            "student_id", student_id
        ).execute()

        if result.data:
            return {"status": "success", "rewards": result.data[0]}
        else:
            return {
                "status": "success",
                "rewards": {
                    "coins": 0,
                    "badges": [],
                    "total_games": 0,
                    "current_streak": 0
                }
            }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))