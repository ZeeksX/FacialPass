import React, { useState } from "react";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import loginImage from "../assets/login-image.jpg";
import logo from "../assets/logo.svg";
import Toast from "../components/Toast";
import Loader from "../components/Loader";

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToastClose = () => setToastOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setToastMessage("Please select an image file.");
      setToastSeverity("error");
      setToastOpen(true);
      return;
    }

    const userData = JSON.parse(localStorage.getItem("userData"));
    const formData = new FormData();

    formData.append("firstname", userData.firstname);
    formData.append("lastname", userData.lastname);
    formData.append("department", userData.department);
    formData.append("matricNumber", userData.matricNum);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("facial_image", selectedFile); // Send file directly

    try {
      const res = await fetch("http://localhost:5000/api/students/register", {
        method: "POST",
        body: formData, // No need to set Content-Type
      });

      const data = await res.json();
      if (res.ok) {
        setToastMessage("Registration successful! Redirecting...");
        setToastSeverity("success");
        setToastOpen(true);
        localStorage.setItem("token", data.token);
        localStorage.removeItem("userData");
        setLoader(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setToastMessage(data.message || "Registration failed. Please try again.");
        setToastSeverity("error");
        setToastOpen(true);
        setLoader(false);
      }
    } catch (error) {
      setToastMessage("An error occurred. Please try again.");
      setToastSeverity("error");
      setToastOpen(true);
      setLoader(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center overflow-hidden gap-12 p-4 w-full min-h-screen bg-gradient-to-b from-white to-[#0061A2]">
        <div className="flex flex-row lg:w-3/5 lg:h-[90vh]">
          <div
            className="md:w-1/2 hidden md:flex bg-cover bg-center object-fill rounded-l-xl"
            style={{ backgroundImage: `url(${loginImage})` }}
          ></div>
          <div className="flex flex-col w-full lg:w-3/5 rounded-xl md:rounded-r-xl md:rounded -none bg-white text-[#0061A2] px-4 lg:px-3 gap-4 py-8">
            <div className="flex flex-col justify-center items-center gap-2">
              <img className="w-24" src={logo} alt="Facial Pass logo" />
              <p className="text-[#0061A2] text-xl font-medium text-center">
                Please upload a clear photo of your face
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden flex flex-col gap-4 items-start justify-center lg:w-4/5 w-4/5 mx-auto"
            >
              <div className="flex flex-col w-full justify-center items-center gap-4">
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    name="facial_image"
                  />
                </Button>
                {imagePreview && (
                  <div className="image-preview rounded-md shadow-lg h-72 flex flex-col gap-2 w-[90%] items-center">
                    <p className="text-[#0061A2]">Selected Image:</p>
                    <img
                      src={imagePreview}
                      alt="Selected"
                      className="w-[90%] h-[70%]"
                    />
                  </div>
                )}
                <button
                  className="w-full cursor-pointer flex items-center justify-center h-11 font-semibold rounded-4xl bg-[#0061A2] hover:bg-[#1836B2] text-white py-1 px-3 border border-transparent text-base transition-all focus:outline-none focus:ring-2"
                  type="submit"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={handleToastClose}
      />
      {loader && <Loader />}
    </>
  );
};

export default UploadImage;