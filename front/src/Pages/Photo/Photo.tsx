import React, { useRef, useState } from "react";

function CameraApp() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string>("");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL();
        setImageDataUrl(dataUrl);
      }
    }
  };

  const downloadImage = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = imageDataUrl;
    downloadLink.download = "image.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <h1>Camera App</h1>
      <video ref={videoRef} autoPlay playsInline></video>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      {cameraStream ? (
        <button onClick={stopCamera}>Stop Camera</button>
      ) : (
        <button onClick={startCamera}>Start Camera</button>
      )}
      <button onClick={captureImage}>Capture Image</button>
      {imageDataUrl && <button onClick={downloadImage}>Download Image</button>}
    </div>
  );
}

export default CameraApp;
