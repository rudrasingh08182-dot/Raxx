# backend/routes/community.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from supabase import create_client
import os

router = APIRouter()

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_ANON_KEY")
)

# --- Models ---
class PostCreate(BaseModel):
    user_id: str
    content: str

class LikeToggle(BaseModel):
    user_id: str
    post_id: str

class CommentCreate(BaseModel):
    user_id: str
    post_id: str
    content: str

class NotificationRead(BaseModel):
    user_id: str

# --- Routes ---

# Create a new post
# Create a new post
@router.post("/post")
async def create_post(data: PostCreate):
    try:
        result = supabase.table("community_posts").insert({
            "user_id": data.user_id,
            "content": data.content
        }).execute()

        return {"success": True, "post": result.data[0]}
    except Exception as e:
        print(f"ERROR IN CREATE POST: {e}")  # ye line add karo
        raise HTTPException(status_code=500, detail=str(e))

# Get all posts with like + comment count
@router.get("/posts")
async def get_posts():
    try:
        posts = supabase.table("community_posts").select(
            "*, users(name), community_likes(count), community_comments(count)"
        ).order("created_at", desc=True).execute()

        return {"success": True, "posts": posts.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Like or Unlike a post
@router.post("/like")
async def toggle_like(data: LikeToggle):
    try:
        # Check if already liked
        existing = supabase.table("community_likes").select("*").eq(
            "post_id", data.post_id
        ).eq("user_id", data.user_id).execute()

        if existing.data:
            # Unlike
            supabase.table("community_likes").delete().eq(
                "post_id", data.post_id
            ).eq("user_id", data.user_id).execute()
            return {"success": True, "action": "unliked"}
        else:
            # Like
            supabase.table("community_likes").insert({
                "post_id": data.post_id,
                "user_id": data.user_id
            }).execute()

            # Get post owner
            post = supabase.table("community_posts").select("user_id").eq(
                "id", data.post_id
            ).execute()

            post_owner_id = post.data[0]["user_id"]

            # Send notification (only if not liking own post)
            if post_owner_id != data.user_id:
                supabase.table("community_notifications").insert({
                    "receiver_id": post_owner_id,
                    "sender_id": data.user_id,
                    "post_id": data.post_id,
                    "type": "like"
                }).execute()

            return {"success": True, "action": "liked"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Add a comment
@router.post("/comment")
async def add_comment(data: CommentCreate):
    try:
        result = supabase.table("community_comments").insert({
            "post_id": data.post_id,
            "user_id": data.user_id,
            "content": data.content
        }).execute()

        # Get post owner
        post = supabase.table("community_posts").select("user_id").eq(
            "id", data.post_id
        ).execute()

        post_owner_id = post.data[0]["user_id"]

        # Send notification (only if not commenting on own post)
        if post_owner_id != data.user_id:
            supabase.table("community_notifications").insert({
                "receiver_id": post_owner_id,
                "sender_id": data.user_id,
                "post_id": data.post_id,
                "type": "comment"
            }).execute()

        return {"success": True, "comment": result.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Get comments for a post
@router.get("/comments/{post_id}")
async def get_comments(post_id: str):
    try:
        comments = supabase.table("community_comments").select(
            "*, users(name)"
        ).eq("post_id", post_id).order("created_at", desc=False).execute()

        return {"success": True, "comments": comments.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Get notifications for a user
@router.get("/notifications/{user_id}")
async def get_notifications(user_id: str):
    try:
        notifications = supabase.table("community_notifications").select(
            "*, users!sender_id(name)"
        ).eq("receiver_id", user_id).eq(
            "is_read", False
        ).order("created_at", desc=True).execute()

        return {"success": True, "notifications": notifications.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Mark all notifications as read
@router.put("/notifications/read")
async def mark_notifications_read(data: NotificationRead):
    try:
        supabase.table("community_notifications").update({
            "is_read": True
        }).eq("receiver_id", data.user_id).execute()

        return {"success": True, "message": "All notifications marked as read"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))