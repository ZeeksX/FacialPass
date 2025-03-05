import React from "react";
import StudentSidebar from "../components/sidebars/StudentSidebar";
import TopNav from "../components/topnav/TopNav";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import MobileNav from "../components/topnav/MobileNav";
import { useOutletContext } from "react-router-dom";

const Student = () => {
  const { student, theme } = useOutletContext();

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
              <div className="flex flex-col justify-between items-end shadow rounded-md w-full lg:w-[48%] h-32 p-3">
                <span className="text-5xl font-bold">{student.totalCourses}</span>
                <h1 className="font-bold text-[18px] leading-7 lg:text-xl">Total Courses Registered</h1>
              </div>
              <div className="flex flex-col justify-between items-end shadow rounded-md w-full lg:w-[48%] h-32 p-3">
                <span className="text-5xl font-bold">{student.authenticated ? student.authenticated : 0}</span>
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