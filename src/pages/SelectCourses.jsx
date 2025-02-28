import React from 'react'
import StudentSidebar from "../components/sidebars/StudentSidebar";

const SelectCourses = () => {
  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-100 text-[#0061A2]">
      <StudentSidebar />
      <div className="flex flex-col max-ml-60 ml-[20%] w-full p-6"></div>
    </div>
  );
}

export default SelectCourses