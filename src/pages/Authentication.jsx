import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import FaceRecognition from "./FaceRecognition";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Toast from "../components/Toast"; // Import the Toast component

const Authentication = () => {
  const location = useLocation();
  const selectedExam = location.state?.selectedExam;
  const [student, setStudent] = useState(null);
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

  // Handle closing the toast
  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
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
          courseCode: selectedExam.course_code,
          courseName: selectedExam.course_name,
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
      <div className="rounded-md h-[90vh] shadow bg-white flex flex-col items-center w-2/5">
        <div className="flex text-white flex-col w-full rounded-t-md h-30 gap-2 bg-gradient-to-r from-[#0061A2] to-[#0061a263] p-4">
          <h1 className="flex items-center justify-center gap-2">
            <HowToRegIcon /> <strong className="text-xl">Exam Authentication</strong>
          </h1>
          <div className="flex justify-between w-full items-center">
            <h2>Course Code: <strong>{selectedExam.course_code}</strong></h2>
            <h2>Course Title: <strong>{selectedExam.course_name}</strong></h2>
          </div>
          <div className="flex justify-between w-full items-center">
            <h2>Credits: <strong>{selectedExam.credit_unit}</strong></h2>
            <h2>Exam Date: <strong>{selectedExam.examDate}</strong></h2>
          </div>
        </div>

        {selectedExam ? (
          <div className="w-full p-4">
            <FaceRecognition selectedExam={selectedExam} onAuthenticate={handleAuthentication} />
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
      {/* <Toast open={toast.open} message={toast.message} severity={toast.severity} onClose={handleCloseToast} /> */}
    </div>
  );
};

export default Authentication;
