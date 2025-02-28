import React, { useEffect, useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputAdornment, ThemeProvider } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const TopNav = ({ theme, student }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex items-center w-full md:w-4/5 rounded-3xl">
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

      <div className="hidden md:flex flex-row items-center justify-end gap-4 w-1/2">
        <div className="border h-10 w-10 p-2 rounded-[50%] flex items-center justify-center">
          <NotificationsIcon sx={{ height: "24px", width: "24px", cursor: "pointer" }} />
        </div>
        <div className="w-0.5 bg-[#0061A2] h-10"></div>
        <Avatar
          alt="Profile-photo"
          src={student.student.facial_image}
          className="flex items-center justify-center border p-2 rounded-[50%]"
          sx={{ backgroundColor: "#0061A2", color: "white" }}
        >
          {student.student.firstname ? student.student.firstname.charAt(0) : "E"} {/* Display the first letter of the student's name */}
        </Avatar>
        <h1 className="text-xl font-bold leading-10">{`${student.student.firstname} ${student.student.lastname}`}</h1>
      </div>
    </div>
  )
}

export default TopNav