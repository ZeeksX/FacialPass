// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./components/Auth";
import SignUp from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import ParticlesReact from "./pages/ParticlesReact";
import "./App.css";
import Student from "./pages/Student";
import Admin from "./pages/Admin";
import SelectCourses from "./pages/SelectCourses";
import AdminSignup from "./pages/AdminSignup";
import AdminLogin from "./pages/AdminLogin";
import FacialRecognition from "./pages/FacialRecognition";
import UploadImage from "./pages/UploadImage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  console.log(isAuthenticated);
  console.log(loading);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while checking authentication
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

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
          <Route path="/SelectCourses" element={<SelectCourses isMobile={isMobile} />} />
          <Route
            path="/studentDashboard"
            element={
              <ProtectedRoute>
                <Student isMobile={isMobile} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminDashboard"
            element={
              <ProtectedRoute>
                <Admin isMobile={isMobile} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/landing"
            element={
              <ProtectedRoute>
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