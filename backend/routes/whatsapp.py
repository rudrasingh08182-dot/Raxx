from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.whatsapp_helper import (
    send_whatsapp_message,
    send_daily_reminder,
    send_exam_alert,
    send_payment_success,
    send_homework_reminder,
)

router = APIRouter()

# ── MODELS ──
class SendMessageRequest(BaseModel):
    phone: str
    message: str

class DailyReminderRequest(BaseModel):
    phone: str
    name: str
    pending_topics: list

class ExamAlertRequest(BaseModel):
    phone: str
    name: str
    exam: str
    days_left: int

class PaymentSuccessRequest(BaseModel):
    phone: str
    name: str
    expires_at: str

class HomeworkReminderRequest(BaseModel):
    phone: str
    name: str
    subject: str
    due_date: str

# ── SEND RAW MESSAGE ──
@router.post("/whatsapp/send")
async def send_message(req: SendMessageRequest):
    try:
        result = await send_whatsapp_message(req.phone, req.message)
        if not result:
            raise HTTPException(status_code=500, detail="Message send failed")
        return { "success": True, "result": result }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── DAILY REMINDER ──
@router.post("/whatsapp/daily-reminder")
async def daily_reminder(req: DailyReminderRequest):
    try:
        result = await send_daily_reminder(req.phone, req.name, req.pending_topics)
        return { "success": True, "result": result }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── EXAM ALERT ──
@router.post("/whatsapp/exam-alert")
async def exam_alert(req: ExamAlertRequest):
    try:
        result = await send_exam_alert(req.phone, req.name, req.exam, req.days_left)
        return { "success": True, "result": result }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── PAYMENT SUCCESS ──
@router.post("/whatsapp/payment-success")
async def payment_success(req: PaymentSuccessRequest):
    try:
        result = await send_payment_success(req.phone, req.name, req.expires_at)
        return { "success": True, "result": result }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── HOMEWORK REMINDER ──
@router.post("/whatsapp/homework-reminder")
async def homework_reminder(req: HomeworkReminderRequest):
    try:
        result = await send_homework_reminder(req.phone, req.name, req.subject, req.due_date)
        return { "success": True, "result": result }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))