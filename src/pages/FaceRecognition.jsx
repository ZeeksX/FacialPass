import React, { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import spinner from '../assets/spinner.svg';
import Toast from "../components/Toast";

const FaceRecognition = ({ selectedCourse, onAuthenticate, onImageCapture }) => {
    const { knownFaces } = useOutletContext();
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isKnownFacesLoaded, setIsKnownFacesLoaded] = useState(false); // Track if known faces are loaded
    const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

    useEffect(() => {
        const loadModels = async () => {
            try {
                setToast({ open: true, message: "Loading face recognition models...", severity: "info" });
                await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
                await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
                await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
                setToast({ open: true, message: "Face recognition models loaded successfully!", severity: "success" });
            } catch (error) {
                console.error("Error loading face-api models:", error);
                setToast({ open: true, message: "Failed to load face recognition models.", severity: "error" });
            }
        };

        loadModels();
    }, []);

    useEffect(() => {
        if (knownFaces && knownFaces.length > 0) {
            setIsKnownFacesLoaded(true); // Mark known faces as loaded
        }
    }, [knownFaces]);

    const handleCloseToast = () => {
        setToast({ ...toast, open: false });
    };

    const startCamera = () => {
        if (!isKnownFacesLoaded) {
            setToast({ open: true, message: "Known faces are still loading. Please wait.", severity: "warning" });
            return;
        }
        setIsLoading(true);
        setIsCameraOn(true);
    };

    const stopCamera = () => {
        setIsCameraOn(false);
    };

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);

        // Pass the captured image to the parent component
        if (onImageCapture) {
            onImageCapture(imageSrc);
        }

        authenticateStudent(imageSrc, "base64");
    };

    const authenticateStudent = async (imageSrc, type) => {
        try {
            let img;
            if (type === "base64") {
                const res = await fetch(imageSrc);
                const blob = await res.blob();
                img = await faceapi.bufferToImage(blob);
            } else if (type === "file") {
                img = await faceapi.bufferToImage(imageSrc);
            }

            const detections = await faceapi
                .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptors();

            if (detections.length === 0) {
                setStatus("No face detected");
                setToast({ open: true, message: "No face detected in the image.", severity: "warning" });
                return;
            }

            const recognizedName = await recognizeFace(detections[0].descriptor);
            if (!recognizedName) {
                setStatus("Face not recognized");
                setToast({ open: true, message: "Face not recognized. Please try again.", severity: "error" });
                return;
            }

            const [firstName, lastName] = recognizedName.split(" ");
            const response = await fetch("http://localhost:5000/api/auth/authenticate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstname: firstName,
                    lastname: lastName,
                    courseId: selectedCourse.id,
                }),
            });

            const data = await response.json();

            if (data.success) {
                if (data.isRegistered) {
                    setStatus("Authenticated");
                    onAuthenticate(data.student);  
                } else {
                    setStatus("Student not registered for this course");
                }
            } else {
                setStatus("Not Authenticated");
            }
        } catch (error) {
            console.error("Error authenticating student:", error);
            setStatus("Error");
            setToast({ open: true, message: "Authentication error. Please try again.", severity: "error" });
        }
    };

    const recognizeFace = async (descriptor) => {
        let minDistance = Infinity;
        let recognizedName = null;

        for (const face of knownFaces) {
            const distance = faceapi.euclideanDistance(descriptor, face.descriptor);

            if (distance < minDistance && distance < 0.5) {
                minDistance = distance;
                recognizedName = face.name;
            }
        }
        return recognizedName;
    };

    const videoConstraints = {
        width: 1050
    };

    return (
        <div className="flex w-full flex-col items-center">
            <div className="relative rounded-lg h-[328px] w-full bg-black">
                {isCameraOn && (
                    <Webcam
                        className="rounded-lg w-full h-full object-fill"
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        onUserMedia={() => setIsLoading(false)}
                    />
                )}
                {isLoading && (
                    <div className="absolute inset-0 flex justify-center items-center">
                        <img src={spinner} alt="Loading..." className="w-12 h-12" />
                    </div>
                )}
            </div>

            {/* Buttons for camera control */}
            <div className="flex flex-row justify-center items-center gap-8 mt-2 w-full">
                {!isCameraOn ? (
                    <button
                        className="flex flex-row cursor-pointer rounded-md py-2 px-3 font-medium text-base text-white justify-center items-center bg-[#0061A2] hover:bg-[#1836B2]"
                        onClick={startCamera}
                        disabled={!isKnownFacesLoaded} // Disable button until known faces are loaded
                    >
                        <span className="mr-2"><CameraAltIcon /></span>
                        Start Camera
                    </button>
                ) : (
                    <button
                        className="flex flex-row cursor-pointer rounded-md py-2 px-3 font-medium text-base text-white justify-center items-center bg-[#0061A2] hover:bg-[#1836B2]"
                        onClick={stopCamera}
                    >
                        <span className="mr-2"><CameraAltIcon /></span>
                        Stop Camera
                    </button>
                )}
                <button
                    className="flex flex-row cursor-pointer rounded-md py-2 px-3 font-medium text-base text-white justify-center items-center bg-[#0061A2] hover:bg-[#1836B2]"
                    onClick={capture}
                    disabled={!isCameraOn}
                >
                    <span className="mr-2"><CenterFocusStrongIcon /></span>
                    Authenticate Now
                </button>
            </div>
            <Toast open={toast.open} message={toast.message} severity={toast.severity} onClose={handleCloseToast} />
        </div>
    );
};

export default FaceRecognition;