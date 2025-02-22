import React from "react";

const StudentSidebar = () => {
  return (
    <div className="flex gap-[100px] flex-col fixed left-0 top-0 p-7 pt-[70px] shadow-xl shadow-gray-150 h-screen ">
      <div>
        <h1 className="  text-3xl font-bold  ">FacialPass</h1>
      </div>
      <div className="">
        <div className=" rounded-[20px] bg-[#0061A2] w-[200px] h-[59px]  flex items-center justify-center mt-[-16px]">
          <h1 className="text-white text-center text-[16px] font-medium leading-[20px]">
            Your information
          </h1>
        </div>
        <div>
          <h1 className="text-[#B3B3B3] text-center mt-[30px]">Select courses</h1>
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;
