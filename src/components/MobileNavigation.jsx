import React, { useState } from 'react';
import DensityMediumOutlinedIcon from '@mui/icons-material/DensityMediumOutlined';
import logo from '/assets/logo.svg';
import MobileSidebar from './MobileSidebar';

const MobileNavigation = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    return (
        <>
            <div className="mobile-nav w-full flex flex-row items-center justify-between h-12 my-3 px-4">
                <div className='flex flex-row'>
                    <img className="w-16" src={logo} alt="Logo" />
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl inter font-bold leading-5 text-[#0061A2]">FacialPass</h1>
                    </div>
                </div>
                <div onClick={toggleSidebar} className="cursor-pointer">
                    <DensityMediumOutlinedIcon sx={{ color: "#0061A2" }} />
                </div>
            </div>

            {/* Backdrop */}
            {sidebarOpen && (<div className="fixed bg-black inset-0 z-10 opacity-50" ></div>)}

            <MobileSidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        </>
    );
};

export default MobileNavigation;