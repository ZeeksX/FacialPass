import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../components/Auth";
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { TextField, InputAdornment, FormControl, OutlinedInput, IconButton, ThemeProvider } from "@mui/material";
import Toast from '../components/Toast';
import { createTheme } from "@mui/material";
import signupImage from "/assets/login-image.jpg";
import logo from "/assets/logo.svg";
import Loader from "../components/Loader";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    office: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [staffId, setStaffId] = useState(""); // State for staff_id
  const [errors, setErrors] = useState({}); // State for validation errors

  const { setUser } = useAuth();
  const navigate = useNavigate();

  // Fetch the next staff_id when the component mounts
  useEffect(() => {
    const fetchNextStaffId = async () => {
      try {
        const res = await fetch("https://facialpass-backend.onrender.com/api/admins/next-staff-id");
        const data = await res.json();
        if (res.ok) {
          setStaffId(data.nextStaffId);
        } else {
          console.error("Failed to fetch next staff ID:", data.message || res.statusText);
        }
      } catch (error) {
        console.error("Error fetching next staff ID:", error.message);
      }
    };

    fetchNextStaffId();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    // Validate required fields
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        isValid = false;
      }
    });

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Password match validation
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!validateForm()) {
      return;
    }

    try {
      const res = await fetch("https://facialpass-backend.onrender.com/api/admins/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, staff_id: staffId, role: "admin" }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser({ id: data.admin.id, email: data.admin.email, role: data.admin.role });
        setLoader(true);

        // Success toast message
        setToastSeverity("success");
        setToastMessage(data.message || "Signup successful! Redirecting...");
        setToastOpen(true);

        setTimeout(() => {
          navigate("/admin/login");
        }, 2000);
      } else {
        setLoader(false);
        setToastSeverity("error");
        setToastMessage(data.message || "Signup failed. Please try again.");
        setToastOpen(true);
      }
    } catch (error) {
      console.error(error);
      setToastSeverity("error");
      setToastMessage("An error occurred. Please try again.");
      setToastOpen(true);
      setLoader(false);
    }
  };

  // Handle toast close
  const handleToastClose = () => {
    setToastOpen(false);
  };

  // Toggle password visibility
  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setConfirmShowPassword((prev) => !prev);

  // Theme for MUI components
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: "#0061A2",
            "& fieldset": { borderColor: "#0061A2" },
            "&:hover fieldset": { borderColor: "#0061A2" },
            "&.Mui-focused fieldset": { borderColor: "#0061A2" },
            height: "2.75rem",
          },
          input: {
            color: "#0061A2",
            padding: "8.5px 12px",
            "&::placeholder": { color: "#0061A2", opacity: 0.5 },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: { color: "#0061A2", height: "2.75rem" },
          input: {
            color: "#0061A2",
            padding: "8.5px 12px",
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

  return (
    <>
      <div className="flex flex-col overflow-hidden items-center lg:justify-center justify-center gap-2 lg:gap-0 p-4 w-full min-h-screen bg-linear-to-b from-white to-[#0061A2]">
        <div className="flex flex-row lg:w-[70%] lg:h-[94vh]">
          {/* Login image - hidden on mobile */}
          <div
            className="md:w-1/2 hidden md:flex bg-cover bg-center object-fill rounded-l-xl"
            style={{ backgroundImage: `url(${signupImage})` }}
          ></div>

          {/* Signup form */}
          <div className="signup flex flex-col w-full lg:w-4/5 rounded-xl md:rounded-r-xl md:rounded-none bg-[white] text-[#0061A2] px-2 lg:px-3 gap-2 py-6">
            {/* Header */}
            <div className="flex flex-col justify-center items-center gap-1">
              <div className="flex flex-col justify-center items-center">
                <img className="w-16" src={logo} alt="Facial Pass logo" />
              </div>
              <h3 className="text-[#0061A2] font-bold text-2xl">Create Your Account</h3>
              <p className="text-[#0061A2] text-xl text-center">
                Already have an account?
                <Link className="ml-2 italic underline" to="/admin/login">Sign In</Link>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-start justify-center lg:w-4/5 w-4/5 mx-auto">
              <div className="flex flex-wrap justify-between flex-row w-full gap-2">
                <ThemeProvider theme={theme}>
                  <TextField
                    className="w-[49%] max-md:w-full lg:w-[48%]"
                    variant="outlined"
                    placeholder="First Name"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    error={!!errors.firstname}
                    helperText={errors.firstname}
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
                  <TextField
                    className="w-[49%] max-md:w-full lg:w-[48%]"
                    variant="outlined"
                    placeholder="Surname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    error={!!errors.lastname}
                    helperText={errors.lastname}
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
                  <TextField
                    className="w-[49%] max-md:w-full lg:w-[48%]"
                    variant="outlined"
                    placeholder="Staff ID"
                    value={staffId}
                    disabled
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon sx={{ color: "#0061A2" }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </ThemeProvider>

                <ThemeProvider theme={theme}>
                  <TextField
                    className="w-[49%] max-md:w-full lg:w-[48%]"
                    variant="outlined"
                    placeholder="Office"
                    name="office"
                    value={formData.office}
                    onChange={handleChange}
                    error={!!errors.office}
                    helperText={errors.office}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon sx={{ color: "#0061A2" }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </ThemeProvider>
              </div>

              <ThemeProvider theme={theme}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    error={!!errors.password}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          onClick={togglePassword}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="start"
                        >
                          {showPassword ? <VisibilityOff sx={{ color: "#0061A2" }} /> : <Visibility sx={{ color: "#0061A2" }} />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </ThemeProvider>

              <ThemeProvider theme={theme}>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    type={confirmShowPassword ? "text" : "password"}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          aria-label={confirmShowPassword ? "Hide password" : "Show password"}
                          onClick={toggleConfirmPassword}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="start"
                        >
                          {confirmShowPassword ? <VisibilityOff sx={{ color: "#0061A2" }} /> : <Visibility sx={{ color: "#0061A2" }} />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </ThemeProvider>

              <div className="flex flex-row justify-between gap-4 lg:gap-0 items-center w-full">
                <button
                  className="w-full h-11 font-semibold rounded-4xl bg-[#0061A2] hover:bg-[#1836B2] text-white py-1 px-3 border border-transparent text-base transition-all focus:outline-none focus:ring-2"
                  type="submit"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast and Loader */}
      <Toast severity={toastSeverity} open={toastOpen} message={toastMessage} onClose={handleToastClose} />
      {loader && <Loader />}
    </>
  );
};

export default AdminSignup;