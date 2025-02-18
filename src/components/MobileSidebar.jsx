import React, { useEffect, useState} from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const MobileSidebar = ({ toggleSidebar, sidebarOpen }) => {
    const [shouldRender, setShouldRender] = useState(sidebarOpen);

    useEffect(() => {
        if (sidebarOpen) {
            setShouldRender(true); 
        } else {
            setTimeout(() => setShouldRender(false), 500); 
        }
    }, [sidebarOpen]);

    if (!shouldRender) return null;
    
    const handleClose = () => {
        toggleSidebar();
    }
    return (
        <div className={`mobile-sidebar ${sidebarOpen ? 'open' : 'close'}`}>
            <CloseOutlinedIcon onClick={handleClose} sx={{ color: "#0061A2" }} />
        </div>

    )
}

export default MobileSidebar