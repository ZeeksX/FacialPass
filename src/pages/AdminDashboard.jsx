import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import Loader from "../components/Loader";
import { Outlet, useNavigate } from "react-router-dom";
import Toast from "../components/Toast"; // Assuming you have a Toast component

// Theme configuration (moved outside the component to avoid recreation on every render)
const theme = createTheme({
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
});

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });
  const navigate = useNavigate();

  // Fetch admin data on component mount
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await fetch("https://facialpass-backend-production.up.railway.app/api/admins/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch admin data");
        }

        const data = await response.json();
        setAdmin(data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setToast({
          open: true,
          message: "Session expired. Please log in again.",
          severity: "error",
        });
        setTimeout(() => navigate("/admin/login"), 2000);
      }
    };

    fetchAdmin();
  }, [navigate]);

  // Show loader while admin data is being fetched
  if (!admin) {
    return <Loader />;
  }

  return (
    <>
      <Outlet context={{ admin, theme }} />
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default AdminDashboard;