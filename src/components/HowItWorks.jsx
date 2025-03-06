import React from "react";
import registerImg from "../assets/registerImg.svg";
import faceScanImg from "../assets/scanface.svg";
import examAccessImg from "../assets/exams.svg";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';

const HowItWorks = () => {
  return (
    <section className="mt-12 w-full">
      <h2 className="text-3xl font-bold mb-6">How It Works</h2>
      <div className="flex flex-col gap-8">
        <div className="p-4 bg-white rounded-lg shadow flex flex-row">
          <div className="flex flex-col w-1/2 gap-4 items-center justify-center">
            <LooksOneIcon sx={{ fontSize: "60px" }} />
            <h3 className="text-2xl font-bold mb-2">Student Registration</h3>
            <p className="text-center">Students sign up and enroll in their courses through the system.</p>
          </div>
          <img src={registerImg} alt="Student Registration" className="w-1/2" />
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md flex flex-row items-center">
          <img src={faceScanImg} alt="Facial Authentication" className="w-1/2" />
          <div className="flex flex-col w-1/2 gap-4 items-center justify-center">
            <LooksTwoIcon sx={{ fontSize: "60px" }} />
            <h3 className="text-2xl font-bold mb-2">Facial Authentication</h3>
            <p className="text-center">On exam day, students verify their identity using facial recognition.</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md flex flex-row items-center">
          <div className="flex flex-col w-1/2 gap-4 items-center justify-center">
            <Looks3Icon sx={{ fontSize: "60px" }} />
            <h3 className="text-2xl font-bold mb-2">Exam Access</h3>
            <p className="text-center">Once authenticated, students gain access to the exam hall.</p>
          </div>
          <img src={examAccessImg} alt="Exam Access" className="w-1/2" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
