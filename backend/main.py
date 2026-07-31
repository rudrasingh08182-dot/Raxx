from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from routes.auth import router as auth_router
from routes.doubt import router as doubt_router
from routes.notes import router as notes_router
from routes.mocktest import router as mocktest_router
from routes.studyplan import router as studyplan_router
from routes.homework import router as homework_router
from routes.coding import router as coding_router
from routes.games import router as games_router
from routes import auth, doubt, notes, homework, batch
from routes.payment import router as payment_router
from routes.whatsapp import router as whatsapp_router
from routes.report import router as report_router
from routes import auth, doubt, notes, homework, batch, parent
from routes import mockinterview
from routes.career import router as career_router
from routes.answer import router as answer_router
from routes.scholarship import router as scholarship_router
from routes.community import router as community_router
from routes.engineering import router as engineering_router
from routes.tasks import router as tasks_router
from routes.announcements import router as announcements_router
# Create FastAPI app
app = FastAPI(
    
    title="RAXX AI Backend",
    description="Backend API for RAXX AI — India's Universal Study Platform",
    version="1.0.0"
)

# CORS Settings — allows frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",      # Next.js frontend (local)
        "https://raxx-ai.vercel.app"  # Vercel frontend (production)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Register routes
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(doubt_router, prefix="/doubt", tags=["Doubt Solver"])
app.include_router(notes_router, prefix="/notes", tags=["Notes Generator"])
app.include_router(mocktest_router, prefix="/mocktest", tags=["Mock Test"])
app.include_router(studyplan_router, prefix="/studyplan", tags=["Study Plan"])
app.include_router(homework_router, prefix="/homework", tags=["Homework"])
app.include_router(coding_router, prefix="/coding", tags=["Coding"])
app.include_router(games_router, prefix="/games", tags=["Games"])
app.include_router(batch.router) 
app.include_router(payment_router)  
app.include_router(whatsapp_router) 
app.include_router(report_router)   
app.include_router(parent.router) 
app.include_router(mockinterview.router)  
app.include_router(career_router, prefix="/career")   
app.include_router(answer_router)  
app.include_router(scholarship_router)
app.include_router(community_router, prefix="/community")
app.include_router(engineering_router, prefix="/engineering")
app.include_router(tasks_router, prefix="/tasks")
app.include_router(announcements_router, prefix="/announcements")

# Test route — just to check server is working
@app.get("/")
def home():
    return {
        "status": "running",
        "platform": "RAXX AI",
        "version": "1.0.0",
        "message": "Backend is live!"
    }

# Health check route
@app.get("/health")
def health_check():
    return {"status": "healthy"}