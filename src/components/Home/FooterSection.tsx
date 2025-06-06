import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FooterSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ py: { xs: 7, md: 10 }, px: { xs: 1, md: 3 } }}>
      <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center' }}>
        <Typography sx={{ fontFamily: 'Instrument Serif, serif', fontSize: 28, color: '#341A00', mb: 4 }}>
          Your Journey Starts Here
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate('/journal')}
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
            <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
              <g stroke="#341A00" strokeWidth="1.5" strokeLinecap="round">
                <path d="M6 14.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                <path d="M15 12.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                <path d="M6 14.5V4.5l9-2v10"/>
              </g>
            </svg>
          </Box>
          <Typography sx={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: 15, color: '#341A00', display: 'inline', verticalAlign: 'middle' }}>
            Made by Jazmyn Zhang and Hazel Chen with music and coffee.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FooterSection; 