import React from "react";
import StudentSidebar from "../components/sidebars/StudentSidebar";
import AdminTopNav from "../components/topnav/AdminTopNav";
import AdminMobileNav from "../components/topnav/AdminMobileNav";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Switch,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

const AdminProfile = () => {
  const { admin, theme, students = [] } = useOutletContext();
  console.log("Admin Data:", admin);

  const profileData = {
    email: `${admin.admin.email}`,
    fullname: `${admin.admin.firstname} ${admin.admin.lastname}`,
    office: `${admin.admin.office}`,
    staff_id: `${admin.admin.staff_id}`,
    department: "Computer Science",
    phone: "+2349064048598",
    address: "131 Zeeks Avenue, Orlando, Florida, United States"
  };

  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-100 text-[#0061A2]">
      <StudentSidebar />
      <div className="flex flex-col lg:ml-[20%] w-full px-6 py-4">
        <AdminMobileNav theme={theme} admin={admin} students={students} />
        <AdminTopNav theme={theme} admin={admin} students={students} />

        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h4"
            sx={{ mb: 4, fontWeight: "bold", color: "#0061A2" }}
          >
            Profile
          </Typography>

          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#0061A2" }}
            >
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
                  value={profileData.fullname}
                  fullWidth
                  sx={{ mb: 2 }}
                  disabled
                />
                <TextField
                  label="Staff ID"
                  value={profileData.staff_id}
                  fullWidth
                  sx={{ mb: 2 }}
                  disabled
                />
                <TextField
                  label="University/Institution Name"
                  value="Babcock University"
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
                  label="Office"
                  value={profileData.office}
                  fullWidth
                  sx={{ mb: 2 }}
                  disabled
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#0061A2" }}
            >
              Contact Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon sx={{ color: "#0061A2" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Email Address"
                  secondary={profileData.email}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon sx={{ color: "#0061A2" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Phone Number"
                  secondary={profileData.phone}
                />
              </ListItem>
              <ListItem>
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

        </Box>
      </div>
    </div>
  );
};

export default AdminProfile;
