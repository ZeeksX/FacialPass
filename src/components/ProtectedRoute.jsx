import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/Auth";
import Loader from "../components/Loader";

const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, userRole, loading } = useAuth();

    if (loading) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        // Redirect to the appropriate login page based on the required role
        return requiredRole === "admin" ? (
            <Navigate to="/admin/login" />
        ) : (
            <Navigate to="/login" />
        );
    }

    // If the user's role doesn't match the required role, redirect to their dashboard
    if (userRole !== requiredRole) {
        return userRole === "admin" ? (
            <Navigate to="/adminDashboard" />
        ) : (
            <Navigate to="/studentDashboard" />
        );
    }

    return children;
};

export default ProtectedRoute;