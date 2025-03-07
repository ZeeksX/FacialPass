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
  console.log(student)

  const profileData = {
    fullName: `${student.student.firstname} ${student.student.lastname}`,
    studentId: `${student.student.matricNumber}`,
    university: "Babcock University",
    department: `${student.student.department}`,
    level: "400",
    email: `${student.student.email}`,
    phone: "+123 456 7890",
    address: "123 Main St, Example City",
    facialScanPreview: `${student.student.facialImage}`,// Placeholder image
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
          <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", color: "#0061A2" }}>
            Profile
          </Typography>

          {/* 1️⃣ Basic Information */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#0061A2" }}>
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
                  label="Matric Number"
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
                  value="400"
                  fullWidth
                  sx={{ mb: 2 }}
                  disabled
                />
              </Grid>
            </Grid>
          </Paper>

          {/* 2️⃣ Contact Information */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#0061A2" }}>
              Contact Information
            </Typography>
            <List sx={{ color: "#0061A2" }}>
              <ListItem sx={{ color: "#0061A2" }}>
                <ListItemIcon>
                  <EmailIcon sx={{ color: "#0061A2" }} />
                </ListItemIcon>
                <ListItemText primary="Email Address" secondary={profileData.email} sx={{ color: "#0061A2" }} />
              </ListItem>
              <ListItem sx={{ color: "#0061A2" }}>
                <ListItemIcon>
                  <PhoneIcon sx={{ color: "#0061A2" }} />
                </ListItemIcon>
                <ListItemText primary="Phone Number" secondary={profileData.phone} sx={{ color: "#0061A2" }} />
              </ListItem>
              <ListItem sx={{ color: "#0061A2" }}>
                <ListItemIcon>
                  <HomeIcon sx={{ color: "#0061A2" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Home Address"
                  secondary={profileData.address}
                />
              </ListItem>
            </List>
          </Paper>

          {/* 4️⃣ Facial Authentication Details */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#0061A2" }}>
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
                  <strong className="text-[#0061A2]">Last Authentication Date:</strong> {profileData.lastAuthenticationDate}
                </Typography>
                <Typography variant="body1">
                  <strong className="text-[#0061A2]">Status:</strong> {profileData.lastAuthenticationStatus}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

        </Box>
      </div>
    </div>
  );
};

export default Profile;
