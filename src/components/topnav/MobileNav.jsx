import React, { useState, useEffect } from 'react'
import DensityMediumOutlined from '@mui/icons-material/DensityMediumOutlined';
import Avatar from "@mui/material/Avatar";

const MobileNav = ({ student }) => {
    const [showSidebar, setShowSidebar] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleClick = () => {
        setShowSidebar((prev) => !prev)
    }
    const handleResize = () => {
        setIsMobile(window.innerWidth < 1024);
    };

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
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
            <div className={`${(isScrolled && isMobile) ? "w-full bg-white fixed z-10 left-0 top-0 px-2 flex items-center justify-center" : "bg-transparent"}  transition-colors duration-1000`}>
                <div
                    className={`flex lg:hidden flex-row w-full items-center justify-between mb-4 ${(isScrolled && isMobile) ? "my-1 mb-1" : ""}`}>
                    <DensityMediumOutlined onClick={handleClick} />
                    <div className="flex flex-row items-center justify-end gap-4 w-1/2">
                        <h1 className="text-xl font-bold leading-10">{`${student.student.firstname}`}</h1>
                        <Avatar
                            alt="Profile-photo"
                            src={student.student.facial_image}
                            className="flex items-center justify-center border p-2 rounded-[50%]"
                            sx={{ backgroundColor: "#0061A2", color: "white" }}
                        >
                            {student.student.firstname ? student.student.firstname.charAt(0) : "E"} {/* Display the first letter of the student's name */}
                        </Avatar>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileNav