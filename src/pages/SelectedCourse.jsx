import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import StudentSidebar from "../components/sidebars/StudentSidebar";
import MobileNav from "../components/topnav/MobileNav";
import TopNav from "../components/topnav/TopNav";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const SelectedCourse = () => {
  const { student, theme, selectedCourses, setSelectedCourses } = useOutletContext();

  useEffect(() => {
    const fetchSelectedCourses = async () => {
      try {
        const response = await fetch("https://facialpass-backend.onrender.com/api/students/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch selected courses");
        }

        const data = await response.json();
        setSelectedCourses(data.courses);
      } catch (error) {
        console.error("Error fetching selected courses:", error);
      }
    };

    fetchSelectedCourses();
  }, [setSelectedCourses]);

  // Function to handle dropping a course
  const handleDropCourse = async (courseId) => {
    try {
      const response = await fetch(`https://facialpass-backend.onrender.com/api/students/drop-course`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ courseId }),
      });

      if (!response.ok) {
        throw new Error("Failed to drop course");
      }

      // Update the selected courses state
      setSelectedCourses((prev) => prev.filter(course => course.id !== courseId));
    } catch (error) {
      console.error("Error dropping course:", error);
    }
  };

  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-100 text-[#0061A2]">
      <StudentSidebar />
      <div className="flex flex-col lg:ml-[20%] w-full px-6 py-4">
        <MobileNav theme={theme} student={student} />
        <TopNav theme={theme} student={student} />
        <div className="mt-8">
          <h1 className="text-2xl font-bold">Selected Courses</h1>
          <TableContainer className="mt-4" component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#0061A2", fontWeight: "bold" }}>Course Code</TableCell>
                  <TableCell sx={{ color: "#0061A2", fontWeight: "bold" }}>Course Title</TableCell>
                  <TableCell sx={{ color: "#0061A2", fontWeight: "bold" }}>Credits</TableCell>
                  <TableCell sx={{ color: "#0061A2", fontWeight: "bold" }}>Exam Date</TableCell>
                  <TableCell sx={{ color: "#0061A2", fontWeight: "bold" }}>Actions</TableCell> {/* New column for actions */}
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell sx={{ color: "#0061A2" }}>{course.course_code}</TableCell>
                    <TableCell sx={{ color: "#0061A2" }}>{course.course_name}</TableCell>
                    <TableCell sx={{ color: "#0061A2" }}>{course.credit_unit}</TableCell>
                    <TableCell sx={{ color: "#0061A2" }}>{course.examDate}</TableCell>
                    <TableCell>
                      <button
                        className="h-10 flex cursor-pointer items-center justify-center rounded-md font-bold text-white bg-[#0061A2] w-16 hover:bg-red-600"
                        onClick={() => handleDropCourse(course.id)} // Call drop function
                      >
                        Drop
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default SelectedCourse;