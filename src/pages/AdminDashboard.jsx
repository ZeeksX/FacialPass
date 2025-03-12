import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import Loader from "../components/Loader";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  // Fetch admin data on component mount
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await fetch("https://facialpass-backend.onrender.com/api/admins/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is passed if required
          },
        });

        if (!response.ok) {
          setTimeout(() => {
            <Loader />
            navigate("/login")
          }, 2000)

          throw new Error("Failed to fetch admin data");
        }

        const data = await response.json();
        setAdmin(data); // Store the fetched admin data in state
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdmin();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  // Log admin data whenever it changes
  useEffect(() => {
    if (admin) {
      console.log("Admin data:", admin);
    }
  }, [admin]); // This effect runs whenever `admin` changes

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const response = await fetch("https://facialpass-backend.onrender.com/api/admins/students", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is passed if required
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch all students");
        }

        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };

    fetchAllStudents();
  }, []);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const response = await fetch("https://facialpass-backend.onrender.com/api/admins/courses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is passed if required
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch all students");
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };

    fetchAllCourses();
  }, []);

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

  if (!admin) {
    return <Loader />;
  }

  return (
    <>
      <Outlet context={{ admin, theme, students, courses }} />
    </>
  );
};

export default AdminDashboard;
