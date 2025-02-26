import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

const FacialRecognition = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [image, setImage] = useState(null);
    const [cameraActive, setCameraActive] = useState(false);
    const navigate = useNavigate();

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            setCameraActive(true);
        } catch (err) {
            console.error("Error accessing the camera", err);
        }
    };

    const captureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to Base64
        const base64data = canvas.toDataURL("image/png"); // Store as PNG format

        // Remove the `data:image/png;base64,` prefix to store only the Base64 data in the database
        const base64String = base64data.replace(/^data:image\/(png|jpeg);base64,/, "");

        setImage(base64String);
    };


    const handleSubmit = async () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const formData = {
            ...userData,
            facial_image: image,
        };

        try {
            const res = await fetch("http://localhost:5000/api/students/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                navigate("/dashboard");
            } else {
                console.error("Registration failed:", data.message || res.statusText);
            }
        } catch (error) {
            console.error("Error during registration:", error.message);
        }
    };

    return (
        <div className="flex flex-col items-center lg:justify-center justify-center gap-2 lg:gap-0 p-4 w-full min-h-screen bg-gradient-to-b from-white to-[#0061A2]">
            <div className="flex flex-col w-4/5 items-center gap-4">
                <div className="flex flex-row gap-8 w-[90%] justify-between">
                    {/* Video Placeholder */}
                    <div className="w-1/2 h-80 bg-gray-200 rounded flex items-center justify-center overflow-hidden relative">
                        {!cameraActive && (
                            <span className="text-gray-500 absolute">Camera Preview</span>
                        )}
                        <video ref={videoRef} autoPlay className={`absolute object-fill inset-0 w-full h-full ${cameraActive ? 'block' : 'hidden'}`}></video>
                    </div>

                    <canvas ref={canvasRef} className="hidden"></canvas>

                    {/* Image Placeholder */}
                    <div className="w-1/2 h-80 bg-gray-200 rounded flex items-center justify-center overflow-hidden relative">
                        {!image && <span className="text-gray-500 absolute">Captured Image</span>}
                        {image && <img src={image} alt="Captured" className="absolute object-fill inset-0 w-full h-full" />}
                    </div>
                </div>

                <div className="flex flex-col gap-4 max-w-md w-4/5">
                    <button
                        className="w-full flex items-center justify-center h-11 font-semibold rounded-4xl bg-[#0061A2] hover:bg-[#1836B2] text-white py-1 px-3 border border-transparent text-base transition-all focus:outline-none focus:ring-2"
                        onClick={startCamera}>
                        Start Camera
                    </button>
                    <button
                        className="w-full flex items-center justify-center h-11 font-semibold rounded-4xl bg-[#0061A2] hover:bg-[#1836B2] text-white py-1 px-3 border border-transparent text-base transition-all focus:outline-none focus:ring-2"
                        onClick={captureImage}
                        disabled={!cameraActive}>
                        Capture Image
                    </button>
                    <button
                        className="w-full flex items-center justify-center h-11 font-semibold rounded-4xl bg-[#0061A2] hover:bg-[#1836B2] text-white py-1 px-3 border border-transparent text-base transition-all focus:outline-none focus:ring-2"
                        onClick={handleSubmit}
                        disabled={!image}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FacialRecognition;