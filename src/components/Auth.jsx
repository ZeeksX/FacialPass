// src/components/Auth.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null); // Track user role (admin or student)

    // Check for a valid token on initial load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            validateToken(token);
        }
    }, []);

    // Validate the JWT token
    const validateToken = async (token) => {
        try {
            const response = await fetch('http://localhost:5000/api/validate-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setIsAuthenticated(true);
                setUserRole(data.role); // Set the user role (admin or student)
            } else {
                logout();
            }
        } catch (error) {
            console.error('Error validating token:', error);
            logout();
        }
    };

    // Login function to store the token and set authentication state
    const login = (token, role) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setUserRole(role);
    };

    // Logout function to remove the token and reset authentication state
    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};