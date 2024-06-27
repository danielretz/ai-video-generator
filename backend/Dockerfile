FROM python:3.8-slim

RUN apt-get update && apt-get install -y gcc

# Create a non-root user and group
RUN groupadd -r celery && useradd -r -g celery celery

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

# Change ownership of the application directory
RUN chown -R celery:celery /app

# Switch to the non-root user
USER celery

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
