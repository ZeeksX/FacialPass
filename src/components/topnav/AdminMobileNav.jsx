import React, { useState, useEffect } from "react";
import DensityMediumOutlined from "@mui/icons-material/DensityMediumOutlined";
import Avatar from "@mui/material/Avatar";
import MobileStudentSidebar from "../sidebars/MobileStudentSidebar";

const AdminMobileNav
 = ({ admin }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleClick = () => {
    setShowSidebar((prev) => !prev);
  };
  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    console.log(showSidebar);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`${
          isScrolled && isMobile
            ? "w-full bg-white fixed z-10 left-0 -top-0.5 px-2 flex items-center justify-center shadow-md"
            : "bg-transparent"
        }  transition-colors duration-1000`}
      >
        <div
          className={`flex lg:hidden flex-row w-full items-center justify-between mb-4 ${
            isScrolled && isMobile ? "my-1 mb-1" : ""
          }`}
        >
          <DensityMediumOutlined onClick={handleClick} />
          <div className="flex flex-row items-center justify-end gap-4 w-1/2">
            <h1 className="flex flex-row text-xl font-bold leading-10">
              {`${admin.admin.firstname}`}
              <span className="ml-2 hidden md:flex text-xl font-bold leading-10">{`${admin.admin.lastname}`}</span>
            </h1>
            <Avatar
              alt="Profile-photo"
              src={admin.admin.facial_image}
              className="flex items-center justify-center border p-2 rounded-[50%]"
              sx={{ backgroundColor: "#0061A2", color: "white" }}
            >
              {admin.admin.firstname
                ? admin.admin.firstname.charAt(0)
                : "E"}{" "}
              {/* Display the first letter of the student's name */}
            </Avatar>
          </div>
        </div>
      </div>
      <MobileStudentSidebar
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
      />
    </>
  );
};

export default AdminMobileNav
;
