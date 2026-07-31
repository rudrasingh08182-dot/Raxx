# backend/routes/tasks.py
# backend/routes/tasks.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from supabase import create_client
import os
from datetime import date

router = APIRouter()
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_ANON_KEY"))


class AddTaskData(BaseModel):
    student_id: str
    task_text: str

class ActivityData(BaseModel):
    student_id: str
    task_text: str


# ── Aaj ke tasks fetch karo ──
@router.get("/today/{student_id}")
async def get_today_tasks(student_id: str):
    try:
        today = date.today().isoformat()
        result = supabase.table("student_tasks").select("*").eq(
            "student_id", student_id
        ).eq("date", today).order("created_at", desc=False).execute()
        return {"success": True, "tasks": result.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── Student khud task add kare ──
@router.post("/add")
async def add_custom_task(data: AddTaskData):
    try:
        today = date.today().isoformat()
        result = supabase.table("student_tasks").insert({
            "student_id": data.student_id,
            "task_text": data.task_text,
            "is_completed": False,
            "date": today
        }).execute()
        return {"success": True, "task": result.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── Task complete karo + progress mein count karo ──
@router.post("/complete/{task_id}")
async def complete_task(task_id: str, data: ActivityData):
    try:
        # Task complete mark karo
        supabase.table("student_tasks").update(
            {"is_completed": True}
        ).eq("id", task_id).execute()

        # Progress mein count karo
        supabase.table("student_activity").insert({
            "student_id": data.student_id,
            "activity_type": "task_completed",
            "subject": "Daily Task",
            "score": 10,
            "time_spent": 1
        }).execute()

        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── Task uncomplete karo ──
@router.post("/uncomplete/{task_id}")
async def uncomplete_task(task_id: str):
    try:
        supabase.table("student_tasks").update(
            {"is_completed": False}
        ).eq("id", task_id).execute()
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── Task delete karo ──
@router.delete("/delete/{task_id}")
async def delete_task(task_id: str):
    try:
        supabase.table("student_tasks").delete().eq("id", task_id).execute()
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))