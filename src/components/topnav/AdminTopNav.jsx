import React, { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment, ThemeProvider } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const AdminTopNav = ({ theme, admin }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex items-center w-full lg:w-4/5 rounded-3xl">
        <ThemeProvider theme={theme}>
          <TextField
            fullWidth
            className="flex rounded-3xl bg-white items-center"
            variant="outlined"
            placeholder="Search for course, exam or date"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#0061A2" }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </ThemeProvider>
      </div>

      <div className="hidden lg:flex flex-row items-center justify-end gap-4 w-1/2">
        <div className="border h-10 w-10 p-2 rounded-[50%] flex items-center justify-center">
          <NotificationsIcon
            sx={{ height: "24px", width: "24px", cursor: "pointer" }}
          />
        </div>
        <div className="w-0.5 bg-[#0061A2] h-10"></div>
        <Avatar
          alt="Profile-photo"
          src={admin.admin.facial_image}
          className="flex items-center justify-center border p-2 rounded-[50%]"
          sx={{ backgroundColor: "#0061A2", color: "white" }}
        >
          {admin.admin.firstname ? admin.admin.firstname.charAt(0) : "E"}{" "}
          {/* Display the first letter of the admin's name */}
        </Avatar>
        <h1 className="text-xl font-bold leading-10">Prof. {`${admin.admin.firstname} ${admin.admin.lastname}`}</h1>
      </div>
    </div>
  );
};

export default AdminTopNav;