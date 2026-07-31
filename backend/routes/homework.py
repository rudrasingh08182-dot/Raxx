from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from supabase import create_client
import os
import random
import string
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_ANON_KEY")
)

class CreateHomework(BaseModel):
    teacher_id: str
    title: str
    file_url: str = ""
    due_date: str = ""
    description: str = ""

class SubmitHomework(BaseModel):
    homework_id: str
    student_id: str
    file_url: str = ""
    answer_text: str = ""

def generate_room_code():
    return "".join(random.choices(string.digits, k=6))

# ── Create Homework (Teacher) ──
@router.post("/create")
def create_homework(req: CreateHomework):
    try:
        # Generate unique 6-digit code
        while True:
            room_code = generate_room_code()
            existing = supabase.table("homeworks").select("id").eq(
                "room_code", room_code
            ).execute()
            if not existing.data:
                break

        result = supabase.table("homeworks").insert({
            "teacher_id": req.teacher_id,
            "title": req.title,
            "file_url": req.file_url,
            "due_date": req.due_date if req.due_date else None,
            "description": req.description,
            "room_code": room_code,
        }).execute()

        return {
            "status": "success",
            "message": "Homework created successfully!",
            "room_code": room_code,
            "homework": result.data[0] if result.data else {}
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── Get Homework by Room Code (Student) ──
@router.get("/join/{room_code}")
def join_homework(room_code: str):
    try:
        result = supabase.table("homeworks").select("*").eq(
            "room_code", room_code
        ).execute()

        if not result.data:
            raise HTTPException(status_code=404, detail="Invalid room code! Please check and try again.")

        return {
            "status": "success",
            "homework": result.data[0]
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── Submit Homework (Student) ──
@router.post("/submit")
def submit_homework(req: SubmitHomework):
    try:
        # Check if already submitted
        existing = supabase.table("homework_submissions").select("id").eq(
            "homework_id", req.homework_id
        ).eq("student_id", req.student_id).execute()

        if existing.data:
            raise HTTPException(status_code=400, detail="You have already submitted this homework!")

        result = supabase.table("homework_submissions").insert({
            "homework_id": req.homework_id,
            "student_id": req.student_id,
            "file_url": req.file_url,
            "answer_text": req.answer_text,
        }).execute()

        return {
            "status": "success",
            "message": "Homework submitted successfully!",
            "submission": result.data[0] if result.data else {}
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── Get All Homeworks by Teacher ──
@router.get("/teacher/{teacher_id}")
def get_teacher_homeworks(teacher_id: str):
    try:
        result = supabase.table("homeworks").select("*").eq(
            "teacher_id", teacher_id
        ).order("created_at", desc=True).execute()

        return {
            "status": "success",
            "homeworks": result.data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── Get Submissions for a Homework ──
@router.get("/submissions/{homework_id}")
def get_submissions(homework_id: str):
    try:
        result = supabase.table("homework_submissions").select("*").eq(
            "homework_id", homework_id
        ).execute()

        return {
            "status": "success",
            "submissions": result.data,
            "total": len(result.data)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))