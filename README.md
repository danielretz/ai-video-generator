# AI Video Generator Web App

This web application allows users to upload an image and receive a generated video based on that image. The system handles the constraints of limited memory and simulates an artificial intelligence (AI) model that is resource-intensive and has a fixed processing time.

## Features

- Image Upload: Users can upload an image via a web interface.
- Task Status: Users can see the current status of their video generation task with real-time progress updates.
- Video Generation: Simulates an AI model processing each image to generate a video.
- Video Preview: Users can preview the generated video in the web interface.

## Technologies Used

- **Frontend**: React, TypeScript, TailwindCSS-ish
- **Backend**: FastAPI, Celery, Redis, Python
- **Containerization**: Docker, Docker Compose

## Installation

### Prerequisites

- Docker
- Docker Compose

### Clone the Repository

```sh
git clone https://github.com/danielretz/ai-video-generator.git
cd ai-video-generator
```

### Setup and Run the Application

1. **Build and Start the Docker Containers**

   ```sh
   docker-compose build
   docker-compose up
   ```

2. **Access the Application**

   Open your web browser and navigate to `http://localhost:3000`.

## Usage

1. **Upload an Image**: Click the "Upload" button and select an image file.
2. **Check Progress**: Monitor the progress of the video generation.
3. **Preview Video**: Once the video is generated, it will be available for preview in the web interface.

## Known Issues

- Tailwind.css configuration

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
