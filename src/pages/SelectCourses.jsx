import React, { useState } from "react";
import StudentSidebar from "../components/sidebars/StudentSidebar";
import TopNav from "../components/topnav/TopNav";
import MobileNav from "../components/topnav/MobileNav";
import { useOutletContext } from "react-router-dom";
import CustomPagination from "../components/Pagination";

const SelectCourses = () => {
  const { student, theme, courses } = useOutletContext();
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  // Calculate the total number of pages
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  // Get the courses for the current page
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-100 text-[#0061A2]">
      <StudentSidebar />
      <div className="flex flex-col lg:ml-[20%] w-full px-6 py-4">
        <MobileNav theme={theme} student={student} />
        <TopNav theme={theme} student={student} />
        <div className="mt-8">
          <h1 className="flex text-2xl font-bold ">All Courses</h1>
          <div className="flex flex-wrap gap-4 justify-center flex-row w-full">
            {currentCourses.map((item) => (
              <div
                key={item.id}
                className="card p-4 gap-2 flex flex-col mt-2 max-w-56 w-1/4 h-[330px] rounded-xl shadow-md"
              >
                <div className="h-60">
                  <h1 className="text-xl font-bold flex flex-col">
                    Course code:
                    <span className="text-base font-normal">{item.course_code}</span>
                  </h1>
                  <h1 className="text-xl font-bold flex flex-col">
                    Course Title:
                    <span className="text-base font-normal">{item.course_name}</span>
                  </h1>
                  <h1 className="text-xl font-bold flex flex-col">
                    Credits:
                    <span className="text-base font-normal">{item.credit_unit}</span>
                  </h1>
                  <h1 className="text-xl font-bold flex flex-col">
                    Exam Date:
                    <span className="text-base font-normal">{item.examDate}</span>
                  </h1>
                </div>

                <div className="flex flex-row mt-2 items-center justify-end">
                  <button className="w-20 font-semibold items-center flex cursor-pointer h-8 justify-center rounded-md bg-[#0061A2] text-white">Select</button>
                </div>
              </div>
            ))}
          </div>
          <CustomPagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectCourses;