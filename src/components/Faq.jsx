import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faq = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Heading */}
      <h1 className="text-[#0061A2] inter text-4xl md:text-5xl font-bold text-center mb-8">
        FAQs
      </h1>

      {/* FAQ Accordions */}
      <div className="space-y-4">
        <Accordion className="shadow-md rounded-xl">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography
              component="span"
              className="text-lg font-semibold text-[#0061A2] p-3"
            >
              How does facial recognition ensure exam security?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <h1 className="text-[#0061A2] text-justify leading-relaxed">
              Facial recognition enhances exam security by ensuring identity verification, allowing only registered students to access the exam.
              It prevents multiple logins by ensuring that a single student cannot log in from multiple devices or share credentials.
              Through continuous monitoring, the system can detect and flag suspicious activities, such as unauthorized presence or sudden changes in facial features.
              Additionally, anti-spoofing measures like liveness detection help prevent fraudulent attempts using photos or videos, ensuring a fair and secure exam environment.
            </h1>
          </AccordionDetails>
        </Accordion>

        <Accordion className="shadow-md rounded-2xl">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography
              component="span"
              className="text-lg font-semibold text-[#0061A2] p-3  mb-4 transition-all"
            >
              What should I do if the system fails to recognize my face?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-[#0061A2] leading-relaxed">
              - Check Your Lighting & Positioning <br />
              - Clean Your Camera & Ensure It <br />
              - Remove Obstructions <br />- Try Again or Refresh the Page
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="shadow-md rounded-xl">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography
              component="span"
              className="text-lg font-semibold text-[#0061A2] p-3"
            >
              Is my facial data stored securely, and who has access to it?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <h1 className="text-[#0061A2] text-justify leading-relaxed">
              Your facial data is securely stored using encryption and strict access controls to protect your privacy.
              Only authorized administrators have access to it, and all authentication processes comply with security best practices.
              The system ensures that facial data is used solely for student authentication during exams and is not shared with unauthorized parties.
            </h1>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;
