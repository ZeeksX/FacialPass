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
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/auth/validate-token", {
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
                    setUser({ id: data.userId, role: data.role }); // Store user data properly
                } else {
                    console.warn("Token validation failed, but not logging out immediately.");
                }
            } catch (error) {
                console.error("Error validating token:", error);
            } finally {
                setLoading(false);
            }
        };

        validateToken();
    }, []);

    // Login function to store the token and set authentication state
    const login = (token, role, userData) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        setUserRole(role);
        setUser(userData);
    };

    // Logout function to remove the token and reset authentication state
    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUserRole(null);
        setUser(null);
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
