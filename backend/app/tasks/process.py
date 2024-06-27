from .celery import celery
import os
import time
from ..config import settings

@celery.task(bind=True)
def process_image(self, file_path):
    total_steps = 30
    progress_increment = 100 // total_steps

    for step in range(total_steps):
        current_progress = (step + 1) * progress_increment
        self.update_state(state='PROGRESS', meta={'progress': current_progress})
        time.sleep(1)  # Sleep for 1 second for each step

    video_path = os.path.join(settings.VIDEO_FOLDER, "crocodile_scene.mp4")

    self.update_state(state='COMPLETED', meta={'progress': 100, 'video_url': f"videos/{os.path.basename(video_path)}"})
    return {'status': 'COMPLETED', 'progress': 100, 'video_url': f"videos/{os.path.basename(video_path)}"}
