import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import Loader from "../components/Loader";
import { Outlet } from 'react-router'

const StudentDashboard = () => {
    const [student, setStudent] = useState(null);
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    // Fetch student data on component mount
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/students/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is passed if required
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch student data");
                }

                const data = await response.json();
                setStudent(data); // Store the fetched student data in state
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        fetchStudent();
    }, []);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/students/get-courses", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is passed if required
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch student data");
                }

                const data = await response.json();
                setCourses(data); // Store the fetched student data in state
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        getCourses();
    }, []);

    // Log student data whenever it changes
    useEffect(() => {
        if (student) {
            console.log("Student data:", student);
        }
    }, [student]); // This effect runs whenever `student` changes

    const theme = createTheme({
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        color: "#0061A2",
                        borderRadius: "24px", // Increase border radius
                        "& fieldset": {
                            borderColor: "#0061A2",
                            borderRadius: "24px", // Ensure fieldset also has the same border radius
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
    });

    if (!student) {
        return <Loader />;
    }

    return (
        <>
            <Outlet context={{ student, theme, courses, selectedCourses, setSelectedCourses }} />
        </>

    )
}

export default StudentDashboard