import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import * as faceapi from "face-api.js";
import Toast from "../components/Toast";

const FacialRecognition = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [imageBlob, setImageBlob] = useState(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState("success");
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            setCameraActive(true);
        } catch (err) {
            console.error("Error accessing the camera", err);
            setToastMessage("Unable to access camera.");
            setToastSeverity("error");
            setToastOpen(true);
        }
    };

    const captureImage = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Load Face API models
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                faceapi.nets.faceRecognitionNet.loadFromUri("/models")
            ]);

            // Convert canvas to Blob
            canvas.toBlob(async (blob) => {
                if (!blob) return;

                // Compress the image
                const compressedBlob = await imageCompression(blob, {
                    maxSizeMB: 1, // Max size 1MB
                    maxWidthOrHeight: 1920, // Max width/height
                });

                // Convert blob to a canvas for Face API
                const img = await faceapi.bufferToImage(compressedBlob);
                const imgCanvas = faceapi.createCanvasFromMedia(img);
                const detections = await faceapi
                    .detectSingleFace(imgCanvas, new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks()
                    .withFaceDescriptor();

                if (!detections) {
                    setToastMessage("No face detected. Please upload a clearer image.");
                    setToastSeverity("warning");
                    setToastOpen(true);
                    return;
                }

                setImageBlob(compressedBlob);
                setToastMessage("Face detected successfully.");
                setToastSeverity("success");
                setToastOpen(true);
            }, "image/png");
        }
    };

    const handleSubmit = async () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const formData = new FormData();

        // Append user data
        Object.keys(userData).forEach(key => {
            formData.append(key, userData[key]);
        });

        // Append the image Blob
        if (imageBlob) {
            formData.append('facial_image', imageBlob, 'facial_image.png');
        } else {
            setToastMessage("No valid face detected. Please capture again.");
            setToastSeverity("error");
            setToastOpen(true);
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/students/register", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                setToastMessage("Registration successful! Redirecting...");
                setToastSeverity("success");
                setToastOpen(true);
                localStorage.setItem("token", data.token);
                localStorage.removeItem("userData");
                setLoader(true);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setToastMessage(data.message || "Registration failed. Please try again.");
                setToastSeverity("error");
                setToastOpen(true);
                setLoader(false);
            }
        } catch (error) {
            setToastMessage("An error occurred. Please try again.");
            setToastSeverity("error");
            setToastOpen(true);
            setLoader(false);
        }
    };

    const handleToastClose = () => setToastOpen(false);

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
                        {imageBlob && (
                            <img src={URL.createObjectURL(imageBlob)} alt="Captured" className="absolute object-fill inset-0 w-full h-full" />
                        )}
                        {!imageBlob && <span className="text-gray-500 absolute">Captured Image</span>}
                    </div>
                </div>

                <div className="flex flex-col gap-4 max-w-md w-4/5">
                    <button
                        className="w-full flex items-center cursor-pointer justify-center h-11 font-semibold rounded-4xl bg-[#0061A2] hover:bg-[#1836B2] text-white py-1 px-3 border border-transparent text-base transition-all focus:outline-none focus:ring-2"
                        onClick={startCamera}>
                        Start Camera
                    </button>
                    <button
                        className="w-full flex items-center cursor-pointer justify-center h-11 font-semibold rounded-4xl bg-[#0061A2] hover:bg-[#1836B2] text-white py-1 px-3 border border-transparent text-base transition-all focus:outline-none focus:ring-2"
                        onClick={captureImage}
                        disabled={!cameraActive}>
                        Capture Image
                    </button>
                    <button
                        className="w-full flex items-center cursor-pointer justify-center h-11 font-semibold rounded-4xl bg-[#0061A2] hover:bg-[#1836B2] text-white py-1 px-3 border border-transparent text-base transition-all focus:outline-none focus:ring-2"
                        onClick={handleSubmit}
                        disabled={!imageBlob}>
                        Submit
                    </button>
                </div>
            </div>

            {/* Toast Notification */}
            <Toast
                open={toastOpen}
                message={toastMessage}
                severity={toastSeverity}
                onClose={handleToastClose}
            />
        </div>
    );
};

export default FacialRecognition;
