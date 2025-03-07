import React from "react";
import AdminSidebar from "../components/sidebars/AdminSidebar";
import AdminTopNav from "../components/topnav/AdminTopNav";
import AdminMobileNav from "../components/topnav/AdminMobileNav";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"; // Use Grid2 instead of Grid

const Students = () => {
  const { admin, theme, students } = useOutletContext();

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
          <Typography
            variant="h4"
            className="text-[#0061A2] text-4xl font-semibold mb-4"
          >
            Students List
          </Typography>

          {sortedStudents.length > 0 ? (
            <Grid container spacing={3}>
              {sortedStudents.map((student) => (
                <Grid key={student.id} xs={12} sm={6} md={4} lg={3}>
                  <Card className="shadow-md rounded-lg">
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
                          <Typography variant="body2" color="textSecondary">
                            No Image
                          </Typography>
                        </div>
                      )}

                      <Typography variant="h6" className="font-bold">
                        {`${student?.firstname || "Guest"} ${
                          student?.lastname || ""
                        }`}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Full Name:{" "}
                        {`${student?.firstname || "Guest"} ${
                          student?.lastname || ""
                        }`}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Matric Number: {student.matricNumber}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Email: {student.email}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Department: {student.department}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" className="text-gray-500">
              No students found.
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;