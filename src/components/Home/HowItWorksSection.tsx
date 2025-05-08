import React from 'react';
import { Box, Typography } from '@mui/material';

const steps = [
  { label: 'Choose your mood & time' },
  { label: 'Get prompts & a playlist' },
  { label: 'Write & get feedback' },
];

const HowItWorksSection: React.FC = () => (
  <Box sx={{ py: { xs: 6, md: 8 }, px: 2, maxWidth: 900, mx: 'auto', textAlign: 'center' }}>
    <Typography sx={{ fontFamily: 'Instrument Serif, serif', fontSize: 24, color: '#341A00', mb: 6 }}>
      How It Works
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', alignItems: 'flex-start', gap: { xs: 5, md: 8 } }}>
      {steps.map((step, idx) => (
        <Box key={step.label} sx={{ flex: 1, minWidth: 180 }}>
          <Box sx={{ width: 120, height: 120, bgcolor: '#D9D3C9', borderRadius: 2, mx: 'auto', mb: 3 }} />
          <Typography sx={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: 16, color: '#341A00', textAlign: 'center' }}>
            {step.label}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

export default HowItWorksSection; 