import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Loader from "../components/Loader";
import AdminSidebar from "../components/sidebars/AdminSidebar";
import AdminTopNav from "../components/topnav/AdminTopNav";
import AdminMobileNav from "../components/topnav/AdminMobileNav";;

const ExamStudents = () => {
  const { admin, theme } = useOutletContext();
  const location = useLocation();
  const { selectedCourse } = location.state || {};
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (!selectedCourse?.id) return;

        const response = await fetch(`https://facialpass-backend-production.up.railway.app/api/courses/${selectedCourse.id}/students`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

        }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [selectedCourse?.id]); // Add course ID as dependency

  if (!selectedCourse) {
    return <div className="p-4 text-red-600">No course selected!</div>;
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-row min-h-screen w-full bg-gray-100 text-[#0061A2]">
        <AdminSidebar />
        <div className="flex flex-col lg:ml-[20%] w-full px-6 py-4">
          <AdminMobileNav theme={theme} admin={admin} />
          <AdminTopNav theme={theme} admin={admin} />
          <div className="p-4 mt-8">
            <h1 className="text-2xl font-bold mb-4">
              Students Registered for {selectedCourse.course_name} ({selectedCourse.course_code})
            </h1>

            {students.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">S/N</th>
                      <th className="border border-gray-300 p-2">Name</th>
                      <th className="border border-gray-300 p-2">Email</th>
                      <th className="border border-gray-300 p-2">Matric Number</th>
                      <th className="border border-gray-300 p-2">Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={student.id} className="text-center">
                        <td className="border border-gray-300 p-2">{index+1}</td>
                        <td className="border border-gray-300 p-2">
                          {student.firstname} {student.lastname}
                        </td>
                        <td className="border border-gray-300 p-2">{student.email}</td>
                        <td className="border border-gray-300 p-2">{student.matricNumber}</td>
                        <td className="border border-gray-300 p-2">{student.department}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-gray-600">No students registered for this course</div>
            )}
          </div>
        </div>
      </div>

    </>

  );
};

export default ExamStudents;