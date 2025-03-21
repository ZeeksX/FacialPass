import React, { useState } from "react";
import logo from "/assets/logo.svg";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { Settings } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Person2Icon from "@mui/icons-material/Person2";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LogoutModal from "../../components/modals/LogoutModal";  // Import the LogoutModal component

const MobileAdminSidebar = ({ showSidebar, toggleSidebar }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // State to control the modal

  const navItems = [
    { name: "Dashboard", icon: <HomeIcon />, link: "/adminDashboard" },
    { name: "Exams", icon: <LibraryBooksIcon />, link: "/Exams" },
    { name: "Students", icon: <Person2Icon />, link: "/Students" },
    { name: "Profile", icon: <AccountCircleIcon />, link: "/admin/profile" },
    { name: "Settings", icon: <Settings />, link: "/admin/settings" },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#fff] text-white flex-col justify-between p-6 transform ${showSidebar ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="flex flex-row items-center mt-2">
          <img className="w-12" src={logo} alt="FacialPass logo" />
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold leading-5 text-[#0061A2]">
              FacialPass
            </h1>
          </div>
        </div>
        <ul className="mt-6 md:mt-6 max-w-52 flex flex-col gap-3">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="flex items-center py-2 px-4 text-[#0061A2] hover:text-white hover:bg-[#0061A2] rounded-lg"
            >
              <Link
                to={item.link}
                className="flex items-center w-full"
                onClick={toggleSidebar}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div
          className="fixed left-6 items-center w-3/5 bottom-10 flex py-2 px-4 rounded-lg max-w-48 text-[#0061A2] hover:text-white hover:bg-[#0061A2] cursor-pointer"
          onClick={() => setIsLogoutModalOpen(true)} // Open the logout modal
        >
          <span className="mr-2">
            <LogoutIcon />
          </span>
          Logout
        </div>
      </div>

      {/* Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-20"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Render the LogoutModal */}
      <LogoutModal
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)} // Close the modal
      />
    </>
  );
};

export default MobileAdminSidebar;