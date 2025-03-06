import React from "react";
import footerLogo from "../assets/footer-logo.svg";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
    const company = ["About Us", "Careers", "Privacy Policy", "Terms & Conditions"];
    const resources = ["FAQs", "Blog", "Help Center"];
    const contact = [
        { icon: <PhoneAndroidIcon />, feature: "+2349064048598", link: "tel:+2349064048598" },
        { icon: <MailOutlineIcon />, feature: "zeeksacademy@gmail.com", link: "mailto:zeeksacademy@gmail.com" },
        { icon: <LocationCityIcon />, feature: "131 Zeeks Avenue, Florida, United States", link: "https://www.google.com/maps/search/?api=1&query=131+Zeeks+Avenue,+Florida,+United+States" },
    ];
    const socials = [
        <InstagramIcon />, <LinkedInIcon />, <FacebookIcon />, <YouTubeIcon />, <XIcon />
    ];

    return (
        <div className="flex flex-col text-white bg-[#0061A2] w-full pt-4 px-4 md:px-12">
            <div className="flex flex-col lg:flex-row justify-between">
                {/* Logo Section */}
                <div className="flex flex-row items-center h-20">
                    <img className="w-16 md:w-20" src={footerLogo} alt="FacialPass-logo" />
                    <h3 className="text-2xl md:text-3xl font-semibold">FacialPass</h3>
                </div>

                {/* Company Section */}
                <div className="flex flex-col gap-2 mt-6">
                    <h3 className="text-lg md:text-xl font-bold">Company</h3>
                    {company.map((item, index) => (
                        <h3 className="text-base md:text-lg cursor-pointer" key={index}>
                            {item}
                        </h3>
                    ))}
                </div>

                {/* Resources */}
                <div className="flex flex-col gap-2 mt-6">
                    <h3 className="text-lg md:text-xl font-bold">Resources</h3>
                    {resources.map((item, index) => (
                        <h3 className="text-base md:text-lg cursor-pointer" key={index}>
                            {item}
                        </h3>
                    ))}
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-3 mt-6">
                    <h3 className="text-lg md:text-xl font-bold">Contact Us</h3>
                    {contact.map((item, index) => (
                        <a
                            href={item.link}
                            className="flex items-end gap-1 flex-row leading-6 text-sm md:text-lg cursor-pointer hover:underline"
                            key={index}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="flex items-center">{item.icon}</span>
                            {item.feature}
                        </a>
                    ))}
                </div>

                {/* Socials */}
                <div className="flex flex-col gap-3 mt-6">
                    <h3 className="text-lg md:text-xl font-bold">Socials</h3>
                    <div className="flex flex-row lg:flex-col lg:items-center gap-3">
                        {socials.map((item, index) => (
                            <h3
                                className="flex flex-row text-sm md:text-lg cursor-pointer"
                                key={index}
                            >
                                {item}
                            </h3>
                        ))}
                    </div>
                </div>
            </div>
            <h3 className="text-sm text-center mt-12 pb-2">
                All rights reserved. © 2024 Zeeks Solutions Limited
            </h3>
        </div>
    );
};

export default Footer;
