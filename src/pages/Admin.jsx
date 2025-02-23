import React from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminSidebar from "../components/sidebars/AdminSidebar";

const Admin = () => {
  return (
    <div>
      {" "}
      <AdminSidebar />
      <div>
        <div className="flex justify-center items-center gap-[300px] mt-">
          <div className="bg-gradient-to-r from-[#0061A2] to-[rgba(0,97,162,0.39)]  w-255 h-40 rounded-3xl flex   mt-[80px] ml-[250px]">
            <h1 className="text-3xl text-white mt-5 ml-4">
              Good morning, Dr. Eze{" "}
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
                <td className="p-4">SENG 400</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-4 font-semibold">Department:</td>
                <td className="p-4">Computing and Engineering Science</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-4 font-semibold">Emial:</td>
                <td className="p-4">example@gmail.com</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-4 font-semibold">Amount of students:</td>
                <td className="p-4">142</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
