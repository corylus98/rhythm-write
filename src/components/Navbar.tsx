import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: 'white',
        color: '#333',
        boxShadow: 'none',
        borderBottom: '1px solid #EAEAEA',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', height: 80, minHeight: 80 }}>
        <Typography 
          variant="h6" 
          component={RouterLink}
          to="/"
          sx={{ 
            fontFamily: '"Instrument Serif", serif',
            fontSize: '1.5rem',
            color: '#333',
            textDecoration: 'none',
            letterSpacing: '0.5px'
          }}
        >
          Rhythm Write
        </Typography>
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Button 
            component={RouterLink} 
            to="/archived"
            sx={{
              color: '#333',
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: '0.8rem',
              letterSpacing: '1.5px',
              fontWeight: 400,
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#666'
              }
            }}
          >
            ARCHIVED
          </Button>
          <Button 
            component={RouterLink} 
            to="/profile"
            sx={{
              color: '#333',
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: '0.8rem',
              letterSpacing: '1.5px',
              fontWeight: 400,
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#666'
              }
            }}
          >
            SETTINGS
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 