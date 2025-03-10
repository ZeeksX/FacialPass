import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import PhoneIcon from '@mui/icons-material/Phone';
import CloseIcon from '@mui/icons-material/Close';
import Loader from "./Loader";

const MobileSidebar = ({ toggleSidebar, sidebarOpen }) => {
    const [shouldRender, setShouldRender] = useState(sidebarOpen);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const navItems = [
        { name: "Home", icon: <HomeIcon />, link: "/" },
        { name: "About", icon: <DescriptionIcon />, link: "/" },
        { name: "Contact", icon: <PhoneIcon />, link: "/" },
    ];

    useEffect(() => {
        if (sidebarOpen) {
            setShouldRender(true);
        } else {
            setTimeout(() => setShouldRender(false), 500);
        }
    }, [sidebarOpen]);

    const handleNavigation = (path) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate(path);
            toggleSidebar();
        }, 1000); // Simulate a delay for the loader
    };

    if (!shouldRender) return null;

    return (
        <>
            {/* Sidebar */}
            <div
                className={`mobile-sidebar fixed -top-0.5 left-0 h-screen w-full items-center bg-[#fff] text-white flex-col justify-center p-6 transform ${sidebarOpen ? "translate-x-0" : "translate-x-full"
                    } lg:translate-x-0 transition-transform duration-500 ease-in-out z-30`}
            >
                <div className="flex flex-row items-center justify-between mt-2 w-full">
                    <div className='flex flex-row '>
                        <img className="w-12" src={logo} alt="FacialPass logo" />
                        <div className="flex flex-col justify-center">
                            <h1 className="text-3xl inter font-bold leading-5 text-[#0061A2]">FacialPass</h1>
                        </div>
                    </div>
                    <CloseIcon sx={{ color: "#0061A2" }} onClick={toggleSidebar} />
                </div>

                <ul className='mt-16 md:mt-6 w-full flex flex-col items-center justify-center gap-3'>
                    {navItems.map((item) => (
                        <li key={item.name} className="flex w-3/5 items-center justify-center py-2 px-4 text-[#0061A2] hover:text-white hover:bg-[#0061A2] rounded-lg">
                            <Link to={item.link} className="flex items-center justify-center w-full" onClick={toggleSidebar}>
                                <span className="mr-2">{item.icon}</span>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex w-full gap-8 justify-center items-center mt-12">
                    <button
                        onClick={() => handleNavigation("/login")}
                        className="flex flex-row cursor-pointer w-20 rounded-lg py-2 px-3 font-medium text-sm text-white justify-center items-center bg-[#0061A2] hover:bg-[#1836B2]"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => handleNavigation("/signup")}
                        className="flex flex-row w-20 cursor-pointer rounded-lg py-2 px-3 font-medium text-sm text-white justify-center items-center bg-[#0061A2] hover:bg-[#1836B2]">
                        Sign up
                    </button>
                </div>
            </div>

            {/* Loader */}
            {isLoading && <Loader />}
        </>
    );
};

export default MobileSidebar;