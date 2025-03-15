import React, { useEffect, useState, useMemo, useCallback } from "react";
import { createTheme } from "@mui/material";
import Loader from "../components/Loader";
import { Outlet } from "react-router";
import Toast from "../components/Toast";

const StudentDashboard = () => {
    const [student, setStudent] = useState(null);
    const [toast, setToast] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    // Fetch student data on component mount
    const fetchStudent = useCallback(async () => {
        try {
            const response = await fetch("https://facialpass-backend.onrender.com/api/students/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch student data");
            }

            const data = await response.json();
            setStudent(data); // Store the fetched student data in state
        } catch (error) {
            console.error("Error fetching student data:", error);
            setToast({
                open: true,
                message: "Failed to fetch student data. Please try again.",
                severity: "error",
            });
        }
    }, []);

    useEffect(() => {
        fetchStudent();
    }, [fetchStudent]);

    // Memoize the theme to avoid recreating it on every render
    const theme = useMemo(
        () =>
            createTheme({
                components: {
                    MuiOutlinedInput: {
                        styleOverrides: {
                            root: {
                                color: "#0061A2",
                                borderRadius: "24px",
                                "& fieldset": {
                                    borderColor: "#0061A2",
                                    borderRadius: "24px",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#0061A2",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#0061A2",
                                },
                                height: "3rem",
                            },
                            input: {
                                color: "#0061A2",
                                padding: "8.5px 12px",
                                "&::placeholder": {
                                    color: "#0061A2",
                                    opacity: 0.5,
                                },
                            },
                        },
                    },
                },
            }),
        []
    );

    const handleToastClose = useCallback(() => {
        setToast((prev) => ({ ...prev, open: false }));
    }, []);

    if (!student) {
        return <Loader />;
    }

    return (
        <>
            <Outlet context={{ student, setStudent, theme }} />
            <Toast
                open={toast.open}
                message={toast.message}
                severity={toast.severity}
                onClose={handleToastClose}
            />
        </>
    );
};

export default React.memo(StudentDashboard);