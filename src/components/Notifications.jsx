import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const Notifications = ({ student }) => {
  if (!student || !student.registeredCourses || student.registeredCourses.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 2, color: "#0061A2" }}>
        No upcoming exams.
      </Typography>
    );
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "transparent" }} // Make the table transparent
      >
        <Typography variant="h6" align="center" sx={{ mb: 2, mt: 2, fontWeight: "bold", color: "#0061A2", fontSize: "24px" }}>
          Upcoming Exams
        </Typography>
        <Table sx={{ backgroundColor: "transparent" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#0061A2" }}>Course Code</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#0061A2" }}>Course Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#0061A2" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#0061A2" }}>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {student.registeredCourses.map((course, index) => {
              const examDate = new Date(course.examDate); // Convert string to Date object
              const formattedDate = examDate.toLocaleDateString(); // Extract only the date
              const formattedTime = examDate.toLocaleTimeString(); // Extract only the time

              return (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#0061A2" }}>{course.course_code}</TableCell>
                  <TableCell sx={{ color: "#0061A2" }}>{course.course_name}</TableCell>
                  <TableCell sx={{ color: "#0061A2" }}>{formattedDate}</TableCell>
                  <TableCell sx={{ color: "#0061A2" }}>{formattedTime}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer
      component={Paper}
      sx={{ backgroundColor: "transparent", marginTop:"16px" }} // Make the table transparent
    >
      <Typography variant="h6" align="center" sx={{ mb: 2, mt: 2, fontWeight:"bold", color: "#0061A2", fontSize: "24px" }}>
        Exams taken
      </Typography>
      <Table sx={{ backgroundColor: "transparent" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "#0061A2" }}>Course Code</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#0061A2" }}>Course Name</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#0061A2" }}>Date authenticated</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#0061A2" }}>Time authenticated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {student.takenCourses.map((course, index) => {

            return (
              <TableRow key={index}>
                <TableCell sx={{ color: "#0061A2" }}>{course.courseCode}</TableCell>
                <TableCell sx={{ color: "#0061A2" }}>{course.courseName}</TableCell>
                <TableCell sx={{ color: "#0061A2" }}>{course.date}</TableCell>
                <TableCell sx={{ color: "#0061A2" }}>{course.time}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </>

  );
};

export default Notifications;