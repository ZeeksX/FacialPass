import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import Toast from "../components/Toast";
import spinner from '../assets/spinner.svg';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SendIcon from '@mui/icons-material/Send';

const FacialRecognition = () => {
    const webcamRef = useRef(null);
    const [imageBlob, setImageBlob] = useState(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState("success");
    const [isLoading, setIsLoading] = useState(false);
    const [modelsLoaded, setModelsLoaded] = useState(false); // Track if models are loaded
    const [imagePreview, setImagePreview] = useState(null); // Preview captured image
    const navigate = useNavigate();

    // Load Face API models on component mount
    useEffect(() => {
        const loadModels = async () => {
            try {
                setIsLoading(true);
                setToastMessage("Loading face detection models...");
                setToastSeverity("info");
                setToastOpen(true);

                await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
                await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
                await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

                setModelsLoaded(true); // Models are loaded
                setIsLoading(false);
                setToastMessage("Models loaded successfully!");
                setToastSeverity("success");
                setToastOpen(true);
            } catch (err) {
                console.error("Error loading Face API models:", err);
                setToastMessage("Failed to load face detection models.");
                setToastSeverity("error");
                setToastOpen(true);
                setIsLoading(false);
            }
        };
        loadModels();
    }, []);

    const startCamera = () => {
        if (!modelsLoaded) {
            setToastMessage("Face detection models are still loading. Please wait.");
            setToastSeverity("warning");
            setToastOpen(true);
            return;
        }
        setCameraActive(true);
        setIsLoading(true);
    };

    const stopCamera = () => {
        setCameraActive(false);
    };

    const captureImage = async () => {
        if (!modelsLoaded) {
            setToastMessage("Face detection models are still loading. Please wait.");
            setToastSeverity("warning");
            setToastOpen(true);
            return;
        }

        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) return;

        // Convert base64 to Blob
        const res = await fetch(imageSrc);
        const blob = await res.blob();

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
            setToastMessage("No face detected. Please capture again.");
            setToastSeverity("warning");
            setToastOpen(true);
            return;
        }

        setImageBlob(compressedBlob);
        setImagePreview(imageSrc); // Set image preview
        setToastMessage("Face detected successfully.");
        setToastSeverity("success");
        setToastOpen(true);
    };

    const handleSubmit = async () => {
        if (!imageBlob) {
            setToastMessage("No valid face detected. Please capture again.");
            setToastSeverity("error");
            setToastOpen(true);
            return;
        }

        const userData = JSON.parse(localStorage.getItem("userData"));
        const formData = new FormData();
        formData.append("firstname", userData.firstname);
        formData.append("lastname", userData.lastname);
        formData.append("department", userData.department);
        formData.append("matricNumber", userData.matricNum);
        formData.append("email", userData.email);
        formData.append("password", userData.password);

        // Append the image Blob
        formData.append('facial_image', imageBlob);

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
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setToastMessage(data.message || "Registration failed. Please try again.");
                setToastSeverity("error");
                setToastOpen(true);
            }
        } catch (error) {
            setToastMessage("An error occurred. Please try again.");
            setToastSeverity("error");
            setToastOpen(true);
        }
    };

    const handleToastClose = () => setToastOpen(false);

    const videoConstraints = {
        width: 1050,
        facingMode: "user", // Use front-facing camera
    };

    return (
        <div className="flex pt-4 max-lg:p-4 justify-center lg:items-center min-h-screen w-full bg-gradient-to-b from-white to-[#0061A2]">
            <div className="rounded-md max-md:h-[90vh] h-[90vh] xl:h-[80vh] shadow bg-white flex flex-col items-center max-lg:w-full w-3/5 xl:w-2/5">
                <div className="flex text-white flex-col w-full rounded-t-md h-30 gap-2 bg-gradient-to-r from-[#0061A2] to-[#0061a263] p-4">
                    <h1 className="flex items-center justify-center gap-2">
                        <HowToRegIcon />  <strong className="text-xl">Facial Registration</strong>
                    </h1>
                    <h1 className="flex items-center justify-center gap-2">
                        Please upload a clear image of your face
                    </h1>
                </div>
                <div className="w-full p-4">
                    <div className="flex w-full flex-col items-center">
                        <div className="relative rounded-lg h-[328px] max-md:h-[250px] w-full bg-black">
                            {cameraActive && !imagePreview ? (
                                <Webcam
                                    className="rounded-lg w-full h-full object-fill"
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                    onUserMedia={() => setIsLoading(false)}
                                />
                            ) : imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Captured"
                                    className="rounded-lg w-full h-full object-fill"
                                />
                            ) : (
                                <div className="absolute inset-0 flex justify-center items-center text-gray-500">
                                    Camera Preview
                                </div>
                            )}
                            {isLoading && (
                                <div className="absolute inset-0 flex justify-center items-center">
                                    <img src={spinner} alt="Loading..." className="w-12 h-12" />
                                </div>
                            )}
                        </div>

                        {/* Buttons for camera control */}
                        <div className="flex flex-row max-md:flex-col justify-center items-center gap-4 max-md:gap-2 mt-4 w-full">
                            <div className='flex flex-row max-md:flex-col justify-center items-center max-md:gap-2 gap-4'>
                                {!cameraActive ? (
                                    <button
                                        className="flex flex-row max-md:w-44 cursor-pointer rounded-md py-2 px-3 font-medium text-base text-white justify-center items-center bg-[#0061A2] hover:bg-[#1836B2]"
                                        onClick={startCamera}
                                        disabled={!modelsLoaded || isLoading}
                                    >
                                        <span className="mr-2"><CameraAltIcon /></span>
                                        Start Camera
                                    </button>
                                ) : (
                                    <button
                                        className="flex flex-row max-md:w-44 cursor-pointer rounded-md py-2 px-3 font-medium text-base text-white justify-center items-center bg-[#0061A2] hover:bg-[#1836B2]"
                                        onClick={stopCamera}
                                    >
                                        <span className="mr-2"><CameraAltIcon /></span>
                                        Stop Camera
                                    </button>
                                )}
                                <button
                                    className="flex flex-row max-md:w-44 cursor-pointer rounded-md py-2 px-3 font-medium text-base text-white justify-center items-center bg-[#0061A2] hover:bg-[#1836B2]"
                                    onClick={captureImage}
                                    disabled={!cameraActive || isLoading}
                                >
                                    <span className="mr-2"><CenterFocusStrongIcon /></span>
                                    Capture Image
                                </button>
                            </div>
                            <div>
                                <button
                                    className="flex flex-row max-md:w-44 cursor-pointer rounded-md py-2 px-3 font-medium text-base text-white justify-center items-center bg-[#0061A2] hover:bg-[#1836B2]"
                                    onClick={handleSubmit}
                                    disabled={!imageBlob || isLoading}
                                >
                                    <span className='mr-2'><SendIcon /> </span>
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
                </div>
            </div>
        </div>
    );
};

export default FacialRecognition;