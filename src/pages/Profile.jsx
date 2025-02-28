import React, { useEffect, useState } from "react";
import StudentSidebar from "../components/sidebars/StudentSidebar";
import TopNav from "../components/topnav/TopNav";
import MobileNav from "../components/topnav/MobileNav";
import Loader from "../components/Loader";
import { createTheme } from "@mui/material";

const Profile = () => {
  const [student, setStudent] = useState(null);

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
  }, []); // Empty dependency array ensures it runs once when the component mounts

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
  const getTodayDate = () => {
    return dayjs(new Date()).format("YYYY-MM-DD");
  };

  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-100 text-[#0061A2]">
      <StudentSidebar />
      <div className="flex flex-col lg:ml-[20%] w-full px-6 py-4">
        <MobileNav theme={theme} student={student} />
        <TopNav theme={theme} student={student} />
      </div>
    </div>
  );
};

export default Profile;
