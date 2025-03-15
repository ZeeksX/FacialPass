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

  const getLastAuthenticationDate = (takenCourses) => {
    if (!takenCourses || takenCourses.length === 0) return "Not Available";

    const authDates = takenCourses
      .map((course) => new Date(`${course.date} ${course.time}`))
      .filter((date) => !isNaN(date));

    if (authDates.length === 0) return "Not Available";

    const latestDate = new Date(Math.max(...authDates));
    return latestDate.toLocaleString(); // Format date & time
  };

  // Get the most recent authentication course
  const getLatestAuthCourse = (takenCourses) => {
    if (!takenCourses || takenCourses.length === 0) return null;

    // Sort courses by date and time (most recent first)
    const sortedCourses = [...takenCourses].sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB - dateA; // Descending order
    });

    return sortedCourses[0];
  };

  // Get authentication status for display
  const getAuthenticationStatus = (takenCourses) => {
    if (!takenCourses || takenCourses.length === 0) return "Not Authenticated";
    return "Success";
  };

  const latestAuthCourse = getLatestAuthCourse(student.takenCourses);

  const profileData = {
    fullName: `${student.student.firstname} ${student.student.lastname}`,
    studentId: `${student.student.matricNumber}`,
    university: "Babcock University",
    department: `${student.student.department}`,
    level: "400",
    email: `${student.student.email}`,
    phone: "+123 456 7890",
    address: "123 Main St, Example City",
    registrationImage: student.student.facialImage, // This is already in base64 format from getStudentDetails
    lastAuthenticationImage: latestAuthCourse?.facial_image || null, // Use the image directly from takenCourses
    lastAuthenticationDate: getLastAuthenticationDate(student.takenCourses),
    lastAuthenticationStatus: getAuthenticationStatus(student.takenCourses),
    latestCourse: latestAuthCourse ? latestAuthCourse.courseName : "None"
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
                  src={profileData.registrationImage}
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
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    <strong className="text-[#0061A2]">Registration Image</strong>
                  </Typography>
                  <Avatar
                    src={profileData.registrationImage}
                    sx={{ width: 150, height: 150, mx: "auto", mb: 2 }}
                  />
                </Box>
              </Grid>
              <Grid xs={12} md={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    <strong className="text-[#0061A2]">Latest Authentication Image</strong>
                  </Typography>
                  <Avatar
                    src={profileData.lastAuthenticationImage}
                    sx={{ width: 150, height: 150, mx: "auto", mb: 2 }}
                  />
                  {!profileData.lastAuthenticationImage && (
                    <Typography variant="body2" color="text.secondary">
                      No authentication image available
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid xs={12}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong className="text-[#0061A2]">Last Authentication Date:</strong> {profileData.lastAuthenticationDate}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong className="text-[#0061A2]">Status:</strong> {profileData.lastAuthenticationStatus}
                </Typography>
                {latestAuthCourse && (
                  <Typography variant="body1">
                    <strong className="text-[#0061A2]">Last Authenticated Course:</strong> {profileData.latestCourse}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default Profile;