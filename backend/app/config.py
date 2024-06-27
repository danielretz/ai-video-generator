from pydantic import BaseSettings

class Settings(BaseSettings):
    ALLOWED_ORIGINS: list = ["http://localhost:3000"]
    UPLOAD_FOLDER: str = 'uploads'
    VIDEO_FOLDER: str = 'videos'
    CELERY_BROKER_URL: str = 'redis://redis:6379/0'
    CELERY_RESULT_BACKEND: str = 'redis://redis:6379/0'

settings = Settings()

import os

# Ensure directories exist
os.makedirs(settings.UPLOAD_FOLDER, exist_ok=True)
os.makedirs(settings.VIDEO_FOLDER, exist_ok=True)
