import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("https://facialpass-backend-production.up.railway.app/api/auth/validate-token", {
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
                    setUser({ id: data.userId, role: data.role });
                } else {
                    console.warn("Token validation failed.");
                }
            } catch (error) {
                console.error("Error validating token:", error);
            } finally {
                setLoading(false);
            }
        };

        validateToken();
    }, []);

    const login = (token, role, userData) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        setUserRole(role);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUserRole(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    return useContext(AuthContext);
};
