import React from "react";
import AdminSidebar from "../components/sidebars/AdminSidebar";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useOutletContext } from "react-router-dom";
import AdminMobileNav from "../components/topnav/AdminMobileNav";
import AdminTopNav from "../components/topnav/AdminTopNav";
import AdminNotifications from "../components/AdminNotifications";

// Reusable StatCard component for displaying statistics
const StatCard = ({ value, label }) => (
  <div className="flex flex-col justify-between items-end shadow-md rounded-md w-full lg:w-[48%] h-32 p-3">
    <span className="text-5xl font-bold">{value}</span>
    <h1 className="font-bold text-[18px] leading-7 lg:text-xl">{label}</h1>
  </div>
);

const Admin = () => {
  const { admin, theme } = useOutletContext();
  const { allStudents: students, allCourses: courses } = admin;

  // Get today's date in the required format
  const todayDate = dayjs().format("YYYY-MM-DD");

  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-100 text-[#0061A2]">
      <AdminSidebar />
      <div className="flex flex-col max-ml-60 lg:ml-[20%] w-full px-6 py-4">
        <AdminMobileNav theme={theme} admin={admin} />
        <AdminTopNav theme={theme} admin={admin} />
        <div className="flex flex-col max-lg:items-center lg:flex-row justify-between w-full lg:w-full mt-8">
          <div className="flex flex-col w-full lg:w-[61%]">
            {/* Welcome Banner */}
            <div className="flex items-center h-30 bg-gradient-to-r from-[#0061A2] to-[#0061a263] rounded-2xl">
              <h1 className="flex text-2xl text-white font-medium ml-4">
                Welcome back, Prof. {admin.admin.firstname}
              </h1>
            </div>

            {/* Statistics Section */}
            <div className="flex md:flex-row flex-col gap-8 items-center justify-between lg:h-20 my-8">
              <StatCard value={students.length || 0} label="Total Students Registered" />
              <StatCard value={courses.length || 0} label="Total Courses" />
            </div>
          </div>

          {/* Calendar Section */}
          <div className="flex flex-col justify-center items-center max-w-sm rounded-md shadow-md lg:min-h-[50vh]">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateCalendar"]}>
                <DemoItem label="">
                  <DateCalendar defaultValue={dayjs(todayDate)} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>

        {/* Notifications Section */}
        <AdminNotifications courses={courses} />
      </div>
    </div>
  );
};

export default Admin;