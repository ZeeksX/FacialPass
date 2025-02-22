import React from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StudentSidebar from "../components/sidebars/StudentSidebar";

const Student = () => {
  return (
    <div>
      {" "}
      <StudentSidebar />
      <div>
        <div className="flex justify-center items-center gap-[300px] mt-">
          <div className="bg-gradient-to-r from-[#0061A2] to-[rgba(0,97,162,0.39)]  w-255 h-40 rounded-3xl flex   mt-[80px] ml-[250px]">
            <h1 className="text-3xl text-white mt-5 ml-4">
              Welcome back, Ezekiel{" "}
            </h1>
            <WbSunnyIcon
              style={{ fontSize: "50px" }}
              className="text-yellow-400 mt-5  "
            />
          </div>
        </div>

        <div className=" flex flex-col items-start absolute left-[420px] top-[300px]">
          <AccountCircleIcon style={{ fontSize: "100px" }} className="" />
          <p className="text-[15px]">Change Profile</p>
        </div>

        <div className="absolute left-[420px] bottom-16  flex">
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
  //   };
};

export default Student;
