import React from 'react';
import { Box } from '@mui/material';
import NavBar from '../components/Home/NavBar';
import HeroSection from '../components/Home/HeroSection';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import QuoteSection from '../components/Home/QuoteSection';
import FooterSection from '../components/Home/FooterSection';

const HomePage: React.FC = () => (
  <Box>
    <NavBar />
    <HeroSection />
    <HowItWorksSection />
    <QuoteSection />
    <FooterSection />
  </Box>
);

export default HomePage; 