import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StudentSidebar from "../components/sidebars/StudentSidebar";

const Student = () => {
  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-100">
      <StudentSidebar />
      <div className="flex items-center flex-col max-ml-60 ml-[20%] w-4/5">
        <div className="flex flex-col items-start">
          <AccountCircleIcon style={{ fontSize: "100px" }}  />
          <p className="text-[15px]">Change Profile</p>
        </div>

        <div className="flex">
          <table className="w- border border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-4 font-semibold">Course:</td>
                <td className="p-4">Computer Science</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-4 font-semibold">Department:</td>
                <td className="p-4">Computing and Engineering Science</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-4 font-semibold">Year:</td>
                <td className="p-4">400 level (Final Year)</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-4 font-semibold">Amount of courses:</td>
                <td className="p-4">6</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Student;
