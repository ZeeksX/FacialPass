import { useState, useCallback, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../components/Auth";
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { TextField, InputAdornment, FormControl, OutlinedInput, IconButton, ThemeProvider, createTheme, Select, MenuItem, InputLabel, CircularProgress } from "@mui/material";
import Toast from '../components/Toast';
import signupImage from "/assets/login-image.jpg";
import logo from "/assets/logo.svg";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#0061A2",
          "& fieldset": {
            borderColor: "#0061A2",
          },
          "&:hover fieldset": {
            borderColor: "#0061A2",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#0061A2",
          },
          "&.Mui-error fieldset": {
            borderColor: "#d32f2f",
          },
          height: "2.75rem",
        },
        input: {
          color: "#0061A2",
          padding: "8.5px 12px",
          "&::placeholder": {
            color: "#0061A2",
            opacity: 0.5,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#0061A2",
          height: "2.75rem",
        },
        input: {
          color: "#0061A2",
          padding: "8.5px 12px",
          "&::placeholder": {
            color: "#0061A2",
            opacity: 1,
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: "#0061A2",
        },
      },
    },
  },
});

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    matricNum: "",
    department: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [departments, setDepartments] = useState([]); // State to store departments
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(true); // Loading state for departments

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    matricNum: "",
    department: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const auth = useAuth();
  const { setUser } = auth;
  const navigate = useNavigate();

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoadingDepartments(true);
      setToastMessage("Loading departments...");
      setToastOpen(true);
      
      try {
        const res = await fetch("https://facialpass-backend-production.up.railway.app/api/students/get-departments");
        const data = await res.json();
        if (res.ok) {
          setDepartments(data.data);
          setToastMessage("Departments loaded successfully");
        } else {
          console.error("Failed to fetch departments:", data.message || res.statusText);
          setToastMessage("Failed to load departments. Please refresh the page.");
        }
      } catch (error) {
        console.error("Error fetching departments:", error.message);
        setToastMessage("Error loading departments. Please check your connection.");
      } finally {
        setIsLoadingDepartments(false);
        // Close the toast after a delay
        setTimeout(() => {
          setToastOpen(false);
        }, 3000);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    // Validate required fields
    Object.keys(formData).forEach(field => {
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

    // Matric number validation (2 digits/slash/4 digits)
    if (formData.matricNum && !/^\d{2}\/\d{4}$/.test(formData.matricNum)) {
      newErrors.matricNum = "Matric number must be in format: 00/0000";
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

  const handleClickShowPassword = useCallback(() => setShowPassword(prev => !prev), []);
  const handleClickConfirmShowPassword = useCallback(() => setConfirmShowPassword(prev => !prev), []);
  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const res = await fetch("https://facialpass-backend-production.up.railway.app/api/students/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          matricNum: formData.matricNum,
          department: formData.department,
          email: formData.email,
          password: formData.password,
          role: "student",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser({ id: data.user.id, email: data.user.email, role: data.user.role });
        setToastMessage(data.message);
        setToastOpen(true);
      } else {
        console.error("Signup failed:", data.message || res.statusText);
        setToastMessage(data.message || "Signup failed. Please try again.");
        setToastOpen(true);
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      setToastMessage("An error occurred. Please try again.");
      setToastOpen(true);
    }
  }, [formData, validateForm, setUser]);

  const handleNext = useCallback(() => {
    if (validateForm()) {
      localStorage.setItem('userData', JSON.stringify({
        firstname: formData.firstname,
        lastname: formData.lastname,
        matricNum: formData.matricNum,
        department: formData.department,
        email: formData.email,
        password: formData.password,
      }));
      navigate("/onboarding");
    } else {
      setToastMessage("Please fix the errors before proceeding.");
      setToastOpen(true);
    }
  }, [formData, validateForm, navigate]);

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  return (
    <>
      <div className="flex flex-col overflow-hidden items-center lg:justify-center justify-center gap-2 lg:gap-0 p-4 w-full min-h-screen bg-linear-to-b from-white to-[#0061A2]">
        <div className="flex flex-row justify-center lg:w-[70%] lg:h-[94vh]">
          <div
            className="lg:w-1/2 hidden md:flex bg-cover bg-center object-fill rounded-l-xl"
            style={{ backgroundImage: `url(${signupImage})` }}
          ></div>
          <div className="signup flex flex-col w-full md:w-[70%] lg:w-4/5 rounded-xl lg:rounded-r-xl lg:rounded-none bg-[white] text-[#0061A2] px-2 lg:px-3 gap-2 py-4 pb-6">
            <div className="flex flex-col justify-center items-center gap-1">
              <div className="flex flex-col justify-center items-center">
                <img className="w-16" src={logo} alt="Facial Pass logo" />
              </div>
              <h3 className="text-[#0061A2] font-bold text-2xl">
                Create Your Account
              </h3>
              <p className="text-[#0061A2] text-xl text-center">
                Already have an account?
                <Link className="ml-2 italic underline" to="/login">
                  Sign In
                </Link>
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 items-start justify-center lg:w-4/5 w-4/5 mx-auto"
            >
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
                    placeholder="Matric Number (00/0000)"
                    name="matricNum"
                    value={formData.matricNum}
                    onChange={handleChange}
                    error={!!errors.matricNum}
                    helperText={errors.matricNum}
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
                  <FormControl
                    className="w-[49%] max-md:w-full lg:w-[48%]"
                    error={!!errors.department}
                    disabled={isLoadingDepartments} 
                  >
                    <InputLabel id="department-label">
                      {isLoadingDepartments ? "Loading Departments..." : "Department"}
                    </InputLabel>
                    <Select
                      labelId="department-label"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      label={isLoadingDepartments ? "Loading Departments..." : "Department"}
                      startAdornment={
                        <InputAdornment position="start">
                          {isLoadingDepartments ? (
                            <CircularProgress size={20} sx={{ color: "#0061A2", opacity: 0.7 }} />
                          ) : (
                            <LocationCityIcon sx={{ color: "#0061A2" }} />
                          )}
                        </InputAdornment>
                      }
                    >
                      {departments.map((dept) => (
                        <MenuItem key={dept.id} value={dept.name}>
                          {dept.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                  </FormControl>
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
                <FormControl variant="outlined" fullWidth error={!!errors.password}>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          aria-label={showPassword ? "Hide password" : "Show password"}
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
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </FormControl>
              </ThemeProvider>

              <ThemeProvider theme={theme}>
                <FormControl variant="outlined" fullWidth error={!!errors.confirmPassword}>
                  <OutlinedInput
                    id="outlined-adornment-confirm-password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    type={confirmShowPassword ? "text" : "password"}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          aria-label={confirmShowPassword ? "Hide password" : "Show password"}
                          onClick={handleClickConfirmShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="start"
                        >
                          {confirmShowPassword ? (
                            <VisibilityOff sx={{ color: "#0061A2" }} />
                          ) : (
                            <Visibility sx={{ color: "#0061A2" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </FormControl>
              </ThemeProvider>

              <div className="flex flex-row justify-between gap-4 lg:gap-0 items-center w-full">
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full flex cursor-pointer items-center justify-center h-11 font-semibold rounded-4xl bg-[#0061A2] hover:bg-[#1836B2] text-white py-1 px-3 border border-transparent text-base transition-all focus:outline-none focus:ring-2"
                  disabled={isLoadingDepartments}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div >
      </div >
      <Toast
        open={toastOpen}
        message={toastMessage}
        onClose={handleToastClose}
      />
    </>
  );
};

export default Signup;