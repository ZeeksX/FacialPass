import React, { useState, useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import SendIcon from '@mui/icons-material/Send';
import spinner from '/assets/spinner.svg';
import Toast from "../components/Toast";

// Constants
const FACE_RECOGNITION_THRESHOLD = 0.5;
const API_URL = "https://facialpass-backend.onrender.com/api/auth/authenticate";
const MODELS_PATH = "/models";

const FaceRecognition = ({ selectedCourse, onAuthenticate, onImageCapture }) => {
    const webcamRef = useRef(null);
    const [studentName, setStudentName] = useState({
        firstName: null,
        lastName: null
    });

    const [state, setState] = useState({
        imagePreview: null,
        imageBlob: null,
        status: null,
        cameraActive: false,
        isLoading: false,
        modelsLoaded: false,
        knownFaces: [], // Add knownFaces to state
        toast: {
            open: false,
            message: "",
            severity: "info"
        }
    });

    const {
        imagePreview,
        imageBlob,
        status,
        cameraActive,
        isLoading,
        modelsLoaded,
        knownFaces,
        toast
    } = state;

    // Camera container style
    const cameraContainerStyle = {
        width: '100%',
        height: '328px',
        maxWidth: '600px'
    };

    // Video constraints
    const videoConstraints = {
        width: 1050,
        height: 600,
        facingMode: "user"
    };

    // Show toast message helper
    const showToast = useCallback((message, severity = "info") => {
        setState(prev => ({
            ...prev,
            toast: { open: true, message, severity }
        }));
    }, []);

    // Load face recognition models and known faces
    useEffect(() => {
        const loadModelsAndKnownFaces = async () => {
            try {
                showToast("Loading face recognition models and known faces...", "info");

                // Load models
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri(MODELS_PATH),
                    faceapi.nets.faceLandmark68Net.loadFromUri(MODELS_PATH),
                    faceapi.nets.faceRecognitionNet.loadFromUri(MODELS_PATH)
                ]);

                // Fetch known faces
                const response = await fetch("https://facialpass-backend.onrender.com/api/auth/known-faces");
                const knownFacesData = await response.json();

                // Compute descriptors for each known face
                const knownFacesWithDescriptors = await Promise.all(
                    knownFacesData.map(async (face) => {
                        try {
                            const res = await fetch(`data:image/jpeg;base64,${face.image}`);
                            const blob = await res.blob();
                            const img = await faceapi.bufferToImage(blob);

                            const detection = await faceapi
                                .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
                                .withFaceLandmarks()
                                .withFaceDescriptor();

                            return detection ? { name: face.name, descriptor: detection.descriptor } : null;
                        } catch (error) {
                            console.error("Error processing face:", error);
                            return null;
                        }
                    })
                );

                // Filter out null values and set the state
                setState(prev => ({
                    ...prev,
                    modelsLoaded: true,
                    knownFaces: knownFacesWithDescriptors.filter(face => face !== null)
                }));
                showToast("Models and known faces loaded successfully!", "success");
            } catch (error) {
                console.error("Error loading models or fetching known faces:", error);
                showToast("Failed to load models or fetch known faces.", "error");
            }
        };

        loadModelsAndKnownFaces();
    }, [showToast]);

    // Camera controls
    const toggleCamera = useCallback(() => {
        if (cameraActive) {
            setState(prev => ({ ...prev, cameraActive: false }));
            return;
        }

        if (!state.knownFaces.length) {
            showToast("Known faces are still loading. Please wait.", "warning");
            return;
        }

        if (!modelsLoaded) {
            showToast("Face recognition models are still loading. Please wait.", "warning");
            return;
        }

        setState(prev => ({ ...prev, isLoading: true, cameraActive: true }));
    }, [cameraActive, modelsLoaded, state.knownFaces, showToast]);

    // Process image data
    const processImageFromSource = useCallback(async (imageSrc) => {
        const res = await fetch(imageSrc);
        const blob = await res.blob();
        return {
            img: await faceapi.bufferToImage(blob),
            blob
        };
    }, []);

    // Face detection and recognition
    const detectFaces = useCallback(async (img) => {
        return await faceapi
            .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptors();
    }, []);

    const recognizeFace = useCallback((descriptor) => {
        if (!knownFaces || knownFaces.length === 0) return null;

        let minDistance = Infinity;
        let recognizedName = null;

        for (const face of knownFaces) {
            const distance = faceapi.euclideanDistance(descriptor, face.descriptor);

            if (distance < minDistance && distance < FACE_RECOGNITION_THRESHOLD) {
                minDistance = distance;
                recognizedName = face.name;
            }
        }

        return recognizedName;
    }, [knownFaces]);

    // Authentication process
    const authenticateWithServer = useCallback(async (firstName, lastName) => {
        if (!selectedCourse || !selectedCourse.id) {
            showToast("No course selected for authentication", "error");
            return { success: false };
        }

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstname: firstName,
                lastname: lastName,
                courseId: selectedCourse.id
            })
        });

        return await response.json();
    }, [selectedCourse, showToast]);

    // User actions
    const captureImage = useCallback(() => {
        if (!webcamRef.current) {
            showToast("Camera is not available", "error");
            return;
        }

        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
            showToast("Failed to capture image", "error");
            return;
        }

        setState(prev => ({ ...prev, imagePreview: imageSrc, isLoading: true }));

        // Process the captured image
        processImageFromSource(imageSrc)
            .then(({ img, blob }) => {
                setState(prev => ({ ...prev, imageBlob: blob, isLoading: false }));
                onImageCapture?.(imageSrc);
            })
            .catch(error => {
                console.error("Error processing image:", error);
                showToast("Failed to process the captured image", "error");
                setState(prev => ({ ...prev, isLoading: false }));
            });
    }, [webcamRef, processImageFromSource, onImageCapture, showToast]);

    const handleSubmit = useCallback(async () => {
        if (!imageBlob) {
            showToast("Please capture an image first", "warning");
            return;
        }

        setState(prev => ({ ...prev, isLoading: true }));

        try {
            // Convert blob to image
            const img = await faceapi.bufferToImage(imageBlob);

            // Detect faces
            const detections = await detectFaces(img);

            if (detections.length === 0) {
                setState(prev => ({ ...prev, status: "No face detected", isLoading: false }));
                showToast("No face detected in the image.", "warning");
                return;
            }

            // Recognize face
            const recognizedName = recognizeFace(detections[0].descriptor);

            if (!recognizedName) {
                setState(prev => ({ ...prev, status: "Face not recognized", isLoading: false }));
                showToast("Face not recognized. Please try again.", "error");
                return;
            }

            // Authenticate with server
            const [first, last] = recognizedName.split(" ");
            setStudentName({ firstName: first, lastName: last });

            // Then use these in your authentication call:
            const data = await authenticateWithServer(first, last);

            // Update status display
            setState(prev => ({
                ...prev,
                status: "Authenticated",
                isLoading: false
            }));


            // Handle authentication result
            if (data.success) {
                if (data.isRegistered) {
                    setState(prev => ({ ...prev, status: "Authenticated", isLoading: false }));
                    onAuthenticate?.(data.student);
                } else {
                    setState(prev => ({ ...prev, status: data.message, isLoading: false }));
                    showToast(data.message, "warning");
                }
            } else {
                setState(prev => ({ ...prev, status: data.message, isLoading: false }));
                showToast(data.message, "error");
            }
        } catch (error) {
            console.error("Error authenticating student:", error);
            setState(prev => ({ ...prev, status: "Error", isLoading: false }));
            showToast("Authentication error. Please try again.", "error");
        }
    }, [imageBlob, detectFaces, recognizeFace, authenticateWithServer, onAuthenticate, showToast]);

    const handleToastClose = useCallback(() => {
        setState(prev => ({
            ...prev,
            toast: { ...prev.toast, open: false }
        }));
    }, []);

    const resetCapture = useCallback(() => {
        setState(prev => ({
            ...prev,
            imagePreview: null,
            imageBlob: null
        }));
    }, []);

    return (
        <div>
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

                    {/* Status display */}
                    {status && (
                        <div className={`mt-2 px-4 py-2 rounded-md ${status === 'Authenticated' ? 'bg-green-100 text-green-800' :
                            status === 'Not Authenticated' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                            {status} {studentName ? `- ${studentName.firstName} ${studentName.lastName}` : ''}
                        </div>
                    )}

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
                                onClick={imagePreview ? resetCapture : captureImage}
                                disabled={(!cameraActive && !imagePreview) || isLoading}
                            >
                                <span className="mr-2"><CenterFocusStrongIcon /></span>
                                {imagePreview ? 'Retake Image' : 'Capture Image'}
                            </button>
                        </div>
                        <div>
                            <button
                                className="flex flex-row max-md:w-44 cursor-pointer rounded-md py-2 px-3 font-medium text-base text-white justify-center items-center bg-[#0061A2] hover:bg-[#1836B2] disabled:bg-gray-400 disabled:cursor-not-allowed"
                                onClick={handleSubmit}
                                disabled={!imageBlob || isLoading || !selectedCourse}
                            >
                                <span className='mr-2'><SendIcon /></span>
                                Authenticate
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            {/* Toast notification */}
            <Toast
                open={toast.open}
                message={toast.message}
                severity={toast.severity}
                onClose={handleToastClose}
            />
        </div>
    );
};

export default FaceRecognition;