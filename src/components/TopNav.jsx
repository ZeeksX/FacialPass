import React, { useState } from "react";
import { useNavigate } from "react-router";
import logo from "../assets/logo.svg";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";

const TopNav = () => {
    const navLinks = ["Home", "About", "Contact"];
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginClick = () => {
        setIsLoading(true)
        navigate("/login");
    };

    const handleSignupClick = () => {
        navigate("/signup");
    };

    return (
        <div className="top-nav w-[90vw] mx-auto flex flex-row items-center justify-between h-12 my-3">
            <div className="flex flex-row items-center">
                <img className="w-16" src={logo} alt="FacialPass logo" />
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold leading-5 text-[#0061A2]">FacialPass</h1>
                </div>
            </div>
            <div className="flex flex-row w-1/4 items-center justify-between">
                <ul className="flex flex-row w-full justify-between">
                    {navLinks.map((link, index) => (
                        <li
                            key={index}
                            className=" cursor-pointer font-medium text-sm text-[#0061A2]"
                        >
                            {link}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex gap-4 items-center">
                <BedtimeOutlinedIcon />
                <button
                    onClick={handleLoginClick}
                    className="flex flex-row cursor-pointer w-20 rounded-lg py-2 px-3 font-medium text-sm text-white justify-center items-center bg-[#0061A2] hover:bg-[#1836B2]"
                    disabled={isLoading}
                >
                    Login
                </button>
                <button
                    onClick={handleSignupClick}
                    className="flex flex-row w-20 cursor-pointer rounded-lg py-2 px-3 font-medium text-sm text-white justify-center items-center bg-[#0061A2] hover:bg-[#1836B2]">
                    Sign up
                </button>
            </div>
        </div>
    );
};

export default TopNav;
