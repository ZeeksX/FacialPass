import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import Loader from "../components/Loader";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js"; // Import face-api.js correctly

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [knownFaces, setKnownFaces] = useState([]); // State for known faces
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" }); // State for toast notifications
  const navigate = useNavigate();

  // Fetch admin data on component mount
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await fetch("https://facialpass-backend.onrender.com/api/admins/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch admin data");
        }

        const data = await response.json();
        setAdmin(data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        navigate("/login"); // Navigate to login on error
      }
    };

    fetchAdmin();
  }, [navigate]); // Removed `admin` from dependency array

  // Load face-api.js models and fetch known faces
  useEffect(() => {
    const loadModelsAndFetchKnownFaces = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

        const response = await fetch("http://localhost:5000/api/auth/known-faces");
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
        setKnownFaces(knownFacesWithDescriptors.filter((face) => face !== null));
      } catch (error) {
        console.error("Error loading models or fetching known faces:", error);
        setToast({ open: true, message: "Failed to load models or fetch known faces.", severity: "error" });
      }
    };

    loadModelsAndFetchKnownFaces();
  }, []);

  // Theme configuration
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: "#0061A2",
            borderRadius: "24px",
            "& fieldset": {
              borderColor: "#0061A2",
              borderRadius: "24px",
            },
            "&:hover fieldset": {
              borderColor: "#0061A2",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#0061A2",
            },
            height: "3rem",
          },
          input: {
            color: "#0061A2",
            padding: "8.5px 12px",
            "&::placeholder": {
              color: "#0061A2",
              opacity: 0.5,
            },
          },
        },
      },
    },
  });

  // Show loader while admin data is being fetched
  if (!admin) {
    return <Loader />;
  }

  return (
    <>
      <Outlet context={{ admin, theme, knownFaces }} /> {/* Pass knownFaces to child components */}
    </>
  );
};

export default AdminDashboard;