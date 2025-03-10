import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

const Authentication = () => {
  const location = useLocation();
  const selectedExam = location.state?.selectedExam;
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(null);
  const [student, setStudent] = useState(null);
  const [knownFaces, setKnownFaces] = useState([]);

  // Load models and known faces when the component mounts
  useEffect(() => {
    const loadModelsAndKnownFaces = async () => {
      try {
        // Load tinyFaceDetector model
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

        // Fetch known faces from the backend
        const response = await fetch("http://localhost:5000/api/auth/known-faces");
        const knownFacesData = await response.json();
        console.log("Known faces data: ", knownFacesData);

        // Extract descriptors for known faces
        const knownFacesWithDescriptors = await Promise.all(
          knownFacesData.map(async (face) => {
            try {
              // Convert base64 image to Blob
              const res = await fetch(`data:image/jpeg;base64,${face.image}`);
              const blob = await res.blob();

              // Convert Blob to image
              const img = await faceapi.bufferToImage(blob);

              // Detect face and extract descriptor using tinyFaceDetector
              const detection = await faceapi
                .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptor();

              if (detection) {
                return {
                  name: face.name, // Matric number or filename
                  descriptor: detection.descriptor,
                };
              }
            } catch (error) {
              console.error("Error processing face:", error);
            }
            return null;
          })
        );

        // Filter out faces without descriptors
        setKnownFaces(knownFacesWithDescriptors.filter((face) => face !== null));
        console.log("Known faces with descriptors:", knownFacesWithDescriptors);
      } catch (error) {
        console.error("Error loading models or known faces:", error);
      }
    };

    loadModelsAndKnownFaces();
  }, []);

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

  // Perform face recognition
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

      // Detect faces in the image using tinyFaceDetector
      const detections = await faceapi
        .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (detections.length === 0) {
        setStatus("No face detected");
        return;
      }

      console.log("Detected faces:", detections.length);

      // Compare the detected face with known faces
      const recognizedName = await recognizeFace(detections[0].descriptor, knownFaces);

      if (!recognizedName) {
        setStatus("Face not recognized");
        return;
      }

      // Extract first name and last name
      const [firstName, lastName] = recognizedName.split("-");
      console.log(firstName, lastName)
      // Send the extracted names to the backend for verification
      const response = await fetch("http://localhost:5000/api/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          courseId: selectedExam.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Authenticated");
        setStudent(data.student);
      } else {
        setStatus("Not Authenticated");
      }
    } catch (error) {
      console.error("Error authenticating student:", error);
      setStatus("Error");
    }
  };

  // Recognize a face
  const recognizeFace = async (descriptor, knownFaces) => {
    let minDistance = Infinity;
    let recognizedName = null;

    for (const face of knownFaces) {
      const distance = faceapi.euclideanDistance(descriptor, face.descriptor);
      console.log("Distance:", distance);
      if (distance < minDistance && distance < 0.4) { // Adjusted threshold
        minDistance = distance;
        recognizedName = face.name; // This is in the format "firstname-lastname"
      }
    }

    if (recognizedName) {
      console.log("Recognized:", recognizedName);
      return recognizedName;
    }

    return null;
  };

  return (
    <div>
      <h1>Exam Authentication</h1>
      {selectedExam ? (
        <div>
          <h2>Course Code: {selectedExam.course_code}</h2>
          <h2>Course Title: {selectedExam.course_name}</h2>
          <h2>Credits: {selectedExam.credit_unit}</h2>
          <h2>Exam Date: {selectedExam.examDate}</h2>

          {/* Webcam and Capture Button */}
          <div>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={320}
              height={240}
            />
            <button onClick={capture}>Capture Photo</button>
          </div>

          {/* File Upload */}
          <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          {/* Display Captured or Uploaded Image */}
          {image && <img src={image} alt="Captured or Uploaded" width={320} height={240} />}

          {/* Authentication Status */}
          {status && (
            <div>
              <h3>Authentication Status: {status}</h3>
              {status === "Authenticated" && student && (
                <div>
                  <p>
                    Welcome, {student.firstname} {student.lastname}!
                  </p>
                  <p>Matric Number: {student.matricNumber}</p>
                  <p>Department: {student.department}</p>
                </div>
              )}
              {status === "Not Authenticated" && (
                <p>Authentication failed. Please try again.</p>
              )}
              {status === "Error" && (
                <p>An error occurred during authentication.</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>No exam selected.</p>
      )}
    </div>
  );
};

export default Authentication;