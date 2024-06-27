from fastapi import APIRouter, UploadFile, File, HTTPException
from ..tasks.process import process_image
from ..config import settings
import os

router = APIRouter()

@router.post("/")
async def upload_image(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(settings.UPLOAD_FOLDER, file.filename)
        with open(file_path, "wb") as buffer:
            buffer.write(file.file.read())
        task = process_image.delay(file_path)
        return {"taskId": task.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload file: {str(e)}")
