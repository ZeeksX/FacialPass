import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import FaceRecognition from "./FaceRecognition";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Toast from "../components/Toast";

const Authentication = () => {
  const location = useLocation();
  const selectedCourse = location.state?.selectedCourse;
  const [student, setStudent] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

  // Handle closing the toast
  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  // Handle capture of image from FaceRecognition component
  const handleImageCapture = (imageData) => {
    setCapturedImage(imageData);
  };

  // Handle successful authentication
  const handleAuthentication = async (authenticatedStudent) => {
    setStudent(authenticatedStudent);

    try {
      const response = await fetch("http://localhost:5000/api/auth/save-authentication", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matricNumber: authenticatedStudent.matricNumber,
          courseCode: selectedCourse.course_code,
          courseName: selectedCourse.course_name,
          firstname: authenticatedStudent.firstname,
          lastname: authenticatedStudent.lastname,
          imageData: capturedImage // Send the captured image
        }),
      });

      const data = await response.json();
      if (data.success) {
        setToast({ open: true, message: "Authentication successful!", severity: "success" });
      } else {
        setToast({ open: true, message: data.message, severity: "error" });
      }
    } catch (error) {
      setToast({ open: true, message: "An error occurred. Please try again.", severity: "error" });
    }
  };

  return (
    <div className="flex pt-4 justify-center min-h-screen w-full bg-gray-100">
      <div className="rounded-md h-[90vh] max-lg:h-auto max-md:mb-2 shadow bg-white flex flex-col items-center w-3/5 lg:w-2/5 max-md:w-[90vw]">
        <div className="flex text-white flex-col w-full rounded-t-md h-30 max-lg:h-40 gap-2 bg-gradient-to-r from-[#0061A2] to-[#0061a263] p-4">
          <h1 className="flex items-center justify-center gap-2">
            <HowToRegIcon /> <strong className="text-xl">Exam Authentication</strong>
          </h1>
          <div className="flex justify-between w-full items-center">
            <h2 className="max-lg:flex flex-col text-left">Course Code: <strong>{selectedCourse?.course_code}</strong></h2>
            <h2 className="max-lg:flex flex-col text-right">Course Title: <strong>{selectedCourse?.course_name}</strong></h2>
          </div>
          <div className="flex justify-between w-full items-center">
            <h2 className="max-lg:flex flex-col text-left">Credits: <strong>{selectedCourse?.credit_unit}</strong></h2>
            <h2 className="max-lg:flex flex-col text-right">Exam Date: <strong>{selectedCourse?.examDate}</strong></h2>
          </div>
        </div>

        {selectedCourse ? (
          <div className="w-full p-4">
            <FaceRecognition
              selectedCourse={selectedCourse}
              onAuthenticate={handleAuthentication}
              onImageCapture={handleImageCapture}
            />
            {student && (
              <div className="mt-4 text-center">
                <h3 className="text-green-600 text-lg font-semibold">Authentication Successful</h3>
                <p>Welcome, {student.firstname} {student.lastname}!</p>
              </div>
            )}
          </div>
        ) : (
          <p>No exam selected.</p>
        )}
      </div>

      {/* Toast Notification */}
      <Toast open={toast.open} message={toast.message} severity={toast.severity} onClose={handleCloseToast} />
    </div>
  );
};

export default Authentication;