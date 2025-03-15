import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as faceapi from "face-api.js";
import loginImage from "../assets/login-image.jpg";
import logo from "../assets/logo.svg";
import Toast from "../components/Toast";
import Loader from "../components/Loader";

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");
  const [loader, setLoader] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  // Load models only when needed
  useEffect(() => {

    const loadModels = async () => {
      try {
        setToastMessage("Loading models...");
        setToastSeverity("info");
        setToastOpen(true);

        // Load models in parallel
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        ]);

        setModelsLoaded(true);
        setIsLoadingModels(false);
        setToastMessage("Models loaded successfully!");
        setToastSeverity("success");
        setToastOpen(true);
      } catch (error) {
        console.error("Error loading models:", error);
        setToastMessage("Failed to load models. Please try again.");
        setToastSeverity("error");
        setToastOpen(true);
        setIsLoadingModels(false);
      }
    };

    loadModels();
  }, []);

  // Memoize the detectFace function
  const detectFace = useCallback(async (imageData) => {
    try {
      const img = await faceapi.fetchImage(imageData);
      const detections = await faceapi
        .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();
      return detections.length > 0;
    } catch (error) {
      console.error("Error detecting face:", error);
      setToastMessage("Error detecting face. Please try again.");
      setToastSeverity("error");
      setToastOpen(true);
      return false;
    }
  }, []);

  const handleFileChange = async (event) => {
    if (!modelsLoaded) {
      setToastMessage("Models are still loading. Please wait.");
      setToastSeverity("warning");
      setToastOpen(true);
      return;
    }

    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImagePreview(reader.result);
        const faceDetected = await detectFace(reader.result);
        setIsFaceDetected(faceDetected);
        if (faceDetected) {
          setToastMessage("Face detected successfully!");
          setToastSeverity("success");
          setToastOpen(true);
        } else {
          setToastMessage("No face detected. Please upload a valid face image.");
          setToastSeverity("error");
          setToastOpen(true);
          setSelectedFile(null);
          setImagePreview(null);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setToastMessage("File not uploaded");
      setToastSeverity("error");
      setToastOpen(true);
    }
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile || !isFaceDetected) {
      setToastMessage("Please select a valid image file with a detectable face.");
      setToastSeverity("error");
      setToastOpen(true);
      return;
    }

    setLoader(true);
    const userData = JSON.parse(localStorage.getItem("userData"));

    const formData = new FormData();
    formData.append("firstname", userData.firstname);
    formData.append("lastname", userData.lastname);
    formData.append("department", userData.department);
    formData.append("matricNumber", userData.matricNum);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("facial_image", selectedFile);

    try {
      const res = await fetch("https://facialpass-backend.onrender.com/api/students/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setToastOpen(true);
        setToastMessage("Registration successful! Redirecting...");
        setLoader(true);
        setToastSeverity("success");
        localStorage.setItem("token", data.token);
        localStorage.removeItem("userData");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setToastMessage(data.message || "Registration failed. Please try again.");
        setToastSeverity("error");
        setToastOpen(true);
        setLoader(false);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setToastMessage("An error occurred. Please try again.");
      setToastSeverity("error");
      setToastOpen(true);
      setLoader(false);
    } 
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center overflow-hidden gap-12 p-4 w-full min-h-screen bg-gradient-to-b from-white to-[#0061A2]">
        <div className="flex flex-row lg:w-3/5 lg:h-[90vh]">
          <div
            className="md:w-1/2 hidden md:flex bg-cover bg-center object-fill rounded-l-xl"
            style={{ backgroundImage: `url(${loginImage})` }}
          ></div>
          <div className="flex flex-col w-full lg:w-3/5 rounded-xl md:rounded-r-xl md:rounded-none bg-white text-[#0061A2] px-4 lg:px-3 gap-4 py-8">
            <div className="flex flex-col justify-center items-center gap-2">
              <img className="w-24" src={logo} alt="Facial Pass logo" />
              <p className="text-[#0061A2] text-xl font-medium text-center">
                Please upload a clear photo of your face
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center lg:w-4/5 w-4/5 mx-auto">
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                disabled={isLoadingModels}
              >
                Upload file
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  name="facial_image"
                  ref={fileInputRef}
                  disabled={isLoadingModels}
                />
              </Button>
              {imagePreview && (
                <div className="image-preview rounded-md shadow-lg h-72 flex flex-col gap-2 w-[90%] items-center">
                  <p className="text-[#0061A2]">Selected Image:</p>
                  <img src={imagePreview} alt="Selected" className="w-[90%] h-[70%]" />
                </div>
              )}
              <button
                className="w-full cursor-pointer flex items-center justify-center h-11 font-semibold rounded-4xl bg-[#0061A2] hover:bg-[#1836B2] text-white py-1 px-3 border border-transparent text-base transition-all focus:outline-none focus:ring-2"
                type="submit"
                disabled={isLoadingModels || !isFaceDetected}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toast open={toastOpen} message={toastMessage} severity={toastSeverity} onClose={handleToastClose} />
      {loader && <Loader />}
    </>
  );
};

export default UploadImage;