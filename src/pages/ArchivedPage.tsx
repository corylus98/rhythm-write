import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const ArchivedPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          mt: { xs: 8, md: 12 }
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: { xs: '2rem', md: '2.5rem' },
            mb: 3,
            letterSpacing: '0.5px',
            color: '#333',
            fontWeight: 400
          }}
        >
          Archives
        </Typography>
        
        <Typography
          sx={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '1rem',
            color: '#666',
            maxWidth: '500px',
            lineHeight: 1.8,
            letterSpacing: '0.3px',
            fontWeight: 300
          }}
        >
          Coming soon
        </Typography>
      </Box>
    </Container>
  );
};

export default ArchivedPage; 