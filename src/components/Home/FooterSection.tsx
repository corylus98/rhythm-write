import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const FooterSection: React.FC = () => (
  <Box sx={{ py: { xs: 7, md: 10 }, px: { xs: 1, md: 3 } }}>
    <Box sx={{ width: '100vw', position: 'relative', left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', height: '1px', bgcolor: '#341A00', mb: 8 }} />
    <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center' }}>
      <Typography sx={{ fontFamily: 'Instrument Serif, serif', fontSize: 28, color: '#341A00', mb: 4 }}>
        Your Journey Starts Here
      </Typography>
      <Button
        variant="outlined"
        sx={{
          fontFamily: 'Instrument Sans, sans-serif',
          fontWeight: 500,
          fontSize: '1.2rem',
          px: 4,
          py: 1.2,
          borderRadius: 1.5,
          boxShadow: 'none',
          background: '#FFFDFB',
          color: '#341A00',
          border: '1.5px solid #341A00',
          textTransform: 'none',
          transition: 'background 0.3s',
          mb: 4,
          '&:hover': {
            background: '#F5E9DD',
            color: '#341A00',
            border: '1.5px solid #341A00',
            boxShadow: 'none',
          },
        }}
      >
        Start Journaling
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, opacity: 0.8 }}>
        <Box component="span" sx={{ display: 'inline-block', mr: 1, verticalAlign: 'middle' }}>
          <svg width="16" height="16" fill="#341A00" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" stroke="#341A00" strokeWidth="1.5" fill="none"/><path d="M4 8h8" stroke="#341A00" strokeWidth="1.5"/></svg>
        </Box>
        <Typography sx={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: 15, color: '#341A00', display: 'inline', verticalAlign: 'middle' }}>
          Made by Jazmyn Zhang and Hazel Chen with music and coffee.
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default FooterSection; 