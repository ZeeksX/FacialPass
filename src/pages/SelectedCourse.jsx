import React, { useCallback, useState } from "react";
import { useOutletContext } from "react-router-dom";
import StudentSidebar from "../components/sidebars/StudentSidebar";
import MobileNav from "../components/topnav/MobileNav";
import TopNav from "../components/topnav/TopNav";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";
import Toast from "../components/Toast";
import WarningIcon from '@mui/icons-material/Warning';

const SelectedCourse = () => {
  const { student, setStudent, theme } = useOutletContext();

  // State for toast notifications
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("info");

  // State for confirmation dialog
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [courseToDropId, setCourseToDropId] = useState(null);
  const [courseToDropName, setCourseToDropName] = useState("");

  // Function to open the confirmation dialog
  const openConfirmDialog = useCallback((courseId, courseName) => {
    setCourseToDropId(courseId);
    setCourseToDropName(courseName);
    setConfirmDialogOpen(true);
  }, []);

  // Function to close the confirmation dialog
  const closeConfirmDialog = useCallback(() => {
    setConfirmDialogOpen(false);
    setCourseToDropId(null);
    setCourseToDropName("");
  }, []);

  // Function to handle dropping a course
  const handleDropCourse = useCallback(async () => {
    if (!courseToDropId) return;

    try {
      setConfirmDialogOpen(false);

      const response = await fetch(`https://facialpass-backend-production.up.railway.app/api/students/drop-course`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ courseId: courseToDropId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to drop course");
      }

      // Update the student's registeredCourses array
      setStudent((prevStudent) => ({
        ...prevStudent,
        registeredCourses: prevStudent.registeredCourses.filter(
          (course) => course.id !== courseToDropId
        ),
      }));

      // Show success toast
      setToastMessage(`Course ${courseToDropName} dropped successfully!`);
      setToastSeverity("success");
      setToastOpen(true);

      // Reset course to drop
      setCourseToDropId(null);
      setCourseToDropName("");
    } catch (error) {
      console.error("Error dropping course:", error);

      // Show error toast
      setToastMessage(error.message || "Failed to drop course. Please try again.");
      setToastSeverity("error");
      setToastOpen(true);
    }
  }, [courseToDropId, courseToDropName, setStudent]);

  // Memoize the table rows to avoid unnecessary re-renders
  const TableRows = useCallback(() => {
    return student.registeredCourses.map((course) => (
      <TableRow key={course.id}>
        <TableCell sx={{ color: "#0061A2" }}>{course.course_code}</TableCell>
        <TableCell sx={{ color: "#0061A2" }}>{course.course_name}</TableCell>
        <TableCell sx={{ color: "#0061A2" }}>{course.credit_unit}</TableCell>
        <TableCell sx={{ color: "#0061A2" }}>{course.examDate}</TableCell>
        <TableCell>
          <button
            className="h-10 flex cursor-pointer items-center justify-center rounded-md font-bold text-white bg-[#0061A2] w-16 hover:bg-red-600 transition-colors"
            onClick={() => openConfirmDialog(course.id, course.course_name)}
          >
            Drop
          </button>
        </TableCell>
      </TableRow>
    ));
  }, [student.registeredCourses, openConfirmDialog]);

  const handleToastClose = () => setToastOpen(false);

  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-100 text-[#0061A2]">
      <StudentSidebar />
      <div className="flex flex-col lg:ml-[20%] w-full px-6 py-4">
        <MobileNav theme={theme} student={student} />
        <TopNav theme={theme} student={student} />
        <div className="mt-8">
          <h1 className="text-2xl font-bold">Selected Courses</h1>
          {student.registeredCourses && student.registeredCourses.length > 0 ? (
            <TableContainer className="mt-4" component={Paper} elevation={2}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#0061A2", fontWeight: "bold" }}>Course Code</TableCell>
                    <TableCell sx={{ color: "#0061A2", fontWeight: "bold" }}>Course Title</TableCell>
                    <TableCell sx={{ color: "#0061A2", fontWeight: "bold" }}>Credits</TableCell>
                    <TableCell sx={{ color: "#0061A2", fontWeight: "bold" }}>Exam Date</TableCell>
                    <TableCell sx={{ color: "#0061A2", fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRows />
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div className="mt-6 p-8 bg-white rounded-lg shadow-sm text-center">
              <p className="text-lg text-gray-600">You have not registered for any courses yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={closeConfirmDialog}
        aria-labelledby="drop-course-dialog-title"
        aria-describedby="drop-course-dialog-description"
      >
        <DialogTitle id="drop-course-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon sx={{ color: 'orange' }} />
          Confirm Course Drop
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="drop-course-dialog-description">
            Are you sure you want to drop <strong>{courseToDropName}</strong>? This action cannot be undone, and you may need administrative approval to re-register for this course.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button
            onClick={closeConfirmDialog}
            sx={{
              color: '#0061A2',
              '&:hover': { backgroundColor: 'rgba(0, 97, 162, 0.08)' }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDropCourse}
            color="error"
            variant="contained"
            sx={{
              backgroundColor: '#f44336',
              '&:hover': { backgroundColor: '#d32f2f' }
            }}
          >
            Drop Course
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
      <Toast
        open={toastOpen}
        message={toastMessage}
        onClose={handleToastClose}
        severity={toastSeverity}
      />
    </div>
  );
};

export default React.memo(SelectedCourse);