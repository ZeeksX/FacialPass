import React from 'react';
import TopNav from '../components/TopNav';
import HeroSection from '../components/HeroSection';
import About from '../components/About';
import MobileNavigation from '../components/MobileNavigation';
import { useMediaQuery } from '@mui/material';
import Footer from '../components/Footer';
import Faq from '../components/Faq';

const HomePage = ({ sidebarOpen, toggleSidebar }) => {
    const isMobile = useMediaQuery('(max-width:768px)');
    return (
        <>
            {isMobile ? <MobileNavigation toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} /> : <TopNav />}
            <HeroSection />
            <About />
            <Faq/>
            <Footer />
        </>
    );
}

export default HomePage;