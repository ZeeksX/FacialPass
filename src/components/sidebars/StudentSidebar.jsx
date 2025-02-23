import React from "react";

const StudentSidebar = () => {
  return (
    <div className="flex gap-[100px] flex-col fixed left-0 top-0 p-7 pt-[70px] shadow-xl shadow-gray-150 h-screen ">
      <div>
        <h1 className="  text-3xl font-bold  ">FacialPass</h1>
      </div>
      <div className="">
        <div className=" ">
          <h1 className="text-[#B3B3B3] text-center text-[16px] font-medium leading-[20px] cursor-pointer hover:bg-[#0061A2] hover:text-white hover:rounded-[20px] p-5">
            Your information
          </h1>
        </div>
        <div>
          <h1 className="text-[#B3B3B3] text-center mt-[30px] cursor-pointer hover:bg-[#0061A2] hover:text-white hover:rounded-[20px] p-5 ">
            Select courses
          </h1>
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;
