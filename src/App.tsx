import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import PrecheckPage from './pages/JournalPage';
import HistoryPage from './pages/HistoryPage';
import ProfileSettings from './pages/ProfileSettings';
import JournalWritePage from './pages/JournalWritePage';
import CallbackHandler from './pages/CallbackHandler';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* <Navbar /> */}
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/journal" 
              element={
                <ProtectedRoute>
                  <PrecheckPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/journal/write" 
              element={
                <ProtectedRoute>
                  <JournalWritePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/history" 
              element={
                <ProtectedRoute>
                  <HistoryPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfileSettings />
                </ProtectedRoute>
              } 
            />
          <Route path="/callback" element={<CallbackHandler />} />
        </Routes>
      </Container>
    </Box>
    </AuthProvider>
  );
};

export default App; 