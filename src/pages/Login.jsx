import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../components/Auth";
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, InputAdornment, FormControl, OutlinedInput, IconButton, ThemeProvider, createTheme } from "@mui/material";
import ForgotPassword from '../components/ForgotPassword';
import Toast from '../components/Toast';
import Loader from "../components/Loader";
import loginImage from "/assets/login-image.jpg";
import logo from "/assets/logo.svg";

// Move theme creation outside component to prevent recreation on every render
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
    MuiInputBase: {
      styleOverrides: {
        root: { color: "#0061A2" },
        input: {
          color: "#0061A2",
          "&::placeholder": { color: "#0061A2", opacity: 1 },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: { color: "#0061A2" },
      },
    },
  },
});

// API endpoint as a constant
const API_URL = "https://facialpass-backend.onrender.com/api/students/login";

const Login = () => {
  const [formData, setFormData] = useState({
    matricNumber: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        const { token, ...user } = data;

        // Store token and set user in context
        localStorage.setItem("token", token);
        login(token, user.student.role, user.student);

        setToast({
          open: true,
          severity: "success",
          message: data.message,
        });

        setTimeout(() => navigate("/studentDashboard"), 2000);
      } else {
        setToast({
          open: true,
          severity: "error",
          message: data.message || "Login failed. Please try again.",
        });
        setIsLoading(false);
      }
    } catch (error) {
      setToast({
        open: true,
        severity: "error",
        message: "An error occurred. Please try again.",
      });
      setIsLoading(false);
    }
  };

  const togglePassword = () => setShowPassword(prev => !prev);

  return (
    <>
      <div className="overflow-hidden flex flex-col items-center justify-center gap-2 lg:gap-0 p-4 w-full min-h-screen bg-linear-to-b from-white to-[#0061A2]">
        <div className="flex flex-row justify-center w-[92vw] max-lg:max-w-lg md:w-4/5 lg:w-[70%] lg:h-[90vh]">
          {/* Login image - hidden on mobile */}
          <div
            className="md:w-1/2 hidden lg:flex bg-cover bg-center object-fill rounded-l-xl"
            style={{ backgroundImage: `url(${loginImage})` }}
          ></div>

          {/* Login form */}
          <div className="login flex flex-col w-full justify-center items-center lg:w-3/5 rounded-xl lg:rounded-r-xl lg:rounded-none bg-white text-[#0061A2] px-4 lg:px-3 gap-4 py-8">
            {/* Header */}
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="flex flex-col justify-center items-center">
                <img className="w-24" src={logo} alt="Facial Pass logo" />
              </div>
              <h3 className="text-[#0061A2] inter font-bold text-2xl">Welcome Back</h3>
              <p className="text-[#0061A2] text-xl text-center">Sign in to access your secure portal</p>
              <h3 className="w-full text-center text-xl">
                No account? <Link className="underline italic" to="/signup">Sign up here</Link>
              </h3>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-start justify-center lg:w-4/5 w-4/5 mx-auto">
              <ThemeProvider theme={theme}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Matric Number"
                  name="matricNumber"
                  value={formData.matricNumber}
                  onChange={handleChange}
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

                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          onClick={togglePassword}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="start"
                        >
                          {showPassword ?
                            <VisibilityOff sx={{ color: "#0061A2" }} /> :
                            <Visibility sx={{ color: "#0061A2" }} />}
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
                <h3
                  onClick={() => setForgotPasswordOpen(true)}
                  className="mt-2 text-[#0061A2] hover:text-gray-600 text-center cursor-pointer"
                >
                  Forgot Password?
                </h3>
              </div>
            </form>

            {/* Modals and notifications */}
            <ForgotPassword
              open={forgotPasswordOpen}
              onClose={() => setForgotPasswordOpen(false)}
            />
          </div>
        </div>
      </div>

      {isLoading && <Loader />}

      <Toast
        severity={toast.severity}
        open={toast.open}
        message={toast.message}
        onClose={() => setToast(prev => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default Login;