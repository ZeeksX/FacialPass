import React, { useState } from "react";
import {
    Box,
    Button,
    Modal,
    Typography,
    TextField,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Toast from "../Toast"; // Import the Toast component

const AdminChangePasswordModal = ({ open, handleClose }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

    const handleChangePassword = async () => {
        try {
            setToast({ open: false, message: "", severity: "info" });

            const response = await fetch(
                "https://facialpass-backend.onrender.com/api/admins/change-password",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ currentPassword, newPassword }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error changing password");
            }

            setToast({ open: true, message: data.message, severity: "success" });
            setCurrentPassword("");
            setNewPassword("");
            handleClose();
        } catch (err) {
            setToast({ open: true, message: err.message, severity: "error" });
        }
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        width: 400,
                        bgcolor: "white",
                        p: 3,
                        borderRadius: 2,
                        boxShadow: 24,
                        mx: "auto",
                        mt: "20vh",
                        position: "relative",
                    }}
                >
                    <IconButton
                        onClick={handleClose}
                        sx={{ position: "absolute", top: 8, right: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Change Password
                    </Typography>

                    <TextField
                        fullWidth
                        label="Current Password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <Button variant="contained" fullWidth onClick={handleChangePassword}>
                        Update Password
                    </Button>
                </Box>
            </Modal>

            {/* Toast for displaying messages */}
            <Toast
                open={toast.open}
                message={toast.message}
                severity={toast.severity}
                onClose={() => setToast({ ...toast, open: false })}
            />
        </>
    );
};

export default AdminChangePasswordModal;
