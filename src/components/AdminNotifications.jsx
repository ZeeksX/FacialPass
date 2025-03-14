import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const AdminNotifications = ({ admin, courses }) => {
  const navigate = useNavigate();
  const currentDate = new Date();

  // Function to format date as "Thursday 26th April, 2025"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Filter and sort courses by upcoming exams
  const upcomingExams = courses
    .filter((course) => {
      if (!course.examDate) return false;
      return new Date(course.examDate) > currentDate; // Only future exams
    })
    .sort((a, b) => new Date(a.examDate) - new Date(b.examDate)) // Sort by date
    .slice(0, 7); // Show only the first 7 exams

  // Navigate to authentication page with selected exam details
  const handleStartExam = (exam) => {
    navigate("/authenticate", { state: { selectedExam: exam } });
  };

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "transparent", padding: "16px", marginTop:"16px" }}>
      <h2 className="text-[#0061A2] text-2xl font-bold text-center mb-4 mt-2">Upcoming Exams</h2>
      {upcomingExams.length > 0 ? (
        <Table sx={{ backgroundColor: "transparent" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#0061A2" }}>Course Code</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#0061A2" }}>Course Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#0061A2" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#0061A2" }}>Time</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#0061A2" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {upcomingExams.map((course, index) => {
              const examDate = new Date(course.examDate);
              const formattedDate = formatDate(course.examDate);
              const formattedTime = examDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#0061A2" }}>{course.course_code}</TableCell>
                  <TableCell sx={{ color: "#0061A2" }}>{course.course_name}</TableCell>
                  <TableCell sx={{ color: "#0061A2" }}>{formattedDate}</TableCell>
                  <TableCell sx={{ color: "#0061A2" }}>{formattedTime}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#0061A2", color: "white" }}
                      onClick={() => handleStartExam(course)}
                    >
                      Start Exam
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <p className="text-gray-500 text-center mt-2">No upcoming exams.</p>
      )}
    </TableContainer>
  );
};

export default AdminNotifications;
