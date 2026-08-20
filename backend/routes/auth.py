from fastapi import APIRouter, HTTPException
from pydantic import BaseModel,EmailStr,Field
from typing import Annotated
from supabase import create_client
import os, random, string
from dotenv import load_dotenv

load_dotenv()

# Supabase client
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_ANON_KEY")
)

router = APIRouter()

# ── Models ──────────────────────────────────────
class RegisterUser(BaseModel):
    name: str
    email: str
    password:str
    role: str        # student / teacher / parent
    whatsapp: str
    parent_whatsapp: str = ""
    board: str = ""
    exam: str = ""
    language: str = "hindi"

class LoginUser(BaseModel):
    email: EmailStr
    password: Annotated[str,Field(min_length=8,max_length=20)]

# ── Helper: Generate unique student code ────────
def generate_student_code():
    digits = ''.join(random.choices(string.digits, k=4))
    return f'RAXX-STU-{digits}'

# ── Register ─────────────────────────────────────
@router.post("/register")
def register(user: RegisterUser):
    try:
        # Create auth user in Supabase
        response = supabase.auth.sign_up({
            "email": user.email,
            "password": user.password
        })

        if response.user is None:
            raise HTTPException(status_code=400, detail="Registration failed")

        user_id = response.user.id

        # Generate unique student code (only for students)
        student_code = None
        if user.role == 'student':
            student_code = generate_student_code()
            # Make sure code is unique
            while supabase.table('users')\
                .select('id')\
                .eq('student_code', student_code)\
                .execute().data:
                student_code = generate_student_code()

        # Save extra info in users table
        supabase.table("users").insert({
            "id": user_id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "whatsapp": user.whatsapp,
            "parent_whatsapp": user.parent_whatsapp,
            "board": user.board,
            "exam": user.exam,
            "language": user.language,
            "is_premium": False,
            "student_code": student_code  # None for teacher/parent
        }).execute()

        return {
            "status": "success",
            "message": "Account created successfully!",
            "user_id": user_id,
            "role": user.role,
            "student_code": student_code  # Frontend pe dikhayenge
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ── Login ────────────────────────────────────────
@router.post("/login")
def login(user: LoginUser):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": user.email,
            "password": user.password
        })

        if response.user is None:
            raise HTTPException(status_code=401, detail="Invalid email or password")

        # Get user details from users table
        user_data = supabase.table("users").select("*").eq(
            "id", response.user.id
        ).execute()

        # ── Streak Update ──
        user_id = response.user.id
        from datetime import date, timedelta

        existing_reward = supabase.table("player_rewards").select("*").eq(
            "student_id", user_id
        ).execute()

        today = date.today().isoformat()
        yesterday = (date.today() - timedelta(days=1)).isoformat()

        if existing_reward.data:
            reward = existing_reward.data[0]
            last_login = reward.get("last_login_date", "")

            if last_login == today:
                # Aaj already login kiya — streak same raho
                new_streak = reward.get("current_streak", 1)
            elif last_login == yesterday:
                # Kal login kiya tha — streak badho
                new_streak = reward.get("current_streak", 0) + 1
            else:
                # Streak toot gayi — reset
                new_streak = 1

            supabase.table("player_rewards").update({
                "current_streak": new_streak,
                "last_login_date": today,
            }).eq("student_id", user_id).execute()
        else:
            # Pehli baar — row banao
            supabase.table("player_rewards").insert({
                "student_id": user_id,
                "coins": 0,
                "total_games": 0,
                "current_streak": 1,
                "last_login_date": today,
                "badges": []
            }).execute()

        return {
            "status": "success",
            "message": "Login successful!",
            "token": response.session.access_token,
            "user": user_data.data[0] if user_data.data else {}
        }

    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

# ── Logout ───────────────────────────────────────
@router.post("/logout")
def logout():
    try:
        supabase.auth.sign_out()
        return {"status": "success", "message": "Logged out successfully!"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ── Get Student Code ─────────────────────────────
@router.get("/student-code/{user_id}")
def get_student_code(user_id: str):
    try:
        result = supabase.table("users")\
            .select("student_code, name, role")\
            .eq("id", user_id)\
            .execute()

        if not result.data:
            raise HTTPException(status_code=404, detail="User not found")

        return {
            "status": "success",
            "student_code": result.data[0].get("student_code"),
            "name": result.data[0].get("name")
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))