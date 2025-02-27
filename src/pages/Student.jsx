import React, { useState } from "react";
import StudentSidebar from "../components/sidebars/StudentSidebar";

const Student = () => {
  // Sample student data (to be fetched dynamically in a real app)
  const student = {
    name: "John Doe",
    id: "CS202540",
    email: "johndoe@example.com",
    course: "Computer Science",
    department: "Computing and Engineering Science",
    level: "400 level (Final Year)",
    courses: [
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Vision",
      "Cybersecurity",
      "Cloud Computing",
      "Data Science",
    ],
    facialRecognitionEnrolled: true,
    examSchedule: [
      { course: "Artificial Intelligence", date: "March 10, 2025", time: "10:00 AM" },
      { course: "Cybersecurity", date: "March 12, 2025", time: "1:00 PM" },
    ],
    authLogs: [
      { date: "Feb 20, 2025", status: "Success" },
      { date: "Feb 18, 2025", status: "Failed" },
    ],
  };

  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-100 text-[#0061A2]">
      <StudentSidebar />
      <div className="flex flex-col max-ml-60 ml-[20%] w-full p-6">
        <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
       
        {/* Registered Courses Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-2">Registered Courses</h2>
          <ul className="list-disc ml-6">
            {student.courses.map((course, index) => (
              <li key={index} className="p-2">{course}</li>
            ))}
          </ul>
        </div>

        {/* Exam Schedule Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-2">Exam Schedule</h2>
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-200">
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {student.examSchedule.map((exam, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="p-3">{exam.course}</td>
                  <td className="p-3">{exam.date}</td>
                  <td className="p-3">{exam.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Authentication Logs Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Authentication Logs</h2>
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-200">
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {student.authLogs.map((log, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="p-3">{log.date}</td>
                  <td className={`p-3 font-semibold ${log.status === "Success" ? "text-green-600" : "text-red-600"}`}>
                    {log.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Student;
