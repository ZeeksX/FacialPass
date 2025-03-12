import { useState, useEffect } from "react"; // Import useEffect
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
import signupImage from "../assets/login-image.jpg";
import logo from "../assets/logo.svg";
import Loader from "../components/Loader";

const AdminSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const [loader, setLoader] = useState("");
  const [office, setOffice] = useState('');
  const [staffId, setStaffId] = useState(""); // State for staff_id

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

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickConfirmShowPassword = () => setConfirmShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setToastMessage("Passwords do not match.");
      setToastSeverity("error");
      setToastOpen(true);
      return;
    }

    try {
      const res = await fetch("https://facialpass-backend.onrender.com/api/admins/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, office, email, staff_id: staffId, password, role: "admin" }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      if (res.ok) {
        setUser({ id: data.admin.id, email: data.admin.email, role: data.admin.role });
        setLoader(true);

        // Ensure success toast message is set correctly
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
      console.log(error)
      setToastSeverity("error");
      setToastMessage("An error occurred. Please try again.");
      setToastOpen(true);
      setLoader(false);
    }
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

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

  return (
    <>
      <div className="flex flex-col overflow-hidden items-center lg:justify-center justify-center gap-2 lg:gap-0 p-4 w-full min-h-screen bg-linear-to-b from-white to-[#0061A2] ">
        <div className="flex flex-row lg:w-[70%] lg:h-[94vh]">
          <div
            className="md:w-1/2 hidden md:flex bg-cover bg-center object-fill rounded-l-xl"
            style={{ backgroundImage: `url(${signupImage})` }}
          >
          </div>
          <div className="signup flex flex-col w-full lg:w-4/5 rounded-xl md:rounded-r-xl md:rounded-none bg-[white] text-[#0061A2]  px-2 lg:px-3 gap-2 py-4">
            <div className="flex flex-col justify-center items-center gap-1">
              <div className="flex flex-col justify-center items-center">
                <img className="w-16" src={logo} alt="Facial Pass logo" />
              </div>
              <h3 className="text-[#0061A2] font-bold text-2xl">Create Your Account</h3>
              <p className="text-[#0061A2] text-xl text-center">Already have an account?
                <Link className="ml-2 italic underline" to="/admin/login">Sign In</Link>
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-start justify-center lg:w-4/5 w-4/5 mx-auto">
              <div className="flex flex-wrap justify-between flex-row w-full gap-2">
                <ThemeProvider theme={theme}>
                  <TextField
                    className="w-[49%] max-md:w-full lg:w-[48%]"
                    variant="outlined"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(event) => setFirstname(event.target.value)}
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
                    value={lastname}
                    onChange={(event) => setLastname(event.target.value)}
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
                    value={staffId} // Display the staff_id here
                    disabled // Disable the input field
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
                    value={office}
                    onChange={(event) => setOffice(event.target.value)}
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
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
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

              <ThemeProvider theme={theme}>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    id="outlined-adornment-confirm-password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    type={confirmShowPassword ? "text" : "password"}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          aria-label={confirmShowPassword ? "Hide password" : "Show password"}
                          onClick={handleClickConfirmShowPassword}
                          onMouseDown={handleMouseDownPassword}
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
      <Toast severity={toastSeverity} open={toastOpen} message={toastMessage} onClose={handleToastClose} />
      {loader && <Loader />}
    </>
  );
};

export default AdminSignup;