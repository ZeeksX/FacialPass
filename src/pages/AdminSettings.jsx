import React, { useState } from "react";
import AdminSidebar from "../components/sidebars/AdminSidebar";
import AdminTopNav from "../components/topnav/AdminTopNav";
import AdminMobileNav from "../components/topnav/AdminMobileNav";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Button,
  Divider,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Edit as EditIcon,
  Lock as LockIcon,
  Notifications as NotificationsIcon,
  Face as FaceIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  ExitToApp as ExitToAppIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import ChangePasswordModal from "../components/modals/AdminChangePassword";

const AdminSettings = () => {
  const {
    admin = {},
    theme = "light",
    students = [],
  } = useOutletContext() || {};

  // ✅ Fix for missing state variables
  const [openModal, setOpenModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-100 text-[#0061A2]">
      <AdminSidebar />
      <div className="flex flex-col lg:ml-[20%] w-full px-6 py-4">
        <AdminMobileNav theme={theme} admin={admin} students={students} />
        <AdminTopNav theme={theme} admin={admin} students={students} />

        {/* Main Content */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h4"
            sx={{ mb: 4, fontWeight: "bold", color: "#0061A2" }}
          >
            Settings
          </Typography>

          {/* 1️⃣ Account Settings */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#0061A2" }}
            >
              Account Settings
            </Typography>
            <List>
              <ListItem sx={{ color: "#0061A2" }}>
                <ListItemIcon>
                  <EditIcon sx={{ color: "#0061A2" }} />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
                <Button variant="outlined">Edit</Button>
              </ListItem>
              <ListItem sx={{ color: "#0061A2" }}>
                <ListItemIcon>
                  <LockIcon sx={{ color: "#0061A2" }} />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
                <Button variant="outlined" onClick={() => setOpenModal(true)}>
                  Change
                </Button>
              </ListItem>
            </List>
          </Paper>

          {/* 2️⃣ Exam Authentication Preferences */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#0061A2" }}
            >
              Exam Authentication Preferences
            </Typography>
            <List>
              <ListItem sx={{ color: "#0061A2" }}>
                <ListItemIcon>
                  <FaceIcon sx={{ color: "#0061A2" }} />
                </ListItemIcon>
                <ListItemText primary="Update Facial Recognition" />
                <Button variant="outlined" disabled>
                  Request Update
                </Button>
              </ListItem>
              <ListItem sx={{ color: "#0061A2" }}>
                <ListItemIcon>
                  <NotificationsIcon sx={{ color: "#0061A2" }} />
                </ListItemIcon>
                <ListItemText primary="Exam Notifications" />
                <Switch defaultChecked />
              </ListItem>
            </List>
          </Paper>

          {/* 3️⃣ Security & Privacy */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#0061A2" }}
            >
              Security & Privacy
            </Typography>
            <List>
              <ListItem sx={{ color: "#0061A2" }}>
                <ListItemIcon>
                  <SecurityIcon sx={{ color: "#0061A2" }} />
                </ListItemIcon>
                <ListItemText primary="Manage Trusted Devices" />
                <Button variant="outlined">Manage</Button>
              </ListItem>
              <ListItem sx={{ color: "#0061A2" }}>
                <ListItemIcon>
                  <ExitToAppIcon sx={{ color: "#0061A2" }} />
                </ListItemIcon>
                <ListItemText primary="Log Out of All Devices" />
                <Button variant="outlined">Log Out</Button>
              </ListItem>
              <Divider />
              <ListItem sx={{ color: "red" }}>
                <ListItemIcon>
                  <DeleteIcon sx={{ color: "red" }} />
                </ListItemIcon>
                <ListItemText primary="Delete Account" />
                <Button variant="outlined" color="error">
                  Delete
                </Button>
              </ListItem>
            </List>
          </Paper>

          {/* 4️⃣ System Preferences */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#0061A2" }}
            >
              System Preferences
            </Typography>
            <FormControl fullWidth>
              <Select
                id="selectedTheme"
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
              </Select>
            </FormControl>
            {/* Language Selection */}
            <FormControl fullWidth>
              <label
                className="text-[#0061A2] font-semibold text-base mb-2"
                htmlFor="selectedTheme"
              >
                Language{" "}
              </label>
              <Select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                startAdornment={
                  <LanguageIcon sx={{ mr: 1, color: "#0061A2" }} />
                }
              >
                <MenuItem value="English">English US</MenuItem>
                <MenuItem value="French">English UK</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Box>

        <ChangePasswordModal
          open={openModal}
          setOpenModal={setOpenModal}
          handleClose={() => setOpenModal(false)}
        />
      </div>
    </div>
  );
};

export default AdminSettings;
