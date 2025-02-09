import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from "./pages/Login";
import { AuthProvider, useAuth } from './components/Auth';
import SignUp from './pages/SignUp';
import Onboarding from './pages/Onboarding';
import ParticlesReact from './pages/ParticlesReact';
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  // Method to check if the screen is mobile
  const checkIfMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<ParticlesReact />} />
          <Route path="/login" element={<Login isMobile={isMobile} />} />
          <Route path="/dashboard" element={
            // <ProtectedRoute>
            <HomePage sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />
            // </ProtectedRoute>
          } />
          <Route path="/signup" element={
            <SignUp sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />
          } />
          <Route path="/onboarding" element={
            <Onboarding sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;