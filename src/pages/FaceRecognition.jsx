import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import spinner from '../assets/spinner.svg'; // Import the spinner image

const FaceRecognition = ({ selectedExam, onAuthenticate }) => {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(null);
    const [knownFaces, setKnownFaces] = useState([]);
    const [isCameraOn, setIsCameraOn] = useState(false); // State to control camera start/stop
    const [isLoading, setIsLoading] = useState(false); // State to handle loading spinner

    // Load models and known faces on mount
    useEffect(() => {
        const loadModelsAndKnownFaces = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
                await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
                await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

                const response = await fetch("http://localhost:5000/api/auth/known-faces");
                const knownFacesData = await response.json();

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
                        }
                        return null;
                    })
                );

                setKnownFaces(knownFacesWithDescriptors.filter((face) => face !== null));
            } catch (error) {
                console.error("Error loading models or known faces:", error);
            }
        };

        loadModelsAndKnownFaces();
    }, []);

    // Start the camera
    const startCamera = () => {
        setIsLoading(true); // Show spinner while camera is loading
        setIsCameraOn(true); // Turn on the camera
    };

    // Stop the camera
    const stopCamera = () => {
        setIsCameraOn(false); // Turn off the camera
    };

    // Capture image from webcam
    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        authenticateStudent(imageSrc, "base64");
    };

    // Handle file upload
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
            authenticateStudent(file, "file");
        }
    };

    // Perform face authentication
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
                return;
            }

            const recognizedName = await recognizeFace(detections[0].descriptor);
            if (!recognizedName) {
                setStatus("Face not recognized");
                return;
            }

            const [firstName, lastName] = recognizedName.split("-");
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
            if (data.success) {
                if (data.isRegistered) {
                    setStatus("Authenticated");
                    onAuthenticate(data.student); // Pass student data to parent component
                } else {
                    setStatus("Student not registered for this course");
                }
            } else {
                setStatus("Not Authenticated");
            }
        } catch (error) {
            console.error("Error authenticating student:", error);
            setStatus("Error");
        }
    };

    // Recognize face using Euclidean distance
    const recognizeFace = async (descriptor) => {
        let minDistance = Infinity;
        let recognizedName = null;

        for (const face of knownFaces) {
            const distance = faceapi.euclideanDistance(descriptor, face.descriptor);
            if (distance < minDistance && distance < 0.4) {
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
            {/* Webcam with spinner overlay */}
            <div className="relative rounded-lg h-[328px] w-full bg-black">
                {isCameraOn && (
                    <Webcam
                        className="rounded-lg w-full object-fill"
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        onUserMedia={() => setIsLoading(false)} // Hide spinner when camera is ready
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
                    disabled={!isCameraOn} // Disable capture button if camera is off
                >
                    <span className="mr-2"><CenterFocusStrongIcon /></span>
                    Authenticate Now
                </button>
            </div>

            {/* File upload input */}
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {status && <h3>Authentication Status: {status}</h3>}
        </div>
    );
};

export default FaceRecognition;