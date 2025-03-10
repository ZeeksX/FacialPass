import React from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MemoryIcon from "@mui/icons-material/Memory";
import LockIcon from "@mui/icons-material/Lock";
import HowItWorks from "./HowItWorks";

const About = () => {
  const features = [
    {
      title: "Secure Authentication",
      icon: <AdminPanelSettingsIcon />,
      description:
        "Leverages cutting-edge facial recognition technology to accurately verify student identities before exams ensuring only authorized individuals gain access, reducing the risk of impersonation.",
    },
    {
      title: "Real-Time Processing",
      icon: <MemoryIcon />,
      description:
        "Utilizes high-speed AI models to analyze and authenticate faces in real time, minimizing delays ensuring a seamless and efficient verification process for large student groups.",
    },
    {
      title: "Data Protection",
      icon: <LockIcon />,
      description:
        "Implements robust encryption and compliance with data privacy regulations to safeguard student biometric data ensuring sensitive information remains confidential and secure.",
    },
  ];

  return (
    <div className="bg-[#f6f6f7] w-full pb-12 text-[#0061A2] px-4 md:px-12">
      <h1 className="inter text-5xl max-md:text-4xl font-bold mt-10 w-[85vw]">Our Features</h1>
      <div className="flex flex-col lg:flex-row max-lg:items-center justify-between gap-6 w-[90vw] mt-10 mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 p-6 shadow-lg max-md:items-center rounded-lg max-lg:max-w-[450px] max-lg:w-[85vw] bg-white w-full text-center"
          >
            <span className="text-5xl max-md:text-4xl text-[#0061A2]">{feature.icon}</span>
            <h3 className="text-3xl max-md:text-2xl font-bold">{feature.title}</h3>
            <p className="text-xl max-md:text-base text-left">{feature.description}</p>
          </div>
        ))}
      </div>
      <HowItWorks/>
    </div>
  );
};

export default About;
