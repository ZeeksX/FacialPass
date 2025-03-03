import React from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MemoryIcon from "@mui/icons-material/Memory";
import LockIcon from "@mui/icons-material/Lock";

const About = () => {
  return (
    <div className="bg-[#f6f6f7] w-full pb-12 text-[#0061A2] px-4 md:px-12">
      <h1 className="text-5xl font-bold flex mt-10 ml-4 md:ml-12">
        Our Features
      </h1>
      <h1 className="flex mt-8 w-full text-xl md:text-2xl ml-4 md:ml-12 text-center md:text-center">
        Discover our powerful features designed to enhance your experience. From
        seamless navigation to top-notch performance, we've got everything you
        need!
      </h1>
      <div className="features flex flex-wrap justify-center gap-8 w-full mt-10">
        <div className="flex flex-col w-full sm:w-80 md:w-96 lg:w-[420px] rounded-2xl gap-1.5 p-5 shadow bg-white">
          <AdminPanelSettingsIcon sx={{ fontSize: 50 }} />
          <h1 className="font-bold text-2xl md:text-3xl">
            Secure Authentication
          </h1>
          <p className="text-lg md:text-xl mt-4 leading-relaxed">
            This feature employs advanced facial recognition technology to
            accurately verify student identities. Examining unique facial traits
            ensures a secure and seamless authentication process.
          </p>
        </div>
        <div className="flex flex-col w-full sm:w-80 md:w-96 lg:w-[420px] rounded-2xl gap-1.5 p-6 shadow bg-white">
          <MemoryIcon sx={{ fontSize: 50 }} />
          <h1 className="font-bold text-2xl md:text-3xl">Quick Processing</h1>
          <p className="text-lg md:text-xl mt-4 leading-relaxed">
            This feature significantly reduces waiting times by enabling quick
            and efficient authentication. It utilizes advanced facial
            recognition to verify identities within seconds.
          </p>
        </div>
        <div className="flex flex-col w-full sm:w-80 md:w-96 lg:w-[420px] rounded-2xl gap-1.5 p-6 shadow bg-white">
          <LockIcon sx={{ fontSize: 50 }} />
          <h1 className="font-bold text-2xl md:text-3xl">Data Privacy</h1>
          <p className="text-lg md:text-xl mt-4 leading-relaxed">
            This system strictly complies with data protection regulations to
            ensure the security and privacy of student information. Advanced
            encryption safeguards sensitive data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
