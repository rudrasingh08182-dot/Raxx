from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from utils.pdf_generator import generate_monthly_report
import os
from supabase import create_client
from datetime import datetime

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

class ReportRequest(BaseModel):
    user_id: str
    month: str  # "June 2026"

@router.post("/report/generate")
async def generate_report(req: ReportRequest):
    try:
        # ── GET USER DATA ──
        user = supabase.table("users")\
            .select("*")\
            .eq("id", req.user_id)\
            .single()\
            .execute()

        if not user.data:
            raise HTTPException(status_code=404, detail="User not found")

        u = user.data

        # ── GET DOUBT COUNT ──
        doubts = supabase.table("doubt_history")\
            .select("id")\
            .eq("user_id", req.user_id)\
            .execute()

        # ── GET NOTES COUNT ──
        notes = supabase.table("notes_history")\
            .select("id")\
            .eq("user_id", req.user_id)\
            .execute()

        # ── GET MOCK TESTS ──
        tests = supabase.table("mock_tests")\
            .select("*")\
            .eq("user_id", req.user_id)\
            .execute()

        mock_tests = []
        for t in (tests.data or []):
            mock_tests.append({
                "subject": t.get("subject", "General"),
                "score":   t.get("score", 0),
                "total":   t.get("total_questions", 10) * 10,
                "date":    t.get("created_at", "")[:10],
            })

        # ── GET GAME STATS ──
        games = supabase.table("game_scores")\
            .select("*")\
            .eq("user_id", req.user_id)\
            .execute()

        # ── GET REWARDS ──
        rewards = supabase.table("player_rewards")\
            .select("*")\
            .eq("user_id", req.user_id)\
            .single()\
            .execute()

        # ── GET HOMEWORK ──
        homework = supabase.table("homework_submissions")\
            .select("id")\
            .eq("student_id", req.user_id)\
            .execute()

        # ── BUILD STUDENT DATA ──
        student_data = {
            "name":                 u.get("name", "Student"),
            "email":                u.get("email", ""),
            "class":                u.get("class_name", "—"),
            "board":                u.get("board", "—"),
            "month":                req.month,
            "plan":                 u.get("plan", "Free"),
            "doubts_asked":         len(doubts.data or []),
            "notes_generated":      len(notes.data or []),
            "mock_tests":           mock_tests,
            "games_played":         len(games.data or []),
            "coins_earned":         (rewards.data or {}).get("coins", 0),
            "study_streak":         (rewards.data or {}).get("streak", 0),
            "homework_submitted":   len(homework.data or []),
            "top_subjects":         ["Math", "Science"],
            "weak_subjects":        ["History"],
            "ai_recommendation":    "Keep practicing mock tests daily. Focus on weak subjects and maintain your study streak!",
        }

        # ── GENERATE PDF ──
        os.makedirs("reports", exist_ok=True)
        filename = f"reports/report_{req.user_id[:8]}_{req.month.replace(' ', '_')}.pdf"
        path = generate_monthly_report(student_data, filename)

        # ── SAVE RECORD IN SUPABASE ──
        supabase.table("monthly_reports").insert({
            "user_id":    req.user_id,
            "month":      req.month,
            "file_path":  path,
            "created_at": datetime.utcnow().isoformat(),
        }).execute()

        return FileResponse(
            path,
            media_type="application/pdf",
            filename=f"RAXX_AI_Report_{req.month.replace(' ', '_')}.pdf"
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── GET REPORT HISTORY ──
@router.get("/report/history/{user_id}")
async def get_report_history(user_id: str):
    try:
        result = supabase.table("monthly_reports")\
            .select("*")\
            .eq("user_id", user_id)\
            .order("created_at", desc=True)\
            .execute()

        return { "success": True, "reports": result.data or [] }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))