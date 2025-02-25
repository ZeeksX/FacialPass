import React from "react";
import { Snackbar, Alert } from "@mui/material";

const Toast = ({ open, message, onClose, severity = "info" }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={1000}
            onClose={onClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                sx={{ width: "100%" }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;