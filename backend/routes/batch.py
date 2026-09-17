# backend/routes/batch.py
# RAXX AI — Batch Code System
# Routes: Create batch, Join batch, Get students, Get batches

from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from supabase import create_client
import os, random, string

router = APIRouter(prefix='/api/batch', tags=['batch'])

# Service role key use kar rahe hain kyunki ye backend server-side trusted
# code hai — validation (teacher_id match, etc.) yahi route khud karta hai,
# Supabase Auth session frontend se forward nahi ho raha. Service key RLS
# ko bypass karta hai isliye insert/update yaha se allowed rahenge.
supabase = create_client(
    os.getenv('SUPABASE_URL'),
    os.getenv('SUPABASE_SERVICE_KEY')
)

# ═══════════════════════════════════════
# MODELS
# ═══════════════════════════════════════

class CreateBatch(BaseModel):
    teacher_id: str
    batch_name: str
    subject: str
    board: str
    description: str = ''

class JoinBatch(BaseModel):
    student_id: str
    batch_code: str

# ═══════════════════════════════════════
# HELPER — Generate unique batch code
# ═══════════════════════════════════════

def generate_batch_code():
    digits = ''.join(random.choices(string.digits, k=4))
    return f'RAXX-TCH-{digits}'

# ═══════════════════════════════════════
# ROUTE 1 — Teacher creates a batch
# POST /api/batch/create
# ═══════════════════════════════════════

@router.post('/create')
async def create_batch(data: CreateBatch):
    try:
        # Generate unique code
        code = generate_batch_code()

        # Make sure code is unique
        while True:
            existing = supabase.table('batches')\
                .select('id')\
                .eq('batch_code', code)\
                .execute()
            if not existing.data:
                break
            code = generate_batch_code()

        # Save batch to database
        result = supabase.table('batches').insert({
            'teacher_id': data.teacher_id,
            'batch_name': data.batch_name,
            'batch_code': code,
            'subject': data.subject,
            'board': data.board,
            'description': data.description
        }).execute()

        return {
            'success': True,
            'batch_code': code,
            'batch_name': data.batch_name,
            'subject': data.subject,
            'message': f'Batch created! Share code {code} with your students'
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# ROUTE 2 — Student joins a batch
# POST /api/batch/join
# ═══════════════════════════════════════

@router.post('/join')
async def join_batch(data: JoinBatch):
    try:
        # Find batch by code
        batch = supabase.table('batches')\
            .select('*')\
            .eq('batch_code', data.batch_code.upper())\
            .eq('is_active', True)\
            .execute()

        # Code not found
        if not batch.data:
            raise HTTPException(
                status_code=404,
                detail='Invalid batch code! Please check with your teacher.'
            )

        batch_id = batch.data[0]['id']
        batch_name = batch.data[0]['batch_name']
        subject = batch.data[0]['subject']

        # Check if already joined
        already = supabase.table('batch_members')\
            .select('id')\
            .eq('batch_id', batch_id)\
            .eq('student_id', data.student_id)\
            .execute()

        if already.data:
            return {
                'success': True,
                'already_joined': True,
                'batch_name': batch_name,
                'subject': subject,
                'message': 'You are already in this batch!'
            }

        # Add student to batch
        supabase.table('batch_members').insert({
            'batch_id': batch_id,
            'student_id': data.student_id
        }).execute()

        return {
            'success': True,
            'already_joined': False,
            'batch_name': batch_name,
            'subject': subject,
            'message': f'Successfully joined {batch_name}!'
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# ROUTE 3 — Teacher gets all their students
# GET /api/batch/my-students/{teacher_id}
# ═══════════════════════════════════════

@router.get('/my-students/{teacher_id}')
async def get_my_students(teacher_id: str):
    try:
        # Get teacher's all batches
        batches = supabase.table('batches')\
            .select('id, batch_name, batch_code, subject, board, created_at')\
            .eq('teacher_id', teacher_id)\
            .eq('is_active', True)\
            .execute()

        if not batches.data:
            return {
                'batches': [],
                'total_students': 0,
                'students': []
            }

        batch_ids = [b['id'] for b in batches.data]

        # Get all members in those batches
        members = supabase.table('batch_members')\
            .select('*, users(id, name, email, board, exam)')\
            .in_('batch_id', batch_ids)\
            .eq('is_active', True)\
            .execute()

        # Group students by batch
        batch_map = {b['id']: {**b, 'students': []} for b in batches.data}
        for member in members.data:
            bid = member['batch_id']
            if bid in batch_map:
                batch_map[bid]['students'].append(member)

        return {
            'batches': list(batch_map.values()),
            'total_students': len(members.data),
            'students': members.data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# ROUTE 4 — Student gets their batches
# GET /api/batch/my-batches/{student_id}
# ═══════════════════════════════════════

@router.get('/my-batches/{student_id}')
async def get_my_batches(student_id: str):
    try:
        members = supabase.table('batch_members')\
            .select('*, batches(*, users(name))')\
            .eq('student_id', student_id)\
            .eq('is_active', True)\
            .execute()

        return {
            'success': True,
            'batches': members.data,
            'total': len(members.data)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# ROUTE 5 — Get single batch details
# GET /api/batch/details/{batch_code}
# ═══════════════════════════════════════

@router.get('/details/{batch_code}')
async def get_batch_details(batch_code: str):
    try:
        batch = supabase.table('batches')\
            .select('*')\
            .eq('batch_code', batch_code.upper())\
            .execute()

        if not batch.data:
            raise HTTPException(status_code=404, detail='Batch not found')

        # Count members
        members = supabase.table('batch_members')\
            .select('id')\
            .eq('batch_id', batch.data[0]['id'])\
            .execute()

        return {
            'success': True,
            'batch': batch.data[0],
            'total_members': len(members.data)
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════
# ROUTE 6 — Teacher deactivates a batch
# PUT /api/batch/deactivate/{batch_id}
# ═══════════════════════════════════════

@router.put('/deactivate/{batch_id}')
async def deactivate_batch(batch_id: str):
    try:
        supabase.table('batches')\
            .update({'is_active': False})\
            .eq('id', batch_id)\
            .execute()

        return {
            'success': True,
            'message': 'Batch deactivated successfully'
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))