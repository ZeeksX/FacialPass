import React from "react";
import AdminSidebar from "../components/sidebars/AdminSidebar";
import AdminTopNav from "../components/topnav/AdminTopNav";
import AdminMobileNav from "../components/topnav/AdminMobileNav";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@mui/material";

const Students = () => {
  const { admin, theme } = useOutletContext();
  const students = admin.allStudents;
  // Sort students by ID in ascending order
  const sortedStudents = students ? [...students].sort((a, b) => a.id - b.id) : [];

  // Function to convert Buffer to Base64 image URL
  const bufferToImageUrl = (buffer) => {
    if (!buffer || !buffer.data) return ""; // Handle missing or invalid buffer

    // Convert Uint8Array (buffer.data) to Base64 using btoa
    const binaryString = buffer.data.reduce((acc, byte) => acc + String.fromCharCode(byte), "");
    const base64 = btoa(binaryString); // Encode to Base64
    return `data:image/jpeg;base64,${base64}`; // Create a data URL
  };

  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-100 text-[#0061A2]">
      <AdminSidebar />
      <div className="flex flex-col lg:ml-[20%] w-full px-6 py-4">
        <AdminMobileNav theme={theme} admin={admin} students={students} />
        <AdminTopNav theme={theme} admin={admin} students={students} />

        <div className="mt-6">
          <h4 className="text-[#0061A2] text-4xl font-semibold mb-4">Students List</h4>

          {sortedStudents.length > 0 ? (
            <div className="flex flex-wrap max-lg:justify-center justify-between gap-3 max-md:gap-6 text-[#0061A2]">
              {sortedStudents.map((student) => (
                <div key={student.id} className="w-full max-w-[280px] sm:w-[48%] md:w-[40%] lg:w-[24%]">
                  <Card className="shadow-md rounded-lg w-full flex justify-center items-center">
                    <CardContent>
                      {/* Display the student's image */}
                      {student.facial_image ? (
                        <img
                          src={bufferToImageUrl(student.facial_image)}
                          alt={`${student.name}'s facial image`}
                          className="w-48 h-48 object-cover rounded-[50%] mb-4"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                          <p className="text-gray-500">No Image</p>
                        </div>
                      )}
                      <div className="flex flex-col h-30">
                        <h1 className="font-bold text-[#0061A2] text-2xl mb-2">
                          {`${student?.firstname || "Guest"} ${student?.lastname || ""}`}
                        </h1>
                        <p className="text-[#0061A2] text-[15px]">Full Name: {`${student?.firstname || "Guest"} ${student?.lastname || ""}`}</p>
                        <p className="text-[#0061A2] text-[15px]">Matric Number: {student.matricNumber}</p>
                        <p className="text-[#0061A2] text-[15px]">Department: {student.department}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No students found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
