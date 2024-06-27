from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from ..config import settings
import os

router = APIRouter()

@router.get("/{video_filename}")
async def get_video(video_filename: str):
    video_path = os.path.join(settings.VIDEO_FOLDER, video_filename)
    if os.path.exists(video_path):
        return FileResponse(video_path, media_type='video/mp4')
    else:
        raise HTTPException(status_code=404, detail="Video not found")
