import React from "react";
import registerImg from "../assets/registerImg.svg";
import faceScanImg from "../assets/scanface.svg";
import examAccessImg from "../assets/exams.svg";

const HowItWorks = () => {
  return (
    <section className="py-12 px-6 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-6">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
          <img src={registerImg} alt="Student Registration" className="w-24 h-24 mb-4" />
          <h3 className="text-xl font-semibold mb-2">1. Student Registration</h3>
          <p>Students sign up and enroll in their courses through the system.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
          <img src={faceScanImg} alt="Facial Authentication" className="w-24 h-24 mb-4" />
          <h3 className="text-xl font-semibold mb-2">2. Facial Authentication</h3>
          <p>On exam day, students verify their identity using facial recognition.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
          <img src={examAccessImg} alt="Exam Access" className="w-24 h-24 mb-4" />
          <h3 className="text-xl font-semibold mb-2">3. Exam Access</h3>
          <p>Once authenticated, students gain access to the exam hall.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
