import React from "react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();

  // Handle navigation to the upload image page
  const handleUploadImage = () => {
    navigate("/signup/upload-image");
  };

  // Handle navigation to the take picture page
  const handleTakePicture = () => {
    navigate("/signup/facial-recognition");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#0061A2] p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-[#0061A2] mb-4">
          Onboarding: Face Verification
        </h1>
        <p className="text-gray-600 mb-6">
          Please choose how you would like to verify your identity.
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleUploadImage}
            className="w-full flex items-center cursor-pointer justify-center h-12 font-semibold rounded-lg bg-[#0061A2] hover:bg-[#1836B2] text-white py-2 px-4 border border-transparent text-base transition-all focus:outline-none focus:ring-2"
          >
            Upload an Image
          </button>
          <button
            onClick={handleTakePicture}
            className="w-full flex items-center cursor-pointer justify-center h-12 font-semibold rounded-lg bg-[#0061A2] hover:bg-[#1836B2] text-white py-2 px-4 border border-transparent text-base transition-all focus:outline-none focus:ring-2"
          >
            Take a Picture
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;