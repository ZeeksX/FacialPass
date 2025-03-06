import React from "react";
import StudentSidebar from "../components/sidebars/StudentSidebar";
import TopNav from "../components/topnav/TopNav";
import MobileNav from "../components/topnav/MobileNav";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Face as FaceIcon,
  Edit as EditIcon,
  Lock as LockIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";

const Profile = () => {
  const { student, theme } = useOutletContext();

  // Mock data for the profile
  const profileData = {
    fullName: "John Doe",
    studentId: "123456",
    university: "University of Example",
    department: "Computer Science",
    level: "Year 3",
    email: "john.doe@example.com",
    phone: "+123 456 7890",
    address: "123 Main St, Example City",
    facialScanPreview: "https://via.placeholder.com/150", // Placeholder image
    lastAuthenticationDate: "2023-10-01",
    lastAuthenticationStatus: "Success",
  };

  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-100 text-[#0061A2]">
      <StudentSidebar />
      <div className="flex flex-col lg:ml-[20%] w-full px-6 py-4">
        <MobileNav theme={theme} student={student} />
        <TopNav theme={theme} student={student} />

        {/* Main Content */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
            Profile
          </Typography>

          {/* 1️⃣ Basic Information */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Basic Information
            </Typography>
            <Grid container spacing={3}>
              <Grid xs={12} md={3}>
                <Avatar
                  src={profileData.facialScanPreview}
                  sx={{ width: 150, height: 150, mx: "auto" }}
                />
              </Grid>
              <Grid xs={12} md={9}>
                <TextField
                  label="Full Name"
                  value={profileData.fullName}
                  fullWidth
                  sx={{ mb: 2 }}
                  disabled
                />
                <TextField
                  label="Student ID"
                  value={profileData.studentId}
                  fullWidth
                  sx={{ mb: 2 }}
                  disabled
                />
                <TextField
                  label="University/Institution Name"
                  value={profileData.university}
                  fullWidth
                  sx={{ mb: 2 }}
                  disabled
                />
                <TextField
                  label="Department & Faculty"
                  value={profileData.department}
                  fullWidth
                  sx={{ mb: 2 }}
                  disabled
                />
                <TextField
                  label="Level/Year of Study"
                  value={profileData.level}
                  fullWidth
                  sx={{ mb: 2 }}
                  disabled
                />
              </Grid>
            </Grid>
          </Paper>

          {/* 2️⃣ Contact Information */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Contact Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary="Email Address" secondary={profileData.email} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary="Phone Number" secondary={profileData.phone} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home Address" secondary={profileData.address} />
              </ListItem>
            </List>
          </Paper>

          {/* 4️⃣ Facial Authentication Details */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Facial Authentication Details
            </Typography>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <Avatar
                  src={profileData.facialScanPreview}
                  sx={{ width: 150, height: 150, mx: "auto" }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Last Authentication Date:</strong> {profileData.lastAuthenticationDate}
                </Typography>
                <Typography variant="body1">
                  <strong>Status:</strong> {profileData.lastAuthenticationStatus}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* 6️⃣ Settings & Actions */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Settings & Actions
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
                <Button variant="outlined">Edit</Button>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
                <Button variant="outlined">Change</Button>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FaceIcon />
                </ListItemIcon>
                <ListItemText primary="Update Facial Scan" />
                <Button variant="outlined" disabled>
                  Request Update
                </Button>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Notification Preferences" />
                <Switch defaultChecked />
              </ListItem>
            </List>
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default Profile;
