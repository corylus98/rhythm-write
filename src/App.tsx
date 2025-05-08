import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
// import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PrecheckPage from './pages/JournalPage';
import ArchivedPage from './pages/ArchivedPage';
import ProfileSettings from './pages/ProfileSettings';
import JournalWritePage from './pages/JournalWritePage';

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* <Navbar /> */}
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/journal" element={<PrecheckPage />} />
          <Route path="/journal/write" element={<JournalWritePage />} />
          <Route path="/archived" element={<ArchivedPage />} />
          <Route path="/profile" element={<ProfileSettings />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App; 