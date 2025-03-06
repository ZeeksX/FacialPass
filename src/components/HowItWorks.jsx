import React from "react";
import Carousel from "react-material-ui-carousel";
import registerImg from "../assets/registerImg.svg";
import faceScanImg from "../assets/scanface.svg";
import examAccessImg from "../assets/exams.svg";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import { Paper } from "@mui/material";

const steps = [
  {
    icon: <LooksOneIcon sx={{ fontSize: "60px" }} />,
    title: "Student Registration",
    description: "Students begin by creating an account on the system, where they provide their personal details, university credentials, and select their courses for the semester. During registration, they may also be required to upload identification documents and a facial scan for authentication purposes. Once enrolled, students can access their course dashboard, receive important notifications, and confirm their eligibility for upcoming exams. ",
    image: registerImg,
    alt: "Student Registration",
  },
  {
    icon: <LooksTwoIcon sx={{ fontSize: "60px" }} />,
    title: "Facial Authentication",
    description: "On the day of the exam, students arrive at the examination venue and proceed to the authentication checkpoint. Using the system’s facial recognition technology, their identity is verified by matching their live facial scan with the one stored during registration. This process ensures that only registered students can gain access, preventing impersonation and unauthorized entry. The system provides instant feedback, confirming successful verification or flagging discrepancies for further review by exam officials.",
    image: faceScanImg,
    alt: "Facial Authentication",
  },
  {
    icon: <Looks3Icon sx={{ fontSize: "60px" }} />,
    title: "Exam Access",
    description: "On the day of the exam, students arrive at the examination venue and proceed to the authentication checkpoint. Using the system’s facial recognition technology, their identity is verified by matching their live facial scan with the one stored during registration. This process ensures that only registered students can gain access, preventing impersonation and unauthorized entry. The system provides instant feedback, confirming successful verification or flagging discrepancies for further review by exam officials.",
    image: examAccessImg,
    alt: "Exam Access",
  },
];

const HowItWorks = () => {
  return (
    <section className="mt-12 w-full text-[#0061A2]">
      <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
      <Carousel
        navButtonsAlwaysVisible
        navButtonsProps={{
          style: {
            backgroundColor: '#0061A2',
          }
        }}
        indicators={false}
        animation="fade"
        swipe
        className="w-full text-[#0061A2]"
      >
        {steps.map((step, index) => (
          <Paper key={index}
            className="p-6 text-[#0061A2] bg-white rounded-lg shadow flex flex-row max-md:flex-col-reverse items-center">
            <div className="flex flex-col items-center gap-4 text-[#0061A2] w-full">
              {step.icon}
              <h3 className="text-3xl text-center font-bold mt-4">{step.title}</h3>
              <p className="text-center mt-2 w-4/5">{step.description}</p>
            </div>
            <img src={step.image} alt={step.alt} className="w-1/2 mt-4" />
          </Paper>
        ))}
      </Carousel>
    </section>
  );
};

export default HowItWorks;
