import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../components/Auth";
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, InputAdornment, FormControl, OutlinedInput, IconButton, ThemeProvider } from "@mui/material";
import ForgotPassword from '../components/ForgotPassword';
import Toast from '../components/Toast';
import { createTheme } from "@mui/material";
import loginImage from "../assets/login-image.jpg"
import logo from "../assets/logo.svg"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const auth = useAuth();
  const { setUser } = auth;
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/students/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("API Response:", data);
      console.log("User email: ", data.user)

      if (res.ok) {
        // Set the user in the Auth context
        const { token, user } = data;

        // Store the token in localStorage
        localStorage.setItem("token", token);

        // Set the user in the Auth context
        setUser({ id: user.id, email: user.email, role: user.role, token });

        setToastMessage(data.message); // Set the toast message
        setToastOpen(true); // Show the toast
        navigate("/dashboard");
      } else {
        console.error("Login failed:", data.message || res.statusText);
        setToastMessage(data.message || "Login failed. Please try again.");
        setToastOpen(true); // Show the toast
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: "#0061A2", // Text color
            "& fieldset": {
              borderColor: "#0061A2", // Default outline color
            },
            "&:hover fieldset": {
              borderColor: "#0061A2", // Hover outline color
            },
            "&.Mui-focused fieldset": {
              borderColor: "#0061A2", // Focus outline color
            },
          },
          input: {
            color: "#0061A2", // Input text color
            "&::placeholder": {
              color: "#0061A2", // Placeholder color
              opacity: 0.5, // Ensure full visibility
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: "#0061A2", // Text color for InputBase components (like TextField)
          },
          input: {
            color: "#0061A2", // Input text color
            "&::placeholder": {
              color: "#0061A2", // Placeholder color
              opacity: 1,
            },
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            color: "#0061A2", // Ensures adornment icons match the theme
          },
        },
      },
    },
  });

  return (
    <>
      <div className="flex flex-col items-center lg:justify-center justify-center gap-2 lg:gap-0 p-4 w-full min-h-screen bg-linear-to-b from-white to-[#0061A2] ">
        <div className="flex flex-row lg:w-3/5 lg:h-[90vh]">
          <div
            className="md:w-1/2 hidden md:flex bg-cover bg-center object-fill rounded-l-xl"
            style={{ backgroundImage: `url(${loginImage})` }}
          ></div>
          <div className="login flex flex-col w-full lg:w-3/5 rounded-xl md:rounded-r-xl md:rounded-none bg-[white] text-[#0061A2]  px-4 lg:px-3 gap-4 py-8">
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="flex flex-col justify-center items-center">
                <img className="w-24" src={logo} alt="Facial Pass logo" />
              </div>

              <h3 className="text-[#0061A2]  font-bold text-2xl">Welcome Back</h3>
              <p className="text-[#0061A2] text-xl text-center">Sign in to access your secure portal</p>
              <h3 className="w-full text-center text-xl">No account? <Link className="underline italic" to="/signup">Sign up here</Link></h3>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-start justify-center lg:w-4/5 w-4/5 mx-auto">
              <ThemeProvider theme={theme}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: "#0061A2" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </ThemeProvider>

              <ThemeProvider theme={theme}>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type={showPassword ? "text" : "password"}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="start"
                        >
                          {showPassword ? <VisibilityOff sx={{ color: "#0061A2" }} /> : <Visibility sx={{ color: "#0061A2" }} />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </ThemeProvider>

              <div className="flex flex-col justify-between gap-4 lg:gap-0 items-center w-full">
                <button
                  className="w-full cursor-pointer flex items-center justify-center h-11 font-semibold rounded-4xl bg-[#0061A2] hover:bg-[#1836B2] text-white py-1 px-3 border border-transparent text-base transition-all focus:outline-none focus:ring-2"
                  type="submit"
                >
                  Login
                </button>
                <h3 onClick={handleForgotPasswordOpen} className="mt-2 text-[#0061A2] hover:text-gray-600 text-center cursor-pointer">Forgot Password?</h3>
              </div>

            </form>
            <ForgotPassword open={forgotPasswordOpen} onClose={handleForgotPasswordClose} />
          </div>
        </div>

      </div>
      <Toast open={toastOpen} message={toastMessage} onClose={handleToastClose} /> {/* Add the Toast component here */}
    </>
  );
};

export default Login;