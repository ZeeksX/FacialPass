import React, { useState } from "react";
import { useAuth } from "../../components/Auth"; // Import the useAuth hook
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import Loader from "../Loader";

const LogoutModal = ({ open, onClose }) => {
    const { logout } = useAuth(); // Get the logout function from AuthContext
    const [isLoading, setIsLoading] = useState(false); // State to control the loader

    const handleLogout = () => {
        setIsLoading(true); // Show the loader
        logout(); // Call the logout function
        onClose(); // Close the modal
        console.log(isLoading)
    };

    return (
        <>
            {/* Render the Loader if isLoading is true */}
            {isLoading && <Loader />}

            {/* Render the Logout Modal */}
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to log out?</p>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={onClose}
                        className="w-4/5 cursor-pointer flex items-center justify-center h-11 font-semibold rounded-sm text-[#0061A2] hover:bg-[#1836B2] hover:text-white py-1 px-3 border border-transparent text-base transition-all focus:outline-none focus:ring-2"
                        type="submit"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-4/5 cursor-pointer flex items-center justify-center h-11 font-semibold rounded-sm text-[#0061A2] hover:bg-[#1836B2] hover:text-white py-1 px-3 border border-transparent text-base transition-all focus:outline-none focus:ring-2"
                        type="submit"
                    >
                        Logout
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default LogoutModal;