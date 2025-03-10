import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../components/Auth";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  TextField,
  InputAdornment,
  FormControl,
  OutlinedInput,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import ForgotPassword from "../components/ForgotPassword";
import Toast from "../components/Toast";
import Loader from "../components/Loader";
import { createTheme } from "@mui/material";
import loginImage from "../assets/login-image.jpg";
import logo from "../assets/logo.svg";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("");
  const [loader, setLoader] = useState(false);
  const auth = useAuth();
  const { login } = auth;
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/admins/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        const { token, ...user } = data;
        localStorage.setItem("token", token);
        login(token, user.admin.role, user.admin);
        setToastOpen(true);
        setToastMessage("Login successful");
        setToastSeverity("success");
        setLoader(true);
        setTimeout(() => navigate("/adminDashboard"), 2000);
      } else {
        setToastMessage(data.message || "Login failed. Please try again.");
        setToastSeverity("error");
        setLoader(false);
        setToastOpen(true);
      }
    } catch (error) {
      setToastMessage("An error occurred. Please try again.");
      setToastSeverity("error");
      setLoader(false);
      setToastOpen(true);
    }
  };

  const handleToastClose = () => setToastOpen(false);
  const handleForgotPasswordOpen = () => setForgotPasswordOpen(true);
  const handleForgotPasswordClose = () => setForgotPasswordOpen(false);

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: "#0061A2",
            "& fieldset": { borderColor: "#0061A2" },
            "&:hover fieldset": { borderColor: "#0061A2" },
            "&.Mui-focused fieldset": { borderColor: "#0061A2" },
          },
          input: {
            color: "#0061A2",
            "&::placeholder": { color: "#0061A2", opacity: 0.5 },
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: { root: { color: "#0061A2" } },
      },
    },
  });

  return (
    <>
      <div className="overflow-hidden flex flex-col items-center justify-center gap-2 p-4 w-full min-h-screen bg-linear-to-b from-white to-[#0061A2]">
        <div className="flex flex-row justify-center max-md:max-w-96 max-md:w-[90%] max-lg:w-1/2 lg:w-3/5 lg:h-[90vh]">
          <div
            className="hidden lg:flex md:w-1/2 bg-cover bg-center object-fill rounded-l-xl"
            style={{ backgroundImage: `url(${loginImage})` }}
          ></div>
          <div className="login flex flex-col w-full justify-center items-center lg:w-3/5 rounded-xl lg:rounded-r-xl lg:rounded-none bg-white text-[#0061A2] px-4 gap-4 py-8">
            <img className="w-24" src={logo} alt="Facial Pass logo" />
            <h3 className="text-[#0061A2] font-bold text-2xl">Welcome Back</h3>
            <p className="text-[#0061A2] text-xl text-center">
              Sign in to access your secure portal
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-4/5 mx-auto"
            >
              <ThemeProvider theme={theme}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: "#0061A2" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </ThemeProvider>

              <ThemeProvider theme={theme}>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="start"
                        >
                          {showPassword ? (
                            <VisibilityOff sx={{ color: "#0061A2" }} />
                          ) : (
                            <Visibility sx={{ color: "#0061A2" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </ThemeProvider>

              <button
                className="w-full bg-[#0061A2] hover:bg-[#1836B2] text-white py-2 rounded-xl"
                type="submit"
              >
                Login
              </button>
              <h3
                onClick={handleForgotPasswordOpen}
                className="text-[#0061A2] cursor-pointer text-center"
              >
                Forgot Password?
              </h3>
            </form>
            <ForgotPassword
              open={forgotPasswordOpen}
              onClose={handleForgotPasswordClose}
            />
          </div>
        </div>
      </div>
      {loader && <Loader />}
      <Toast
        severity={toastSeverity}
        open={toastOpen}
        message={toastMessage}
        onClose={handleToastClose}
      />
    </>
  );
};

export default AdminLogin;
