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
import AdminSignup from "./pages/AdminSignUp";
import AdminLogin from "./pages/AdminLogin";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Method to check if the screen is mobile
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
          <Route
            path="/studentDashboard"
            element={<Student isMobile={isMobile} />}
          />
          <Route
            path="/adminDashboard"
            element={<Admin isMobile={isMobile} />}
          />
          <Route path="/SelectCourses" element={<SelectCourses isMobile={isMobile} />} />
          <Route
            path="/dashboard"
            element={
              // <ProtectedRoute>
              <HomePage
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
                isMobile={isMobile}
              />
              // </ProtectedRoute>
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
