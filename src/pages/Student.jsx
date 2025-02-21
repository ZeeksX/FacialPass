import React from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Student = () => {
  //   const NameTable = () => {
  //     // Static data for the table
  //     const tableData = [
  //       { column1: "Alice", column2: "Bob" },
  //       { column1: "Charlie", column2: "Diana" },
  //       { column1: "Eve", column2: "Frank" },
  //       { column1: "Grace", column2: "Hank" },
  //     ];

  return (
    <div>
      <div className="flex justify-center items-center gap-[300px] mt-0">
        <div className="">
          <h1 className="text-3xl font-bold">FacialPass</h1>
          <div className="bg-gradient-to-r from-blue-700 to-blue-200 ">
            <h1> Your information</h1>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-700 to-blue-200 w-250 h-40 rounded-3xl flex items-center justify-center mt-[80px]">
          <h1 className="text-3xl text-white">Welcome back, Ezekiel </h1>
          <WbSunnyIcon
            style={{ fontSize: "50px" }}
            className="text-yellow-400  "
          />
        </div>
      </div>

      <div className="absolute left-[500px] top-[270px]">
        <AccountCircleIcon style={{ fontSize: "100px" }} className="" />
        <p className="text-[15px]">Change Profile</p>
      </div>

      <div className="mt-[190px] ml-[480px]">
        <table className="table-auto border-collapse border border-gray-300 w-[900px]   text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 w-1/4">
                Courses:
              </th>
              <th className="border border-gray-300 px-4 py-2 w-3/4">
                Computer science
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-200">
                  <td className="border border-gray-300 px-4 py-2">
                    {row.column1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.column2}
                  </td>
                </tr>
              ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
  //   };
};

export default Student;