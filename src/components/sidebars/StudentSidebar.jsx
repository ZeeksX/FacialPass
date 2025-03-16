import React, { useState } from "react";
import logo from "/assets/logo.svg";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { Settings } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LogoutModal from "../../components/modals/LogoutModal"; // Import the LogoutModal component

const StudentSidebar = ({ toggleSidebar }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); //State to control the modal

  const navItems = [
    { name: "Dashboard", icon: <HomeIcon />, link: "/studentDashboard" },
    { name: "Select Courses", icon: <LibraryBooksIcon />, link: "/select-courses" },
    { name: "Selected Courselist", icon: <BeenhereIcon />, link: "/selected-courses" },
    { name: "Profile", icon: <AccountCircleIcon />, link: "/profile" },
    { name: "Settings", icon: <Settings />, link: "/settings" },
  ];

  return (
    <>
      <div className="fixed flex-col max-w-64 w-1/5 shadow-lg min-h-screen bg-white items-center hidden lg:flex">
        <div className="flex flex-row items-center mt-8">
          <img className="w-12" src={logo} alt="FacialPass logo" />
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold leading-5 text-[#0061A2]">FacialPass</h1>
          </div>
        </div>
        <ul className='mt-8 md:mt-8 max-w-52 flex flex-col gap-3'>
          {navItems.map((item) => (
            <li key={item.name} className="flex items-center py-2 px-4 text-[#0061A2] hover:text-white hover:bg-[#0061A2] rounded-lg">
              <Link to={item.link} className="flex items-center w-full" onClick={toggleSidebar}>
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div
          className="fixed left-8 items-center w-3/5 bottom-10 flex py-2 px-4 rounded-lg max-w-48 text-[#0061A2] hover:text-white hover:bg-[#0061A2] cursor-pointer"
          onClick={() => setIsLogoutModalOpen(true)} // Open the logout modal
        >
          <span className="mr-2"><LogoutIcon /></span>Logout
        </div>
      </div>

      {/* Render the LogoutModal */}
      <LogoutModal
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)} // Close the modal
      />
    </>
  );
};

export default StudentSidebar;