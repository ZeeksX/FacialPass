import React from "react";
import StudentSidebar from "../components/sidebars/StudentSidebar";
import TopNav from "../components/topnav/TopNav";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import MobileNav from "../components/topnav/MobileNav";
import { useOutletContext } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Notifications from "../components/Notifications"
// Enable the UTC plugin
dayjs.extend(utc);

const Student = () => {
  const { student, theme } = useOutletContext();

  // Get today's date in the required format
  const getTodayDate = () => {
    return dayjs(new Date()).format("YYYY-MM-DD");
  };

  // Extract exam dates from student.courses and format them as 'YYYY-MM-DD'
  const examDates = student.courses.map((course) =>
    dayjs(course.examDate).utc().format("YYYY-MM-DD") // Ensure UTC formatting
  );

  // Custom day component to highlight exam dates
  const ServerDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;

    // Format the current day as 'YYYY-MM-DD' for comparison
    const formattedDay = day.utc().format("YYYY-MM-DD"); // Ensure UTC formatting

    // Check if the current day is an exam date
    const isExamDate = examDates.includes(formattedDay);

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={isExamDate ? <MenuBookIcon sx={{ fontSize: "12px" }} /> : undefined} // Use an emoji or custom badge
      >
        <PickersDay {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          sx={{
            "&:hover": {
              backgroundColor: "#0061A2", // Green background on hover
              color: "#FFFFFF", // White text on hover
            },
          }}
        />
      </Badge>
    );
  };

  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-100 text-[#0061A2]">
      <StudentSidebar />
      <div className="flex flex-col max-ml-60 lg:ml-[20%] w-full px-6 py-4">
        <MobileNav theme={theme} student={student} />
        <TopNav theme={theme} student={student} />
        <div className="flex flex-col max-lg:items-center justify-between w-full lg:w-full mt-8">
          <div className="flex flex-row max-lg:flex-col justify-between w-full mb-6">
            <div className="flex flex-col w-full lg:w-[61%]">
              <div className="flex items-center h-30 bg-gradient-to-r from-[#0061A2] to-[#0061a263] rounded-2xl">
                <h1 className="flex text-2xl text-white font-medium ml-4">
                  Welcome back, {student.student.firstname}
                </h1>
              </div>
              <div className="flex flex-row max-md:flex-col w-full gap-8 items-center justify-between my-8">
                <div className="flex flex-col justify-between items-end shadow rounded-md max-md:w-full max-lg:w-1/2 lg:w-[47%] h-32 p-3">
                  <span className="text-5xl font-bold">{student.totalCourses}</span>
                  <h1 className="font-bold text-[18px] leading-7 lg:text-xl">
                    Total Courses Registered
                  </h1>
                </div>
                <div className="flex flex-col justify-between items-end shadow rounded-md max-md:w-full max-lg:w-1/2 lg:w-[47%] h-32 p-3">
                  <span className="text-5xl font-bold">
                    {student.takenCourses ? student.takenCourses.length : 0}
                  </span>
                  <h1 className="font-bold text-[18px] leading-7 lg:text-xl">
                    Total Exams Authenticated
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex max-lg:justify-center">
              <div className="flex flex-col items-center max-w-sm rounded-md shadow lg:h-[50vh]">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateCalendar", "DateCalendar"]}>
                    <DemoItem label="">
                      <DateCalendar
                        defaultValue={dayjs(getTodayDate())}
                        showDaysOutsideCurrentMonth
                        slots={{
                          day: ServerDay, // Use the custom day component
                        }}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>

          </div>
          <Notifications student={student} />
        </div>
      </div>
    </div>
  );
};

export default Student;