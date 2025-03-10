import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/sidebars/AdminSidebar";
import AdminTopNav from "../components/topnav/AdminTopNav";
import AdminMobileNav from "../components/topnav/AdminMobileNav";
import { useOutletContext } from "react-router-dom";
import CustomPagination from "../components/Pagination";

const Exams = () => {
  const { admin, students, theme, courses } = useOutletContext();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  // Calculate total pages
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  // Get courses for the current page
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Navigate to authentication page with selected exam details
  const handleStartExam = (selectedExam) => {
    navigate("/authenticate", { state: { selectedExam } });
  };

  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-100 text-[#0061A2]">
      <AdminSidebar />
      <div className="flex flex-col lg:ml-[20%] w-full px-6 py-4">
        <AdminMobileNav theme={theme} admin={admin} students={students} />
        <AdminTopNav theme={theme} admin={admin} students={students} />
        <div className="mt-8">
          <h1 className="flex inter text-2xl font-bold">All Courses</h1>
          <div className="flex flex-wrap gap-8 justify-between flex-row w-full">
            {currentCourses.map((item) => (
              <div
                key={item.id}
                className="card p-4 gap-2 flex flex-col mt-2 max-w-80 md:max-w-64 w-1/4 max-md:w-full min-w-52 h-[330px] rounded-xl shadow-md"
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
                  <button
                    onClick={() => handleStartExam(item)} // Pass exam details when clicked
                    className="w-28 font-semibold items-center flex cursor-pointer h-8 justify-center rounded-md bg-[#0061A2] text-white"
                  >
                    Start Exam
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Component */}
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

export default Exams;
