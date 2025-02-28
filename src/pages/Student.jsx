import React, { useEffect, useState } from "react";
import StudentSidebar from "../components/sidebars/StudentSidebar";
import { createTheme } from "@mui/material";
import Loader from "../components/Loader";
import TopNav from "../components/topnav/TopNav";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import MobileNav from "../components/topnav/MobileNav";

const Student = () => {
  const [student, setStudent] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
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
    return dayjs(new Date()).format('YYYY-MM-DD');
  };

  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-100 text-[#0061A2]">
      <StudentSidebar />
      <div className="flex flex-col max-ml-60 lg:ml-[20%] w-full px-6 py-4">
        <MobileNav theme={theme} student={student} />
        <TopNav theme={theme} student={student} />
        <div className="flex flex-col max-lg:items-center lg:flex-row justify-between w-full lg:w-full mt-8">
          <div className="flex flex-col w-full lg:w-[61%]">
            <div className="flex items-center h-30 bg-gradient-to-r from-[#0061A2] to-[#0061a263] rounded-2xl">
              <h1 className="flex text-2xl text-white font-medium ml-4">Welcome back, {student.student.firstname}</h1>
            </div>
            <div className="flex md:flex-row flex-col gap-8 items-center justify-between lg:h-20 my-8">
              <div className="flex flex-col justify-between items-end shadow-md rounded-md w-full lg:w-[48%] h-32 p-3">
                <span className="text-5xl font-bold">{student.totalCourses}</span>
                <h1 className="font-bold text-[18px] leading-7 lg:text-xl">Total Courses Registered</h1>
              </div>
              <div className="flex flex-col justify-between items-end shadow-md rounded-md w-full lg:w-[48%] h-32 p-3">
                <span className="text-5xl font-bold">{student.totalCourses}</span>
                <h1 className="font-bold text-[18px] leading-7 lg:text-xl">Total Exams Authenticated</h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center max-w-sm rounded-md shadow-md lg:min-h-[50vh]">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                <DemoItem label="">
                  <DateCalendar defaultValue={dayjs(getTodayDate())} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Student;