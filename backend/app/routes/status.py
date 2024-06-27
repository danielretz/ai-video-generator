from fastapi import APIRouter, HTTPException
from celery.result import AsyncResult
from ..tasks.celery import celery

router = APIRouter()

@router.get("/{task_id}")
def get_status(task_id: str):
    task = celery.AsyncResult(task_id)
    if task.state == 'PENDING':
        response = {'status': 'pending', 'progress': 0}
    elif task.state == 'PROGRESS':
        response = {'status': task.state, 'progress': task.info.get('progress', 0)}
    elif task.state == 'SUCCESS':
        response = {'status': task.state, 'progress': 100, 'video_url': task.info.get('video_url', '')}
    else:
        response = {'status': 'failure', 'progress': 0}
    return response
