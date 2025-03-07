import React from "react";
import { useLocation } from "react-router-dom";

const Authentication = () => {
  const location = useLocation();
  const selectedExam = location.state?.selectedExam;

  return (
    <div>
      <h1>Exam Authentication</h1>
      {selectedExam ? (
        <div>
          <h2>Course Code: {selectedExam.course_code}</h2>
          <h2>Course Title: {selectedExam.course_name}</h2>
          <h2>Credits: {selectedExam.credit_unit}</h2>
          <h2>Exam Date: {selectedExam.examDate}</h2>
        </div>
      ) : (
        <p>No exam selected.</p>
      )}
    </div>
  );
};

export default Authentication;
