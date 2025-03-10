import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import FaceRecognition from "./FaceRecognition";
import HowToRegIcon from '@mui/icons-material/HowToReg';

const Authentication = () => {
  const location = useLocation();
  const selectedExam = location.state?.selectedExam;
  const [student, setStudent] = useState(null);

  // Handle successful authentication
  const handleAuthentication = async (authenticatedStudent) => {
    setStudent(authenticatedStudent);

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
      console.log("Authentication details saved successfully:", data);
    } else {
      console.error("Failed to save authentication details:", data.message);
    }
  };

  return (
    <div className="flex pt-4 justify-center min-h-screen w-full bg-gray-100">
      <div className="rounded-md h-[90vh] shadow bg-white flex flex-col items-center w-2/5">
        <div className="flex flex-col w-full rounded-t-md h-30 gap-2 bg-gradient-to-r from-[#0061A2] to-[#0061a263] p-4">
          <h1 className="flex items-center justify-center"><HowToRegIcon /> Exam Authentication</h1>
          <div className="flex justify-between w-full items-center">
            <h2>Course Code: {selectedExam.course_code}</h2>
            <h2>Course Title: {selectedExam.course_name}</h2>
          </div>
          <div className="flex justify-between w-full items-center">
            <h2>Credits: {selectedExam.credit_unit}</h2>
            <h2>Exam Date: {selectedExam.examDate}</h2>
          </div>
        </div>
        {selectedExam ? (
          <div className="w-full p-4">

            <FaceRecognition selectedExam={selectedExam} onAuthenticate={handleAuthentication} />

            {student && (
              <div>
                <h3>Authentication Successful</h3>
                <p>Welcome, {student.firstname} {student.lastname}!</p>
                <p>Matric Number: {student.matricNumber}</p>
                <p>Department: {student.department}</p>
              </div>
            )}
          </div>
        ) : (
          <p>No exam selected.</p>
        )}
      </div>
    </div>
  );
};

export default Authentication;