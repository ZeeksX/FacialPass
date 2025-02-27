import React, { useEffect, useState } from "react";
import StudentSidebar from "../components/sidebars/StudentSidebar";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputAdornment, ThemeProvider, createTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Loader from "../components/Loader";

const Student = () => {
  const [search, setSearch] = useState("");
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

  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-100 text-[#0061A2]">
      <StudentSidebar />
      <div className="flex flex-col max-ml-60 ml-[20%] w-full p-6">
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center w-4/5 rounded-3xl">
            <ThemeProvider theme={theme}>
              <TextField
                fullWidth
                className="flex rounded-3xl bg-white items-center"
                variant="outlined"
                placeholder="Search for course, exam or date"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#0061A2" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </ThemeProvider>
          </div>

          <div className="flex flex-row items-center justify-end gap-4 w-1/2">
            <div className="border h-10 w-10 p-2 rounded-[50%] flex items-center justify-center">
              <NotificationsIcon sx={{ height: "24px", width: "24px", cursor: "pointer" }} />
            </div>
            <div className="w-0.5 bg-[#0061A2] h-10"></div>
            <Avatar
              alt="Profile-photo"
              src={student.student.facial_image}
              className="flex items-center justify-center border p-2 rounded-[50%]"
              sx={{ backgroundColor: "#0061A2", color: "white" }}
            >
              {student.student.firstname ? student.student.firstname.charAt(0) : "E"} {/* Display the first letter of the student's name */}
            </Avatar>
            <h1 className="text-xl font-bold leading-10">{`${student.student.firstname} ${student.student.lastname}`}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;