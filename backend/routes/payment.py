from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
import razorpay
import hmac
import hashlib
import os
from supabase import create_client

router = APIRouter()

RAZORPAY_KEY = os.getenv("RAZORPAY_KEY")
RAZORPAY_SECRET = os.getenv("RAZORPAY_SECRET")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

# ── MODELS ──
class CreateOrderRequest(BaseModel):
    user_id: str
    email: str

class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    user_id: str
    email: str

# ── CREATE ORDER ──
@router.post("/payment/create")
async def create_order(req: CreateOrderRequest):
    try:
        client = razorpay.Client(auth=(RAZORPAY_KEY, RAZORPAY_SECRET))

        order_data = {
            "amount": 12900,        # Rs.129 in paise
            "currency": "INR",
            "receipt": f"raxx_{req.user_id[:8]}",
            "notes": {
                "user_id": req.user_id,
                "email": req.email,
                "plan": "premium"
            }
        }

        order = client.order.create(data=order_data)

        return {
            "success": True,
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
            "key": RAZORPAY_KEY
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── VERIFY PAYMENT ──
@router.post("/payment/verify")
async def verify_payment(req: VerifyPaymentRequest):
    try:
        # Verify signature — ALWAYS do this on backend
        body = f"{req.razorpay_order_id}|{req.razorpay_payment_id}"
        expected_signature = hmac.new(
            RAZORPAY_SECRET.encode(),
            body.encode(),
            hashlib.sha256
        ).hexdigest()

        if expected_signature != req.razorpay_signature:
            raise HTTPException(status_code=400, detail="Invalid payment signature")

        # Save subscription in Supabase
        from datetime import datetime, timedelta
        now = datetime.utcnow()
        expires = now + timedelta(days=30)

        supabase.table("subscriptions").upsert({
            "user_id": req.user_id,
            "email": req.email,
            "plan": "premium",
            "amount": 129,
            "razorpay_order_id": req.razorpay_order_id,
            "razorpay_payment_id": req.razorpay_payment_id,
            "status": "active",
            "started_at": now.isoformat(),
            "expires_at": expires.isoformat()
        }).execute()

        return {
            "success": True,
            "message": "Payment verified! Premium activated.",
            "expires_at": expires.isoformat()
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── CHECK SUBSCRIPTION STATUS ──
@router.get("/payment/status/{user_id}")
async def check_status(user_id: str):
    try:
        from datetime import datetime
        result = supabase.table("subscriptions")\
            .select("*")\
            .eq("user_id", user_id)\
            .eq("status", "active")\
            .execute()

        if not result.data:
            return { "active": False, "plan": "free" }

        sub = result.data[0]
        expires_at = datetime.fromisoformat(sub["expires_at"])

        if datetime.utcnow() > expires_at:
            return { "active": False, "plan": "free" }

        return {
            "active": True,
            "plan": "premium",
            "expires_at": sub["expires_at"]
        }

    except Exception as e:
        print(f"Payment status error: {e}")
        return { "active": False, "plan": "free" }