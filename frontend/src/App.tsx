import React, { useState, useRef } from 'react';
import axios from 'axios';
import './styles.css';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post<{ taskId: string }>('http://localhost:8000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    const { taskId } = response.data;
    checkStatus(taskId);
  };

  const checkStatus = (taskId: string) => {
    const interval = setInterval(async () => {
      const response = await axios.get<{ status: string, progress: number, video_url: string }>(`http://localhost:8000/status/${taskId}`);
      const { status, progress, video_url } = response.data;

      setProgress(progress);

      if (status === 'SUCCESS') {
        setVideoUrl(video_url);
        clearInterval(interval);
      }
    }, 1000);
  };

  const handlePlay = () => {
    videoRef.current?.play();
  };

  const handlePause = () => {
    videoRef.current?.pause();
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">AI Video Generator</h2>
        <input
          type="file"
          onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
          className="mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={uploadFile}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-green-500 hover:to-blue-600 w-full transition duration-200"
        >
          Upload
        </button>
        <div className="mt-6">
          <div className="text-gray-700 mb-2">Progress: {progress}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        {videoUrl && (
          <div className="mt-6">
            <video ref={videoRef} src={`http://localhost:8000/${videoUrl}`} className="w-full rounded-lg shadow-lg mb-4" />
            <div className="flex justify-between">
              <button onClick={handlePlay} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
                Play
              </button>
              <button onClick={handlePause} className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-200">
                Pause
              </button>
              <button onClick={handleMute} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200">
                Mute/Unmute
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
