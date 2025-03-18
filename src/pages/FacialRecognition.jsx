import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SendIcon from '@mui/icons-material/Send';
import Toast from "../components/Toast";
import spinner from '/assets/spinner.svg';
import Loader from "../components/Loader";

const FacialRecognition = () => {
    const webcamRef = useRef(null);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [state, setState] = useState({
        imageBlob: null,
        cameraActive: false,
        imagePreview: null,
        modelsLoaded: false,
        isLoading: false
    });

    const [toast, setToast] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const { imageBlob, cameraActive, imagePreview, modelsLoaded, isLoading } = state;

    // Track window resize for responsive video constraints
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Load Face API models on component mount
    useEffect(() => {
        const loadModels = async () => {
            try {
                setState(prev => ({ ...prev, isLoading: true }));
                showToast("Loading face detection models...", "info");

                const modelUrls = [
                    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                    faceapi.nets.faceRecognitionNet.loadFromUri("/models")
                ];

                await Promise.all(modelUrls);

                setState(prev => ({
                    ...prev,
                    modelsLoaded: true,
                    isLoading: false
                }));
                showToast("Models loaded successfully!", "success");
            } catch (err) {
                console.error("Error loading Face API models:", err);
                showToast("Failed to load face detection models.", "error");
                setState(prev => ({ ...prev, isLoading: false }));
            }
        };
        loadModels();
    }, []);

    const showToast = useCallback((message, severity = "success") => {
        setToast({
            open: true,
            message,
            severity
        });
    }, []);

    const handleToastClose = useCallback(() => {
        setToast(prev => ({ ...prev, open: false }));
    }, []);

    const toggleCamera = useCallback(() => {
        if (!cameraActive) {
            if (!modelsLoaded) {
                showToast("Face detection models are still loading. Please wait.", "warning");
                return;
            }
            setState(prev => ({
                ...prev,
                cameraActive: true,
                isLoading: true,
                imagePreview: null
            }));
        } else {
            setState(prev => ({ ...prev, cameraActive: false }));
        }
    }, [cameraActive, modelsLoaded, showToast]);

    const captureImage = useCallback(async () => {
        if (!modelsLoaded) {
            showToast("Face detection models are still loading. Please wait.", "warning");
            return;
        }

        const imageSrc = webcamRef.current?.getScreenshot();
        if (!imageSrc) return;

        try {
            setState(prev => ({ ...prev, isLoading: true }));

            // Convert base64 to Blob
            const res = await fetch(imageSrc);
            const blob = await res.blob();

            // Compress the image
            const compressedBlob = await imageCompression(blob, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
            });

            // Convert blob to a canvas for Face API
            const img = await faceapi.bufferToImage(compressedBlob);
            const detections = await faceapi
                .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (!detections) {
                showToast("No face detected. Please capture again.", "warning");
                setState(prev => ({ ...prev, isLoading: false }));
                return;
            }

            setState(prev => ({
                ...prev,
                imageBlob: compressedBlob,
                imagePreview: imageSrc,
                isLoading: false
            }));
            showToast("Face detected successfully.", "success");
        } catch (error) {
            console.error("Error capturing image:", error);
            showToast("Error processing image. Please try again.", "error");
            setState(prev => ({ ...prev, isLoading: false }));
        }
    }, [modelsLoaded, showToast]);

    const handleSubmit = useCallback(async () => {
        if (!imageBlob) {
            showToast("No valid face detected. Please capture again.", "error");
            return;
        }

        try {
            setState(prev => ({ ...prev, isLoading: true }));
            const userData = JSON.parse(localStorage.getItem("userData") || "{}");

            if (!userData.email) {
                showToast("User data not found. Please register again.", "error");
                setState(prev => ({ ...prev, isLoading: false }));
                return;
            }

            const formData = new FormData();
            Object.entries(userData).forEach(([key, value]) => {
                formData.append(key === "matricNum" ? "matricNumber" : key, value);
            });

            formData.append('facial_image', imageBlob);

            const res = await fetch("https://facialpass-backend-production.up.railway.app/api/students/register", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setLoader(true);
                showToast("Registration successful! Redirecting...", "success");
                localStorage.setItem("token", data.token);
                localStorage.removeItem("userData");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setLoader(false)
                showToast(data.message || "Registration failed. Please try again.", "error");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setLoader(false)
            showToast("An error occurred. Please try again.", "error");
        } finally {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    }, [imageBlob, navigate, showToast]);

    // Dynamically adjust video constraints based on device width
    const isMobile = windowWidth < 768;
    const videoConstraints = {
        width: isMobile ? 720 : 1280,
        height: isMobile ? 1280 : 720,
        facingMode: "user",
        aspectRatio: isMobile ? 9 / 16 : 16 / 9
    };

    // Calculate camera container dimensions for proper aspect ratio
    const cameraContainerStyle = {
        aspectRatio: isMobile ? "9/16" : "16/9",
        maxHeight: isMobile ? "calc(100vh - 250px)" : "328px",
        width: "100%"
    };

    return (
        <>
            <div className="flex pt-4 max-md:p-4 justify-center md:items-center min-h-screen w-full bg-gradient-to-b from-white to-[#0061A2]">
                <div className="rounded-md shadow bg-white flex flex-col items-center max-md:w-full w-4/5 xl:w-1/2">
                    <header className="flex text-white flex-col w-full rounded-t-md bg-gradient-to-r from-[#0061A2] to-[#0061a263] p-4">
                        <h1 className="flex items-center justify-center gap-2">
                            <HowToRegIcon /> <strong className="text-xl">Facial Registration</strong>
                        </h1>
                        <p className="flex items-center justify-center gap-2">
                            Please capture a clear image of your face
                        </p>
                    </header>

                    <main className="w-full p-4 flex flex-col items-center justify-between flex-grow">
                        <div className="flex w-full flex-col items-center">
                            <div
                                className="relative rounded-lg bg-black overflow-hidden"
                                style={cameraContainerStyle}
                            >
                                {cameraActive && !imagePreview ? (
                                    <Webcam
                                        className="rounded-lg w-full h-full object-cover"
                                        audio={false}
                                        ref={webcamRef}
                                        mirrored={false}
                                        screenshotFormat="image/jpeg"
                                        videoConstraints={videoConstraints}
                                        onUserMedia={() => setState(prev => ({ ...prev, isLoading: false }))}
                                    />
                                ) : imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Captured"
                                        className="rounded-lg w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex justify-center items-center text-gray-500">
                                        Camera Preview
                                    </div>
                                )}
                                {isLoading && (
                                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                        <img src={spinner} alt="Loading..." className="w-12 h-12" />
                                    </div>
                                )}
                            </div>

                            {/* Control buttons */}
                            <div className="flex flex-row max-md:flex-col justify-center items-center gap-4 max-md:gap-2 mt-4 w-full">
                                <div className='flex flex-row max-md:flex-col justify-center items-center max-md:gap-2 gap-4'>
                                    <button
                                        className="flex flex-row max-md:w-44 cursor-pointer rounded-md py-2 px-3 font-medium text-base text-white justify-center items-center bg-[#0061A2] hover:bg-[#1836B2] disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        onClick={toggleCamera}
                                        disabled={!modelsLoaded || isLoading}
                                    >
                                        <span className="mr-2"><CameraAltIcon /></span>
                                        {cameraActive ? 'Stop Camera' : 'Start Camera'}
                                    </button>
                                    <button
                                        className="flex flex-row max-md:w-44 cursor-pointer rounded-md py-2 px-3 font-medium text-base text-white justify-center items-center bg-[#0061A2] hover:bg-[#1836B2] disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        onClick={captureImage}
                                        disabled={!cameraActive || isLoading}
                                    >
                                        <span className="mr-2"><CenterFocusStrongIcon /></span>
                                        Capture Image
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className="flex flex-row max-md:w-44 cursor-pointer rounded-md py-2 px-3 font-medium text-base text-white justify-center items-center bg-[#0061A2] hover:bg-[#1836B2] disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        onClick={handleSubmit}
                                        disabled={!imageBlob || isLoading}
                                    >
                                        <span className='mr-2'><SendIcon /></span>
                                        Submit
                                    </button>
                                </div>
                            </div>

                            {/* Toast notification */}
                            <Toast
                                open={toast.open}
                                message={toast.message}
                                severity={toast.severity}
                                onClose={handleToastClose}
                            />
                        </div>
                    </main>
                </div>
            </div>
            {loader && <Loader />}
        </>

    );
};

export default FacialRecognition;