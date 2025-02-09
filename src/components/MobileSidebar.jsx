import React, { useEffect, useState} from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const MobileSidebar = ({ toggleSidebar, sidebarOpen }) => {
    const [shouldRender, setShouldRender] = useState(sidebarOpen);

    useEffect(() => {
        if (sidebarOpen) {
            setShouldRender(true); // Show sidebar immediately
        } else {
            setTimeout(() => setShouldRender(false), 500); // Wait for animation to finish
        }
    }, [sidebarOpen]);

    if (!shouldRender) return null;
    
    const handleClose = () => {
        toggleSidebar();
    }
    return (
        <div className={`mobile-sidebar ${sidebarOpen ? 'open' : 'close'}`}>
            <CloseOutlinedIcon onClick={handleClose} sx={{ color: "#3653A2" }} />
        </div>

    )
}

export default MobileSidebar