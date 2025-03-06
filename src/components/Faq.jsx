import React from "react";

const Faq = () => {
  return (
    <div className="flex flex-col items-center justify-center md:h-[500px] mt-10 px-6">
      <h1 className="text-[#0061A2] w-4/5 text-center font-bold text-5xl leading-[61.7px]">
        Still Have Questions? Reach Out To Us At
      </h1>
      <div className="w-full max-w-3xl">
        <h1 className="bg-white rounded-2xl shadow-md p-4 mb-4 transition-all text-[#0061A2] text-2xl">
          How does facial recognition ensure exam security?
        </h1>
      </div>
      <div className="w-full max-w-3xl shadow-md rounded-2xl p-4 mb-4 transition-all">
        <h1 className="bg-white text-[#0061A2] text-2xl  ">
          What should I do if the system fails to recognize my face?
        </h1>
        <p className=" text-[#0061A2]">
          - Make sure you are in a well-lit environment with minimal shadows.
        </p>
        <p className=" text-[#0061A2]">
          - Ensure your webcam or phone camera is working properly.
        </p>
        <p className=" text-[#0061A2]">
          - Refresh your browser or log out and log back in.
        </p>
        <p className="text-[#0061A2]">
          - If the issue persists, contact technical support team for
          assistance.
        </p>
      </div>
      <div className="w-full max-w-3xl">
        <h1 className="bg-white rounded-2xl shadow-md p-4 mb-4 transition-all text-[#0061A2] text-2xl">Is my facial data stored securely, and who has access to it?</h1>
      </div>
    </div>
  );
};

export default Faq;
