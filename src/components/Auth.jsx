import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    // Check for a valid token on initial load
    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false); // Set loading to false if no token
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/validate-token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsAuthenticated(true);
                    setUserRole(data.role);
                    setUser(data.user); // Set user details
                } else {
                    logout();
                }
            } catch (error) {
                console.error("Error validating token:", error);
                logout();
            } finally {
                setLoading(false); // Set loading to false after validation
            }
        };

        validateToken();
    }, []);

    // Login function to store the token and set authentication state
    const login = (token, role, user) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        setUserRole(role);
        setUser(user); // Set user details
    };

    // Logout function to remove the token and reset authentication state
    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUserRole(null);
        setUser(null); // Clear user details
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};