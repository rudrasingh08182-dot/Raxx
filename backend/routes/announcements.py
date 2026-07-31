# backend/routes/announcements.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from supabase import create_client
import os

router = APIRouter()
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_ANON_KEY")
)

class CreateAnnouncement(BaseModel):
    batch_id: str
    teacher_id: str
    message: str = ""
    file_url: str = ""
    file_name: str = ""

@router.post("/create")
async def create_announcement(data: CreateAnnouncement):
    try:
        result = supabase.table("batch_announcements").insert({
            "batch_id": data.batch_id,
            "teacher_id": data.teacher_id,
            "message": data.message,
            "file_url": data.file_url,
            "file_name": data.file_name,
        }).execute()
        return {"success": True, "announcement": result.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/batch/{batch_id}")
async def get_announcements(batch_id: str):
    try:
        result = supabase.table("batch_announcements").select("*").eq(
            "batch_id", batch_id
        ).order("created_at", desc=True).execute()
        return {"success": True, "announcements": result.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class CreateReply(BaseModel):
    announcement_id: str
    student_id: str
    student_name: str
    message: str = ""
    file_url: str = ""
    file_name: str = ""


@router.post("/reply")
async def create_reply(data: CreateReply):
    try:
        result = supabase.table("announcement_replies").insert({
            "announcement_id": data.announcement_id,
            "student_id": data.student_id,
            "student_name": data.student_name,
            "message": data.message,
            "file_url": data.file_url,
            "file_name": data.file_name,
        }).execute()
        return {"success": True, "reply": result.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/replies/{announcement_id}")
async def get_replies(announcement_id: str):
    try:
        result = supabase.table("announcement_replies").select("*").eq(
            "announcement_id", announcement_id
        ).order("created_at", desc=False).execute()
        return {"success": True, "replies": result.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{announcement_id}")
async def delete_announcement(announcement_id: str):
    try:
        supabase.table("batch_announcements").delete().eq(
            "id", announcement_id
        ).execute()
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))