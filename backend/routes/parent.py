# backend/routes/parent.py
# RAXX AI — Parent Routes
# Connect parent to student via unique student code

from fastapi import APIRouter, HTTPException
from supabase import create_client
import os

router = APIRouter(prefix='/api/parent', tags=['parent'])

supabase = create_client(
    os.getenv('SUPABASE_URL'),
    os.getenv('SUPABASE_ANON_KEY')
)

# ═══════════════════════════════════════
# ROUTE 1 — Parent connects to student
# GET /api/parent/connect/{student_code}
# ═══════════════════════════════════════

@router.get('/connect/{student_code}')
async def connect_to_student(student_code: str):
    try:
        # Find student by their unique code
        student = supabase.table('users')\
            .select('id, name, email, board, exam, whatsapp, student_code')\
            .eq('student_code', student_code.upper())\
            .eq('role', 'student')\
            .execute()

        if not student.data:
            raise HTTPException(
                status_code=404,
                detail='Invalid student code! Ask your child for their RAXX code.'
            )

        s = student.data[0]
        student_id = s['id']

        # Get student activity stats
        activity = supabase.table('student_activity')\
            .select('*')\
            .eq('student_id', student_id)\
            .order('date', desc=True)\
            .limit(30)\
            .execute()

        # Get mock test scores
        tests = supabase.table('mock_tests')\
            .select('score, total, created_at')\
            .eq('student_id', student_id)\
            .order('created_at', desc=True)\
            .limit(10)\
            .execute()

        # Get game rewards (coins + streak)
        rewards = supabase.table('player_rewards')\
            .select('coins, current_streak, badges')\
            .eq('student_id', student_id)\
            .execute()

        # Get doubt history count
        doubts = supabase.table('doubt_history')\
            .select('id')\
            .eq('student_id', student_id)\
            .execute()

        # Get notes count
        notes = supabase.table('notes_history')\
            .select('id')\
            .eq('student_id', student_id)\
            .execute()

        # Calculate avg score
        avg_score = 0
        if tests.data:
            scores = [
                (t['score'] / t['total'] * 100)
                for t in tests.data
                if t['total'] > 0
            ]
            avg_score = round(sum(scores) / len(scores)) if scores else 0

        # Calculate exam readiness
        readiness = min(100, avg_score + (len(activity.data) * 2))

        # Get streak
        streak = 0
        if rewards.data:
            streak = rewards.data[0].get('current_streak', 0)
        coins = 0
        if rewards.data:
            coins = rewards.data[0].get('coins', 0)

        return {
            'success': True,
            'id': student_id,
            'name': s['name'],
            'email': s['email'],
            'board': s['board'],
            'exam': s['exam'],
            'student_code': s['student_code'],
            'streak': streak,
            'coins': coins,
            'readiness': readiness,
            'avg_score': avg_score,
            'tests': len(tests.data),
            'doubts_asked': len(doubts.data),
            'notes_made': len(notes.data),
            'recent_activity': activity.data[:7]
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# ROUTE 2 — Get student subject scores
# GET /api/parent/scores/{student_id}
# ═══════════════════════════════════════

@router.get('/scores/{student_id}')
async def get_student_scores(student_id: str):
    try:
        # Get all mock test attempts grouped by subject
        tests = supabase.table('mock_tests')\
            .select('*')\
            .eq('student_id', student_id)\
            .order('created_at', desc=True)\
            .execute()

        # Get activity by subject
        activity = supabase.table('student_activity')\
            .select('subject, score, date')\
            .eq('student_id', student_id)\
            .order('date', desc=True)\
            .limit(50)\
            .execute()

        # Group scores by subject
        subject_scores = {}
        for act in activity.data:
            subj = act.get('subject', 'General')
            if subj not in subject_scores:
                subject_scores[subj] = []
            if act.get('score'):
                subject_scores[subj].append(act['score'])

        # Calculate avg per subject
        subject_avg = {}
        for subj, scores in subject_scores.items():
            if scores:
                subject_avg[subj] = round(sum(scores) / len(scores))

        return {
            'success': True,
            'subject_scores': subject_avg,
            'total_tests': len(tests.data),
            'recent_tests': tests.data[:5]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# ROUTE 3 — Get weekly activity
# GET /api/parent/activity/{student_id}
# ═══════════════════════════════════════

@router.get('/activity/{student_id}')
async def get_weekly_activity(student_id: str):
    try:
        activity = supabase.table('student_activity')\
            .select('date, time_spent, subject, activity_type')\
            .eq('student_id', student_id)\
            .order('date', desc=True)\
            .limit(30)\
            .execute()

        # Group by date
        daily = {}
        for act in activity.data:
            date = act['date']
            if date not in daily:
                daily[date] = 0
            daily[date] += act.get('time_spent', 0)

        return {
            'success': True,
            'daily_hours': daily,
            'total_days': len(daily),
            'activity': activity.data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))