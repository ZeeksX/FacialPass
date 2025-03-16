import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { AuthProvider } from "./components/Auth";
import SignUp from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import ParticlesReact from "./pages/ParticlesReact";
import "./App.css";
import Student from "./pages/Student";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import SelectCourses from "./pages/SelectCourses";
import AdminSignup from "./pages/AdminSignup";
import AdminLogin from "./pages/AdminLogin";
import FacialRecognition from "./pages/FacialRecognition";
import UploadImage from "./pages/UploadImage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import SelectedCourse from "./pages/SelectedCourse";
import StudentDashboard from "./pages/StudentDashboard";
import Exams from "./pages/Exams";
import Students from "./pages/Students";
import AdminSettings from "./pages/AdminSettings";
import AdminProfile from "./pages/AdminProfile";
import Authentication from "./pages/Authentication";
import ExamStudents from "./pages/ExamStudents";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const checkIfMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ParticlesReact />} />
          <Route path="/login" element={<Login isMobile={isMobile} />} />
          <Route path="/admin/login" element={<AdminLogin isMobile={isMobile} />} />
          <Route path="/signup/facial-recognition" element={<FacialRecognition isMobile={isMobile} />} />
          <Route path="/signup/upload-image" element={<UploadImage isMobile={isMobile} />} />

          {/* Nested routes under /studentDashboard */}
          <Route
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard isMobile={isMobile} />
              </ProtectedRoute>
            }
          >
            <Route path="studentDashboard" element={<Student isMobile={isMobile} />} />
            <Route path="selected-courses" element={<SelectedCourse isMobile={isMobile} />} />
            <Route path="select-courses" element={<SelectCourses isMobile={isMobile} />} />
            <Route path="profile" element={<Profile isMobile={isMobile} />} />
            <Route path="settings" element={<Settings isMobile={isMobile} />} />
          </Route>

          {/* Nested routes under /adminDashboard */}
          <Route
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard isMobile={isMobile} />
              </ProtectedRoute>
            }
          >
            <Route path="adminDashboard" element={<Admin isMobile={isMobile} />} />
            <Route path="Exams" element={<Exams isMobile={isMobile} />} />
            <Route path="Students" element={<Students isMobile={isMobile} />} />
            <Route path="/:exam/students" element={<ExamStudents />} />
            <Route path="/admin/profile" element={<AdminProfile isMobile={isMobile} />} />
            <Route path="/admin/settings" element={<AdminSettings isMobile={isMobile} />} />
            <Route path="/exams/:courseName/authenticate" element={<Authentication isMobile={isMobile} />} />
          </Route>

          <Route
            path="/landing"
            element={
              <ProtectedRoute requiredRole="student">
                <HomePage
                  sidebarOpen={sidebarOpen}
                  toggleSidebar={toggleSidebar}
                  isMobile={isMobile}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <SignUp
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
                isMobile={isMobile}
              />
            }
          />
          <Route
            path="/admin/signup"
            element={
              <AdminSignup
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
                isMobile={isMobile}
              />
            }
          />
          <Route
            path="/onboarding"
            element={
              <Onboarding
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
                isMobile={isMobile}
              />
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;