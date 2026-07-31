import httpx
import os

WHATSAPP_TOKEN = os.getenv("WHATSAPP_TOKEN")
WHATSAPP_PHONE_ID = os.getenv("WHATSAPP_PHONE_ID")

BASE_URL = f"https://graph.facebook.com/v18.0/{WHATSAPP_PHONE_ID}/messages"

HEADERS = {
    "Authorization": f"Bearer {WHATSAPP_TOKEN}",
    "Content-Type": "application/json",
}

# ── SEND TEXT MESSAGE ──
async def send_whatsapp_message(phone: str, message: str):
    try:
        payload = {
            "messaging_product": "whatsapp",
            "to": f"91{phone}",
            "type": "text",
            "text": { "body": message }
        }
        async with httpx.AsyncClient() as client:
            res = await client.post(BASE_URL, json=payload, headers=HEADERS)
            return res.json()
    except Exception as e:
        print(f"WhatsApp error: {e}")
        return None

# ── DAILY REMINDER ──
async def send_daily_reminder(phone: str, name: str, pending_topics: list):
    topics = "\n".join([f"• {t}" for t in pending_topics[:3]])
    message = f"""📚 *RAXX AI — Daily Reminder*

Hello {name}! 👋

Aaj ke liye pending topics:
{topics}

App kholo aur padhai shuru karo! 💪

🔗 raxxai.com
_RAXX AI — India's Study Platform_"""
    return await send_whatsapp_message(phone, message)

# ── EXAM ALERT ──
async def send_exam_alert(phone: str, name: str, exam: str, days_left: int):
    message = f"""⚠️ *RAXX AI — Exam Alert*

Hello {name}!

*{exam}* mein sirf *{days_left} din* bache hain!

Abhi mock test do aur apni preparation check karo! 🎯

📱 App: raxxai.com
_All the best! — RAXX AI_"""
    return await send_whatsapp_message(phone, message)

# ── PAYMENT SUCCESS ──
async def send_payment_success(phone: str, name: str, expires_at: str):
    message = f"""✅ *RAXX AI — Premium Activated!*

Congratulations {name}! 🎉

Tumhara *Premium Plan* successfully activate ho gaya!

✨ Ab tumhare paas hai:
- Unlimited AI Doubts
- Smart Notes
- Unlimited Mock Tests
- All 6 Games
- Monthly Reports

*Valid till:* {expires_at}

Padhai shuru karo! 💪
_RAXX AI Technologies_"""
    return await send_whatsapp_message(phone, message)

# ── HOMEWORK REMINDER ──
async def send_homework_reminder(phone: str, name: str, subject: str, due_date: str):
    message = f"""📝 *RAXX AI — Homework Reminder*

Hello {name}!

*{subject}* ka homework abhi tak submit nahi hua!

*Due Date:* {due_date}

Jaldi submit karo! ⏰
_RAXX AI Technologies_"""
    return await send_whatsapp_message(phone, message)