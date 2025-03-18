import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/sidebars/AdminSidebar";
import AdminTopNav from "../components/topnav/AdminTopNav";
import AdminMobileNav from "../components/topnav/AdminMobileNav";
import { useOutletContext } from "react-router-dom";
import CustomPagination from "../components/Pagination";

const Exams = () => {
  const { admin, theme } = useOutletContext();
  const courses = admin.allCourses;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  // Sort courses by course_code in alphabetical order
  const sortedCourses = [...courses].sort((a, b) =>
    a.course_code.localeCompare(b.course_code)
  );

  // Calculate total pages
  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);

  // Get courses for the current page
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = sortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Navigate to registered students page for that course
  const handleViewStudents = (course) => {
    const formattedCourseName = course.course_name.replace(/\s+/g, "-").toLowerCase(); // Format course name for URL
    navigate(`/${formattedCourseName}/students`, { state: { selectedCourse: course } });
  };

  const handleStartExam = (course) => {
    const formattedCourseName = course.course_name
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .toLowerCase(); // Convert to lowercase
    navigate(`/exams/${formattedCourseName}/authenticate`, {
      state: { selectedCourse: course },
    });
  };

  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-100 text-[#0061A2]">
      <AdminSidebar />
      <div className="flex flex-col lg:ml-[20%] w-full px-6 py-4">
        <AdminMobileNav theme={theme} admin={admin} />
        <AdminTopNav theme={theme} admin={admin} />
        <div className="mt-8">
          <h1 className="flex inter text-2xl font-bold">All Courses</h1>
          <div className="flex flex-wrap gap-8 justify-between flex-row w-full">
            {currentCourses.map((item) => (
              <div
                key={item.id}
                className="card p-4 gap-2 flex flex-col mt-2 max-w-80 md:max-w-64 w-1/4 max-md:w-full min-w-52 h-[345px] rounded-xl shadow-md"
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
                <div className="flex flex-col mt-2 gap-2 items-end justify-center">
                  <button
                    onClick={() => handleStartExam(item)}// start the exam for the course
                    className="w-28 font-semibold items-center flex cursor-pointer h-8 justify-center rounded-md bg-[#0061A2] text-white"
                  >
                    Start Exam
                  </button>
                  <button
                    onClick={() => handleViewStudents(item)} //see students registered for the course
                    className="w-28 font-semibold items-center flex cursor-pointer h-8 justify-center rounded-md bg-[#0061A2] text-white"
                  >
                    See Students
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