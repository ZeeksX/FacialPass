import React from "react";
import { GoHome } from "react-icons/go";
import { TbSchool } from "react-icons/tb";
import { LuClipboardList } from "react-icons/lu";
import { Link, useLocation } from "react-router";

const SidebarWithRoleControl = () => {
    const sideNavLinks = [
        { icon: GoHome, title: "Dashboard", href: "/dashboard" },
        { icon: TbSchool, title: "Enrolled Students", href: "" },
        { icon: LuClipboardList, title: "Exam Room", href: "" },
    ];
    const { pathname } = useLocation();

    return (
        <div className="w-full h-full flex flex-col items-center justify-start py-8 px-3">
            <div className="space-y-2 w-full">
                {sideNavLinks.map((link, index) => (
                    <div
                        className="w-full flex flex-col items-center justify-center"
                        key={index}
                    >
                        <button
                            className={`w-full text-left rounded-md flex items-center transition-colors ${pathname === link.href
                                    ? "bg-secondary-bg"
                                    : "hover:bg-secondary-bg"
                                }`}
                        >
                            <Link to={link.href} className="w-full p-3 flex gap-4">
                                <link.icon size={24} />
                                {link.title}
                            </Link>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SidebarWithRoleControl;
