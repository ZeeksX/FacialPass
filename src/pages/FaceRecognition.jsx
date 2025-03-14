import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import spinner from '../assets/spinner.svg';
import Toast from "../components/Toast";

const FaceRecognition = ({ selectedExam, onAuthenticate, onImageCapture }) => {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(null);
    const [knownFaces, setKnownFaces] = useState([]);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

    useEffect(() => {
        const loadModelsAndKnownFaces = async () => {
            try {
                console.log("Loading face-api models...");
                await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
                await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
                await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
                console.log("Models loaded successfully!");

                console.log("Fetching known faces from API...");
                const response = await fetch("http://localhost:5000/api/auth/known-faces");
                const knownFacesData = await response.json();
                console.log("Known faces data:", knownFacesData);

                const knownFacesWithDescriptors = await Promise.all(
                    knownFacesData.map(async (face) => {
                        try {
                            console.log(`Processing face: ${face.name}`);
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
                        }
                        return null;
                    })
                );

                setKnownFaces(knownFacesWithDescriptors.filter((face) => face !== null));
                console.log("Known faces processed successfully!");
            } catch (error) {
                console.error("Error loading models or known faces:", error);
                setToast({ open: true, message: "Failed to load face models.", severity: "error" });
            }
        };

        loadModelsAndKnownFaces();
    }, []);

    const handleCloseToast = () => {
        setToast({ ...toast, open: false });
    };

    const startCamera = () => {
        console.log("Starting camera...");
        setIsLoading(true);
        setIsCameraOn(true);
    };

    const stopCamera = () => {
        console.log("Stopping camera...");
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("File selected:", file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageURL = e.target.result;
                setImage(imageURL);

                // Pass the uploaded image to the parent component
                if (onImageCapture) {
                    onImageCapture(imageURL);
                }

                authenticateStudent(imageURL, "base64");
            };
            reader.readAsDataURL(file);
        }
    };

    const authenticateStudent = async (imageSrc, type) => {
        try {
            console.log("Starting authentication...");
            let img;
            if (type === "base64") {
                const res = await fetch(imageSrc);
                const blob = await res.blob();
                img = await faceapi.bufferToImage(blob);
            } else if (type === "file") {
                img = await faceapi.bufferToImage(imageSrc);
            }

            console.log("Detecting faces...");
            const detections = await faceapi
                .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptors();

            console.log("Face detection result:", detections);
            if (detections.length === 0) {
                setStatus("No face detected");
                setToast({ open: true, message: "No face detected in the image.", severity: "warning" });
                return;
            }

            console.log("Recognizing face...");
            const recognizedName = await recognizeFace(detections[0].descriptor);
            console.log("Recognized name:", recognizedName);
            if (!recognizedName) {
                setStatus("Face not recognized");
                setToast({ open: true, message: "Face not recognized. Please try again.", severity: "error" });
                return;
            }

            const [firstName, lastName] = recognizedName.split("-");
            console.log("Authenticating with backend...");
            const response = await fetch("http://localhost:5000/api/auth/authenticate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstname: firstName,
                    lastname: lastName,
                    courseId: selectedExam.id,
                }),
            });

            const data = await response.json();
            console.log("Backend response:", data);

            if (data.success) {
                if (data.isRegistered) {
                    setStatus("Authenticated");
                    onAuthenticate(data.student);
                    setToast({ open: true, message: data.message, severity: "success" });
                } else {
                    setStatus("Student not registered for this course");
                    setToast({ open: true, message: data.message, severity: "error" });
                }
            } else {
                setStatus("Not Authenticated");
                setToast({ open: true, message: data.message || "Authentication failed", severity: "error" });
            }
        } catch (error) {
            console.error("Error authenticating student:", error);
            setStatus("Error");
            setToast({ open: true, message: "Authentication error. Please try again.", severity: "error" });
        }
    };

    const recognizeFace = async (descriptor) => {
        console.log("Comparing face descriptor with known faces...");
        let minDistance = Infinity;
        let recognizedName = null;

        for (const face of knownFaces) {
            const distance = faceapi.euclideanDistance(descriptor, face.descriptor);
            console.log(`Comparing with ${face.name}, Distance: ${distance}`);

            if (distance < minDistance && distance < 0.5) {
                minDistance = distance;
                recognizedName = face.name;
            }
        }

        console.log("Best match:", recognizedName);
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

        </div>
    );
};

export default FaceRecognition;